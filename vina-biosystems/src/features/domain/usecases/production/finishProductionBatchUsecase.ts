import moment from "moment";
import { DatabaseException } from "../../../../core/exceptions/databaseException";
import { BatchDataContract } from "../../../data/production/batchDataContract";
import { BatchModel } from "../../models/batchModel";
import { ProductDataContract } from "../../../data/products/productsDataContract";

export class FinishProductionBatchUsecase {
    private batchData: BatchDataContract;
    private productData: ProductDataContract;

    constructor(batchData: BatchDataContract, productData: ProductDataContract) {
        this.batchData = batchData;
        this.productData = productData;
    }

    public async execute(batch: BatchModel, finishDate: moment.Moment): Promise<void> {
        if (!batch.getId()) {
            throw new Error("ID do lote de produção é obrigatório.");
        }

        if (!finishDate || !moment.isMoment(finishDate)) {
            throw new Error("Data de término inválida.");
        }

        try {
            await this.batchData.updateSituationField(batch.getId() as number, BatchModel.SITUATION.FECHADO);
            await this.batchData.updateEndDateOfBatch(batch.getId() as number, finishDate);
        } catch (error) {
            console.error(error);
            throw new DatabaseException("Não foi possível finalizar o lote de produção!");
        }

        if (batch.getProductId()) {
            try {
                await this.productData.addToProductQuantity(
                    batch.getProductId() as number,
                    batch.getProductQuantity() as number
                );
            } catch(error) {
                console.error(error);
                throw new DatabaseException("Não foi possível atualizar o produto relacionado ao lote de produção!");
            }
        }
    }
}