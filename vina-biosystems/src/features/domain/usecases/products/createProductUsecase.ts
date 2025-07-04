import { DatabaseException } from "../../../../core/exceptions/databaseException";
import { ValidationException } from "../../../../core/exceptions/validationException";
import { ProductDataContract } from "../../../data/products/productsDataContract";
import { ProductModel } from "../../models/productModel";

export class CreateProductUsecase {
    private productsData: ProductDataContract;

    constructor(productsData: ProductDataContract) {
        this.productsData = productsData;
    }

    async execute(product: ProductModel): Promise<void> {
        ProductModel.validate(product);
        try {
            await this.productsData.createProduct(product);
        } catch (error) {
            console.error(error);
            throw new DatabaseException("Não foi possível criar o produto!");
        }
    }
}