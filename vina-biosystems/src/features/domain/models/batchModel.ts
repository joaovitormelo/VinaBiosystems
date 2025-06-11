import { RawMaterialInBatch } from '../types/rawMaterialInBatch';
import moment, { Moment } from 'moment';

export class BatchModel {
    private id: number | null;
    private label: string;
    private startDate: Moment;
    private endDate: Moment;
    private rawMaterialList: Array<RawMaterialInBatch> | null;
    private situation: string;

    public static SITUATION = class {
        static readonly EM_ABERTO = "open";
        static readonly FECHADO = "closed";
        static readonly CANCELADO = "canceled";
    };

    constructor(
        id: number | null, label: string, startDate: Moment, endDate: Moment,
        rawMaterialList: Array<RawMaterialInBatch> | null, situation: string
    ) {
        this.id = id;
        this.label = label;
        this.startDate = startDate;
        this.endDate = endDate;
        this.rawMaterialList = rawMaterialList;
        this.situation = situation;
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
    getEndDate(): Moment {
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
    setEndDate(endDate: Moment) {
        this.endDate = endDate;
    }
    setRawMaterialList(rawMaterialList: Array<RawMaterialInBatch> | null) {
        this.rawMaterialList = rawMaterialList;
    }
    setSituation(situation: string) {
        this.situation = situation;
    }

    static getMock(): BatchModel {
        return new BatchModel(
            1,
            "Lote de Teste",
            moment("2023-01-01"),
            moment("2023-01-10"),
            [RawMaterialInBatch.getMock()],
            this.SITUATION.EM_ABERTO
        );
    }

    static fromJSON(json: any): BatchModel {
        return new BatchModel(
            json.id || null,
            json.label || "",
            moment(json.startDate),
            moment(json.endDate),
            null,
            json.situation || this.SITUATION.EM_ABERTO
        );
    }

    toJSON(): any {
        return {
            id: this.id,
            label: this.label,
            startDate: this.startDate.toISOString(),
            endDate: this.endDate.toISOString(),
            rawMaterialList: null,
            situation: this.situation
        };
    }
}