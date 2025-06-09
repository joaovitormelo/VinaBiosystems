
import { UserModel } from "../../features/domain/models/userModel";
import { SessionManagerContract } from "./sessionManagerContract";

export class SessionManagerMock implements SessionManagerContract {
    private sessionUser: UserModel | null = null;

    clearSession(): void {
        this.sessionUser = null;
    }

    saveSession(user: UserModel): void {
        this.sessionUser = user;
    }

    getSessionUser(): UserModel {
        if (this.sessionUser) {
            return this.sessionUser;
        }
        return UserModel.getMock();
    }
}