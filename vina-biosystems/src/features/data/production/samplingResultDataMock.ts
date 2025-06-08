import { SamplingResultModel } from "../../domain/models/samplingResultModel";
import { SamplingResultDataContract } from "./samplingResultDataContract";

export class SamplingResultDataMock implements SamplingResultDataContract {
    private samplingResults: SamplingResultModel[] = [
        SamplingResultModel.getMock(),
        SamplingResultModel.getMock(),
        SamplingResultModel.getMock()
    ];

    async attachSamplingResult(samplingResult: SamplingResultModel): Promise<SamplingResultModel> {
        // Simulate a delay to mimic a database call
        await new Promise(resolve => setTimeout(resolve, 500));
        this.samplingResults.push(samplingResult);
        return samplingResult;
    }

    public async getSamplingResultsByBatchId(batchId: number): Promise<Array<SamplingResultModel>> {
        // Simulating a delay to mimic database call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Filter mock results by batchId if the model has a batchId property
        return this.samplingResults.filter(
            (result: any) => result.batchId === batchId
        );
    }
}