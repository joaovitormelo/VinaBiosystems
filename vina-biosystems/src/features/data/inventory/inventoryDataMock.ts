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

    async getRawMaterialById(rawMaterialId: number): Promise<RawMaterialModel | undefined> {
        return this.inventory.find(item => item.getId() === rawMaterialId);
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

    async isRawMaterialBeingUsedInABatch(rawMaterialId: number): Promise<boolean> {
        // Mock implementation: always returns false (not being used)
        // You can enhance this logic if you have batch data available
        return false;
    }

    async removeRawMaterial(rawMaterialId: number): Promise<void> {
        const index = this.inventory.findIndex(item => item.getId() === rawMaterialId);
        if (index !== -1) {
            this.inventory.splice(index, 1);
        } else {
            throw new DatabaseException(`Raw material with ID "${rawMaterialId}" not found.`);
        }
    }

    async removeRawMaterialQuantityFromInventory(rawMaterialId: number, quantityToRemove: number): Promise<void> {
        const material = this.inventory.find(item => item.getId() === rawMaterialId);
        if (!material) {
            throw new DatabaseException(`Raw material with ID "${rawMaterialId}" not found.`);
        }
        const currentQuantity = material.getQuantity();
        if (currentQuantity < quantityToRemove) {
            throw new DatabaseException(`Not enough quantity to remove. Available: ${currentQuantity}, Requested: ${quantityToRemove}`);
        }
        material.setQuantity(currentQuantity - quantityToRemove);
    }
}