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
        static readonly REMOVE_RAW_MATERIAL_QUANTITY_FROM_INVENTORY = "/removeRawMaterialQuantityFromInventory";
    };

    public static BATCH = class {
        static readonly SELECT_BATCHES = "/selectBatches";
        static readonly INSERT_BATCH = "/insertBatch";
        static readonly UPDATE_BATCH_SITUATION = "/updateBatchSituation";
        static readonly GET_RAW_MATERIAL_LIST_BY_BATCH_ID = "/getRawMaterialListByBatchId";
        static readonly ADD_RAW_MATERIAL_TO_BATCH = "/addRawMaterialToBatch";
        static readonly UPDATE_BATCH = "/updateBatch";
        static readonly UPDATE_END_DATE_OF_BATCH = "/updateEndDateOfBatch";
    };

    public static PRODUCT = class {
        static readonly SELECT_PRODUCTS = "/selectProducts";
        static readonly SELECT_PRODUCT_BY_ID = "/selectProductById";
        static readonly INSERT_PRODUCT = "/insertProduct";
        static readonly UPDATE_PRODUCT = "/updateProduct";
        static readonly DELETE_PRODUCT = "/deleteProduct";
        static readonly ADD_TO_PRODUCT_QUANTITY = "/addToProductQuantity";
    }
};

export interface BackendContract {

    fetchData(endpoint: string, params: any): Promise<any>;

    postData(endpoint: string, data: any): Promise<any>;

    putData(endpoint: string, data: any): Promise<any>;

    deleteData(endpoint: string, data: any): Promise<void>;
}