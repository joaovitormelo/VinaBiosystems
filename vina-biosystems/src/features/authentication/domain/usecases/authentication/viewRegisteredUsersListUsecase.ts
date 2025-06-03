import { UserDataContract } from "../../../data/authentication/userDataContract";
import { UserModel } from "../../models/userModel";

export class ViewRegisteredUsersListUsecase {
    private userData: UserDataContract;

    constructor(userData: UserDataContract) {
        this.userData = userData;
    }

    viewRegisteredUsersList(): Array<UserModel> {
        return this.userData.fetchUsers();
    }
}