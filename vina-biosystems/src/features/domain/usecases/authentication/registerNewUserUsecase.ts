import { DatabaseException } from "../../../../core/exceptions/databaseException";
import { IncorrectPasswordException } from "../../../../core/exceptions/incorrectPasswordException";
import { UsecaseException } from "../../../../core/exceptions/usecaseException";
import { UserNotFoundException } from "../../../../core/exceptions/userNotFoundException";
import { SessionManagerContract } from "../../../../core/session/sessionManagerContract";
import { CriptographyContract } from "../../../../utils/criptography/criptographyContract";
import { UserDataContract } from "../../../data/authentication/userDataContract";
import { UserModel } from "../../models/userModel";


export class RegisterNewUserUsecase {
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

    async execute(user: UserModel): Promise<void> {
        let userInDB = await this.userData.searchUserByLogin(user.getLogin());
        if (userInDB) {
            throw new UsecaseException("Já existe um usuário com este login.");
        }
        try {
            return await this.userData.createUser(user);
        } catch(error) {
            console.error(error);
            throw new DatabaseException("Não foi possível cadastrar o usuário " + user.getLogin());
        }
    }
}