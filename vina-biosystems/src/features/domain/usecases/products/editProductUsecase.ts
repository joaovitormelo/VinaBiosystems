import { DatabaseException } from "../../../../core/exceptions/databaseException";
import { ProductDataContract } from "../../../data/products/productsDataContract";
import { ProductModel } from "../../models/productModel";

export class EditProductUsecase {
    private productData: ProductDataContract;

    constructor(productData: ProductDataContract) {
        this.productData = productData;
    }

    async execute(product: ProductModel): Promise<void> {
        ProductModel.validate(product);
        try {
            await this.productData.updateProduct(product);
        } catch (error) {
            console.error(error);
            throw new DatabaseException("Não foi possível editar o produto!");
        }
    }
}