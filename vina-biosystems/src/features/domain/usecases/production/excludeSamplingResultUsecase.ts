import { DatabaseException } from "../../../../core/exceptions/databaseException";
import { SamplingResultDataContract } from "../../../data/production/samplingResultDataContract";

export class ExcludeSamplingResultUsecase {
    private samplingResultData: SamplingResultDataContract;

    constructor(samplingResultData: SamplingResultDataContract) {
        this.samplingResultData = samplingResultData;
    }

    public async execute(samplingResultId: number): Promise<void> {
        if (!samplingResultId) {
            throw new Error("ID do resultado de coleta é obrigatório.");
        }

        try {
            await this.samplingResultData.deleteSamplingResult(samplingResultId);
        } catch(error) {
            console.error(error);
            throw new DatabaseException("Não foi possível excluir o resultado de coleta!");
        }
    }
}