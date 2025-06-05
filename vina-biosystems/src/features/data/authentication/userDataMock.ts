
import { UserModel } from "../../domain/models/userModel";
import { UserDataContract } from "./userDataContract";

export class UserDataMock implements UserDataContract {
    async fetchUsers(): Promise<Array<UserModel>> {
        return [
            UserModel.getMock(),
            UserModel.getMock()
        ];
    }

    async searchUserByLogin(login: string): Promise<UserModel | null> {
        const returnedUser = UserModel.getMock();
        returnedUser.setIsAdmin(true);
        return returnedUser;
    }

    async updateUser(user: UserModel): Promise<void> {
        //
    }

    async deleteUser(user: UserModel): Promise<void> {
        //
    }
}