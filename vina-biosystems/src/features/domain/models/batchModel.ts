import { RawMaterialInBatch } from '../types/rawMaterialInBatch';
import moment, { Moment } from 'moment';

export class BatchModel {
    private id: number | null;
    private label: string;
    private startDate: Moment;
    private endDate: Moment | null;
    private rawMaterialList: Array<RawMaterialInBatch> | null;
    private situation: string;
    private productId: number | null;
    private productQuantity: number | null

    public static SITUATION = class {
        static readonly EM_ABERTO = "open";
        static readonly FECHADO = "closed";
        static readonly CANCELADO = "canceled";
    };

    constructor(
        id: number | null, label: string, startDate: Moment, endDate: Moment | null,
        rawMaterialList: Array<RawMaterialInBatch> | null, situation: string,
        productId: number | null, productQuantity: number | null
    ) {
        this.id = id;
        this.label = label;
        this.startDate = startDate;
        this.endDate = endDate;
        this.rawMaterialList = rawMaterialList;
        this.situation = situation;
        this.productId = productId;
        this.productQuantity = productQuantity;
    }

    getId(): number | null {
        return this.id;
    }
    getLabel(): string {
        return this.label;
    }
    getStartDate(): Moment {
        return this.startDate;
    }
    getEndDate(): Moment | null {
        return this.endDate;
    }
    getRawMaterialList(): Array<RawMaterialInBatch> | null {
        return this.rawMaterialList;
    }
    getSituation(): string {
        return this.situation;
    }
    setId(id: number | null) {
        this.id = id;
    }
    setLabel(label: string) {
        this.label = label;
    }
    setStartDate(startDate: Moment) {
        this.startDate = startDate;
    }
    setEndDate(endDate: Moment | null) {
        this.endDate = endDate;
    }
    setRawMaterialList(rawMaterialList: Array<RawMaterialInBatch> | null) {
        this.rawMaterialList = rawMaterialList;
    }
    setSituation(situation: string) {
        this.situation = situation;
    }

    getProductId(): number | null {
        return this.productId;
    }
    getProductQuantity(): number | null {
        return this.productQuantity;
    }

    static getMock(): BatchModel {
        return new BatchModel(
            1,
            "Lote de Teste",
            moment("2023-01-01"),
            moment("2023-01-10"),
            [RawMaterialInBatch.getMock()],
            this.SITUATION.EM_ABERTO,
            null, // productId
            null // productQuantity
        );
    }

    static fromJSON(json: any): BatchModel {
        return new BatchModel(
            json.id || null,
            json.label || "",
            moment(json.startDate),
            json.endDate ? moment(json.endDate) : json.endDate,
            null,
            json.situation || this.SITUATION.EM_ABERTO,
            json.productId || null,
            json.productQuantity || null
        );
    }

    toJSON(): any {
        return {
            id: this.id,
            label: this.label,
            startDate: this.startDate.toISOString(),
            endDate: this.endDate?.toISOString(),
            rawMaterialList: null,
            situation: this.situation,
            productId: this.productId,
            productQuantity: this.productQuantity
        };
    }
}