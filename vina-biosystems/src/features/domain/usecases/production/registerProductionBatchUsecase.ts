import { DatabaseException } from "../../../../core/exceptions/databaseException";
import { ValidationException } from "../../../../core/exceptions/validationException";
import { InventoryDataContract } from "../../../data/inventory/inventoryDataContract";
import { BatchDataContract } from "../../../data/production/batchDataContract";
import { BatchModel } from "../../models/batchModel";
import { RawMaterialModel } from "../../models/rawMaterialModel";
import { RawMaterialInBatch } from "../../types/rawMaterialInBatch";

export class RegisterProductionBatchUsecase {
    private batchData: BatchDataContract;
    private inventoryData: InventoryDataContract;

    constructor(batchData: BatchDataContract, inventoryData: InventoryDataContract) {
        this.batchData = batchData;
        this.inventoryData = inventoryData;
    }

    async execute(batch: BatchModel): Promise<void> {
        await this.validateFields(batch);
        batch.setSituation(BatchModel.SITUATION.EM_ABERTO);
        try {
            batch = await this.batchData.createBatch(batch);
        } catch (error) {
            console.error(error);
            throw new DatabaseException(`Erro ao cadastrar o lote de produção!`);
        }
        for (let rawMaterial of batch.getRawMaterialList() as Array<RawMaterialInBatch>) {
            try {
                await this.batchData.addRawMaterialToBatch(
                    batch.getId() as number,
                    rawMaterial.getRawMaterialId(),
                    rawMaterial.getQuantity()
                );
            } catch (error) {
                console.error(error);
                throw new DatabaseException(
                    `Erro ao adicionar o insumo "${rawMaterial.getRawMaterialId()}" ao lote!`
                );
            }
        }
    }

    private async validateFields(batch: BatchModel) {
        if (!batch.getLabel()) {
            throw new ValidationException("label", "O rótulo do lote é obrigatório.");
        }
        if (!batch.getStartDate()) {
            throw new ValidationException("startDate", "A data de início do lote é obrigatória.");
        }
        if (!batch.getEndDate()) {
            throw new ValidationException("endDate", "A data de término do lote é obrigatória.");
        }
        if (batch.getStartDate().isAfter(batch.getEndDate())) {
            throw new ValidationException("startDate", "A data de início não pode ser posterior à data de término.");
        }
        await this.validateRawMaterials(batch.getRawMaterialList() as Array<RawMaterialInBatch>);
    }

    private async validateRawMaterials(rawMaterialsList: Array<RawMaterialInBatch>) {
        for (let rawMaterialInBatch of rawMaterialsList) {
            let rawMaterialInInventory: RawMaterialModel;
            try {
                rawMaterialInInventory = (await this.inventoryData.getRawMaterialById(
                    rawMaterialInBatch.getRawMaterialId()
                )) as RawMaterialModel;
            } catch(error) {
                console.error(error);
                throw new DatabaseException(
                    `Erro ao consultar insumo "${rawMaterialInBatch.getRawMaterialId()}"!`
                );
            }
            if (!rawMaterialInInventory) {
                throw new ValidationException(
                    "rawMaterialId",
                    `O insumo "${rawMaterialInBatch.getRawMaterialId()}" não existe!`
                );
            }
            if (rawMaterialInInventory.getQuantity() < rawMaterialInBatch.getQuantity()) {
                throw new ValidationException(
                    "quantity",
                    `A quantidade do insumo "${rawMaterialInInventory.getName()}" (${
                        rawMaterialInInventory.getQuantity()
                    }) em estoque é insuficiente!`
                );
            }
        }
    }
}