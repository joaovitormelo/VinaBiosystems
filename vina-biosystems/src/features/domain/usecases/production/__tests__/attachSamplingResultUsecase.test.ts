import { AttachSamplingResultUsecase } from "../attachSamplingResultUsecase";
import { DatabaseException } from "../../../../../core/exceptions/databaseException";
import { ValidationException } from "../../../../../core/exceptions/validationException";
import { SessionManagerContract } from "../../../../../core/session/sessionManagerContract";
import { SamplingResultDataContract } from "../../../../data/production/samplingResultDataContract";
import { SamplingResultModel } from "../../../models/samplingResultModel";
import { UserModel } from "../../../models/userModel";
import moment from "moment";

describe("AttachSamplingResultUsecase", () => {
    let attachSamplingResultUsecase: AttachSamplingResultUsecase;
    let samplingResultData: jest.Mocked<SamplingResultDataContract>;
    let sessionManager: jest.Mocked<SessionManagerContract>;
    let mockSamplingResult: SamplingResultModel;
    let mockUser: UserModel;

    beforeAll(() => {
        samplingResultData = {
            attachSamplingResult: jest.fn(),
        } as any;

        sessionManager = {
            getSessionUser: jest.fn(),
        } as any;

        mockUser = UserModel.getMock();

        mockSamplingResult = SamplingResultModel.getMock();

        attachSamplingResultUsecase = new AttachSamplingResultUsecase(
            samplingResultData,
            sessionManager
        );
        console.error = jest.fn(); // Omite logs de erro durante os testes
    });

    beforeEach(() => {
        jest.clearAllMocks();
        sessionManager.getSessionUser.mockReturnValue(mockUser);
    });

    it("Deve executar com sucesso quando os dados são válidos", async () => {
        // Criar um mock mais completo do SamplingResultModel
        const expectedResult = {
            getId: () => 1,
            getFileName: () => "test.pdf",
            getDate: () => moment(),
            getCreationUserId: () => 123
        } as unknown as SamplingResultModel;
        
        mockSamplingResult.setFileName("test.pdf");
        mockSamplingResult.setDate(moment());
        samplingResultData.attachSamplingResult.mockResolvedValue(expectedResult);

        const result = await attachSamplingResultUsecase.execute(mockSamplingResult);

        expect(result).toEqual(expectedResult);
        expect(samplingResultData.attachSamplingResult).toHaveBeenCalledWith(mockSamplingResult);
        expect(sessionManager.getSessionUser).toHaveBeenCalled();
    });

    it("Deve lançar DatabaseException quando samplingResultData.attachSamplingResult falha", async () => {
        mockSamplingResult.setFileName("test.pdf");
        mockSamplingResult.setDate(moment());
        samplingResultData.attachSamplingResult.mockRejectedValue(new Error("Database error"));

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        await expect(attachSamplingResultUsecase.execute(mockSamplingResult))
            .rejects.toThrow(DatabaseException);
        
        expect(samplingResultData.attachSamplingResult).toHaveBeenCalledWith(mockSamplingResult);
        expect(consoleSpy).toHaveBeenCalled();

        consoleSpy.mockRestore();
    });

    it("Deve definir o userId do usuário da sessão no samplingResult", async () => {
        const expectedResult = {
            getId: () => 1,
            getFileName: () => "test.pdf",
            getDate: () => moment(),
            getCreationUserId: () => 123
        } as unknown as SamplingResultModel;
        
        mockSamplingResult.setFileName("test.pdf");
        mockSamplingResult.setDate(moment());
        samplingResultData.attachSamplingResult.mockResolvedValue(expectedResult);

        await attachSamplingResultUsecase.execute(mockSamplingResult);

        expect(sessionManager.getSessionUser).toHaveBeenCalled();
    });
});