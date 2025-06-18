import { BatchModel } from "../../../domain/models/batchModel";
import { RawMaterialInBatch } from "../../../domain/types/rawMaterialInBatch";
import { BatchData } from "../../../data/production/batchData";
import { BackendContract, ROUTES } from "../../../data/utils/backendContract";

describe('BatchData', () => {
    let batchData: BatchData;
    let backend: jest.Mocked<BackendContract>;
    const mockBatch = BatchModel.getMock();
    const mockBatchJson = mockBatch.toJSON();
    const mockBatches = [mockBatchJson, {...mockBatchJson, id: 2, name: "Batch 2"}];
    const mockRawMaterialInBatch = {
        id: 1,
        rawMaterialId: 1,
        batchId: 1,
        quantity: 10,
        name: "Material 1",
        unit: "kg"
    };
    const mockRawMaterialsInBatch = [mockRawMaterialInBatch, {...mockRawMaterialInBatch, id: 2}];

    beforeEach(() => {
        // Mock do BackendContract
        backend = {
            fetchData: jest.fn(),
            putData: jest.fn(),
            postData: jest.fn(),
            deleteData: jest.fn(),
        };
        
        batchData = new BatchData(backend);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getRawMaterialListByBatchId', () => {
        it('Deve retornar array vazio quando o backend retornar null', async () => {
            backend.fetchData.mockResolvedValueOnce(null);
            const result = await batchData.getRawMaterialListByBatchId(1);
            expect(result).toEqual([]);
        });

        it('Deve retornar array vazio quando o backend retornar undefined', async () => {
            backend.fetchData.mockResolvedValueOnce(undefined);
            const result = await batchData.getRawMaterialListByBatchId(1);
            expect(result).toEqual([]);
        });

        it('Deve retornar array vazio quando o backend retornar um objeto não-array', async () => {
            backend.fetchData.mockResolvedValueOnce({} as any);
            const result = await batchData.getRawMaterialListByBatchId(1);
            expect(result).toEqual([]);
        });

        it('Deve retornar array de RawMaterialInBatch quando o backend retornar dados válidos', async () => {
            backend.fetchData.mockResolvedValueOnce(mockRawMaterialsInBatch);
            
            const result = await batchData.getRawMaterialListByBatchId(1);
            
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(2);
            result.forEach(item => {
                expect(item).toBeInstanceOf(RawMaterialInBatch);
            });
        });
    });

    describe('addRawMaterialToBatch', () => {
        it('Deve chamar putData com a rota e parâmetros corretos', async () => {
            const batchId = 1;
            const rawMaterialId = 1;
            const quantity = 10;
            
            await batchData.addRawMaterialToBatch(batchId, rawMaterialId, quantity);
            
            expect(backend.putData).toHaveBeenCalledWith(
                ROUTES.BATCH.ADD_RAW_MATERIAL_TO_BATCH,
                { batchId, rawMaterialId, quantity }
            );
        });
    });

    describe('updateSituationField', () => {
        it('Deve chamar putData com a rota e parâmetros corretos', async () => {
            const batchId = 1;
            const situation = "completed";
            
            await batchData.updateSituationField(batchId, situation);
            
            expect(backend.putData).toHaveBeenCalledWith(
                ROUTES.BATCH.UPDATE_BATCH_SITUATION,
                { id: batchId, situation }
            );
        });
    });

    describe('createBatch', () => {
        it('Deve chamar postData com a rota e dados corretos', async () => {
            backend.postData.mockResolvedValueOnce({ id: 1 });
            
            await batchData.createBatch(mockBatch);
            
            expect(backend.postData).toHaveBeenCalledWith(
                ROUTES.BATCH.INSERT_BATCH,
                mockBatchJson
            );
        });

        it('Deve retornar o ID do batch criado', async () => {
            const newId = 5;
            backend.postData.mockResolvedValueOnce({ id: newId });
            
            const result = await batchData.createBatch(mockBatch);
            expect(result).toBe(newId);
        });
    });

    describe('getAllBatches', () => {
        it('Deve chamar fetchData com a rota correta', async () => {
            backend.fetchData.mockResolvedValueOnce(mockBatches);
            
            await batchData.getAllBatches();
            
            expect(backend.fetchData).toHaveBeenCalledWith(
                ROUTES.BATCH.SELECT_BATCHES,
                null
            );
        });

        it('Deve retornar um array de BatchModel', async () => {
            backend.fetchData.mockResolvedValueOnce(mockBatches);
            
            const result = await batchData.getAllBatches();
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(2);
            result.forEach(item => {
                expect(item).toBeInstanceOf(BatchModel);
            });
        });

        it('Deve retornar array vazio quando o backend retornar null', async () => {
            backend.fetchData.mockResolvedValueOnce(null);
            
            const result = await batchData.getAllBatches();
            expect(result).toEqual([]);
        });

        it('Deve retornar array vazio quando o backend retornar um valor não-array', async () => {
            backend.fetchData.mockResolvedValueOnce({} as any);
            
            const result = await batchData.getAllBatches();
            expect(result).toEqual([]);
        });
    });
});