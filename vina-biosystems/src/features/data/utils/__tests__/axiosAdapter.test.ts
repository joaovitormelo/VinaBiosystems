import { AxiosInstance } from "axios";
import { AxiosAdapter } from "../axiosAdapter";
import { DatabaseException } from "../../../../core/exceptions/databaseException";

describe("AxiosAdapter", () => {
    let axiosAdapter: AxiosAdapter;
    let axiosInstance: jest.Mocked<AxiosInstance>;

    beforeAll(() => {
        axiosInstance = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn(),
        } as any;

        axiosAdapter = new AxiosAdapter();
        (axiosAdapter as any).axiosInstance = axiosInstance; // Inject mocked instance
    });

    it("Deve chamar o método 'get' de axiosInstance com os parâmetros corretos, e retornar o valor recebido", async () => {
        const mockData = { data: "test" };
        axiosInstance.get.mockResolvedValue({ status: 200, data: mockData });

        const result = await axiosAdapter.fetchData("/test", { param: "value" });
        expect(result).toEqual(mockData);
        expect(axiosInstance.get).toHaveBeenCalledWith("/test", { params: { param: "value" } });
    });

    it("Deve lançar DatabaseException se o status da resposta não for 200", async () => {
        axiosInstance.get.mockResolvedValue({ status: 404, statusText: "Not Found" });

        await expect(axiosAdapter.fetchData("/test", {})).rejects.toThrow(DatabaseException);
        expect(axiosInstance.get).toHaveBeenCalledWith("/test", { params: {} });
    });

    it("Deve chamar o método 'post' de axiosInstance com os parâmetros corretos, e retornar o valor recebido", async () => {
        const mockData = { data: "test" };
        axiosInstance.post.mockResolvedValue({ status: 200, data: mockData });

        const result = await axiosAdapter.postData("/test", { key: "value" });
        expect(result).toEqual(mockData);
        expect(axiosInstance.post).toHaveBeenCalledWith("/test", { key: "value" });
    });

    it("Deve lançar DatabaseException se o status da resposta não for 200 ao usar post", async () => {
        axiosInstance.post.mockResolvedValue({ status: 500, statusText: "Internal Server Error" });

        await expect(axiosAdapter.postData("/test", {})).rejects.toThrow(DatabaseException);
        expect(axiosInstance.post).toHaveBeenCalledWith("/test", {});
    });

    it("Deve chamar o método 'put' de axiosInstance com os parâmetros corretos, e retornar o valor recebido", async () => {
        const mockData = { data: "test" };
        axiosInstance.put.mockResolvedValue({ status: 200, data: mockData });

        const result = await axiosAdapter.putData("/test", { key: "value" });
        expect(result).toEqual(mockData);
        expect(axiosInstance.put).toHaveBeenCalledWith("/test", { key: "value" });
    });

    it("Deve lançar DatabaseException se o status da resposta não for 200 ao usar put", async () => {
        axiosInstance.put.mockResolvedValue({ status: 400, statusText: "Bad Request" });

        await expect(axiosAdapter.putData("/test", {})).rejects.toThrow(DatabaseException);
        expect(axiosInstance.put).toHaveBeenCalledWith("/test", {});
    });

    it("Deve chamar o método 'delete' de axiosInstance com os parâmetros corretos, e retornar o valor recebido", async () => {
        const mockData = { data: "test" };
        axiosInstance.delete.mockResolvedValue({ status: 200, data: mockData });

        const result = await axiosAdapter.deleteData("/test", { key: "value" });
        expect(result).toEqual(mockData);
        expect(axiosInstance.delete).toHaveBeenCalledWith("/test", { data: { key: "value" } });
    });

    it("Deve lançar DatabaseException se o status da resposta não for 200 ao usar delete", async () => {
        axiosInstance.delete.mockResolvedValue({ status: 403, statusText: "Forbidden" });

        await expect(axiosAdapter.deleteData("/test", {})).rejects.toThrow(DatabaseException);
        expect(axiosInstance.delete).toHaveBeenCalledWith("/test", { data: {} });
    });
});

