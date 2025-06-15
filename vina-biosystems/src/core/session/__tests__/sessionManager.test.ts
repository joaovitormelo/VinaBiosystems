import { UserModel } from "../../../features/domain/models/userModel";
import { SessionManager } from "../sessionManager";

describe("SessionManager", () => {
    let sessionManager: SessionManager;

    beforeAll(() => {
        // Mock de window.localStorage
        Object.defineProperty(global, 'window', {
            value: {
                localStorage: {
                    setItem: jest.fn(),
                    getItem: jest.fn(),
                    removeItem: jest.fn(),
                },
            },
            writable: true,
        });
    });

    beforeEach(() => {
        sessionManager = new SessionManager();
    });

    describe("saveSession", () => {
        it("Se houver localStorage, deve chamar window.setItem com o usuário salvo", () => {
            const user = UserModel.getMock();
            const setItemSpy = jest.spyOn(window.localStorage, "setItem");

            sessionManager.saveSession(user);

            expect(setItemSpy).toHaveBeenCalledWith("sessionUser", JSON.stringify(user));
        });

        it("Deve salvar e recuperar a sessão do usuário", () => {
            const user = UserModel.getMock();
            sessionManager.saveSession(user);

            const sessionUser = sessionManager.getSessionUser();
            expect(sessionUser).toEqual(user);
        });
    });

    describe("getSessionUser", () => {
        it("Se houver usuário na sessão, deve retornar o usuário salvo", () => {
            const user = UserModel.getMock();
            sessionManager.saveSession(user);

            const sessionUser = sessionManager.getSessionUser();
            expect(sessionUser).toEqual(user);
        });

        it("Se não houver usuário na sessão, deve tentar recuperar do localStorage", () => {
            const user = UserModel.getMock();
            jest.spyOn(window.localStorage, "getItem").mockImplementation(
                () => JSON.stringify(user)
            );

            const sessionUser = sessionManager.getSessionUser();
            expect(sessionUser).toEqual(user);
        });

        it("Se não houver usuário na sessão e localStorage estiver vazio, deve retornar null", () => {
            jest.spyOn(window.localStorage, "getItem").mockImplementation(
                () => null
            );

            const sessionUser = sessionManager.getSessionUser();
            expect(sessionUser).toBeNull();
        });
    });
});