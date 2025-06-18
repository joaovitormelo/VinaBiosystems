import { DatabaseException } from "../../../../../core/exceptions/databaseException";
import { ValidationException } from "../../../../../core/exceptions/validationException";
import { UserDataContract } from "../../../../data/authentication/userDataContract";
import { UserDataMock } from "../../../../data/authentication/userDataMock";
import { UserModel } from "../../../models/userModel";
import { RegisterNewUserUsecase } from "../registerNewUserUsecase"

describe("RegisterNewUserUsecase", () => {
    let registerNewUserUsecase: RegisterNewUserUsecase;
    let userData: UserDataContract;
    let mockUser: UserModel;

    beforeAll(() => {
        userData = new UserDataMock();

        mockUser = UserModel.getMock();

        registerNewUserUsecase = new RegisterNewUserUsecase(userData);
        console.error = jest.fn(); // Omite logs de erro durante os testes
    });

    beforeEach(() => {
        jest.spyOn(userData, "searchUserByEmail").mockResolvedValue(null);
        jest.spyOn(userData, "createUser").mockResolvedValue();
        mockUser.setPassword("123456");
    });

    it("Deve chamar searchUserByEmail passando o email correto", async () => {
        const searchUserByEmailSpy = jest.spyOn(userData, "searchUserByEmail");
        await registerNewUserUsecase.execute(mockUser);
        expect(searchUserByEmailSpy).toHaveBeenCalledWith(mockUser.getEmail());
    });

    it("Deve dar throw DatabaseException se searchUserByEmail falhar", async () => {
        jest.spyOn(userData, "searchUserByEmail").mockRejectedValue(
            new Error("Database error")
        );
        await expect(
            registerNewUserUsecase.execute(mockUser)
        ).rejects.toBeInstanceOf(DatabaseException)
    });

    it("Deve dar throw ValidationException se o usuário já existir", async () => {
        jest.spyOn(userData, "searchUserByEmail").mockResolvedValue(mockUser);
        await expect(
            registerNewUserUsecase.execute(mockUser)
        ).rejects.toBeInstanceOf(ValidationException)
    });

    it("Deve chamar createUser com o usuário correto", async () => {
        const createUserSpy = jest.spyOn(userData, "createUser");
        await registerNewUserUsecase.execute(mockUser);
        expect(createUserSpy).toHaveBeenCalledWith(mockUser);
    });

    it("Deve dar throw DatabaseException se createUser falhar", async () => {
        jest.spyOn(userData, "createUser").mockRejectedValue(
            new Error("Database error")
        );
        await expect(
            registerNewUserUsecase.execute(mockUser)
        ).rejects.toBeInstanceOf(DatabaseException);
    });

    it("Deve validar os campos do usuário", async () => {
        const validateFieldsSpy = jest.spyOn(registerNewUserUsecase, "validateFields");

        await registerNewUserUsecase.execute(mockUser);

        expect(validateFieldsSpy).toHaveBeenCalledWith(mockUser);
    });

    it("Deve dar throw ValidationException se o email for vazio", async () => {
        const invalidUser = UserModel.getMock();
        invalidUser.setEmail("");

        await expect(
            registerNewUserUsecase.execute(invalidUser)
        ).rejects.toThrow(ValidationException);
    });

    it("Deve dar throw ValidationException se a senha for vazia", async () => {
        const invalidUser = UserModel.getMock();
        invalidUser.setPassword("");

        await expect(
            registerNewUserUsecase.execute(invalidUser)
        ).rejects.toThrow(ValidationException);
    });

    it("Deve dar throw ValidationException se a senha tiver menos de 6 caracteres", async () => {
        const invalidUser = UserModel.getMock();
        invalidUser.setPassword("123");
        await expect(
            registerNewUserUsecase.execute(invalidUser)
        ).rejects.toBeInstanceOf(ValidationException);
    });

    it("Deve dar throw ValidationException se o nome for vazio", async () => {
        const invalidUser = UserModel.getMock();
        invalidUser.setName("");

        await expect(
            registerNewUserUsecase.execute(invalidUser)
        ).rejects.toThrow(ValidationException);
    });

});