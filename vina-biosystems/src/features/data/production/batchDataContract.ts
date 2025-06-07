import { BatchModel } from "../../domain/models/batchModel";

export interface BatchDataContract {
    getAllBatches(): Promise<Array<BatchModel>>;
}