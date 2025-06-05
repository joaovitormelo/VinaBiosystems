import { PermissionException } from "../../../../core/exceptions/permissionException";
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

    async editUser(user: UserModel): Promise<void> {
        if (!user.getId()) {
            throw new Error("O Id do usuário editado deve ser informado!");
        }
        const currentUser: UserModel = this.sessionManager.getSessionUser() as UserModel;
        if (!currentUser.getIsAdmin() && user.getPassword() != null) {
            throw new PermissionException(currentUser.getLogin(), "Somente admins podem redefinir senhas!");
        }
        await this.userData.updateUser(user);
    }
}