export class RawMaterialInBatch{
    private rawMaterialId: number;
    private quantity: number;

    constructor(rawMaterialId: number, quantity: number) {
        this.rawMaterialId = rawMaterialId;
        this.quantity = quantity;
    }

    getRawMaterialId(): number {
        return this.rawMaterialId;
    }
    getQuantity(): number {
        return this.quantity;
    }
    setRawMaterialId(rawMaterialId: number): void {
        this.rawMaterialId = rawMaterialId;
    }
    setQuantity(quantity: number): void {
        this.quantity = quantity;
    }

    static getMock(): RawMaterialInBatch {
        return new RawMaterialInBatch(1, 100);
    }

    static fromJson(json: any): RawMaterialInBatch {
        return new RawMaterialInBatch(json.rawMaterialId, json.quantity);
    }

    toJson(): any {
        return {
            rawMaterialId: this.rawMaterialId,
            quantity: this.quantity
        };
    }
}