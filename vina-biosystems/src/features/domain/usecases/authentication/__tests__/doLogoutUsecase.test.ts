import { SessionManagerContract } from "../../../../../core/session/sessionManagerContract";
import { SessionManagerMock } from "../../../../../core/session/sessionManagerMock";
import { DoLogoutUsecase } from "../doLogoutUsecase";

describe("DoLogoutUsecase", () => {
    let doLogoutUsecase: DoLogoutUsecase;
    let sessionManager: SessionManagerContract;

    beforeAll(() => {
        sessionManager = new SessionManagerMock();
        doLogoutUsecase = new DoLogoutUsecase(sessionManager);
        console.error = jest.fn(); // Mock console.error to avoid logging errors in tests
    });

    it("Deve chamar clearSession no SessionManager", async () => {
        const clearSessionSpy = jest.spyOn(sessionManager, "clearSession");
        await doLogoutUsecase.execute();
        expect(clearSessionSpy).toHaveBeenCalled();
    });
});