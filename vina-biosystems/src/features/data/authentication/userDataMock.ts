
import { UserModel } from "../../domain/models/userModel";
import { UserDataContract } from "./userDataContract";

export class UserDataMock implements UserDataContract {
    async fetchUsers(): Promise<Array<UserModel>> {
        return [
            new UserModel("Usuário Teste", "teste", "123"),
            new UserModel("Usuário Teste 2", "teste2", "1234")
        ];
    }

    async searchUserByLogin(login: string): Promise<UserModel | null> {
        return new UserModel("Usuário Teste", "teste", "123");
    }
}