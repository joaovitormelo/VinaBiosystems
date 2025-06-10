import { DatabaseException } from "../../../../core/exceptions/databaseException";
import { ExistentUserException } from "../../../../core/exceptions/existentUserException";
import { PermissionException } from "../../../../core/exceptions/permissionException";
import { UsecaseException } from "../../../../core/exceptions/usecaseException";
import { SessionManagerContract } from "../../../../core/session/sessionManagerContract";
import { UserDataContract } from "../../../data/authentication/userDataContract";
import { UserModel } from "../../models/userModel";


export class EditUserUsecase {
    private userData: UserDataContract;
    private sessionManager: SessionManagerContract;

    constructor(
        userData: UserDataContract, sessionManager: SessionManagerContract
    ) {
        this.userData = userData;
        this.sessionManager = sessionManager;
    }

    async execute(user: UserModel): Promise<void> {
        if (!user.getId()) {
            throw new UsecaseException("O usuário deve possuir ID!");
        }
        let userInDb: UserModel | null;
        try {
            userInDb = await this.userData.searchUserByEmail(user.getEmail());
        } catch(error) {
            console.error(error);
            throw new DatabaseException("Não foi possível buscar o usuário " + user.getEmail());
        }
        if (userInDb && userInDb.getId() !== user.getId()) {
            throw new ExistentUserException(user.getEmail());
        }
        const currentUser: UserModel = this.sessionManager.getSessionUser() as UserModel;
        // Tentativa de redefinir senha
        if (user.getPassword() != null) {
            // Se o usuário atual não for admin e não for o próprio usuário, lança exceção
            if (!currentUser.getIsAdmin() && currentUser.getId() !== user.getId()) {
                throw new PermissionException(currentUser.getEmail(), "Somente admins podem redefinir senhas!");
            }
        }
        try {
            await this.userData.updateUser(user);
        } catch(error) {
            console.error(error);
            throw new DatabaseException("Não foi possível atualizar o usuário " + user.getEmail());
        }
    }
}