import { DatabaseException } from "../../../../core/exceptions/databaseException";
import { BatchDataContract } from "../../../data/production/batchDataContract";
import { BatchModel } from "../../models/batchModel";
import { RawMaterialInBatch } from "../../types/rawMaterialInBatch";

export class ViewProductionBatchesUsecase {
    private batchData: BatchDataContract;

    constructor(batchData: BatchDataContract) {
        this.batchData = batchData;
    }

    async execute(): Promise<Array<BatchModel>> {
        let batchList: Array<BatchModel> = [];
        try {
            batchList = await this.batchData.getAllBatches();
        } catch (error) {
            console.error(error);
            throw new DatabaseException(`Erro ao buscar os lotes de produção!`);
        }
        for (let batch of batchList) {
            try {
                const rawMaterialsList: Array<RawMaterialInBatch> = await this.batchData.getRawMaterialListByBatchId(
                    batch.getId() as number
                );
                batch.setRawMaterialList(rawMaterialsList);
            } catch (error) {
                console.error(error);
                throw new DatabaseException(`Erro ao buscar os insumos do lote com ID ${batch.getId()}!`);
            }
        }
        return batchList;
    }
}