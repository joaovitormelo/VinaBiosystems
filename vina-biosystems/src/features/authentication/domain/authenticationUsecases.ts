import { UserModel } from "./models/userModel";

export class AuthenticationUsecases {
    public doLogin(): UserModel {
        return new UserModel("João", "joao123");
    }
}