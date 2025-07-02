import { BatchModel } from "../../domain/models/batchModel";
import { RawMaterialInBatch } from "../../domain/types/rawMaterialInBatch";

export interface BatchDataContract {
    getRawMaterialListByBatchId(batchId: number): Promise<Array<RawMaterialInBatch>>;
    addRawMaterialToBatch(batchId: number, rawMaterialId: number, quantity: number): Promise<void>;
    updateSituationField(batchId: number, situation: string): Promise<void>;
    createBatch(batch: BatchModel): Promise<number>;
    getAllBatches(): Promise<Array<BatchModel>>;
    updateBatch(batch: BatchModel): Promise<void>;
    updateEndDateOfBatch(batchId: number, endDate: moment.Moment): Promise<void>;
}