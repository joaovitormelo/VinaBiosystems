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
}