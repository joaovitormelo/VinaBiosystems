import { DatabaseException } from "../../../../core/exceptions/databaseException";
import { IncorrectPasswordException } from "../../../../core/exceptions/incorrectPasswordException";
import { UserNotFoundException } from "../../../../core/exceptions/userNotFoundException";
import { SessionManagerContract } from "../../../../core/session/sessionManagerContract";
import { CriptographyContract } from "../../../../utils/criptography/criptographyContract";
import { UserDataContract } from "../../../data/authentication/userDataContract";


export class DoLoginUsecase {
    private userData: UserDataContract;
    private criptography: CriptographyContract;
    private sessionManager: SessionManagerContract;

    constructor(
        userData: UserDataContract, criptography: CriptographyContract,
        sessionManager: SessionManagerContract
    ) {
        this.userData = userData;
        this.criptography = criptography;
        this.sessionManager = sessionManager;
    }

    async execute(login: string, password: string): Promise<void> {
        let user;
        try {
            user = await this.userData.searchUserByLogin(login);
        } catch(error) {
            console.error(error);
            throw new DatabaseException("Não foi possível buscar o usuário " + login);
        }
        if (!user) {
            throw new UserNotFoundException(login);
        }
        const match = this.criptography.checkIfPasswordsMatch(user.getPassword(), password);
        if (!match) {
            throw new IncorrectPasswordException(login);
        }
        this.sessionManager.saveSession(user);
    }
}