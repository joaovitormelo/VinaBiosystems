import { RawMaterialModel } from "../../domain/models/rawMaterialModel";
import { InventoryDataContract } from "./inventoryDataContract";

export class InventoryDataMock implements InventoryDataContract {
    private inventory: Array<RawMaterialModel> = [
        RawMaterialModel.getMock(),
    ];

    async fetchInventory(): Promise<Array<RawMaterialModel>> {
        return this.inventory;
    }

    async getRawMaterialByName(name: string): Promise<RawMaterialModel | undefined> {
        return this.inventory.find(item => item.getName() === name);
    }

    async createRawMaterial(rawMaterial: RawMaterialModel): Promise<RawMaterialModel> {
        this.inventory.push(rawMaterial);
        return rawMaterial;
    }
}