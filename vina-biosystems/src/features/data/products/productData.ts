import { ProductModel } from '../../domain/models/productModel';
import { ProductDataContract } from './productsDataContract';
import { BackendContract, ROUTES } from "../utils/backendContract";

export class ProductData implements ProductDataContract {
    private backend: BackendContract;

    constructor(backend: BackendContract) {
        this.backend = backend;
    }

    async fetchProducts(): Promise<Array<ProductModel>> {
        const response = await this.backend.fetchData(ROUTES.PRODUCT.SELECT_PRODUCTS, null);
        if (!response) return [];
        return response.map((user: any) => {
            return ProductModel.fromJson(user);
        });
    }

    async fetchProductById(id: number): Promise<ProductModel | null> {
        const response = await this.backend.fetchData(ROUTES.PRODUCT.SELECT_PRODUCT_BY_ID, { id });
        if (!response) return null;
        return ProductModel.fromJson(response);
    }

    async updateProduct(product: ProductModel): Promise<void> {
        const data = product.toJson();
        await this.backend.putData(ROUTES.PRODUCT.UPDATE_PRODUCT, data);
    }

    async deleteProduct(product: ProductModel): Promise<void> {
        const data = product.toJson();
        await this.backend.deleteData(ROUTES.PRODUCT.DELETE_PRODUCT, data);
    }

    async createProduct(product: ProductModel): Promise<void> {
        const data = product.toJson();
        await this.backend.postData(ROUTES.PRODUCT.INSERT_PRODUCT, data);
    }
}