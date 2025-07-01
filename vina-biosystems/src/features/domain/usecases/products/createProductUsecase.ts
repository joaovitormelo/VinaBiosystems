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
        this.validateProductFields(product);
        try {
            await this.productsData.createProduct(product);
        } catch (error) {
            console.error(error);
            throw new DatabaseException("Não foi possível criar o produto!");
        }
    }

    private validateProductFields(product: ProductModel) {
        if (!product.getName()) {
            throw new ValidationException("name", "Nome do produto não pode ser vazio.");
        }
        if (product.getQuantity() < 0) {
            throw new ValidationException("quantity", "Quantidade do produto não pode ser negativa.");
        }
        if (!product.getUnit()) {
            throw new ValidationException("unit", "Unidade do produto não pode ser vazia.");
        }
    }
}