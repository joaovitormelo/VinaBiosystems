import { DatabaseException } from "../../../../../core/exceptions/databaseException";
import { UsecaseException } from "../../../../../core/exceptions/usecaseException";
import { UserDataContract } from "../../../../data/authentication/userDataContract";
import { UserDataMock } from "../../../../data/authentication/userDataMock";
import { UserModel } from "../../../models/userModel";
import { ExcludeUserUsecase } from "../excludeUserUsercase"

describe("ExcludeUserUsecase", () => {
    let excludeUserUsecase: ExcludeUserUsecase;
    let userData: UserDataContract;

    beforeAll(() => {
        userData = new UserDataMock();
        excludeUserUsecase = new ExcludeUserUsecase(userData);
        console.error = jest.fn(); // Omite logs de erro durante os testes
    });

    beforeEach(() => {
        jest.spyOn(userData, "deleteUser").mockResolvedValue();
    });

    it("Deve dar throw UsecaseException se o usuário não tiver ID", async () => {
        const userWithoutId = UserModel.getMock();
        userWithoutId.setId(null);
        await expect(
            excludeUserUsecase.execute(userWithoutId)
        ).rejects.toBeInstanceOf(UsecaseException);
    });

    it("Deve dar throw UsecaseException se o usuário for admin", async () => {
        const adminUser = UserModel.getMock();
        adminUser.setIsAdmin(true);
        await expect(
            excludeUserUsecase.execute(adminUser)
        ).rejects.toBeInstanceOf(UsecaseException);
    });

    it("Deve chamar deleteUser passando o usuário correto", async () => {
        const user = UserModel.getMock();
        const deleteUserSpy = jest.spyOn(userData, "deleteUser");
        await excludeUserUsecase.execute(user);
        expect(deleteUserSpy).toHaveBeenCalledWith(user);
    });

    it("Deve dar throw DatabaseException se deleteUser falhar", async () => {
        jest.spyOn(userData, "deleteUser").mockRejectedValue(
            new Error("Database error")
        );
        const user = UserModel.getMock();
        await expect(
            excludeUserUsecase.execute(user)
        ).rejects.toBeInstanceOf(DatabaseException)
    });
});