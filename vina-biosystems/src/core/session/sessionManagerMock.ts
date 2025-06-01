import { UserModel } from "../../features/authentication/domain/models/userModel";
import { SessionManagerContract } from "./sessionManagerContract";

export class SessionManagerMock implements SessionManagerContract {
    saveSession(user: UserModel): void {
        //throw new Error("Method not implemented.");
    }
}