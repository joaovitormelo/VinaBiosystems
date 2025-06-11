import { RawMaterialModel } from "../../domain/models/rawMaterialModel";

export interface InventoryDataContract {
    removeRawMaterialQuantityFromInventory(rawMaterialId: number, quantityToRemove: number): Promise<void>;
    getRawMaterialByName(name: string): Promise<RawMaterialModel | undefined>;
    createRawMaterial(rawMaterial: RawMaterialModel): Promise<RawMaterialModel>;
    fetchInventory(): Promise<Array<RawMaterialModel>>;
    updateRawMaterial(rawMaterial: RawMaterialModel): Promise<void>;
    isRawMaterialBeingUsedInABatch(rawMaterialId: number): Promise<boolean>;
    removeRawMaterial(rawMaterialId: number): Promise<void>;
    getRawMaterialById(rawMaterialId: number): Promise<RawMaterialModel | undefined>;
}