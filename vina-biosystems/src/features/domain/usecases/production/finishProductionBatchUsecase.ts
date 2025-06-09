import { DatabaseException } from "../../../../core/exceptions/databaseException";
import { BatchDataContract } from "../../../data/production/batchDataContract";
import { BatchModel } from "../../models/batchModel";

export class FinishProductionBatchUsecase {
    private batchData: BatchDataContract; // Replace with actual data contract type

    constructor(batchData: BatchDataContract) {
        this.batchData = batchData;
    }

    public async execute(batchId: number): Promise<void> {
        if (!batchId) {
            throw new Error("ID do lote de produção é obrigatório.");
        }

        try {
            await this.batchData.updateSituationField(batchId, BatchModel.SITUATION.FECHADO);
        } catch (error) {
            console.error(error);
            throw new DatabaseException("Não foi possível finalizar o lote de produção!");
        }
    }
}