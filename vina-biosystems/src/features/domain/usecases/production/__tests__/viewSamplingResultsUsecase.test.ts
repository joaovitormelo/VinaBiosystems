import { ViewSamplingResultsUsecase } from "../viewSamplingResultsUsecase";
import { DatabaseException } from "../../../../../core/exceptions/databaseException";
import { SamplingResultDataContract } from "../../../../data/production/samplingResultDataContract";
import { SamplingResultModel } from "../../../models/samplingResultModel";

describe("ViewSamplingResultsUsecase", () => {
    let viewSamplingResultsUsecase: ViewSamplingResultsUsecase;
    let samplingResultData: jest.Mocked<SamplingResultDataContract>;
    let mockSamplingResult1: jest.Mocked<SamplingResultModel>;
    let mockSamplingResult2: jest.Mocked<SamplingResultModel>;

    beforeAll(() => {
        samplingResultData = {
            getSamplingResultsByBatchId: jest.fn(),
        } as any;

        mockSamplingResult1 = {
            getId: jest.fn(),
            getBatchId: jest.fn(),
            getSampleDate: jest.fn(),
            getResult: jest.fn(),
        } as any;

        mockSamplingResult2 = {
            getId: jest.fn(),
            getBatchId: jest.fn(),
            getSampleDate: jest.fn(),
            getResult: jest.fn(),
        } as any;

        viewSamplingResultsUsecase = new ViewSamplingResultsUsecase(samplingResultData);
        console.error = jest.fn(); // Omite logs de erro durante os testes
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Deve retornar lista de resultados de amostragem quando a busca é bem-sucedida", async () => {
        const batchId = 1;
        const mockSamplingResults = [mockSamplingResult1, mockSamplingResult2];

        samplingResultData.getSamplingResultsByBatchId.mockResolvedValue(mockSamplingResults);

        const result = await viewSamplingResultsUsecase.execute(batchId);

        expect(result).toEqual(mockSamplingResults);
        expect(samplingResultData.getSamplingResultsByBatchId).toHaveBeenCalledTimes(1);
        expect(samplingResultData.getSamplingResultsByBatchId).toHaveBeenCalledWith(batchId);
    });

    it("Deve retornar lista vazia quando não há resultados de amostragem para o lote", async () => {
        const batchId = 2;
        const emptyResults: Array<SamplingResultModel> = [];

        samplingResultData.getSamplingResultsByBatchId.mockResolvedValue(emptyResults);

        const result = await viewSamplingResultsUsecase.execute(batchId);

        expect(result).toEqual(emptyResults);
        expect(samplingResultData.getSamplingResultsByBatchId).toHaveBeenCalledWith(batchId);
    });

    it("Deve retornar um único resultado de amostragem", async () => {
        const batchId = 3;
        const singleResult = [mockSamplingResult1];

        samplingResultData.getSamplingResultsByBatchId.mockResolvedValue(singleResult);

        const result = await viewSamplingResultsUsecase.execute(batchId);

        expect(result).toEqual(singleResult);
        expect(result).toHaveLength(1);
        expect(samplingResultData.getSamplingResultsByBatchId).toHaveBeenCalledWith(batchId);
    });

    it("Deve funcionar com diferentes valores de batchId", async () => {
        const testCases = [1, 100, 999, 1234567];
        const mockResults = [mockSamplingResult1];

        for (const batchId of testCases) {
            samplingResultData.getSamplingResultsByBatchId.mockResolvedValue(mockResults);

            const result = await viewSamplingResultsUsecase.execute(batchId);

            expect(result).toEqual(mockResults);
            expect(samplingResultData.getSamplingResultsByBatchId).toHaveBeenCalledWith(batchId);
        }

        expect(samplingResultData.getSamplingResultsByBatchId).toHaveBeenCalledTimes(testCases.length);
    });

    it("Deve lançar DatabaseException quando ocorre erro na busca dos resultados", async () => {
        const batchId = 1;
        const databaseError = new Error("Connection timeout");

        samplingResultData.getSamplingResultsByBatchId.mockRejectedValue(databaseError);

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        await expect(viewSamplingResultsUsecase.execute(batchId))
            .rejects.toThrow(DatabaseException);

        await expect(viewSamplingResultsUsecase.execute(batchId))
            .rejects.toThrow(`Erro na conexão com o banco de dados: Falha ao buscar os resultados de coleta do lote ${batchId}!`);

        expect(consoleSpy).toHaveBeenCalledWith("Error fetching sampling results:", databaseError);
        expect(samplingResultData.getSamplingResultsByBatchId).toHaveBeenCalledWith(batchId);

        consoleSpy.mockRestore();
    });

    it("Deve lançar DatabaseException com mensagem específica para diferentes batchIds", async () => {
        const testCases = [
            { batchId: 1, expectedMessage: "Erro na conexão com o banco de dados: Falha ao buscar os resultados de coleta do lote 1!" },
            { batchId: 42, expectedMessage: "Erro na conexão com o banco de dados: Falha ao buscar os resultados de coleta do lote 42!" },
            { batchId: 999, expectedMessage: "Erro na conexão com o banco de dados: Falha ao buscar os resultados de coleta do lote 999!" }
        ];

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        for (const testCase of testCases) {
            samplingResultData.getSamplingResultsByBatchId.mockRejectedValue(new Error("Database error"));

            await expect(viewSamplingResultsUsecase.execute(testCase.batchId))
                .rejects.toThrow(testCase.expectedMessage);

            expect(samplingResultData.getSamplingResultsByBatchId).toHaveBeenCalledWith(testCase.batchId);
        }

        expect(consoleSpy).toHaveBeenCalledTimes(testCases.length);
        consoleSpy.mockRestore();
    });

    it("Deve registrar erro detalhado no console quando ocorre exceção", async () => {
        const batchId = 1;
        const specificError = new Error("Specific database connection error");

        samplingResultData.getSamplingResultsByBatchId.mockRejectedValue(specificError);

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        try {
            await viewSamplingResultsUsecase.execute(batchId);
        } catch (error) {
            
        }

        expect(consoleSpy).toHaveBeenCalledWith("Error fetching sampling results:", specificError);
        
        consoleSpy.mockRestore();
    });

    it("Deve processar múltiplos resultados de amostragem corretamente", async () => {
        const batchId = 1;
        const mockSamplingResult3 = {
            getId: jest.fn(),
            getBatchId: jest.fn(),
            getSampleDate: jest.fn(),
            getResult: jest.fn(),
        } as any;

        const multipleResults = [mockSamplingResult1, mockSamplingResult2, mockSamplingResult3];

        samplingResultData.getSamplingResultsByBatchId.mockResolvedValue(multipleResults);

        const result = await viewSamplingResultsUsecase.execute(batchId);

        expect(result).toEqual(multipleResults);
        expect(result).toHaveLength(3);
        expect(samplingResultData.getSamplingResultsByBatchId).toHaveBeenCalledWith(batchId);
    });

    it("Deve manter a ordem dos resultados retornados pelo data contract", async () => {
        const batchId = 1;
        const orderedResults = [mockSamplingResult2, mockSamplingResult1]; // Ordem específica

        samplingResultData.getSamplingResultsByBatchId.mockResolvedValue(orderedResults);

        const result = await viewSamplingResultsUsecase.execute(batchId);

        expect(result).toEqual(orderedResults);
        expect(result[0]).toBe(mockSamplingResult2);
        expect(result[1]).toBe(mockSamplingResult1);
    });

    it("Deve lidar com batchId zero", async () => {
        const batchId = 0;
        const mockResults = [mockSamplingResult1];

        samplingResultData.getSamplingResultsByBatchId.mockResolvedValue(mockResults);

        const result = await viewSamplingResultsUsecase.execute(batchId);

        expect(result).toEqual(mockResults);
        expect(samplingResultData.getSamplingResultsByBatchId).toHaveBeenCalledWith(0);
    });

    it("Deve propagar DatabaseException com instância correta", async () => {
        const batchId = 1;
        
        samplingResultData.getSamplingResultsByBatchId.mockRejectedValue(new Error("Test error"));

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        try {
            await viewSamplingResultsUsecase.execute(batchId);
            fail("Deveria ter lançado uma exceção");
        } catch (error) {
            expect(error).toBeInstanceOf(DatabaseException);
            expect((error as DatabaseException).message).toBe(`Erro na conexão com o banco de dados: Falha ao buscar os resultados de coleta do lote ${batchId}!`);
        }

        consoleSpy.mockRestore();
    });
});