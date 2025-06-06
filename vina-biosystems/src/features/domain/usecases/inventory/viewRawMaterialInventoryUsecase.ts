import { InventoryDataContract } from "../../../data/inventory/inventoryDataContract";
import { RawMaterialModel } from "../../models/rawMaterialModel";

export class ViewRawMaterialInventoryUsecase {
    private inventoryData: InventoryDataContract;

    constructor(inventoryData: InventoryDataContract) {
        this.inventoryData = inventoryData;
    }

    public async viewRawMaterialInventory(): Promise<Array<RawMaterialModel>> {
        return await this.inventoryData.fetchInventory();
    }
}