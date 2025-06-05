import { UserModel } from "../../domain/models/userModel";

export interface UserDataContract {
    searchUserByLogin(login: string): Promise<UserModel | null>;
    fetchUsers(): Promise<Array<UserModel>>;
    updateUser(user: UserModel): Promise<void>;
};