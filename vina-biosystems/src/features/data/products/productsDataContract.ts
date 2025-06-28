import { ProductModel } from "../../domain/models/productModel";

export interface ProductsDataContract {
    fetchProducts(): Promise<Array<ProductModel>>;
    fetchProductById(id: number): Promise<ProductModel>;
    createProduct(product: ProductModel): Promise<void>;
    updateProduct(product: ProductModel): Promise<void>;
    deleteProduct(id: number): Promise<void>;
}