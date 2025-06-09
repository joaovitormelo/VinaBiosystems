import { SessionManagerContract } from "../../../../core/session/sessionManagerContract";

export class DoLogoutUsecase {
    private sessionManager: SessionManagerContract;

    constructor(sessionManager: SessionManagerContract) {
        this.sessionManager = sessionManager;
    }

    public async execute(): Promise<void> {
        await this.sessionManager.clearSession();
    }
}