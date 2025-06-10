
import { UserModel } from "../../domain/models/userModel";
import { UserDataContract } from "./userDataContract";

export class UserDataMock implements UserDataContract {
    private userList: Array<UserModel> = [
        UserModel.getMock()
    ];

    async fetchUsers(): Promise<Array<UserModel>> {
        return this.userList;
    }

    async searchUserByEmail(email: string): Promise<UserModel | null> {
        const user = this.userList.find(user => user.getEmail() === email);
        return user || null;
    }

    async updateUser(user: UserModel): Promise<void> {
        const index = this.userList.findIndex(u => u.getId() === user.getId());
        if (index !== -1) {
            this.userList[index] = user;
        } else {
            throw new Error("User not found");
        }
    }

    async deleteUser(user: UserModel): Promise<void> {
        const index = this.userList.findIndex(u => u.getId() === user.getId());
        if (index !== -1) {
            this.userList.splice(index, 1);
        } else {
            throw new Error("User not found");
        }
    }

    async createUser(user: UserModel): Promise<void> {
        if (this.userList.some(u => u.getLogin() === user.getLogin())) {
            throw new Error("User with this login already exists");
        }
        user.setId(this.userList.length + 1); // Simple ID assignment for mock
        this.userList.push(user);
    }
}