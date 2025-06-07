import { DatabaseException } from "../../../../core/exceptions/databaseException";
import { BatchDataContract } from "../../../data/production/batchDataContract";
import { BatchModel } from "../../models/batchModel";

export class ViewProductionBatchesUsecase {
    private batchData: BatchDataContract;

    constructor(batchData: BatchDataContract) {
        this.batchData = batchData;
    }

    async execute(): Promise<Array<BatchModel>> {
        try {
            return await this.batchData.getAllBatches();
        } catch (error) {
            console.error(error);
            throw new DatabaseException(`Erro ao buscar os lotes de produção!`);
        }
    }
}