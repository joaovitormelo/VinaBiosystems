export class RawMaterialModel {
    private id: string;
    private name: string;
    private quantity: number;
    private unit: string;
    private minQuantity: number;

    constructor(id: string, name: string, quantity: number, unit: string, minQuantity: number) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
        this.minQuantity = minQuantity;
    }

    public getId(): string {
        return this.id;
    }
    public setId(id: string): void {
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
    public getMinQuantity(): number {
        return this.minQuantity;
    }
    public setMinQuantity(minQuantity: number): void {
        this.minQuantity = minQuantity;
    }

    public static getMock(): RawMaterialModel {
        return new RawMaterialModel(
            "1",
            "Mock Material",
            100,
            "kg",
            10
        );
    }
}