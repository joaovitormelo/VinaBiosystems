import { UserModel } from "../../features/domain/models/userModel";


export interface SessionManagerContract {
    saveSession(user: UserModel) : void;
    getSessionUser(): UserModel | null;
};