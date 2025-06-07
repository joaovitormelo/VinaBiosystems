import { DatabaseException } from "../../../../core/exceptions/databaseException";
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

    async execute(user: UserModel): Promise<void> {
        if (!user.getId()) {
            throw new UsecaseException("O usuário deve possuir ID!");
        }
        if (user.getIsAdmin()) {
            throw new UsecaseException("Não é possível remover um admin!");
        }
        try {
            await this.userData.deleteUser(user);
        } catch(error) {
            console.error(error);
            throw new DatabaseException("Não foi possível excluir o usuário " + user.getLogin());
        }
    }
}