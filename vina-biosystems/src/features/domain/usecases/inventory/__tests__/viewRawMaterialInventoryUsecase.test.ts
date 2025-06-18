import { ViewRawMaterialInventoryUsecase } from '../viewRawMaterialInventoryUsecase';
import { InventoryDataMock } from '../../../../data/inventory/inventoryDataMock';
import { RawMaterialModel } from '../../../models/rawMaterialModel';
import { ValidationException } from '../../../../../core/exceptions/validationException';
import { DatabaseException } from '../../../../../core/exceptions/databaseException';

describe('ViewRawMaterialInventoryUsecase', () => {
  let inventoryData: InventoryDataMock;
  let usecase: ViewRawMaterialInventoryUsecase;

  beforeAll(() => {
    console.error = jest.fn(); // Omite logs de erro durante os testes
  });

  beforeEach(() => {
    inventoryData = new InventoryDataMock();
    usecase = new ViewRawMaterialInventoryUsecase(inventoryData);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve chamar fetchInventory e retornar o inventário', async () => {
    const spy = jest.spyOn(inventoryData, 'fetchInventory');
    const result = await usecase.execute();
    expect(spy).toHaveBeenCalled();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toBeInstanceOf(RawMaterialModel);
  });

  it('deve lançar DatabaseException se fetchInventory lançar erro', async () => {
    jest.spyOn(inventoryData, 'fetchInventory').mockRejectedValue(new Error('erro'));
    await expect(usecase.execute()).rejects.toBeInstanceOf(DatabaseException);
  });
}); 