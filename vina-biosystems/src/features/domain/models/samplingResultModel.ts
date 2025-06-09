import moment from "moment";
import { Moment } from "moment";

export class SamplingResultModel {
    private id: number;
    private fileName: string;
    private date: Moment;
    private creationUserId: number;

    constructor(id: number, fileName: string, date: Moment, creationUserId: number) {
        this.id = id;
        this.fileName = fileName;
        this.date = date;
        this.creationUserId = creationUserId;
    }

    public getId(): number {
        return this.id;
    }
    public setId(id: number) {
        this.id = id;
    }
    public getFileName(): string {
        return this.fileName;
    }
    public setFileName(fileName: string) {
        this.fileName = fileName;
    }
    public getDate(): Moment {
        return this.date;
    }
    public setDate(date: Moment) {
        this.date = date;
    }
    public getCreationUserId(): number {
        return this.creationUserId;
    }
    public setCreationUserId(creationUserId: number) {
        this.creationUserId = creationUserId;
    }
    
    public static getMock(): SamplingResultModel {
        return new SamplingResultModel(
            1,
            "sample_file.txt",
            moment(),
            1
        );
    }
}