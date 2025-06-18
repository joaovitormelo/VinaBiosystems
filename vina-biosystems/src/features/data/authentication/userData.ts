import { UserModel } from "../../domain/models/userModel";
import { UserDataContract } from "./userDataContract";
import { BackendContract, ROUTES } from "../utils/backendContract";

export class UserData implements UserDataContract {
    private backend: BackendContract;

    constructor(backend: BackendContract) {
        this.backend = backend;
    }

    async searchUserByEmail(email: string): Promise<UserModel | null> {
        const response = await this.backend.fetchData(ROUTES.USER.SELECT_USER_BY_EMAIL, {email});
        if (!response) return null;
        return UserModel.fromJson(response);
    }

    async fetchUsers(): Promise<Array<UserModel>> {
        const response = await this.backend.fetchData(ROUTES.USER.SELECT_USERS, null);
        if (!response) return [];
        return response.map((user: any) => {
            return UserModel.fromJson(user);
        });
    }

    async updateUser(user: UserModel): Promise<void> {
        const data = user.toJson();
        await this.backend.putData(ROUTES.USER.UPDATE_USER, data);
    }

    async deleteUser(user: UserModel): Promise<void> {
        const data = user.toJson();
        await this.backend.deleteData(ROUTES.USER.DELETE_USER, data);
    }

    async createUser(user: UserModel): Promise<void> {
        const data = user.toJson();
        await this.backend.postData(ROUTES.USER.INSERT_USER, data);
    }
}