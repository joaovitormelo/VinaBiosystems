import { ViewProductionBatchesUsecase } from "../viewProductionBatchesUsecase";
import { DatabaseException } from "../../../../../core/exceptions/databaseException";
import { BatchDataContract } from "../../../../data/production/batchDataContract";
import { BatchModel } from "../../../models/batchModel";
import { RawMaterialInBatch } from "../../../types/rawMaterialInBatch";

describe("ViewProductionBatchesUsecase", () => {
    let viewProductionBatchesUsecase: ViewProductionBatchesUsecase;
    let batchData: jest.Mocked<BatchDataContract>;
    let mockBatch1: jest.Mocked<BatchModel>;
    let mockBatch2: jest.Mocked<BatchModel>;
    let mockRawMaterialInBatch1: jest.Mocked<RawMaterialInBatch>;
    let mockRawMaterialInBatch2: jest.Mocked<RawMaterialInBatch>;

    beforeAll(() => {
        batchData = {
            getAllBatches: jest.fn(),
            getRawMaterialListByBatchId: jest.fn(),
        } as any;

        mockBatch1 = {
            getId: jest.fn(),
            setRawMaterialList: jest.fn(),
        } as any;

        mockBatch2 = {
            getId: jest.fn(),
            setRawMaterialList: jest.fn(),
        } as any;

        mockRawMaterialInBatch1 = {
            getRawMaterialId: jest.fn(),
            getQuantity: jest.fn(),
        } as any;

        mockRawMaterialInBatch2 = {
            getRawMaterialId: jest.fn(),
            getQuantity: jest.fn(),
        } as any;

        viewProductionBatchesUsecase = new ViewProductionBatchesUsecase(batchData);
        console.error = jest.fn(); // Omite logs de erro durante os testes
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Deve retornar lista de lotes com insumos quando todas as operações são bem-sucedidas", async () => {
        const mockBatchList = [mockBatch1, mockBatch2];
        const mockRawMaterialsList1 = [mockRawMaterialInBatch1];
        const mockRawMaterialsList2 = [mockRawMaterialInBatch2];

        mockBatch1.getId.mockReturnValue(1);
        mockBatch2.getId.mockReturnValue(2);

        batchData.getAllBatches.mockResolvedValue(mockBatchList);
        batchData.getRawMaterialListByBatchId
            .mockResolvedValueOnce(mockRawMaterialsList1)
            .mockResolvedValueOnce(mockRawMaterialsList2);

        const result = await viewProductionBatchesUsecase.execute();

        expect(result).toEqual(mockBatchList);
        expect(batchData.getAllBatches).toHaveBeenCalledTimes(1);
        expect(batchData.getRawMaterialListByBatchId).toHaveBeenCalledTimes(2);
        expect(batchData.getRawMaterialListByBatchId).toHaveBeenNthCalledWith(1, 1);
        expect(batchData.getRawMaterialListByBatchId).toHaveBeenNthCalledWith(2, 2);
        expect(mockBatch1.setRawMaterialList).toHaveBeenCalledWith(mockRawMaterialsList1);
        expect(mockBatch2.setRawMaterialList).toHaveBeenCalledWith(mockRawMaterialsList2);
    });

    it("Deve retornar lista vazia quando não há lotes", async () => {
        batchData.getAllBatches.mockResolvedValue([]);

        const result = await viewProductionBatchesUsecase.execute();

        expect(result).toEqual([]);
        expect(batchData.getAllBatches).toHaveBeenCalledTimes(1);
        expect(batchData.getRawMaterialListByBatchId).not.toHaveBeenCalled();
    });

    it("Deve processar lote sem insumos corretamente", async () => {
        const mockBatchList = [mockBatch1];
        const emptyRawMaterialsList: Array<RawMaterialInBatch> = [];

        mockBatch1.getId.mockReturnValue(1);
        batchData.getAllBatches.mockResolvedValue(mockBatchList);
        batchData.getRawMaterialListByBatchId.mockResolvedValue(emptyRawMaterialsList);

        const result = await viewProductionBatchesUsecase.execute();

        expect(result).toEqual(mockBatchList);
        expect(batchData.getRawMaterialListByBatchId).toHaveBeenCalledWith(1);
        expect(mockBatch1.setRawMaterialList).toHaveBeenCalledWith(emptyRawMaterialsList);
    });

    it("Deve lançar DatabaseException quando falha ao buscar todos os lotes", async () => {
        batchData.getAllBatches.mockRejectedValue(new Error("Database connection failed"));

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        await expect(viewProductionBatchesUsecase.execute())
            .rejects.toThrow(DatabaseException);

        await expect(viewProductionBatchesUsecase.execute())
            .rejects.toThrow("Erro ao buscar os lotes de produção!");

        expect(consoleSpy).toHaveBeenCalled();
        expect(batchData.getRawMaterialListByBatchId).not.toHaveBeenCalled();
        
        consoleSpy.mockRestore();
    });

    it("Deve processar múltiplos lotes com diferentes quantidades de insumos", async () => {
        const mockBatch3 = {
            getId: jest.fn().mockReturnValue(3),
            setRawMaterialList: jest.fn(),
        } as any;

        const mockBatchList = [mockBatch1, mockBatch2, mockBatch3];
        const mockRawMaterialsList1 = [mockRawMaterialInBatch1, mockRawMaterialInBatch2];
        const mockRawMaterialsList2 = [mockRawMaterialInBatch1];
        const mockRawMaterialsList3: Array<RawMaterialInBatch> = [];

        mockBatch1.getId.mockReturnValue(1);
        mockBatch2.getId.mockReturnValue(2);

        batchData.getAllBatches.mockResolvedValue(mockBatchList);
        batchData.getRawMaterialListByBatchId
            .mockResolvedValueOnce(mockRawMaterialsList1)
            .mockResolvedValueOnce(mockRawMaterialsList2)
            .mockResolvedValueOnce(mockRawMaterialsList3);

        const result = await viewProductionBatchesUsecase.execute();

        expect(result).toEqual(mockBatchList);
        expect(batchData.getRawMaterialListByBatchId).toHaveBeenCalledTimes(3);
        expect(mockBatch1.setRawMaterialList).toHaveBeenCalledWith(mockRawMaterialsList1);
        expect(mockBatch2.setRawMaterialList).toHaveBeenCalledWith(mockRawMaterialsList2);
        expect(mockBatch3.setRawMaterialList).toHaveBeenCalledWith(mockRawMaterialsList3);
    });

    it("Deve falhar na busca do primeiro lote de insumos", async () => {
        const mockBatchList = [mockBatch1, mockBatch2];
        
        mockBatch1.getId.mockReturnValue(1);
        mockBatch2.getId.mockReturnValue(2);

        batchData.getAllBatches.mockResolvedValue(mockBatchList);
        batchData.getRawMaterialListByBatchId.mockRejectedValue(new Error("Database error"));

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        await expect(viewProductionBatchesUsecase.execute())
            .rejects.toThrow("Erro ao buscar os insumos do lote com ID 1!");

        expect(batchData.getRawMaterialListByBatchId).toHaveBeenCalledWith(1);
        expect(mockBatch1.setRawMaterialList).not.toHaveBeenCalled();
        expect(mockBatch2.setRawMaterialList).not.toHaveBeenCalled();
        
        consoleSpy.mockRestore();
    });

    it("Deve processar lote com ID como número", async () => {
        const mockBatchList = [mockBatch1];
        const mockRawMaterialsList = [mockRawMaterialInBatch1];

        mockBatch1.getId.mockReturnValue(123);
        batchData.getAllBatches.mockResolvedValue(mockBatchList);
        batchData.getRawMaterialListByBatchId.mockResolvedValue(mockRawMaterialsList);

        const result = await viewProductionBatchesUsecase.execute();

        expect(result).toEqual(mockBatchList);
        expect(batchData.getRawMaterialListByBatchId).toHaveBeenCalledWith(123);
        expect(mockBatch1.setRawMaterialList).toHaveBeenCalledWith(mockRawMaterialsList);
    });
});