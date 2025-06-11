import { RawMaterialModel } from "../../domain/models/rawMaterialModel";
import { BackendContract, ROUTES } from "../utils/backendContract";
import { InventoryDataContract } from "./inventoryDataContract";

export class InventoryData implements InventoryDataContract {
    private backend: BackendContract;

    constructor(backend: BackendContract) {
        this.backend = backend;
    }
    async removeRawMaterialQuantityFromInventory(rawMaterialId: number, quantityToRemove: number): Promise<void> {
        await this.backend.putData(
            ROUTES.RAW_MATERIAL.REMOVE_RAW_MATERIAL_QUANTITY_FROM_INVENTORY,
            { id: rawMaterialId, quantityToRemove }
        );
    }
    async isRawMaterialBeingUsedInABatch(rawMaterialId: number): Promise<boolean> {
        const result = await this.backend.fetchData(
            ROUTES.RAW_MATERIAL.IS_RAW_MATERIAL_BEING_USED_IN_BATCH,
            { id: rawMaterialId }
        );
        return Boolean(result?.isBeingUsed);
    }

    async createRawMaterial(rawMaterial: RawMaterialModel): Promise<RawMaterialModel> {
        const result = await this.backend.postData(
            ROUTES.RAW_MATERIAL.INSERT_RAW_MATERIAL,
            rawMaterial.toJson()
        );
        return RawMaterialModel.fromJson(result);
    }

    async fetchInventory(): Promise<Array<RawMaterialModel>> {
        const result = await this.backend.fetchData(ROUTES.RAW_MATERIAL.SELECT_RAW_MATERIALS, null);
        if (!Array.isArray(result)) return [];
        return result.map((item: any) => RawMaterialModel.fromJson(item));
    }

    async updateRawMaterial(rawMaterial: RawMaterialModel): Promise<void> {
        await this.backend.putData(
            ROUTES.RAW_MATERIAL.UPDATE_RAW_MATERIAL,
            rawMaterial.toJson()
        );
    }

    async removeRawMaterial(rawMaterialId: number): Promise<void> {
        await this.backend.deleteData(
            ROUTES.RAW_MATERIAL.DELETE_RAW_MATERIAL,
            { id: rawMaterialId }
        );
    }

    async getRawMaterialById(rawMaterialId: number): Promise<RawMaterialModel | undefined> {
        const result = await this.backend.fetchData(
            ROUTES.RAW_MATERIAL.SELECT_RAW_MATERIAL_BY_ID, { id: rawMaterialId }
        );
        if (!result) return undefined;
        return RawMaterialModel.fromJson(result);
    }

    async getRawMaterialByName(name: string): Promise<RawMaterialModel | undefined> {
        const result = await this.backend.fetchData(ROUTES.RAW_MATERIAL.SELECT_RAW_MATERIAL_BY_NAME, { name });
        if (!result) return undefined;
        return RawMaterialModel.fromJson(result);
    }
}