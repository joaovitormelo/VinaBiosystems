import { DatabaseException } from "../../../core/exceptions/databaseException";
import { BackendContract } from "./backendContract";
import axios, { AxiosInstance } from "axios";

export class AxiosAdapter implements BackendContract {
    private baseURL: string = process.env.REACT_APP_BASE_BACKEND_URL || "";
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({ baseURL: this.baseURL });
    }

    async fetchData(route: string, params: any): Promise<any> {
        const response = await this.axiosInstance.get(route, {params});
        if (response.status !== 200) {
            throw new DatabaseException(response.statusText);
        }
        return response.data;
    }

    async postData(route: string, data: any): Promise<any> {
        const response = await this.axiosInstance.post(route, data);
        if (response.status !== 200) {
            throw new DatabaseException(response.statusText);
        }
        return response.data;
    }

    async putData(route: string, data: any): Promise<any> {
        const response = await this.axiosInstance.put(route, data);
        if (response.status !== 200) {
            throw new DatabaseException(response.statusText);
        }
        return response.data;
    }

    async deleteData(route: string, data: any): Promise<void> {
        const response = await this.axiosInstance.delete(route, { data });
        if (response.status !== 200) {
            throw new DatabaseException(response.statusText);
        }
        return response.data;
    }
}