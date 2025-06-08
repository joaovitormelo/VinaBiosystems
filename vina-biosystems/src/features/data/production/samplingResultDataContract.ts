import { SamplingResultModel } from "../../domain/models/samplingResultModel";

export interface SamplingResultDataContract {
    getSamplingResultsByBatchId(batchId: number): Promise<Array<SamplingResultModel>>;
    attachSamplingResult(samplingResult: SamplingResultModel): Promise<SamplingResultModel>;
}