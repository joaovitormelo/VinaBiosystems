import { DatabaseException } from "../../../../../core/exceptions/databaseException";
import { UserDataContract } from "../../../../data/authentication/userDataContract";
import { UserDataMock } from "../../../../data/authentication/userDataMock";
import { UserModel } from "../../../models/userModel";
import { ViewRegisteredUsersListUsecase } from "../viewRegisteredUsersListUsecase";

describe("ViewRegisteredUsersListUsecase", () => {
    let viewRegisteredUsersListUsecase: ViewRegisteredUsersListUsecase;
    let userData: UserDataContract;
    let mockUser: UserModel;

    beforeAll(() => {
        userData = new UserDataMock();
        viewRegisteredUsersListUsecase = new ViewRegisteredUsersListUsecase(userData);
        console.error = jest.fn(); // Omite logs de erro durante os testes
        mockUser = UserModel.getMock();
        mockUser.setPassword(null);
    });

    beforeEach(() => {
        jest.spyOn(userData, "fetchUsers").mockResolvedValue([UserModel.getMock()]);
    });

    it("Deve chamar getAllUsers", async () => {
        const getAllUsersSpy = jest.spyOn(userData, "fetchUsers");
        await viewRegisteredUsersListUsecase.execute();
        expect(getAllUsersSpy).toHaveBeenCalled();
    });

    it("Deve retornar a lista de usuários (sem senha)", async () => {
        const users = await viewRegisteredUsersListUsecase.execute();
        expect(users).toEqual([mockUser]);
    });

    it("Deve dar throw DatabaseException se getAllUsers falhar", async () => {
        jest.spyOn(userData, "fetchUsers").mockRejectedValue(new DatabaseException("Database error"));
        await expect(viewRegisteredUsersListUsecase.execute()).rejects.toBeInstanceOf(DatabaseException);
    });
});