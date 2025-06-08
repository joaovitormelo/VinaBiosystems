import { DatabaseException } from "../../../../core/exceptions/databaseException";
import { IncorrectPasswordException } from "../../../../core/exceptions/incorrectPasswordException";
import { UsecaseException } from "../../../../core/exceptions/usecaseException";
import { UserNotFoundException } from "../../../../core/exceptions/userNotFoundException";
import { ValidationException } from "../../../../core/exceptions/validationException";
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
        this.validateFields(user);
        let userInDB: UserModel | null;
        try {
            userInDB = await this.userData.searchUserByLogin(user.getLogin());
        } catch (error) {
            console.error(error);
            throw new DatabaseException("Não foi possível buscar o usuário " + user.getLogin());
        }
        if (userInDB) {
            throw new ValidationException("login", "Já existe um usuário com este login.");
        }
        try {
            return await this.userData.createUser(user);
        } catch(error) {
            console.error(error);
            throw new DatabaseException("Não foi possível cadastrar o usuário " + user.getLogin());
        }
    }

    validateFields(user: UserModel) {
        if (!user.getLogin()) {
            throw new ValidationException("login", "Login não pode ser vazio.");
        }
        if (!user.getPassword()) {
            throw new ValidationException("password", "Senha não pode ser vazia.");
        }
        if (user.getPassword() && (user.getPassword() as string).length < 6) {
            throw new ValidationException("password", "Senha deve ter pelo menos 6 caracteres.");
        }
        if (!user.getName()) {
            throw new ValidationException("name", "Nome não pode ser vazio.");
        }
    }
}