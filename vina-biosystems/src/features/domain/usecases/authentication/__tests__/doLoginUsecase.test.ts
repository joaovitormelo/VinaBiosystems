import { DatabaseException } from "../../../../../core/exceptions/databaseException";
import { IncorrectPasswordException } from "../../../../../core/exceptions/incorrectPasswordException";
import { UserNotFoundException } from "../../../../../core/exceptions/userNotFoundException";
import { SessionManagerContract } from "../../../../../core/session/sessionManagerContract";
import { SessionManagerMock } from "../../../../../core/session/sessionManagerMock";
import { CriptographyContract } from "../../../../../utils/criptography/criptographyContract";
import { CriptographyMock } from "../../../../../utils/criptography/criptographyMock";
import { UserDataContract } from "../../../../data/authentication/userDataContract";
import { UserDataMock } from "../../../../data/authentication/userDataMock";
import { UserModel } from "../../../models/userModel";
import { DoLoginUsecase } from "../doLoginUsecase";

describe('DoLoginUsecase', () => {
    let doLoginUsecase: DoLoginUsecase;
    let userData: UserDataContract;
    let criptography: CriptographyContract;
    let sessionManager: SessionManagerContract;
    let userEmail: string;
    let userPassword: string;

    beforeAll(() => {
        criptography = new CriptographyMock();
        userData = new UserDataMock();
        sessionManager = new SessionManagerMock();
        doLoginUsecase = new DoLoginUsecase(userData, criptography, sessionManager);
        userEmail = "teste@teste.com";
        userPassword = "123456";
        console.error = jest.fn(); // Omite logs de erro durante os testes
    });

    beforeEach(() => {
        jest.spyOn(userData, "searchUserByEmail").mockResolvedValue(UserModel.getMock());
        jest.spyOn(criptography, "checkIfPasswordsMatch").mockReturnValue(true);
    });

    it("Deve chamar searchUserByEmail passando o email correto", async () => {
        const searchUserByEmailSpy = jest.spyOn(userData, "searchUserByEmail");
        await doLoginUsecase.execute(userEmail, userPassword);
        expect(searchUserByEmailSpy).toHaveBeenCalledWith(userEmail);
    });

    it("Deve dar throw DatabaseException se searchUserByEmail falhar", async () => {
        jest.spyOn(userData, "searchUserByEmail").mockRejectedValue(
            new DatabaseException("Database error")
        );
        await expect(
            doLoginUsecase.execute(userEmail, userPassword)
        ).rejects.toBeInstanceOf(DatabaseException);
    });

    it("Deve dar throw UserNotFoundException se o usuário não for encontrado", async () => {
        jest.spyOn(userData, "searchUserByEmail").mockResolvedValue(null);
        await expect(
            doLoginUsecase.execute(userEmail, userPassword)
        ).rejects.toBeInstanceOf(UserNotFoundException);
    });

    it("Deve chamar checkIfPasswordsMatch com a senha correta", async () => {
        const checkIfPasswordsMatchSpy = jest.spyOn(criptography, "checkIfPasswordsMatch");
        await doLoginUsecase.execute(userEmail, userPassword);
        expect(checkIfPasswordsMatchSpy).toHaveBeenCalledWith(
            UserModel.getMock().getPassword(),
            userPassword
        );
    });

    it("Deve dar throw IncorrectPasswordException se as senhas não coincidirem", async () => {
        jest.spyOn(criptography, "checkIfPasswordsMatch").mockReturnValue(false);
        await expect(
            doLoginUsecase.execute(userEmail, userPassword)
        ).rejects.toBeInstanceOf(IncorrectPasswordException);
    });

    it("Deve chamar saveSession com o usuário correto", async () => {
        const saveSessionSpy = jest.spyOn(sessionManager, "saveSession");
        await doLoginUsecase.execute(userEmail, userPassword);
        expect(saveSessionSpy).toHaveBeenCalledWith(UserModel.getMock());
    });
});