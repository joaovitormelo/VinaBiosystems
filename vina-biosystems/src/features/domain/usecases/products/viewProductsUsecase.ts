import { DatabaseException } from "../../../../core/exceptions/databaseException";
import { ProductsDataContract } from "../../../data/products/productsDataContract";
import { ProductModel } from "../../models/productModel";

export class ViewProductsUsecase {
    private productsData: ProductsDataContract;

    constructor(productsData: ProductsDataContract) {
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