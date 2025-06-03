import { UserModel } from "../../features/authentication/domain/models/userModel";

export interface SessionManagerContract {
    saveSession(user: UserModel) : void;
};