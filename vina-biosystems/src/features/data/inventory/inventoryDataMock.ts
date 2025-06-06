import { RawMaterialModel } from "../../domain/models/rawMaterialModel";
import { InventoryDataContract } from "./inventoryDataContract";

export class InventoryDataMock implements InventoryDataContract {
    private inventory: Array<RawMaterialModel> = [
        RawMaterialModel.getMock(),
    ];

    async fetchInventory(): Promise<Array<RawMaterialModel>> {
        return this.inventory;
    }
}