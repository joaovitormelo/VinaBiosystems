import { BatchModel } from "../../domain/models/batchModel";
import { RawMaterialInBatch } from "../../domain/types/rawMaterialInBatch";
import { BackendContract, ROUTES } from "../utils/backendContract";
import { BatchDataContract } from "./batchDataContract";

export class BatchData implements BatchDataContract {
    private backend: BackendContract;

    constructor(backend: BackendContract) {
        this.backend = backend;
    }

    async getRawMaterialListByBatchId(batchId: number): Promise<Array<RawMaterialInBatch>> {
        const results = await this.backend.fetchData(
            ROUTES.BATCH.GET_RAW_MATERIAL_LIST_BY_BATCH_ID, { batchId }
        );
        if (!results || !Array.isArray(results)) return [];
        return results.map((item: any) => RawMaterialInBatch.fromJson(item));
    }

    async addRawMaterialToBatch(batchId: number, rawMaterialId: number, quantity: number) {
        return await this.backend.putData(
            ROUTES.BATCH.ADD_RAW_MATERIAL_TO_BATCH,
            { batchId, rawMaterialId, quantity }
        );
    }

    async updateSituationField(batchId: number, situation: string): Promise<void> {
        await this.backend.putData(
            ROUTES.BATCH.UPDATE_BATCH_SITUATION,
            { id: batchId, situation }
        );
    }

    async createBatch(batch: BatchModel): Promise<number> {
        const result = await this.backend.postData(
            ROUTES.BATCH.INSERT_BATCH,
            batch.toJSON()
        );
        return result.id;
    }

    async getAllBatches(): Promise<Array<BatchModel>> {
        const results = await this.backend.fetchData(ROUTES.BATCH.SELECT_BATCHES, null);
        if (!Array.isArray(results)) return [];
        return results.map((item: any) => BatchModel.fromJSON(item));
    }

    async updateBatch(batch: BatchModel): Promise<void> {
        await this.backend.putData(ROUTES.BATCH.UPDATE_BATCH, batch.toJSON());
    }
}