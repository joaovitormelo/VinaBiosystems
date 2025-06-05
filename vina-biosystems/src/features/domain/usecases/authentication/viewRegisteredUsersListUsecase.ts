
import { UserDataContract } from "../../../data/authentication/userDataContract";
import { UserModel } from "../../models/userModel";

export class ViewRegisteredUsersListUsecase {
    private userData: UserDataContract;

    constructor(userData: UserDataContract) {
        this.userData = userData;
    }

    async viewRegisteredUsersList(): Promise<Array<UserModel>> {
        const userList = await this.userData.fetchUsers();
        return userList.map((user) => {
            user.setPassword(null);
            return user;
        });
    }
}