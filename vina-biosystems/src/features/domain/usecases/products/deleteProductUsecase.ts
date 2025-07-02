import { DatabaseException } from "../../../../core/exceptions/databaseException";
import { ProductDataContract } from "../../../data/products/productsDataContract";

export class DeleteProductUsecase {
    private productData: ProductDataContract;

    constructor(productData: ProductDataContract) {
        this.productData = productData;
    }

    async execute(productId: number): Promise<void> {
        try {
            await this.productData.deleteProduct(productId);
        } catch (error) {
            console.error(error);
            throw new DatabaseException("Não foi possível deletar o produto!");
        }
    }
}