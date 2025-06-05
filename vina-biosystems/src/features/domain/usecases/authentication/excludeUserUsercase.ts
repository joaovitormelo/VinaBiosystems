import { UsecaseException } from "../../../../core/exceptions/usecaseException";
import { UserDataContract } from "../../../data/authentication/userDataContract";
import { UserModel } from "../../models/userModel";


export class ExcludeUserUsecase {
    private userData: UserDataContract;

    constructor(
        userData: UserDataContract
    ) {
        this.userData = userData;
    }

    async excludeUser(user: UserModel): Promise<void> {
        if (!user.getId()) {
            throw new UsecaseException("O usuário deve possuir ID!");
        }
        if (user.getIsAdmin()) {
            throw new UsecaseException("Não é possível remover um admin!");
        }
        await this.userData.deleteUser(user);
    }
}