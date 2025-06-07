import moment from "moment";
import { BatchModel } from "../../domain/models/batchModel";
import { BatchDataContract } from "./batchDataContract";

export class BatchDataMock implements BatchDataContract {
    async getAllBatches(): Promise<Array<BatchModel>> {
        const batchA = BatchModel.getMock();
        batchA.setId(1);
        batchA.setLabel("Lote A");
        const batchB = BatchModel.getMock();
        batchB.setId(2);
        batchB.setLabel("Lote B");
        batchB.setStartDate(moment("2024-07-06"));
        batchB.setEndDate(moment("2024-07-08"));
        return [batchA, batchB];
    }
}