import { UserModel } from "../../domain/models/userModel";

export interface UserDataContract {
    searchUserByLogin(login: string): UserModel | null;
    fetchUsers(): Array<UserModel>;
};