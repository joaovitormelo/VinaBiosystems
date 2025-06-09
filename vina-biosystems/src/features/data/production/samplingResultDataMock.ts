import { SamplingResultModel } from "../../domain/models/samplingResultModel";
import { SamplingResultDataContract } from "./samplingResultDataContract";

export class SamplingResultDataMock implements SamplingResultDataContract {
    private samplingResults: SamplingResultModel[] = [];

    constructor() {
        const mockResult1 = SamplingResultModel.getMock();
        mockResult1.setId(1);
        mockResult1.setFileName("sample_result_1.txt");
        const mockResult2 = SamplingResultModel.getMock();
        mockResult2.setId(2);
        mockResult2.setFileName("sample_result_2.txt");

        this.samplingResults = [
            mockResult1,
            mockResult2
        ];
    }

    async attachSamplingResult(samplingResult: SamplingResultModel): Promise<SamplingResultModel> {
        await new Promise(resolve => setTimeout(resolve, 500));
        this.samplingResults.push(samplingResult);
        return samplingResult;
    }

    public async getSamplingResultsByBatchId(batchId: number): Promise<Array<SamplingResultModel>> {
        await new Promise(resolve => setTimeout(resolve, 2000));
        return [];
        return this.samplingResults;
    }

    async deleteSamplingResult(samplingResultId: number): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 500));
        this.samplingResults = this.samplingResults.filter(
            result => result.getId() !== samplingResultId
        );
    }
}