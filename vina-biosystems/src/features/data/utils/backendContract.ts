export class ROUTES {
    public static USER = class {
        static readonly SELECT_USERS = "/selectUsers";
        static readonly SELECT_USER_BY_ID = "/selectUserById";
        static readonly INSERT_USER = "/insertUser";
        static readonly UPDATE_USER = "/updateUser";
        static readonly DELETE_USER = "/deleteUser";
    }
};

export interface BackendContract {

    fetchData(endpoint: string, data: any): Promise<any>;

    postData(endpoint: string, data: any): Promise<any>;

    putData(endpoint: string, data: any): Promise<any>;

    deleteData(endpoint: string, data: any): Promise<void>;
}