import { FinishProductionBatchUsecase } from "../finishProductionBatchUsecase";
import { DatabaseException } from "../../../../../core/exceptions/databaseException";
import { BatchDataContract } from "../../../../data/production/batchDataContract";
import { BatchModel } from "../../../models/batchModel";

describe("FinishProductionBatchUsecase", () => {
    let finishProductionBatchUsecase: FinishProductionBatchUsecase;
    let batchData: jest.Mocked<BatchDataContract>;

    beforeAll(() => {
        batchData = {
            updateSituationField: jest.fn(),
        } as any;

        finishProductionBatchUsecase = new FinishProductionBatchUsecase(
            batchData
        );
        console.error = jest.fn(); // Omite logs de erro durante os testes
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Deve finalizar o lote de produção com sucesso quando o ID é válido", async () => {
        const batchId = 1;
        batchData.updateSituationField.mockResolvedValue(undefined);

        await finishProductionBatchUsecase.execute(batchId);

        expect(batchData.updateSituationField).toHaveBeenCalledWith(batchId, BatchModel.SITUATION.FECHADO);
        expect(batchData.updateSituationField).toHaveBeenCalledTimes(1);
    });

    it("Deve lançar Error quando o ID do lote não está definido", async () => {
        const batchId = 0;

        await expect(finishProductionBatchUsecase.execute(batchId))
            .rejects.toThrow("ID do lote de produção é obrigatório.");
        
        expect(batchData.updateSituationField).not.toHaveBeenCalled();
    });

    it("Deve lançar Error quando o ID do lote é null", async () => {
        const batchId = null as any;

        await expect(finishProductionBatchUsecase.execute(batchId))
            .rejects.toThrow("ID do lote de produção é obrigatório.");
        
        expect(batchData.updateSituationField).not.toHaveBeenCalled();
    });

    it("Deve lançar Error quando o ID do lote é undefined", async () => {
        const batchId = undefined as any;

        await expect(finishProductionBatchUsecase.execute(batchId))
            .rejects.toThrow("ID do lote de produção é obrigatório.");
        
        expect(batchData.updateSituationField).not.toHaveBeenCalled();
    });

    it("Deve lançar Error quando o ID do lote é NaN", async () => {
        const batchId = NaN;

        await expect(finishProductionBatchUsecase.execute(batchId))
            .rejects.toThrow("ID do lote de produção é obrigatório.");
        
        expect(batchData.updateSituationField).not.toHaveBeenCalled();
    });

    it("Deve lançar DatabaseException quando não é possível atualizar a situação do lote", async () => {
        const batchId = 1;
        batchData.updateSituationField.mockRejectedValue(new Error("Database error"));

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        await expect(finishProductionBatchUsecase.execute(batchId))
            .rejects.toThrow(DatabaseException);
        
        expect(batchData.updateSituationField).toHaveBeenCalledWith(batchId, BatchModel.SITUATION.FECHADO);
        expect(consoleSpy).toHaveBeenCalled();

        consoleSpy.mockRestore();
    });

    it("Deve lançar DatabaseException com a mensagem correta quando há erro de banco", async () => {
        const batchId = 1;
        batchData.updateSituationField.mockRejectedValue(new Error("Connection timeout"));

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        await expect(finishProductionBatchUsecase.execute(batchId))
            .rejects.toThrow("Não foi possível finalizar o lote de produção!");
        
        expect(batchData.updateSituationField).toHaveBeenCalledWith(batchId, BatchModel.SITUATION.FECHADO);
        expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));

        consoleSpy.mockRestore();
    });

    it("Deve processar corretamente diferentes IDs válidos", async () => {
        const testIds = [1, 2, 99, 1000];
        batchData.updateSituationField.mockResolvedValue(undefined);

        for (const id of testIds) {
            await finishProductionBatchUsecase.execute(id);
            expect(batchData.updateSituationField).toHaveBeenCalledWith(id, BatchModel.SITUATION.FECHADO);
        }

        expect(batchData.updateSituationField).toHaveBeenCalledTimes(testIds.length);
    });

    it("Deve lançar DatabaseException quando updateSituationField rejeita com objeto de erro personalizado", async () => {
        const batchId = 1;
        const customError = { message: "Custom database error", code: 'DB_ERROR' };
        batchData.updateSituationField.mockRejectedValue(customError);

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        await expect(finishProductionBatchUsecase.execute(batchId))
            .rejects.toThrow(DatabaseException);
        
        expect(consoleSpy).toHaveBeenCalledWith(customError);

        consoleSpy.mockRestore();
    });

    it("Deve garantir que a situação FECHADO seja usada corretamente", async () => {
        const batchId = 5;
        batchData.updateSituationField.mockResolvedValue(undefined);

        await finishProductionBatchUsecase.execute(batchId);

        expect(batchData.updateSituationField).toHaveBeenCalledWith(
            expect.any(Number), 
            BatchModel.SITUATION.FECHADO
        );
    });

    it("Deve falhar corretamente quando updateSituationField lança erro específico do banco", async () => {
        const batchId = 1;
        const databaseError = new Error("Foreign key constraint violation");
        batchData.updateSituationField.mockRejectedValue(databaseError);

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        const result = finishProductionBatchUsecase.execute(batchId);

        await expect(result).rejects.toBeInstanceOf(DatabaseException);
        await expect(result).rejects.toThrow("Não foi possível finalizar o lote de produção!");
        
        expect(consoleSpy).toHaveBeenCalledWith(databaseError);

        consoleSpy.mockRestore();
    });
});