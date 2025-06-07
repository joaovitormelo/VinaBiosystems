import { DatabaseException } from "../../../../core/exceptions/databaseException";
import { UsecaseException } from "../../../../core/exceptions/usecaseException";
import { InventoryDataContract } from "../../../data/inventory/inventoryDataContract";
import { RawMaterialModel } from "../../models/rawMaterialModel";

export class RegisterRawMaterialUsecase {
    private inventoryData: InventoryDataContract;

    constructor(inventoryData: InventoryDataContract) {
        this.inventoryData = inventoryData;
    }

    async registerRawMaterial(rawMaterial: RawMaterialModel): Promise<void> {
        const existingRawMaterial = await this.inventoryData.getRawMaterialByName(rawMaterial.getName());
        if (existingRawMaterial) {
            throw new UsecaseException("Já existe um insumo cadastrado com o nome " + rawMaterial.getName() + "!");
        }
        try {
            await this.inventoryData.createRawMaterial(rawMaterial);
        } catch (error) {
            console.error(error);
            throw new DatabaseException("Não foi possível cadastrar o insumo " + rawMaterial.getName() + "!");
        }
    }
}