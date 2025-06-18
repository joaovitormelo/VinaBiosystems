import { SessionManagerContract } from "../../../../../core/session/sessionManagerContract";
import { SessionManagerMock } from "../../../../../core/session/sessionManagerMock";
import { DoLogoutUsecase } from "../doLogoutUsecase";

describe("DoLogoutUsecase", () => {
    let doLogoutUsecase: DoLogoutUsecase;
    let sessionManager: SessionManagerContract;

    beforeAll(() => {
        sessionManager = new SessionManagerMock();
        doLogoutUsecase = new DoLogoutUsecase(sessionManager);
        console.error = jest.fn(); // Omite logs de erro durante os testes
    });

    it("Deve chamar clearSession no SessionManager", async () => {
        const clearSessionSpy = jest.spyOn(sessionManager, "clearSession");
        await doLogoutUsecase.execute();
        expect(clearSessionSpy).toHaveBeenCalled();
    });
});