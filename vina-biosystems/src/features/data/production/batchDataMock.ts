import moment from "moment";
import { BatchModel } from "../../domain/models/batchModel";
import { BatchDataContract } from "./batchDataContract";
import { RawMaterialInBatch } from "../../domain/types/rawMaterialInBatch";

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
    async getRawMaterialListByBatchId(batchId: number | null): Promise<RawMaterialInBatch[]> {
        if (batchId === null) {
            throw new Error("Batch ID não pode ser nulo!");
        }
        const batch = this.batches.find(b => b.getId() === batchId);
        if (!batch) {
            throw new Error(`Batch com ID ${batchId} não encontrado!`);
        }
        return batch.getRawMaterialList() ?? [];
    }

    async addRawMaterialToBatch(batchId: number, rawMaterialId: number, quantity: number): Promise<void> {
        const batch = this.batches.find(b => b.getId() === batchId);
        if (!batch) {
            throw new Error(`Batch com ID ${batchId} não encontrado!`);
        }
        let rawMaterials: Array<RawMaterialInBatch> = [];
        if (batch.getRawMaterialList()) {
            rawMaterials = batch.getRawMaterialList() as Array<RawMaterialInBatch>;
        }
        rawMaterials.push(new RawMaterialInBatch(rawMaterialId, quantity));
        batch.setRawMaterialList(rawMaterials);
    }
    
    async updateSituationField(batchId: number, situation: string): Promise<void> {
        const batch = this.batches.find(b => b.getId() === batchId);
        if (!batch) {
            throw new Error(`Batch com ID ${batchId} não encontrado!`);
        }
        batch.setSituation(situation);
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