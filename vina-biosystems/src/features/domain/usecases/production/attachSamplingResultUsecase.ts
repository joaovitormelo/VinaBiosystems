import { DatabaseException } from "../../../../core/exceptions/databaseException";
import { ValidationException } from "../../../../core/exceptions/validationException";
import { SessionManagerContract } from "../../../../core/session/sessionManagerContract";
import { SamplingResultDataContract } from "../../../data/production/samplingResultDataContract";
import { SamplingResultModel } from "../../models/samplingResultModel";
import { UserModel } from "../../models/userModel";

export class AttachSamplingResultUsecase {
    private samplingResultData: SamplingResultDataContract;
    private sessionManager: SessionManagerContract;

    constructor(samplingResultData: SamplingResultDataContract, sessionManager: SessionManagerContract) {
        this.samplingResultData = samplingResultData;
        this.sessionManager = sessionManager;
    }

    async execute(samplingResult: SamplingResultModel): Promise<SamplingResultModel> {
        this.validate(samplingResult);
        const user = this.sessionManager.getSessionUser() as UserModel;
        samplingResult.setCreationUserId(user.getId() as number);
        try {
            const result = await this.samplingResultData.attachSamplingResult(samplingResult);
            return result;
        } catch (error) {
            console.error(error);
            throw new DatabaseException(`Erro ao anexar o resultado de coleta!`);
        }
    }

    private validate(samplingResult: SamplingResultModel) {
        if (!samplingResult.getFileName()) {
            throw new ValidationException("fileName", "O arquivo não pode ser vazio!");
        }
        if (!samplingResult.getDate()) {
            throw new ValidationException("date", "A data não pode ser vazia!");
        }
    }
}