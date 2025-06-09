import { BatchModel } from "../../domain/models/batchModel";

export interface BatchDataContract {
    updateSituationField(batchId: number, situation: string): Promise<void>;
    createBatch(batch: BatchModel): Promise<BatchModel>;
    getAllBatches(): Promise<Array<BatchModel>>;
}