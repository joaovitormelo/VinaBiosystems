import { RegisterProductionBatchUsecase } from "../registerProductionBatchUsecase";
import { DatabaseException } from "../../../../../core/exceptions/databaseException";
import { ValidationException } from "../../../../../core/exceptions/validationException";
import { InventoryDataContract } from "../../../../data/inventory/inventoryDataContract";
import { BatchDataContract } from "../../../../data/production/batchDataContract";
import { RawMaterialModel } from "../../../models/rawMaterialModel";
import { RawMaterialInBatch } from "../../../types/rawMaterialInBatch";

import moment from 'moment';

const BatchModel = {
    SITUATION: {
        EM_ABERTO: "open",
        FECHADO: "closed",
        CANCELADO: "canceled"
    }
};

describe("RegisterProductionBatchUsecase", () => {
    let registerProductionBatchUsecase: RegisterProductionBatchUsecase;
    let batchData: jest.Mocked<BatchDataContract>;
    let inventoryData: jest.Mocked<InventoryDataContract>;
    let mockBatch: any;
    let mockRawMaterial: jest.Mocked<RawMaterialModel>;
    let mockRawMaterialInBatch: jest.Mocked<RawMaterialInBatch>;

    beforeAll(() => {
        batchData = {
            createBatch: jest.fn(),
            addRawMaterialToBatch: jest.fn(),
        } as any;

        inventoryData = {
            removeRawMaterialQuantityFromInventory: jest.fn(),
            getRawMaterialById: jest.fn(),
        } as any;

        mockRawMaterial = {
            getId: jest.fn().mockReturnValue(1),
            getName: jest.fn().mockReturnValue("Test Raw Material"),
            getQuantity: jest.fn().mockReturnValue(100),
            getUnit: jest.fn().mockReturnValue("kg"),
            getMinQuantity: jest.fn().mockReturnValue(10),
            setId: jest.fn(),
            setName: jest.fn(),
            setQuantity: jest.fn(),
            setUnit: jest.fn(),
            setMinQuantity: jest.fn(),
            toJson: jest.fn(),
        } as any;

        mockRawMaterialInBatch = {
            getRawMaterialId: jest.fn().mockReturnValue(1),
            getQuantity: jest.fn().mockReturnValue(50),
            getUnity: jest.fn().mockReturnValue('litros'),
            getMinQuantity: jest.fn().mockReturnValue(15),
            rawMaterialId: 1,
            quantity: 50,
            setRawMaterialId: jest.fn(),
            setQuantity: jest.fn(),
            toJson: jest.fn(),
        } as any;

        mockBatch = {
            getLabel: jest.fn(),
            getStartDate: jest.fn(),
            getEndDate: jest.fn(),
            getRawMaterialList: jest.fn(),
            setSituation: jest.fn(),
            setId: jest.fn(),
            getId: jest.fn(),
        } as any;

        registerProductionBatchUsecase = new RegisterProductionBatchUsecase(
            batchData,
            inventoryData
        );
        console.error = jest.fn(); // Omite logs de erro durante os testes
    });

    beforeEach(() => {
        jest.clearAllMocks();
        
        mockBatch.getLabel.mockReturnValue("Test Batch");
        mockBatch.getStartDate.mockReturnValue(moment());
        mockBatch.getEndDate.mockReturnValue(moment().add(1, 'day'));
        mockBatch.getRawMaterialList.mockReturnValue([mockRawMaterialInBatch]);
        mockBatch.getId.mockReturnValue(123);
        
        batchData.createBatch.mockResolvedValue(123);
        inventoryData.getRawMaterialById.mockResolvedValue(mockRawMaterial);
        mockRawMaterial.getQuantity.mockReturnValue(100);
    });

    it("Deve executar com sucesso quando os dados são válidos", async () => {
        
        await registerProductionBatchUsecase.execute(mockBatch);

        expect(mockBatch.setSituation).toHaveBeenCalledWith(BatchModel.SITUATION.EM_ABERTO);
        expect(batchData.createBatch).toHaveBeenCalledWith(mockBatch);
        expect(mockBatch.setId).toHaveBeenCalledWith(123);
        expect(batchData.addRawMaterialToBatch).toHaveBeenCalledWith(123, 1, 50);
        expect(inventoryData.removeRawMaterialQuantityFromInventory).toHaveBeenCalledWith(1, 50);
    });

    describe("Validation Tests", () => {
        it("Deve lançar ValidationException quando label está vazio", async () => {
            mockBatch.getLabel.mockReturnValue("");

            await expect(registerProductionBatchUsecase.execute(mockBatch))
                .rejects.toThrow(ValidationException);
            
            expect(batchData.createBatch).not.toHaveBeenCalled();
        });

        it("Deve lançar ValidationException quando label é null", async () => {
            mockBatch.getLabel.mockReturnValue(null);

            await expect(registerProductionBatchUsecase.execute(mockBatch))
                .rejects.toThrow(ValidationException);
            
            expect(batchData.createBatch).not.toHaveBeenCalled();
        });

        it("Deve lançar ValidationException quando label é undefined", async () => {
            mockBatch.getLabel.mockReturnValue(undefined);

            await expect(registerProductionBatchUsecase.execute(mockBatch))
                .rejects.toThrow(ValidationException);
            
            expect(batchData.createBatch).not.toHaveBeenCalled();
        });

        it("Deve lançar ValidationException quando startDate é null", async () => {
            mockBatch.getStartDate.mockReturnValue(null);

            await expect(registerProductionBatchUsecase.execute(mockBatch))
                .rejects.toThrow(ValidationException);
            
            expect(batchData.createBatch).not.toHaveBeenCalled();
        });

        it("Deve lançar ValidationException quando startDate é undefined", async () => {
            mockBatch.getStartDate.mockReturnValue(undefined);

            await expect(registerProductionBatchUsecase.execute(mockBatch))
                .rejects.toThrow(ValidationException);
            
            expect(batchData.createBatch).not.toHaveBeenCalled();
        });

        it("Deve lançar ValidationException quando endDate é null", async () => {
            mockBatch.getEndDate.mockReturnValue(null);

            await expect(registerProductionBatchUsecase.execute(mockBatch))
                .rejects.toThrow(ValidationException);
            
            expect(batchData.createBatch).not.toHaveBeenCalled();
        });

        it("Deve lançar ValidationException quando endDate é undefined", async () => {
            mockBatch.getEndDate.mockReturnValue(undefined);

            await expect(registerProductionBatchUsecase.execute(mockBatch))
                .rejects.toThrow(ValidationException);
            
            expect(batchData.createBatch).not.toHaveBeenCalled();
        });

        it("Deve lançar ValidationException quando startDate é posterior a endDate", async () => {
            const startDate = moment();
            const endDate = moment().subtract(1, 'day');
            
            mockBatch.getStartDate.mockReturnValue(startDate);
            mockBatch.getEndDate.mockReturnValue(endDate);

            await expect(registerProductionBatchUsecase.execute(mockBatch))
                .rejects.toThrow(ValidationException);
            
            expect(batchData.createBatch).not.toHaveBeenCalled();
        });

        it("Deve lançar ValidationException quando raw material não existe", async () => {
            inventoryData.getRawMaterialById.mockResolvedValue(undefined);

            await expect(registerProductionBatchUsecase.execute(mockBatch))
                .rejects.toThrow(ValidationException);
            
            expect(batchData.createBatch).not.toHaveBeenCalled();
        });

        it("Deve lançar ValidationException quando quantidade em estoque é insuficiente", async () => {
            mockRawMaterial.getQuantity.mockReturnValue(30); // Menor que a quantidade solicitada (50)

            await expect(registerProductionBatchUsecase.execute(mockBatch))
                .rejects.toThrow(ValidationException);
            
            expect(batchData.createBatch).not.toHaveBeenCalled();
        });
    });

    describe("Database Exception Tests", () => {
        it("Deve lançar DatabaseException quando createBatch falha", async () => {
            batchData.createBatch.mockRejectedValue(new Error("Database error"));
            inventoryData.getRawMaterialById.mockResolvedValue(mockRawMaterial);

            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

            await expect(registerProductionBatchUsecase.execute(mockBatch))
                .rejects.toThrow(DatabaseException);
            
            expect(consoleSpy).toHaveBeenCalled();
            consoleSpy.mockRestore();
        });

        it("Deve lançar DatabaseException quando getRawMaterialById falha", async () => {
            inventoryData.getRawMaterialById.mockRejectedValue(new Error("Database error"));
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

            await expect(registerProductionBatchUsecase.execute(mockBatch))
                .rejects.toThrow(DatabaseException);
            
            expect(consoleSpy).toHaveBeenCalled();
            consoleSpy.mockRestore();
        });

        it("Deve lançar DatabaseException quando addRawMaterialToBatch falha", async () => {
            batchData.addRawMaterialToBatch.mockRejectedValue(new Error("Database error"));

            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

            await expect(registerProductionBatchUsecase.execute(mockBatch))
                .rejects.toThrow(DatabaseException);
            
            expect(consoleSpy).toHaveBeenCalled();
            consoleSpy.mockRestore();
        });

        it("Deve lançar DatabaseException quando removeRawMaterialQuantityFromInventory falha", async () => {
            inventoryData.removeRawMaterialQuantityFromInventory.mockRejectedValue(new Error("Database error"));

            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

            await expect(registerProductionBatchUsecase.execute(mockBatch))
                .rejects.toThrow(DatabaseException);
            
            expect(consoleSpy).toHaveBeenCalled();
            consoleSpy.mockRestore();
        });
    });
});