
import { DatabaseException } from "../../../../core/exceptions/databaseException";
import { UserDataContract } from "../../../data/authentication/userDataContract";
import { UserModel } from "../../models/userModel";

export class ViewRegisteredUsersListUsecase {
    private userData: UserDataContract;

    constructor(userData: UserDataContract) {
        this.userData = userData;
    }

    async viewRegisteredUsersList(): Promise<Array<UserModel>> {
        let userList: Array<UserModel> = [];
        try {
            userList = await this.userData.fetchUsers();
        } catch(error) {
            console.error(error);
            throw new DatabaseException("Não foi possível buscar a lista de usuários!");
        }
        return userList.map((user) => {
            user.setPassword(null);
            return user;
        });
    }
}