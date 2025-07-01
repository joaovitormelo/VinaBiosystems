import { DatabaseException } from "../../../../core/exceptions/databaseException";
import { ProductDataContract } from "../../../data/products/productsDataContract";
import { ProductModel } from "../../models/productModel";

export class ViewProductsUsecase {
    private productsData: ProductDataContract;

    constructor(productsData: ProductDataContract) {
        this.productsData = productsData;
    }

    async execute(): Promise<Array<ProductModel>> {
        try {
            return await this.productsData.fetchProducts();
        } catch(error) {
            console.error(error);
            throw new DatabaseException("Não foi possível visualizar os produtos!");
        }
    }
}