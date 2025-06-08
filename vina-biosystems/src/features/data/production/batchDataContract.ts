import { BatchModel } from "../../domain/models/batchModel";

export interface BatchDataContract {
    createBatch(batch: BatchModel): Promise<BatchModel>;
    getAllBatches(): Promise<Array<BatchModel>>;
}