import { BatchModel } from "../../domain/models/batchModel";
import { RawMaterialInBatch } from "../../domain/types/rawMaterialInBatch";

export interface BatchDataContract {
    getRawMaterialListByBatchId(batchId: number): Promise<Array<RawMaterialInBatch>>;
    addRawMaterialToBatch(batchId: number, rawNaterialId: number, quantity: number): unknown;
    updateSituationField(batchId: number, situation: string): Promise<void>;
    createBatch(batch: BatchModel): Promise<BatchModel>;
    getAllBatches(): Promise<Array<BatchModel>>;
}