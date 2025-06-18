import { CheckOutRawMaterialUsecase } from '../checkOutRawMaterialUsecase';
import { InventoryDataMock } from '../../../../data/inventory/inventoryDataMock';
import { NotificationManagerMock } from '../../../../data/system/notificationManagerMock';
import { RawMaterialModel } from '../../../models/rawMaterialModel';
import { ValidationException } from '../../../../../core/exceptions/validationException';
import { DatabaseException } from '../../../../../core/exceptions/databaseException';

describe('CheckOutRawMaterialUsecase', () => {
  let inventoryData: InventoryDataMock;
  let notificationManager: NotificationManagerMock;
  let usecase: CheckOutRawMaterialUsecase;
  let rawMaterial: RawMaterialModel;

  beforeAll(() => {
    console.error = jest.fn(); // Omite logs de erro durante os testes
  });

  beforeEach(() => {
    inventoryData = new InventoryDataMock();
    notificationManager = new NotificationManagerMock();
    usecase = new CheckOutRawMaterialUsecase(inventoryData, notificationManager);
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

  it('deve lançar ValidationException se a quantidade for maior que o estoque', async () => {
    await expect(usecase.execute(rawMaterial, rawMaterial.getQuantity() + 1)).rejects.toBeInstanceOf(ValidationException);
  });

  it('deve lançar DatabaseException se updateRawMaterial lançar erro', async () => {
    jest.spyOn(inventoryData, 'updateRawMaterial').mockRejectedValue(new Error('erro'));
    await expect(usecase.execute(rawMaterial, 10)).rejects.toBeInstanceOf(DatabaseException);
  });

  it('deve chamar createNotificationsForAllUsers se quantidade ficar abaixo do mínimo', async () => {
    rawMaterial.setQuantity(rawMaterial.getMinQuantity() + 5);
    const spy = jest.spyOn(notificationManager, 'createNotificationsForAllUsers').mockResolvedValue();
    await usecase.execute(rawMaterial, 6);
    expect(spy).toHaveBeenCalled();
  });

  it('deve lançar DatabaseException se createNotificationsForAllUsers lançar erro', async () => {
    rawMaterial.setQuantity(rawMaterial.getMinQuantity() + 1);
    jest.spyOn(notificationManager, 'createNotificationsForAllUsers').mockRejectedValue(new Error('erro'));
    await expect(usecase.execute(rawMaterial, 2)).rejects.toBeInstanceOf(DatabaseException);
  });

  it('deve atualizar a quantidade corretamente', async () => {
    const quantidadeInicial = rawMaterial.getQuantity();
    await usecase.execute(rawMaterial, 10);
    expect(rawMaterial.getQuantity()).toBe(quantidadeInicial - 10);
  });
}); 