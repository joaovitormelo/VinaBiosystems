import { DatabaseException } from "../../../../core/exceptions/databaseException";
import { SamplingResultDataContract } from "../../../data/production/samplingResultDataContract";
import { SamplingResultModel } from "../../models/samplingResultModel";

export class ViewSamplingResultsUsecase {
    private samplingResultData: SamplingResultDataContract;

    constructor(samplingResultData: SamplingResultDataContract) {
        this.samplingResultData = samplingResultData;
    }

    public async execute(batchId: number): Promise<Array<SamplingResultModel>> {
        try {
            return await this.samplingResultData.getSamplingResultsByBatchId(batchId);
        } catch (error) {
            console.error("Error fetching sampling results:", error);
            throw new DatabaseException(`Falha ao buscar os resultados de coleta do lote ${batchId}!`);
        }
    }
}