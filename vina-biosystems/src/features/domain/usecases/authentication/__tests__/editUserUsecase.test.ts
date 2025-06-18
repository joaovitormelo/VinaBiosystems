import { DatabaseException } from "../../../../../core/exceptions/databaseException";
import { ExistentUserException } from "../../../../../core/exceptions/existentUserException";
import { PermissionException } from "../../../../../core/exceptions/permissionException";
import { UsecaseException } from "../../../../../core/exceptions/usecaseException";
import { SessionManagerContract } from "../../../../../core/session/sessionManagerContract";
import { SessionManagerMock } from "../../../../../core/session/sessionManagerMock";
import { UserDataContract } from "../../../../data/authentication/userDataContract";
import { UserDataMock } from "../../../../data/authentication/userDataMock";
import { UserModel } from "../../../models/userModel";
import { EditUserUsecase } from "../editUserUsecase";

describe("EditUserUsecase", () => {
    let editUserUsecase: EditUserUsecase;
    let userData: UserDataContract;
    let sessionManager: SessionManagerContract;
    let user: UserModel;
    let differentId: number;

    beforeAll(() => {
        userData = new UserDataMock();
        sessionManager = new SessionManagerMock();
        editUserUsecase = new EditUserUsecase(userData, sessionManager);
        user = UserModel.getMock();
        differentId = 5;
        console.error = jest.fn(); // Omite logs de erro durante os testes
    });

    beforeEach(() => {
        jest.spyOn(userData, "searchUserByEmail").mockResolvedValue(UserModel.getMock());
    });

    it("Deve chamar searchUserByEmail passando o email correto", async () => {
        const searchUserByEmailSpy = jest.spyOn(userData, "searchUserByEmail");
        await editUserUsecase.execute(user);
        expect(searchUserByEmailSpy).toHaveBeenCalledWith(user.getEmail());
    });

    it("Deve dar throw DatabaseException se searchUserByEmail falhar", async () => {
        jest.spyOn(userData, "searchUserByEmail").mockRejectedValue(
            new DatabaseException("Database error")
        );
        await expect(editUserUsecase.execute(user)).rejects.toBeInstanceOf(DatabaseException);
    });

    it("Deve dar throw ExistentUserException se o usuário já existir com outro ID", async () => {
        const existingUser = UserModel.getMock();
        existingUser.setId(differentId);
        jest.spyOn(userData, "searchUserByEmail").mockResolvedValue(existingUser);
        await expect(editUserUsecase.execute(user)).rejects.toBeInstanceOf(ExistentUserException);
    });

    it("Deve dar throw UsecaseException se o usuário não tiver ID", async () => {
        const userWithoutId = UserModel.getMock();
        userWithoutId.setId(null);
        await expect(editUserUsecase.execute(userWithoutId)).rejects.toBeInstanceOf(UsecaseException);
    });

    it("Deve chamar updateUser com o usuário correto", async () => {
        const updateUserSpy = jest.spyOn(userData, "updateUser");
        await editUserUsecase.execute(user);
        expect(updateUserSpy).toHaveBeenCalledWith(user);
    });

    it("Deve dar throw PermissionException se tentar redefinir senha sem permissão", async () => {
        const currentUser = UserModel.getMock();
        currentUser.setIsAdmin(false);
        currentUser.setId(differentId);
        sessionManager.saveSession(currentUser);
        user.setPassword("new-password");
        await expect(editUserUsecase.execute(user)).rejects.toBeInstanceOf(PermissionException);
    }
    );
    it("Deve chamar updateUser mesmo se o usuário for admin e redefinir senha", async () => {
        const currentUser = UserModel.getMock();
        currentUser.setIsAdmin(true);
        sessionManager.saveSession(currentUser);
        user.setPassword("new-password");
        const updateUserSpy = jest.spyOn(userData, "updateUser");
        await editUserUsecase.execute(user);
        expect(updateUserSpy).toHaveBeenCalledWith(user);
    });
    it("Deve dar throw DatabaseException se updateUser falhar", async () => {
        jest.spyOn(userData, "updateUser").mockRejectedValue(
            new DatabaseException("Database error")
        );
        await expect(editUserUsecase.execute(user)).rejects.toBeInstanceOf(DatabaseException);
    });
});