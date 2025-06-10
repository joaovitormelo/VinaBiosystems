import { DatabaseException } from "../../../../core/exceptions/databaseException";
import { ValidationException } from "../../../../core/exceptions/validationException";
import { UserDataContract } from "../../../data/authentication/userDataContract";
import { UserModel } from "../../models/userModel";


export class RegisterNewUserUsecase {
    private userData: UserDataContract;

    constructor(
        userData: UserDataContract
    ) {
        this.userData = userData;
    }

    async execute(user: UserModel): Promise<void> {
        this.validateFields(user);
        let userInDB: UserModel | null;
        try {
            userInDB = await this.userData.searchUserByEmail(user.getEmail());
        } catch (error) {
            console.error(error);
            throw new DatabaseException("Não foi possível buscar o usuário " + user.getEmail());
        }
        if (userInDB) {
            throw new ValidationException("email", "Já existe um usuário com este e-mail.");
        }
        try {
            return await this.userData.createUser(user);
        } catch(error) {
            console.error(error);
            throw new DatabaseException("Não foi possível cadastrar o usuário " + user.getEmail());
        }
    }

    validateFields(user: UserModel) {
        if (!user.getEmail()) {
            throw new ValidationException("email", "E-mail não pode ser vazio.");
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