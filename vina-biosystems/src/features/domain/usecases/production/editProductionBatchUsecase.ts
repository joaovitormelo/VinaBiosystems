import { DatabaseException } from "../../../../core/exceptions/databaseException";
import { BatchDataContract } from "../../../data/production/batchDataContract";
import { BatchModel } from "../../models/batchModel";

export class EditProductionBatchUsecase {
    private batchData: BatchDataContract;

    constructor(batchData: BatchDataContract) {
        this.batchData = batchData;
    }

    async execute(batch: BatchModel): Promise<void> {
        if (!batch.getId()) {
            throw new Error("ID do lote de produção é obrigatório para edição.");
        }
        try {
            await this.batchData.updateBatch(batch);
        } catch (error) {
            console.error(error);
            throw new DatabaseException("Erro ao editar o lote de produção!");
        }
    }
} 