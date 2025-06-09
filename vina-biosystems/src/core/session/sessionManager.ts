import { UserModel } from "../../features/domain/models/userModel";
import { SessionManagerContract } from "./sessionManagerContract";

export class SessionManager implements SessionManagerContract {
    private sessionUser: UserModel | null = null;

    saveSession(user: UserModel): void {
        this.sessionUser = user;
        // Optionally, persist to localStorage/sessionStorage if running in browser
        if (typeof window !== "undefined" && window.localStorage) {
            window.localStorage.setItem("sessionUser", JSON.stringify(user));
        }
    }

    getSessionUser(): UserModel | null {
        if (this.sessionUser) {
            return this.sessionUser;
        }
        // Try to restore from localStorage if available
        if (typeof window !== "undefined" && window.localStorage) {
            const userJson = window.localStorage.getItem("sessionUser");
            if (userJson) {
                try {
                    this.sessionUser = JSON.parse(userJson) as UserModel;
                    return this.sessionUser;
                } catch {
                    return null;
                }
            }
        }
        return null;
    }

    clearSession(): void {
        this.sessionUser = null;
        if (typeof window !== "undefined" && window.localStorage) {
            window.localStorage.removeItem("sessionUser");
        }
    }
}