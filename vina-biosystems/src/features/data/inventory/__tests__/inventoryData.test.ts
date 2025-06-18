import { RawMaterialModel } from "../../../domain/models/rawMaterialModel";
import { InventoryData } from "../../../data/inventory/inventoryData";
import { BackendContract, ROUTES } from "../../../data/utils/backendContract";

describe('InventoryData', () => {
    let inventoryData: InventoryData;
    let backend: jest.Mocked<BackendContract>;
    const mockRawMaterial = RawMaterialModel.getMock();
    const mockRawMaterialJson = mockRawMaterial.toJson();
    const mockInventory = [mockRawMaterialJson, {...mockRawMaterialJson, id: 2, name: "Material 2"}];

    beforeEach(() => {
        // Criamos um mock completo do BackendContract
        backend = {
            fetchData: jest.fn(),
            putData: jest.fn(),
            postData: jest.fn(),
            deleteData: jest.fn(),
        };
        
        inventoryData = new InventoryData(backend);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('removeRawMaterialQuantityFromInventory', () => {
        it('deve chamar putData com a rota e parâmetros corretos', async () => {
            const rawMaterialId = 1;
            const quantityToRemove = 5;
            
            await inventoryData.removeRawMaterialQuantityFromInventory(rawMaterialId, quantityToRemove);
            
            expect(backend.putData).toHaveBeenCalledWith(
                ROUTES.RAW_MATERIAL.REMOVE_RAW_MATERIAL_QUANTITY_FROM_INVENTORY,
                { id: rawMaterialId, quantityToRemove }
            );
        });
    });

    describe('isRawMaterialBeingUsedInABatch', () => {
        it('deve chamar fetchData com a rota e parâmetros corretos', async () => {
            const rawMaterialId = 1;
            backend.fetchData.mockResolvedValueOnce({ isBeingUsed: true });
            
            await inventoryData.isRawMaterialBeingUsedInABatch(rawMaterialId);
            
            expect(backend.fetchData).toHaveBeenCalledWith(
                ROUTES.RAW_MATERIAL.IS_RAW_MATERIAL_BEING_USED_IN_BATCH,
                { id: rawMaterialId }
            );
        });

        it('deve retornar true quando isBeingUsed for true', async () => {
            backend.fetchData.mockResolvedValueOnce({ isBeingUsed: true });
            
            const result = await inventoryData.isRawMaterialBeingUsedInABatch(1);
            expect(result).toBe(true);
        });

        it('deve retornar false quando isBeingUsed for false', async () => {
            backend.fetchData.mockResolvedValueOnce({ isBeingUsed: false });
            
            const result = await inventoryData.isRawMaterialBeingUsedInABatch(1);
            expect(result).toBe(false);
        });

        it('deve retornar false quando o backend retornar null', async () => {
            backend.fetchData.mockResolvedValueOnce(null);
            
            const result = await inventoryData.isRawMaterialBeingUsedInABatch(1);
            expect(result).toBe(false);
        });
    });

    describe('createRawMaterial', () => {
        it('deve chamar postData com a rota e dados corretos', async () => {
            backend.postData.mockResolvedValueOnce(mockRawMaterialJson);
            
            await inventoryData.createRawMaterial(mockRawMaterial);
            
            expect(backend.postData).toHaveBeenCalledWith(
                ROUTES.RAW_MATERIAL.INSERT_RAW_MATERIAL,
                mockRawMaterialJson
            );
        });

        it('deve retornar um RawMaterialModel criado', async () => {
            backend.postData.mockResolvedValueOnce(mockRawMaterialJson);
            
            const result = await inventoryData.createRawMaterial(mockRawMaterial);
            expect(result).toBeInstanceOf(RawMaterialModel);
            expect(result.toJson()).toEqual(mockRawMaterialJson);
        });
    });

    describe('fetchInventory', () => {
        it('deve chamar fetchData com a rota correta', async () => {
            backend.fetchData.mockResolvedValueOnce(mockInventory);
            
            await inventoryData.fetchInventory();
            
            expect(backend.fetchData).toHaveBeenCalledWith(
                ROUTES.RAW_MATERIAL.SELECT_RAW_MATERIALS,
                null
            );
        });

        it('deve retornar um array de RawMaterialModel', async () => {
            backend.fetchData.mockResolvedValueOnce(mockInventory);
            
            const result = await inventoryData.fetchInventory();
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(2);
            result.forEach(item => {
                expect(item).toBeInstanceOf(RawMaterialModel);
            });
        });

        it('deve retornar array vazio quando o backend retornar null', async () => {
            backend.fetchData.mockResolvedValueOnce(null);
            
            const result = await inventoryData.fetchInventory();
            expect(result).toEqual([]);
        });

        it('deve retornar array vazio quando o backend retornar um valor não-array', async () => {
            backend.fetchData.mockResolvedValueOnce({} as any);
            
            const result = await inventoryData.fetchInventory();
            expect(result).toEqual([]);
        });
    });

    describe('updateRawMaterial', () => {
        it('deve chamar putData com a rota e dados corretos', async () => {
            await inventoryData.updateRawMaterial(mockRawMaterial);
            
            expect(backend.putData).toHaveBeenCalledWith(
                ROUTES.RAW_MATERIAL.UPDATE_RAW_MATERIAL,
                mockRawMaterialJson
            );
        });
    });

    describe('removeRawMaterial', () => {
        it('deve chamar deleteData com a rota e parâmetros corretos', async () => {
            const rawMaterialId = 1;
            
            await inventoryData.removeRawMaterial(rawMaterialId);
            
            expect(backend.deleteData).toHaveBeenCalledWith(
                ROUTES.RAW_MATERIAL.DELETE_RAW_MATERIAL,
                { id: rawMaterialId }
            );
        });
    });

    describe('getRawMaterialById', () => {
        it('deve chamar fetchData com a rota e parâmetros corretos', async () => {
            const rawMaterialId = 1;
            backend.fetchData.mockResolvedValueOnce(mockRawMaterialJson);
            
            await inventoryData.getRawMaterialById(rawMaterialId);
            
            expect(backend.fetchData).toHaveBeenCalledWith(
                ROUTES.RAW_MATERIAL.SELECT_RAW_MATERIAL_BY_ID,
                { id: rawMaterialId }
            );
        });

        it('deve retornar um RawMaterialModel quando encontrado', async () => {
            backend.fetchData.mockResolvedValueOnce(mockRawMaterialJson);
            
            const result = await inventoryData.getRawMaterialById(1);
            expect(result).toBeInstanceOf(RawMaterialModel);
            expect(result?.toJson()).toEqual(mockRawMaterialJson);
        });

        it('deve retornar undefined quando não encontrado', async () => {
            backend.fetchData.mockResolvedValueOnce(null);
            
            const result = await inventoryData.getRawMaterialById(1);
            expect(result).toBeUndefined();
        });
    });

    describe('getRawMaterialByName', () => {
        it('deve chamar fetchData com a rota e parâmetros corretos', async () => {
            const name = "Test Material";
            backend.fetchData.mockResolvedValueOnce(mockRawMaterialJson);
            
            await inventoryData.getRawMaterialByName(name);
            
            expect(backend.fetchData).toHaveBeenCalledWith(
                ROUTES.RAW_MATERIAL.SELECT_RAW_MATERIAL_BY_NAME,
                { name }
            );
        });

        it('deve retornar um RawMaterialModel quando encontrado', async () => {
            backend.fetchData.mockResolvedValueOnce(mockRawMaterialJson);
            
            const result = await inventoryData.getRawMaterialByName("Test Material");
            expect(result).toBeInstanceOf(RawMaterialModel);
            expect(result?.toJson()).toEqual(mockRawMaterialJson);
        });

        it('deve retornar undefined quando não encontrado', async () => {
            backend.fetchData.mockResolvedValueOnce(null);
            
            const result = await inventoryData.getRawMaterialByName("Test Material");
            expect(result).toBeUndefined();
        });
    });
});