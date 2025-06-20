import { DatabaseException } from "../../../../core/exceptions/databaseException";
import { ValidationException } from "../../../../core/exceptions/validationException";
import { InventoryDataContract } from "../../../data/inventory/inventoryDataContract";
import { RawMaterialModel } from "../../models/rawMaterialModel";

export class EditRawMaterialUsecase {
    private inventoryData: InventoryDataContract;

    constructor(inventoryData: InventoryDataContract) {
        this.inventoryData = inventoryData;
    }

    async execute(rawMaterial: RawMaterialModel): Promise<void> {
        this.validateFields(rawMaterial);

        let existingRawMaterial: RawMaterialModel | undefined;
        try {
            existingRawMaterial = await this.inventoryData.getRawMaterialByName(rawMaterial.getName());
        } catch(error) {
            console.error(error);
            throw new DatabaseException("Não foi possível consultar a existência de insumos com o nome " + rawMaterial.getName() + "!");
        }
        if (existingRawMaterial && existingRawMaterial.getId() !== rawMaterial.getId()) {
            throw new DatabaseException(`Insumo com o nome ${rawMaterial.getName()} já existe!`);
        }

        try {
            await this.inventoryData.updateRawMaterial(rawMaterial);
        } catch(error) {
            console.error(error);
            throw new DatabaseException("Não foi possível atualizar o insumo " + rawMaterial.getName() + "!");
        }
    }

    validateFields(rawMaterial: RawMaterialModel) {
        if (!rawMaterial.getId()) {
            throw new ValidationException("id", "ID do material não pode ser vazio.");
        }
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