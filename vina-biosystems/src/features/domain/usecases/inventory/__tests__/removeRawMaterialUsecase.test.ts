import { RemoveRawMaterialUsecase } from '../removeRawMaterialUsecase';
import { InventoryDataMock } from '../../../../data/inventory/inventoryDataMock';
import { RawMaterialModel } from '../../../models/rawMaterialModel';
import { ValidationException } from '../../../../../core/exceptions/validationException';
import { DatabaseException } from '../../../../../core/exceptions/databaseException';
import { UsecaseException } from '../../../../../core/exceptions/usecaseException';

describe('RemoveRawMaterialUsecase', () => {
  let inventoryData: InventoryDataMock;
  let usecase: RemoveRawMaterialUsecase;
  let rawMaterialId: number;

  beforeAll(() => {
    console.error = jest.fn(); // Omite logs de erro durante os testes
  });

  beforeEach(() => {
    inventoryData = new InventoryDataMock();
    usecase = new RemoveRawMaterialUsecase(inventoryData);
    rawMaterialId = 1;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve chamar removeRawMaterial com o parâmetro correto', async () => {
    const spy = jest.spyOn(inventoryData, 'removeRawMaterial');
    jest.spyOn(inventoryData, 'isRawMaterialBeingUsedInABatch').mockResolvedValue(false);
    await usecase.execute(rawMaterialId);
    expect(spy).toHaveBeenCalledWith(rawMaterialId);
  });

  it('deve lançar DatabaseException se isRawMaterialBeingUsedInABatch lançar erro', async () => {
    jest.spyOn(inventoryData, 'isRawMaterialBeingUsedInABatch').mockRejectedValue(new Error('erro'));
    await expect(usecase.execute(rawMaterialId)).rejects.toBeInstanceOf(DatabaseException);
  });

  it('deve lançar UsecaseException se o insumo estiver vinculado a um lote', async () => {
    jest.spyOn(inventoryData, 'isRawMaterialBeingUsedInABatch').mockResolvedValue(true);
    await expect(usecase.execute(rawMaterialId)).rejects.toBeInstanceOf(UsecaseException);
  });

  it('deve lançar DatabaseException se removeRawMaterial lançar erro', async () => {
    jest.spyOn(inventoryData, 'isRawMaterialBeingUsedInABatch').mockResolvedValue(false);
    jest.spyOn(inventoryData, 'removeRawMaterial').mockRejectedValue(new Error('erro'));
    await expect(usecase.execute(rawMaterialId)).rejects.toBeInstanceOf(DatabaseException);
  });
}); 