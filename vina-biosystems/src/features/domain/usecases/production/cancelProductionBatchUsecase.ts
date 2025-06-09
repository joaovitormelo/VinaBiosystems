import { DatabaseException } from "../../../../core/exceptions/databaseException";
import { UsecaseException } from "../../../../core/exceptions/usecaseException";
import { InventoryDataContract } from "../../../data/inventory/inventoryDataContract";
import { BatchDataContract } from "../../../data/production/batchDataContract";
import { SamplingResultDataContract } from "../../../data/production/samplingResultDataContract";
import { BatchModel } from "../../models/batchModel";
import { RawMaterialModel } from "../../models/rawMaterialModel";
import { RawMaterialInBatch } from "../../types/rawMaterialInBatch";

export class CancelProductionBatchUsecase {
    private batchData: BatchDataContract;
    private samplingResultData: SamplingResultDataContract;
    private inventoryData: InventoryDataContract;

    constructor(
        batchData: BatchDataContract, samplingResultData: SamplingResultDataContract,
        inventoryData: InventoryDataContract
    ) {
        this.batchData = batchData;
        this.samplingResultData = samplingResultData;
        this.inventoryData = inventoryData;
    }

    public async execute(batch: BatchModel): Promise<void> {
        if (!batch.getId()) {
            throw new Error("ID do lote de produção é obrigatório.");
        }

        const samplingResults = await this.samplingResultData.getSamplingResultsByBatchId(
            batch.getId() as number
        );
        if (samplingResults.length > 0) {
            throw new UsecaseException("Não é possível cancelar o lote de produção, pois já existem resultados de coleta associados a ele.");
        }

        const rawMaterialList = batch.getRawMaterialList();
        await this.returnRawMaterialListToInventory(rawMaterialList);

        try {
            await this.batchData.updateSituationField(
                batch.getId() as number, BatchModel.SITUATION.CANCELADO
            );
        } catch (error) {
            console.error(error);
            throw new DatabaseException("Não foi possível cancelar o lote de produção!");
        }
    }

    async returnRawMaterialListToInventory(rawMaterialList: Array<RawMaterialInBatch>) {
        for (const rawMaterialInBatch of rawMaterialList) {
            let rawMaterial: RawMaterialModel;
            try {
                const result = (
                    await this.inventoryData.getRawMaterialById(rawMaterialInBatch.getRawMaterialId())
                );
                if (!result) throw new Error("Insumo não encontrado");
                rawMaterial = result as RawMaterialModel;
            } catch(error) {
                console.error(error);
                throw new DatabaseException(`Não foi possível encontrar o insumo com ID ${rawMaterialInBatch.getRawMaterialId()}!`);
            }
            rawMaterial.setQuantity(
                rawMaterial.getQuantity() + rawMaterialInBatch.getQuantity()
            );
            try {
                await this.inventoryData.updateRawMaterial(rawMaterial);
            } catch (error) {
                console.error(error);
                throw new DatabaseException(`Não foi possível devolver o insumo ${rawMaterial.getName()} ao estoque!`);
            }
        }
    }
}