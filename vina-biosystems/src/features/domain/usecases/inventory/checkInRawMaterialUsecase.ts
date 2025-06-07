import { DatabaseException } from "../../../../core/exceptions/databaseException";
import { ValidationException } from "../../../../core/exceptions/validationException";
import { InventoryDataContract } from "../../../data/inventory/inventoryDataContract";
import { RawMaterialModel } from "../../models/rawMaterialModel";

export class CheckInRawMaterialUsecase {
    private inventoryData: InventoryDataContract;

    constructor(inventoryData: InventoryDataContract) {
        this.inventoryData = inventoryData;
    }

    async execute(rawMaterial: RawMaterialModel, quantity: number): Promise<void> {
        if (quantity <= 0) {
            throw new ValidationException("quantity", "A quantidade deve ser maior que zero!");
        }
        rawMaterial.setQuantity(rawMaterial.getQuantity() + quantity);
        try {
            await this.inventoryData.updateRawMaterial(rawMaterial);
        } catch (error) {
            console.error(error);
            throw new DatabaseException(
                "Não foi possível registrar a entrada do insumo " + rawMaterial.getName() + "!"
            );
        }
    }
}