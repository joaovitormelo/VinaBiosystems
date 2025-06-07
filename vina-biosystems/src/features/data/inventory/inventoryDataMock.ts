import { DatabaseException } from "../../../core/exceptions/databaseException";
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

    async updateRawMaterial(rawMaterial: RawMaterialModel): Promise<void> {
        const index = this.inventory.findIndex(item => item.getId() === rawMaterial.getId());
        if (index !== -1) {
            this.inventory[index] = rawMaterial;
        } else {
            throw new DatabaseException(`Raw material with ID "${rawMaterial.getId()}" not found.`);
        }
    }
}