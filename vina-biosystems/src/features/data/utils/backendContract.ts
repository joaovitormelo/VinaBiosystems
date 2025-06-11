export class ROUTES {
    public static USER = class {
        static readonly SELECT_USERS = "/selectUsers";
        static readonly SELECT_USER_BY_EMAIL = "/selectUserByEmail";
        static readonly INSERT_USER = "/insertUser";
        static readonly UPDATE_USER = "/updateUser";
        static readonly DELETE_USER = "/deleteUser";
    }

    public static RAW_MATERIAL = class {
        static readonly SELECT_RAW_MATERIALS = "/selectRawMaterials";
        static readonly SELECT_RAW_MATERIAL_BY_NAME = "/selectRawMaterialByName";
        static readonly SELECT_RAW_MATERIAL_BY_ID = "/selectRawMaterialById";
        static readonly INSERT_RAW_MATERIAL = "/insertRawMaterial";
        static readonly UPDATE_RAW_MATERIAL = "/updateRawMaterial";
        static readonly DELETE_RAW_MATERIAL = "/deleteRawMaterial";
        static readonly IS_RAW_MATERIAL_BEING_USED_IN_BATCH = "/isRawMaterialBeingUsedInABatch";
    };

    public static BATCH = class {
        static readonly SELECT_BATCHES = "/selectBatches";
        static readonly INSERT_BATCH = "/insertBatch";
        static readonly UPDATE_BATCH_SITUATION = "/updateBatchSituation";
        static readonly GET_RAW_MATERIAL_LIST_BY_BATCH_ID = "/getRawMaterialListByBatchId";
        static readonly ADD_RAW_MATERIAL_TO_BATCH = "/addRawMaterialToBatch";
    };
};

export interface BackendContract {

    fetchData(endpoint: string, params: any): Promise<any>;

    postData(endpoint: string, data: any): Promise<any>;

    putData(endpoint: string, data: any): Promise<any>;

    deleteData(endpoint: string, data: any): Promise<void>;
}