import { CheckInRawMaterialUsecase } from '../checkInRawMaterialUsecase';
import { InventoryDataMock } from '../../../../data/inventory/inventoryDataMock';
import { RawMaterialModel } from '../../../models/rawMaterialModel';
import { ValidationException } from '../../../../../core/exceptions/validationException';
import { DatabaseException } from '../../../../../core/exceptions/databaseException';

describe('CheckInRawMaterialUsecase', () => {
  let inventoryData: InventoryDataMock;
  let usecase: CheckInRawMaterialUsecase;
  let rawMaterial: RawMaterialModel;

  beforeAll(() => {
    console.error = jest.fn(); // Omite logs de erro durante os testes
  });

  beforeEach(() => {
    inventoryData = new InventoryDataMock();
    usecase = new CheckInRawMaterialUsecase(inventoryData);
    rawMaterial = RawMaterialModel.getMock();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve chamar updateRawMaterial com os parâmetros corretos', async () => {
    const spy = jest.spyOn(inventoryData, 'updateRawMaterial');
    await usecase.execute(rawMaterial, 10);
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({
      id: rawMaterial.getId(),
      name: rawMaterial.getName(),
    }));
  });

  it('deve lançar ValidationException se a quantidade for menor ou igual a zero', async () => {
    await expect(usecase.execute(rawMaterial, 0)).rejects.toBeInstanceOf(ValidationException);
    await expect(usecase.execute(rawMaterial, -5)).rejects.toBeInstanceOf(ValidationException);
  });

  it('deve lançar DatabaseException se updateRawMaterial lançar erro', async () => {
    jest.spyOn(inventoryData, 'updateRawMaterial').mockRejectedValue(new Error('erro'));
    await expect(usecase.execute(rawMaterial, 10)).rejects.toBeInstanceOf(DatabaseException);
  });

  it('deve atualizar a quantidade corretamente', async () => {
    const quantidadeInicial = rawMaterial.getQuantity();
    await usecase.execute(rawMaterial, 15);
    expect(rawMaterial.getQuantity()).toBe(quantidadeInicial + 15);
  });
}); 