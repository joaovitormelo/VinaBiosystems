import { DatabaseException } from "../../../../core/exceptions/databaseException";
import { UsecaseException } from "../../../../core/exceptions/usecaseException";
import { InventoryDataContract } from "../../../data/inventory/inventoryDataContract";

export class RemoveRawMaterialUsecase {
    private inventoryData: InventoryDataContract;

    constructor(inventoryData: InventoryDataContract) {
        this.inventoryData = inventoryData;
    }

    async execute(rawMaterialId: number): Promise<void> {
        let isRawMaterialBeingUsedInABatch;
        try {
            isRawMaterialBeingUsedInABatch = await this.inventoryData.isRawMaterialBeingUsedInABatch(
                rawMaterialId
            );
        } catch(error) {
            console.error(error);
            throw new DatabaseException("Erro ao consultar uso do insumo no banco de dados!");
        }
        if (isRawMaterialBeingUsedInABatch) {
            throw new UsecaseException("O insumo está vinculado a um ou mais lotes!");
        }
        try {
            await this.inventoryData.removeRawMaterial(rawMaterialId);
        } catch (error) {
            console.error(error);
            throw new DatabaseException("Não foi possível remover o insumo do estoque!");
        }
    }
}