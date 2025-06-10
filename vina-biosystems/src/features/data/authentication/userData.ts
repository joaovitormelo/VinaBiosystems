import { UserModel } from "../../domain/models/userModel";
import { UserDataContract } from "./userDataContract";
import { BackendContract, ROUTES } from "../utils/backendContract";

export class UserData implements UserDataContract {
    private backend: BackendContract;

    constructor(backend: BackendContract) {
        this.backend = backend;
    }

    async searchUserByLogin(login: string): Promise<UserModel | null> {
        return null;
    }

    async fetchUsers(): Promise<Array<UserModel>> {
        const response = await this.backend.fetchData(ROUTES.USER.SELECT_USERS, null);
        return response.map((user: any) => {
            return UserModel.fromJson(user);
        });
    }

    async updateUser(user: UserModel): Promise<void> {
        
    }

    async deleteUser(user: UserModel): Promise<void> {
        
    }

    async createUser(user: UserModel): Promise<void> {
        const data = user.toJson();
        await this.backend.postData(ROUTES.USER.INSERT_USER, data);
    }
}