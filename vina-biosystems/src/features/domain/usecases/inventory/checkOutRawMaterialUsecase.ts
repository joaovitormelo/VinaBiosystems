import { DatabaseException } from "../../../../core/exceptions/databaseException";
import { ValidationException } from "../../../../core/exceptions/validationException";
import { InventoryDataContract } from "../../../data/inventory/inventoryDataContract";
import { NotificationManagerContract } from "../../../data/system/notificationManagerContract";
import { RawMaterialModel } from "../../models/rawMaterialModel";

export class CheckOutRawMaterialUsecase {
    private inventoryData: InventoryDataContract;
    private notificationManager: NotificationManagerContract;

    constructor(inventoryData: InventoryDataContract, notificationManager: NotificationManagerContract) {
        this.inventoryData = inventoryData;
        this.notificationManager = notificationManager;
    }

    async execute(rawMaterial: RawMaterialModel, quantity: number): Promise<void> {
        this.handleValidations(rawMaterial, quantity);
        rawMaterial.setQuantity(rawMaterial.getQuantity() - quantity);
        try {
            await this.inventoryData.updateRawMaterial(rawMaterial);
        } catch (error) {
            console.error(error);
            throw new DatabaseException(
                "Não foi possível registrar a saída do insumo " + rawMaterial.getName() + "!"
            );
        }
        //Enviar notificação em caso de nível baixo
        await this.handleNotification(rawMaterial);
    }

    private handleValidations(rawMaterial: RawMaterialModel, quantity: number) {
        if (quantity <= 0) {
            throw new ValidationException("quantity", "A quantidade deve ser maior que zero!");
        }
        if (rawMaterial.getQuantity() < quantity) {
            throw new ValidationException("quantity", "Quantidade insuficiente em estoque!");
        }
    }

    private async handleNotification(rawMaterial: RawMaterialModel): Promise<void> {  
        if (rawMaterial.getQuantity() <= rawMaterial.getMinQuantity()) {
            try {
                await this.notificationManager.createNotificationsForAllUsers(
                    `O insumo ${rawMaterial.getName()} atingiu um nível abaixo de do nível mínimo de
                    ${rawMaterial.getQuantity()} ${rawMaterial.getUnit()}: ${rawMaterial.getQuantity()} !`
                );
            } catch(error) {
                console.error("Erro ao criar notificações:", error);
                throw new DatabaseException("Erro ao criar a notificação de nível baixo do insumo " + rawMaterial.getName() + "!");
            }
        }
    }
}