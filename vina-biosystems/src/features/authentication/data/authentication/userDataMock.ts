import { UserModel } from "../../domain/models/userModel";
import { UserDataContract } from "./userDataContract";

export class UserDataMock implements UserDataContract {
    searchUserByLogin(login: string): UserModel | null {
        return new UserModel("Usuário Teste", "teste", "123");
    }
}