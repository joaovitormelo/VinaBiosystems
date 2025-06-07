import { DatabaseException } from "../../../../core/exceptions/databaseException";
import { InventoryDataContract } from "../../../data/inventory/inventoryDataContract";
import { RawMaterialModel } from "../../models/rawMaterialModel";

export class ViewRawMaterialInventoryUsecase {
    private inventoryData: InventoryDataContract;

    constructor(inventoryData: InventoryDataContract) {
        this.inventoryData = inventoryData;
    }

    async viewRawMaterialInventory(): Promise<Array<RawMaterialModel>> {
        try {
            return await this.inventoryData.fetchInventory();
        } catch(error) {
            console.error(error);
            throw new DatabaseException("Não foi possível visualizar o estoque de insumos!");
        }
    }
}