import { RawMaterialModel } from "../../domain/models/rawMaterialModel";

export interface InventoryDataContract {
    fetchInventory(): Promise<Array<RawMaterialModel>>;
}