import { EditRawMaterialUsecase } from '../editRawMaterialUsecase';
import { InventoryDataMock } from '../../../../data/inventory/inventoryDataMock';
import { RawMaterialModel } from '../../../models/rawMaterialModel';
import { ValidationException } from '../../../../../core/exceptions/validationException';
import { DatabaseException } from '../../../../../core/exceptions/databaseException';


describe('EditRawMaterialUsecase', () => {
  let inventoryData: InventoryDataMock;
  let usecase: EditRawMaterialUsecase;

  beforeAll(() => {
    console.error = jest.fn(); // Omite logs de erro durante os testes
  });

  beforeEach(() => {
    inventoryData = new InventoryDataMock();
    usecase = new EditRawMaterialUsecase(inventoryData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve chamar updateRawMaterial com os parâmetros corretos', async () => {
    const rawMaterial = RawMaterialModel.getMock();
    const spy = jest.spyOn(inventoryData, 'updateRawMaterial');
    jest.spyOn(inventoryData, 'getRawMaterialByName').mockResolvedValue(undefined);
    await usecase.execute(rawMaterial);
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({
      id: rawMaterial.getId(),
      name: rawMaterial.getName(),
    }));
  });

  it('deve lançar DatabaseException se getRawMaterialByName lançar erro', async () => {
    const rawMaterial = RawMaterialModel.getMock();
    jest.spyOn(inventoryData, 'getRawMaterialByName').mockRejectedValue(new Error('erro'));
    await expect(usecase.execute(rawMaterial)).rejects.toBeInstanceOf(DatabaseException);
  });

  it('deve lançar DatabaseException se updateRawMaterial lançar erro', async () => {
    const rawMaterial = RawMaterialModel.getMock();
    jest.spyOn(inventoryData, 'getRawMaterialByName').mockResolvedValue(undefined);
    jest.spyOn(inventoryData, 'updateRawMaterial').mockRejectedValue(new Error('erro'));

    await expect(usecase.execute(rawMaterial)).rejects.toBeInstanceOf(DatabaseException);
  });

  it('deve lançar ValidationException para campos inválidos', async () => {
    const rawMaterial = RawMaterialModel.getMock();
    rawMaterial.setName('');
    await expect(usecase.execute(rawMaterial)).rejects.toBeInstanceOf(ValidationException);
    rawMaterial.setName('Material');
    rawMaterial.setQuantity(-1);
    await expect(usecase.execute(rawMaterial)).rejects.toBeInstanceOf(ValidationException);
    rawMaterial.setQuantity(10);
    rawMaterial.setUnit('');
    await expect(usecase.execute(rawMaterial)).rejects.toBeInstanceOf(ValidationException);
    rawMaterial.setUnit('kg');
    rawMaterial.setMinQuantity(-5);
    await expect(usecase.execute(rawMaterial)).rejects.toBeInstanceOf(ValidationException);
  });

  it('deve lançar DatabaseException se já existir outro insumo com o mesmo nome e id diferente', async () => {
    const rawMaterial = RawMaterialModel.getMock();
    rawMaterial.setId(1);
    rawMaterial.setName('Álcool');

    const outro = RawMaterialModel.getMock();
    outro.setId(2); // ID diferente
    outro.setName('Álcool'); // mesmo nome

    const getRawMaterialByNameMock = jest.spyOn(inventoryData, 'getRawMaterialByName').mockResolvedValue(outro);
    const updateRawMaterialMock = jest.spyOn(inventoryData, 'updateRawMaterial');

    await expect(usecase.execute(rawMaterial)).rejects.toBeInstanceOf(DatabaseException);
    expect(getRawMaterialByNameMock).toHaveBeenCalledWith('Álcool');
    expect(updateRawMaterialMock).not.toHaveBeenCalled();
  });
}); 