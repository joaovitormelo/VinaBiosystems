import { DatabaseException } from "../../../../core/exceptions/databaseException";
import { UsecaseException } from "../../../../core/exceptions/usecaseException";
import { ValidationException } from "../../../../core/exceptions/validationException";
import { InventoryDataContract } from "../../../data/inventory/inventoryDataContract";
import { RawMaterialModel } from "../../models/rawMaterialModel";

export class RegisterRawMaterialUsecase {
    private inventoryData: InventoryDataContract;

    constructor(inventoryData: InventoryDataContract) {
        this.inventoryData = inventoryData;
    }

    async execute(rawMaterial: RawMaterialModel): Promise<void> {
        this.validateFields(rawMaterial);
        const existingRawMaterial = await this.inventoryData.getRawMaterialByName(rawMaterial.getName());
        if (existingRawMaterial) {
            throw new UsecaseException("Já existe um insumo cadastrado com o nome " + rawMaterial.getName() + "!");
        }
        try {
            await this.inventoryData.createRawMaterial(rawMaterial);
        } catch (error) {
            console.error(error);
            throw new DatabaseException("Não foi possível cadastrar o insumo " + rawMaterial.getName() + "!");
        }
    }
    
    validateFields(rawMaterial: RawMaterialModel) {
        if (!rawMaterial.getName()) {
            throw new ValidationException("name", "Nome do material não pode ser vazio.");
        }
        if (rawMaterial.getQuantity() < 0) {
            throw new ValidationException("quantity", "Quantidade do material não pode ser negativa.");
        }
        if (!rawMaterial.getUnit()) {
            throw new ValidationException("unit", "Unidade do material não pode ser vazia.");
        }
        if (rawMaterial.getMinQuantity() < 0) {
            throw new ValidationException("minQuantity", "Quantidade mínima do material não pode ser negativa.");
        }
    }
}