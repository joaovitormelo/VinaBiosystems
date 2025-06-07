import { RawMaterialModel } from "../../domain/models/rawMaterialModel";

export interface InventoryDataContract {
    getRawMaterialByName(name: string): Promise<RawMaterialModel | undefined>;
    createRawMaterial(rawMaterial: RawMaterialModel): Promise<RawMaterialModel>;
    fetchInventory(): Promise<Array<RawMaterialModel>>;
    updateRawMaterial(rawMaterial: RawMaterialModel): Promise<void>;
}