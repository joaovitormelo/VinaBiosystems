import { UserModel } from "../../domain/models/userModel";
import { UserDataContract } from "./userDataContract";

export class UserDataMock implements UserDataContract {
    fetchUsers(): Array<UserModel> {
        return [
            new UserModel("Usuário Teste", "teste", "123"),
            new UserModel("Usuário Teste 2", "teste2", "1234")
        ];
    }
    searchUserByLogin(login: string): UserModel | null {
        return new UserModel("Usuário Teste", "teste", "123");
    }
}