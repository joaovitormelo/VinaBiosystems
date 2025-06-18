import { CancelProductionBatchUsecase } from "../cancelProductionBatchUsecase";
import { DatabaseException } from "../../../../../core/exceptions/databaseException";
import { UsecaseException } from "../../../../../core/exceptions/usecaseException";
import { InventoryDataContract } from "../../../../data/inventory/inventoryDataContract";
import { BatchDataContract } from "../../../../data/production/batchDataContract";
import { SamplingResultDataContract } from "../../../../data/production/samplingResultDataContract";
import { BatchModel } from "../../../models/batchModel";
import { RawMaterialModel } from "../../../models/rawMaterialModel";
import { RawMaterialInBatch } from "../../../types/rawMaterialInBatch";


describe("CancelProductionBatchUsecase", () => {
    let cancelProductionBatchUsecase: CancelProductionBatchUsecase;
    let batchData: jest.Mocked<BatchDataContract>;
    let samplingResultData: jest.Mocked<SamplingResultDataContract>;
    let inventoryData: jest.Mocked<InventoryDataContract>;
    let mockBatch: jest.Mocked<BatchModel>;
    let mockRawMaterial: jest.Mocked<RawMaterialModel>;
    let mockRawMaterialInBatch: jest.Mocked<RawMaterialInBatch>;

    beforeAll(() => {
        batchData = {
            updateSituationField: jest.fn(),
        } as any;

        samplingResultData = {
            getSamplingResultsByBatchId: jest.fn(),
        } as any;

        inventoryData = {
            getRawMaterialById: jest.fn(),
            updateRawMaterial: jest.fn(),
        } as any;

        mockBatch = {
            getId: jest.fn(),
            getSituation: jest.fn(),
            getRawMaterialList: jest.fn(),
        } as any;

        mockRawMaterial = {
            getName: jest.fn(),
            getQuantity: jest.fn(),
            setQuantity: jest.fn(),
        } as any;

        mockRawMaterialInBatch = {
            getRawMaterialId: jest.fn(),
            getQuantity: jest.fn(),
        } as any;

        cancelProductionBatchUsecase = new CancelProductionBatchUsecase(
            batchData,
            samplingResultData,
            inventoryData
        );
        console.error = jest.fn(); // Omite logs de erro durante os testes
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Deve cancelar o lote de produção com sucesso quando todas as condições são atendidas", async () => {
        mockBatch.getId.mockReturnValue(1);
        mockBatch.getSituation.mockReturnValue(BatchModel.SITUATION.EM_ABERTO);
        mockBatch.getRawMaterialList.mockReturnValue([mockRawMaterialInBatch]);
        
        samplingResultData.getSamplingResultsByBatchId.mockResolvedValue([]);
        
        mockRawMaterialInBatch.getRawMaterialId.mockReturnValue(10);
        mockRawMaterialInBatch.getQuantity.mockReturnValue(5);
        
        mockRawMaterial.getQuantity.mockReturnValue(20);
        inventoryData.getRawMaterialById.mockResolvedValue(mockRawMaterial);
        inventoryData.updateRawMaterial.mockResolvedValue(undefined);
        
        batchData.updateSituationField.mockResolvedValue(undefined);

        await cancelProductionBatchUsecase.execute(mockBatch);

        expect(samplingResultData.getSamplingResultsByBatchId).toHaveBeenCalledWith(1);
        expect(inventoryData.getRawMaterialById).toHaveBeenCalledWith(10);
        expect(mockRawMaterial.setQuantity).toHaveBeenCalledWith(25); // 20 + 5
        expect(inventoryData.updateRawMaterial).toHaveBeenCalledWith(mockRawMaterial);
        expect(batchData.updateSituationField).toHaveBeenCalledWith(1, BatchModel.SITUATION.CANCELADO);
    });

    it("Deve lançar Error quando o ID do lote não está definido", async () => {
        mockBatch.getId.mockReturnValue(null);

        await expect(cancelProductionBatchUsecase.execute(mockBatch))
            .rejects.toThrow("ID do lote de produção é obrigatório.");
        
        expect(samplingResultData.getSamplingResultsByBatchId).not.toHaveBeenCalled();
        expect(batchData.updateSituationField).not.toHaveBeenCalled();
    });

    it("Deve lançar UsecaseException quando o lote não está em aberto", async () => {
        mockBatch.getId.mockReturnValue(1);
        mockBatch.getSituation.mockReturnValue(BatchModel.SITUATION.CANCELADO);

        await expect(cancelProductionBatchUsecase.execute(mockBatch))
            .rejects.toThrow(UsecaseException);
        
        expect(samplingResultData.getSamplingResultsByBatchId).not.toHaveBeenCalled();
        expect(batchData.updateSituationField).not.toHaveBeenCalled();
    });

    it("Deve lançar DatabaseException quando não é possível atualizar a situação do lote", async () => {
        mockBatch.getId.mockReturnValue(1);
        mockBatch.getSituation.mockReturnValue(BatchModel.SITUATION.EM_ABERTO);
        mockBatch.getRawMaterialList.mockReturnValue([]);
        
        samplingResultData.getSamplingResultsByBatchId.mockResolvedValue([]);
        batchData.updateSituationField.mockRejectedValue(new Error("Database error"));

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        await expect(cancelProductionBatchUsecase.execute(mockBatch))
            .rejects.toThrow(DatabaseException);
        
        expect(batchData.updateSituationField).toHaveBeenCalledWith(1, BatchModel.SITUATION.CANCELADO);
        expect(consoleSpy).toHaveBeenCalled();

        consoleSpy.mockRestore();
    });

    it("Deve lançar DatabaseException quando não é possível encontrar o insumo", async () => {
        mockBatch.getId.mockReturnValue(1);
        mockBatch.getSituation.mockReturnValue(BatchModel.SITUATION.EM_ABERTO);
        mockBatch.getRawMaterialList.mockReturnValue([mockRawMaterialInBatch]);
        
        samplingResultData.getSamplingResultsByBatchId.mockResolvedValue([]);
        mockRawMaterialInBatch.getRawMaterialId.mockReturnValue(10);
        inventoryData.getRawMaterialById.mockResolvedValue(undefined);

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        await expect(cancelProductionBatchUsecase.execute(mockBatch))
            .rejects.toThrow(DatabaseException);
        
        expect(inventoryData.getRawMaterialById).toHaveBeenCalledWith(10);
        expect(consoleSpy).toHaveBeenCalled();

        consoleSpy.mockRestore();
    });

    it("Deve lançar DatabaseException quando getRawMaterialById falha", async () => {
        mockBatch.getId.mockReturnValue(1);
        mockBatch.getSituation.mockReturnValue(BatchModel.SITUATION.EM_ABERTO);
        mockBatch.getRawMaterialList.mockReturnValue([mockRawMaterialInBatch]);
        
        samplingResultData.getSamplingResultsByBatchId.mockResolvedValue([]);
        mockRawMaterialInBatch.getRawMaterialId.mockReturnValue(10);
        inventoryData.getRawMaterialById.mockRejectedValue(new Error("Database error"));

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        await expect(cancelProductionBatchUsecase.execute(mockBatch))
            .rejects.toThrow(DatabaseException);
        
        expect(inventoryData.getRawMaterialById).toHaveBeenCalledWith(10);
        expect(consoleSpy).toHaveBeenCalled();

        consoleSpy.mockRestore();
    });

    it("Deve lançar DatabaseException quando não é possível devolver o insumo ao estoque", async () => {
        mockBatch.getId.mockReturnValue(1);
        mockBatch.getSituation.mockReturnValue(BatchModel.SITUATION.EM_ABERTO);
        mockBatch.getRawMaterialList.mockReturnValue([mockRawMaterialInBatch]);
        
        samplingResultData.getSamplingResultsByBatchId.mockResolvedValue([]);
        
        mockRawMaterialInBatch.getRawMaterialId.mockReturnValue(10);
        mockRawMaterialInBatch.getQuantity.mockReturnValue(5);
        
        mockRawMaterial.getName.mockReturnValue("Insumo Teste");
        mockRawMaterial.getQuantity.mockReturnValue(20);
        inventoryData.getRawMaterialById.mockResolvedValue(mockRawMaterial);
        inventoryData.updateRawMaterial.mockRejectedValue(new Error("Database error"));

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        await expect(cancelProductionBatchUsecase.execute(mockBatch))
            .rejects.toThrow(DatabaseException);
        
        expect(inventoryData.updateRawMaterial).toHaveBeenCalledWith(mockRawMaterial);
        expect(consoleSpy).toHaveBeenCalled();

        consoleSpy.mockRestore();
    });

    it("Deve processar múltiplos insumos corretamente", async () => {
        const mockRawMaterialInBatch2 = {
            getRawMaterialId: jest.fn().mockReturnValue(20),
            getQuantity: jest.fn().mockReturnValue(10),
        } as any;

        const mockRawMaterial2 = {
            getName: jest.fn().mockReturnValue("Insumo 2"),
            getQuantity: jest.fn().mockReturnValue(30),
            setQuantity: jest.fn(),
        } as any;

        mockBatch.getId.mockReturnValue(1);
        mockBatch.getSituation.mockReturnValue(BatchModel.SITUATION.EM_ABERTO);
        mockBatch.getRawMaterialList.mockReturnValue([mockRawMaterialInBatch, mockRawMaterialInBatch2]);
        
        samplingResultData.getSamplingResultsByBatchId.mockResolvedValue([]);
        
        mockRawMaterialInBatch.getRawMaterialId.mockReturnValue(10);
        mockRawMaterialInBatch.getQuantity.mockReturnValue(5);
        mockRawMaterial.getQuantity.mockReturnValue(20);
        
        inventoryData.getRawMaterialById
            .mockResolvedValueOnce(mockRawMaterial)
            .mockResolvedValueOnce(mockRawMaterial2);
        
        inventoryData.updateRawMaterial.mockResolvedValue(undefined);
        batchData.updateSituationField.mockResolvedValue(undefined);

        await cancelProductionBatchUsecase.execute(mockBatch);

        expect(inventoryData.getRawMaterialById).toHaveBeenCalledTimes(2);
        expect(inventoryData.getRawMaterialById).toHaveBeenNthCalledWith(1, 10);
        expect(inventoryData.getRawMaterialById).toHaveBeenNthCalledWith(2, 20);
        
        expect(mockRawMaterial.setQuantity).toHaveBeenCalledWith(25); // 20 + 5
        expect(mockRawMaterial2.setQuantity).toHaveBeenCalledWith(40); // 30 + 10
        
        expect(inventoryData.updateRawMaterial).toHaveBeenCalledTimes(2);
        expect(batchData.updateSituationField).toHaveBeenCalledWith(1, BatchModel.SITUATION.CANCELADO);
    });

    it("Deve funcionar corretamente quando não há insumos na lista", async () => {
        mockBatch.getId.mockReturnValue(1);
        mockBatch.getSituation.mockReturnValue(BatchModel.SITUATION.EM_ABERTO);
        mockBatch.getRawMaterialList.mockReturnValue([]);
        
        samplingResultData.getSamplingResultsByBatchId.mockResolvedValue([]);
        batchData.updateSituationField.mockResolvedValue(undefined);

        await cancelProductionBatchUsecase.execute(mockBatch);

        expect(inventoryData.getRawMaterialById).not.toHaveBeenCalled();
        expect(inventoryData.updateRawMaterial).not.toHaveBeenCalled();
        expect(batchData.updateSituationField).toHaveBeenCalledWith(1, BatchModel.SITUATION.CANCELADO);
    });
});