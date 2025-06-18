import { ExcludeSamplingResultUsecase } from "../excludeSamplingResultUsecase";
import { DatabaseException } from "../../../../../core/exceptions/databaseException";
import { SamplingResultDataContract } from "../../../../data/production/samplingResultDataContract";

describe("ExcludeSamplingResultUsecase", () => {
    let excludeSamplingResultUsecase: ExcludeSamplingResultUsecase;
    let samplingResultData: jest.Mocked<SamplingResultDataContract>;

    beforeAll(() => {
        samplingResultData = {
            deleteSamplingResult: jest.fn(),
        } as any;

        excludeSamplingResultUsecase = new ExcludeSamplingResultUsecase(
            samplingResultData
        );
        console.error = jest.fn(); // Omite logs de erro durante os testes
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Deve excluir o resultado de coleta com sucesso quando o ID é válido", async () => {
        const samplingResultId = 1;
        samplingResultData.deleteSamplingResult.mockResolvedValue(undefined);

        await excludeSamplingResultUsecase.execute(samplingResultId);

        expect(samplingResultData.deleteSamplingResult).toHaveBeenCalledWith(samplingResultId);
        expect(samplingResultData.deleteSamplingResult).toHaveBeenCalledTimes(1);
    });

    it("Deve lançar Error quando o ID do resultado de coleta não está definido", async () => {
        const samplingResultId = 0;

        await expect(excludeSamplingResultUsecase.execute(samplingResultId))
            .rejects.toThrow("ID do resultado de coleta é obrigatório.");
        
        expect(samplingResultData.deleteSamplingResult).not.toHaveBeenCalled();
    });

    it("Deve lançar Error quando o ID do resultado de coleta é null", async () => {
        const samplingResultId = null as any;

        await expect(excludeSamplingResultUsecase.execute(samplingResultId))
            .rejects.toThrow("ID do resultado de coleta é obrigatório.");
        
        expect(samplingResultData.deleteSamplingResult).not.toHaveBeenCalled();
    });

    it("Deve lançar Error quando o ID do resultado de coleta é undefined", async () => {
        const samplingResultId = undefined as any;

        await expect(excludeSamplingResultUsecase.execute(samplingResultId))
            .rejects.toThrow("ID do resultado de coleta é obrigatório.");
        
        expect(samplingResultData.deleteSamplingResult).not.toHaveBeenCalled();
    });

    it("Deve lançar Error quando o ID do resultado de coleta é NaN", async () => {
        const samplingResultId = NaN;

        await expect(excludeSamplingResultUsecase.execute(samplingResultId))
            .rejects.toThrow("ID do resultado de coleta é obrigatório.");
        
        expect(samplingResultData.deleteSamplingResult).not.toHaveBeenCalled();
    });

    it("Deve lançar DatabaseException quando não é possível excluir o resultado de coleta", async () => {
        const samplingResultId = 1;
        samplingResultData.deleteSamplingResult.mockRejectedValue(new Error("Database error"));

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        await expect(excludeSamplingResultUsecase.execute(samplingResultId))
            .rejects.toThrow(DatabaseException);
        
        expect(samplingResultData.deleteSamplingResult).toHaveBeenCalledWith(samplingResultId);
        expect(consoleSpy).toHaveBeenCalled();

        consoleSpy.mockRestore();
    });

    it("Deve lançar DatabaseException com a mensagem correta quando há erro de banco", async () => {
        const samplingResultId = 1;
        samplingResultData.deleteSamplingResult.mockRejectedValue(new Error("Connection timeout"));

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        await expect(excludeSamplingResultUsecase.execute(samplingResultId))
            .rejects.toThrow("Não foi possível excluir o resultado de coleta!");
        
        expect(samplingResultData.deleteSamplingResult).toHaveBeenCalledWith(samplingResultId);
        expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));

        consoleSpy.mockRestore();
    });

    it("Deve processar corretamente diferentes IDs válidos", async () => {
        const testIds = [1, 2, 99, 1000];
        samplingResultData.deleteSamplingResult.mockResolvedValue(undefined);

        for (const id of testIds) {
            await excludeSamplingResultUsecase.execute(id);
            expect(samplingResultData.deleteSamplingResult).toHaveBeenCalledWith(id);
        }

        expect(samplingResultData.deleteSamplingResult).toHaveBeenCalledTimes(testIds.length);
    });

    it("Deve lançar DatabaseException quando deleteSamplingResult rejeita com objeto de erro personalizado", async () => {
        const samplingResultId = 1;
        const customError = { message: "Custom database error", code: 'DB_ERROR' };
        samplingResultData.deleteSamplingResult.mockRejectedValue(customError);

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        await expect(excludeSamplingResultUsecase.execute(samplingResultId))
            .rejects.toThrow(DatabaseException);
        
        expect(consoleSpy).toHaveBeenCalledWith(customError);

        consoleSpy.mockRestore();
    });
});