import moment from "moment";
import { BatchModel } from "../../domain/models/batchModel";
import { BatchDataContract } from "./batchDataContract";

export class BatchDataMock implements BatchDataContract {
    private batches: BatchModel[] = [];

    constructor() {
        // Initialize with some mock data
        const batchA = BatchModel.getMock();
        batchA.setId(1);
        batchA.setLabel("Lote A");
        const batchB = BatchModel.getMock();
        batchB.setId(2);
        batchB.setLabel("Lote B");
        batchB.setStartDate(moment("2024-07-06"));
        batchB.setEndDate(moment("2024-07-08"));
        this.batches = [batchA, batchB];
    }

    async createBatch(batch: BatchModel): Promise<BatchModel> {
        // Simulate auto-increment ID
        const newId = this.batches.length > 0
            ? Math.max(...this.batches.map(b => b.getId() ?? 0)) + 1
            : 1;
        batch.setId(newId);
        this.batches.push(batch);
        return batch;
    }

    async getAllBatches(): Promise<Array<BatchModel>> {
        // Return a copy to prevent external mutation
        return this.batches.map(b => Object.assign(Object.create(Object.getPrototypeOf(b)), b));
    }
}