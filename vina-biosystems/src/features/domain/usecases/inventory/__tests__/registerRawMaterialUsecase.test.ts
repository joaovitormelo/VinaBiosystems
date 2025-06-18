import { RegisterRawMaterialUsecase } from '../registerRawMaterialUsecase';
import { InventoryDataMock } from '../../../../data/inventory/inventoryDataMock';
import { RawMaterialModel } from '../../../models/rawMaterialModel';
import { ValidationException } from '../../../../../core/exceptions/validationException';
import { DatabaseException } from '../../../../../core/exceptions/databaseException';
import { UsecaseException } from '../../../../../core/exceptions/usecaseException';

describe('RegisterRawMaterialUsecase', () => {
  let inventoryData: InventoryDataMock;
  let usecase: RegisterRawMaterialUsecase;
  let rawMaterial: RawMaterialModel;

  beforeAll(() => {
    console.error = jest.fn(); // Omite logs de erro durante os testes
  });

  beforeEach(() => {
    inventoryData = new InventoryDataMock();
    usecase = new RegisterRawMaterialUsecase(inventoryData);
    rawMaterial = RawMaterialModel.getMock();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve chamar createRawMaterial com os parâmetros corretos', async () => {
    const spy = jest.spyOn(inventoryData, 'createRawMaterial');
    jest.spyOn(inventoryData, 'getRawMaterialByName').mockResolvedValue(undefined);
    await usecase.execute(rawMaterial);
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({
      id: rawMaterial.getId(),
      name: rawMaterial.getName(),
    }));
  });

  it('deve lançar UsecaseException se já existir insumo com o mesmo nome', async () => {
    jest.spyOn(inventoryData, 'getRawMaterialByName').mockResolvedValue(rawMaterial);
    await expect(usecase.execute(rawMaterial)).rejects.toBeInstanceOf(UsecaseException);
  });

  it('deve lançar DatabaseException se createRawMaterial lançar erro', async () => {
    jest.spyOn(inventoryData, 'getRawMaterialByName').mockResolvedValue(undefined);
    jest.spyOn(inventoryData, 'createRawMaterial').mockRejectedValue(new Error('erro'));
    await expect(usecase.execute(rawMaterial)).rejects.toBeInstanceOf(DatabaseException);
  });

  it('deve lançar ValidationException para campos inválidos', async () => {
    rawMaterial.setName('');
    await expect(usecase.execute(rawMaterial)).rejects.toBeInstanceOf(ValidationException);
    rawMaterial.setName('Material');
    rawMaterial.setQuantity(-1);
    await expect(usecase.execute(rawMaterial)).rejects.toBeInstanceOf(ValidationException);
  });
}); 