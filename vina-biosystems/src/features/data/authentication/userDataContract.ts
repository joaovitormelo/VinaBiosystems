import { UserModel } from "../../domain/models/userModel";

export interface UserDataContract {
    searchUserByEmail(email: string): Promise<UserModel | null>;
    fetchUsers(): Promise<Array<UserModel>>;
    updateUser(user: UserModel): Promise<void>;
    deleteUser(user: UserModel): Promise<void>;
    createUser(user: UserModel): Promise<void>;
};