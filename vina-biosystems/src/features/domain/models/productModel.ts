import { ValidationException } from "../../../core/exceptions/validationException";

export class ProductModel {
    private id: number | null;
    private name: string;
    private quantity: number;
    private unit: string;

   constructor(id: number, name: string, quantity: number, unit: string) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
    }

    public getId(): number|null {
        return this.id;
    }
    public setId(id: number|null): void {
        this.id = id;
    }
    public getName(): string {
        return this.name;
    }
    public setName(name: string): void {
        this.name = name;
    }
    public getQuantity(): number {
        return this.quantity;
    }
    public setQuantity(quantity: number): void {
        this.quantity = quantity;
    }
    public getUnit(): string {
        return this.unit;
    }
    public setUnit(unit: string): void {
        this.unit = unit;
    }

    public static getMock(): ProductModel {
        return new ProductModel(
            1,
            "Mock Product",
            10,
            "kg",
        );
    }

    static fromJson(json: any): ProductModel {
        return new ProductModel(
            json.id,
            json.name,
            json.quantity,
            json.unit
        );
    }

    toJson(): any {
        return {
            id: this.id,
            name: this.name,
            quantity: this.quantity,
            unit: this.unit
        };
    }

    static validate(product: ProductModel): void {
        if (!product.getName() || product.getName().trim() === "") {
            throw new ValidationException("name", "Nome do produto não pode ser vazio.");
        }
        if (product.getQuantity() < 0) {
            throw new ValidationException("quantity", "Quantidade do produto não pode ser negativa.");
        }
        if (!product.getUnit() || product.getUnit().trim() === "") {
            throw new ValidationException("unit", "Unidade do produto não pode ser vazia.");
        }
    }
}