import { UserModel } from "../../features/domain/models/userModel";


export interface SessionManagerContract {
    clearSession(): void;
    saveSession(user: UserModel) : void;
    getSessionUser(): UserModel | null;
};