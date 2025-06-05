import { UserModel } from "../../features/domain/models/userModel";
import { SessionManagerContract } from "./sessionManagerContract";

export class SessionManager implements SessionManagerContract {
    private sessionUser: UserModel | null = null;

    saveSession(user: UserModel): void {
        this.sessionUser = user;
    }
    getSessionUser(): UserModel | null {
        return this.sessionUser;
    }
    
}