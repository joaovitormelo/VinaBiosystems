import { UserData } from "../features/data/authentication/userData";
import { UserDataContract } from "../features/data/authentication/userDataContract";
import { InventoryData } from "../features/data/inventory/inventoryData";
import { InventoryDataContract } from "../features/data/inventory/inventoryDataContract";
import { BatchData } from "../features/data/production/batchData";
import { BatchDataContract } from "../features/data/production/batchDataContract";
import { SamplingResultDataContract } from "../features/data/production/samplingResultDataContract";
import { SamplingResultDataMock } from "../features/data/production/samplingResultDataMock";
import { ProductData } from "../features/data/products/productData";
import { ProductDataContract } from "../features/data/products/productsDataContract";
import { NotificationManagerContract } from "../features/data/system/notificationManagerContract";
import { NotificationManagerMock } from "../features/data/system/notificationManagerMock";
import { AxiosAdapter } from "../features/data/utils/axiosAdapter";
import { BackendContract } from "../features/data/utils/backendContract";
import { DoLoginUsecase } from "../features/domain/usecases/authentication/doLoginUsecase";
import { DoLogoutUsecase } from "../features/domain/usecases/authentication/doLogoutUsecase";
import { EditUserUsecase } from "../features/domain/usecases/authentication/editUserUsecase";
import { ExcludeUserUsecase } from "../features/domain/usecases/authentication/excludeUserUsercase";
import { RegisterNewUserUsecase } from "../features/domain/usecases/authentication/registerNewUserUsecase";
import { ViewRegisteredUsersListUsecase } from "../features/domain/usecases/authentication/viewRegisteredUsersListUsecase";
import { CheckInRawMaterialUsecase } from "../features/domain/usecases/inventory/checkInRawMaterialUsecase";
import { CheckOutRawMaterialUsecase } from "../features/domain/usecases/inventory/checkOutRawMaterialUsecase";
import { EditRawMaterialUsecase } from "../features/domain/usecases/inventory/editRawMaterialUsecase";
import { RegisterRawMaterialUsecase } from "../features/domain/usecases/inventory/registerRawMaterialUsecase";
import { RemoveRawMaterialUsecase } from "../features/domain/usecases/inventory/removeRawMaterialUsecase";
import { ViewRawMaterialInventoryUsecase } from "../features/domain/usecases/inventory/viewRawMaterialInventoryUsecase";
import { AttachSamplingResultUsecase } from "../features/domain/usecases/production/attachSamplingResultUsecase";
import { CancelProductionBatchUsecase } from "../features/domain/usecases/production/cancelProductionBatchUsecase";
import { ExcludeSamplingResultUsecase } from "../features/domain/usecases/production/excludeSamplingResultUsecase";
import { FinishProductionBatchUsecase } from "../features/domain/usecases/production/finishProductionBatchUsecase";
import { RegisterProductionBatchUsecase } from "../features/domain/usecases/production/registerProductionBatchUsecase";
import { ViewProductionBatchesUsecase } from "../features/domain/usecases/production/viewProductionBatchesUsecase";
import { ViewSamplingResultsUsecase } from "../features/domain/usecases/production/viewSamplingResultsUsecase";
import { CreateProductUsecase } from "../features/domain/usecases/products/createProductUsecase";
import { DeleteProductUsecase } from "../features/domain/usecases/products/deleteProductUsecase";
import { EditProductUsecase } from "../features/domain/usecases/products/editProductUsecase";
import { ViewProductsUsecase } from "../features/domain/usecases/products/viewProductsUsecase";
import { CriptographyContract } from "../utils/criptography/criptographyContract";
import { CriptographyMock } from "../utils/criptography/criptographyMock";
import { SessionManager } from "./session/sessionManager";
import { SessionManagerContract } from "./session/sessionManagerContract";

export class Injector
{
    private static instance: Injector;
    private backend: BackendContract;
    private doLoginUsecase: DoLoginUsecase;
    private userData: UserDataContract;
    private criptography: CriptographyContract;
    private sessionManager: SessionManagerContract;
    private inventoryData: InventoryDataContract;
    private notificationManager: NotificationManagerContract;
    private batchData: BatchDataContract;
    private samplingResultData: SamplingResultDataContract;
    private productsData: ProductDataContract;
    private viewRegisteredUsersListUsecase: ViewRegisteredUsersListUsecase;
    private editUserUsecase: EditUserUsecase;
    private excludeUserUsecase: ExcludeUserUsecase;
    private registerNewUserUsecase: RegisterNewUserUsecase;
    private viewRawMaterialInventoryUsecase: ViewRawMaterialInventoryUsecase;
    private registerRawMaterialUsecase: RegisterRawMaterialUsecase;
    private editRawMaterialUsecase: EditRawMaterialUsecase;
    private removeRawMaterialUsecase: RemoveRawMaterialUsecase;
    private checkInRawMaterialUsecase: CheckInRawMaterialUsecase;
    private checkOutRawMaterialUsecase: CheckOutRawMaterialUsecase;
    private viewProductionBatchesUsecase: ViewProductionBatchesUsecase;
    private registerProductionBatchUsecase: RegisterProductionBatchUsecase;
    private viewSamplingResultsUsecase: ViewSamplingResultsUsecase;
    private attachSamplingResultUsecase: AttachSamplingResultUsecase;
    private excludeSamplingResultUsecase: ExcludeSamplingResultUsecase;
    private finishProductionBatchUsecase: FinishProductionBatchUsecase;
    private cancelProductionBatchUsecase: CancelProductionBatchUsecase;
    private doLogoutUsecase: DoLogoutUsecase;
    private editProductionBatchUsecase: any;
    private viewProductsUsecase: ViewProductsUsecase;
    private createProductUsecase: CreateProductUsecase;
    private editProductUsecase: EditProductUsecase;
    private deleteProductUsecase: DeleteProductUsecase;

    private constructor()
    {
        this.backend = new AxiosAdapter();
        this.userData = new UserData(this.backend);
        this.criptography = new CriptographyMock();
        this.sessionManager = new SessionManager();
        this.inventoryData = new InventoryData(this.backend);
        this.notificationManager = new NotificationManagerMock();
        this.batchData = new BatchData(this.backend);
        this.samplingResultData = new SamplingResultDataMock();
        this.productsData = new ProductData(this.backend);
        this.doLoginUsecase = new DoLoginUsecase(this.userData, this.criptography, this.sessionManager);
        this.viewRegisteredUsersListUsecase = new ViewRegisteredUsersListUsecase(this.userData);
        this.editUserUsecase = new EditUserUsecase(this.userData, this.sessionManager);
        this.excludeUserUsecase = new ExcludeUserUsecase(this.userData);
        this.registerNewUserUsecase = new RegisterNewUserUsecase(this.userData);
        this.viewRawMaterialInventoryUsecase = new ViewRawMaterialInventoryUsecase(this.inventoryData);
        this.registerRawMaterialUsecase = new RegisterRawMaterialUsecase(this.inventoryData);
        this.editRawMaterialUsecase = new EditRawMaterialUsecase(this.inventoryData);
        this.removeRawMaterialUsecase = new RemoveRawMaterialUsecase(this.inventoryData);
        this.checkInRawMaterialUsecase = new CheckInRawMaterialUsecase(this.inventoryData);
        this.checkOutRawMaterialUsecase = new CheckOutRawMaterialUsecase(this.inventoryData, this.notificationManager);
        this.viewProductionBatchesUsecase = new ViewProductionBatchesUsecase(this.batchData);
        this.registerProductionBatchUsecase = new RegisterProductionBatchUsecase(this.batchData, this.inventoryData);
        this.viewSamplingResultsUsecase = new ViewSamplingResultsUsecase(this.samplingResultData);
        this.attachSamplingResultUsecase = new AttachSamplingResultUsecase(this.samplingResultData, this.sessionManager);
        this.excludeSamplingResultUsecase = new ExcludeSamplingResultUsecase(this.samplingResultData);
        this.finishProductionBatchUsecase = new FinishProductionBatchUsecase(this.batchData);
        this.cancelProductionBatchUsecase = new CancelProductionBatchUsecase(
            this.batchData, this.samplingResultData, this.inventoryData
        );
        this.doLogoutUsecase = new DoLogoutUsecase(this.sessionManager);
        this.viewProductsUsecase = new ViewProductsUsecase(this.productsData);
        this.createProductUsecase = new CreateProductUsecase(this.productsData);
        this.editProductUsecase = new EditProductUsecase(this.productsData);
        this.deleteProductUsecase = new DeleteProductUsecase(this.productsData);
    }

    static getInstance(): Injector
    {
        if (this.instance) return this.instance;
        return this.instance = new Injector();
    }

    getDoLoginUsecase() : DoLoginUsecase {
        return this.doLoginUsecase;
    }

    getViewRegisteredUsersListUsecase(): ViewRegisteredUsersListUsecase {
        return this.viewRegisteredUsersListUsecase;
    }

    getEditUserUsecase(): EditUserUsecase {
        return this.editUserUsecase;
    }

    getExcludeUserUsecase(): ExcludeUserUsecase {
        return this.excludeUserUsecase
    }

    getRegisterNewUserUsecase(): RegisterNewUserUsecase {
        return this.registerNewUserUsecase;
    }

    getViewRawMaterialInventoryUsecase(): ViewRawMaterialInventoryUsecase {
        return this.viewRawMaterialInventoryUsecase;
    }

    getRegisterRawMaterialUsecase(): RegisterRawMaterialUsecase {
        return this.registerRawMaterialUsecase;
    }

    getEditRawMaterialUsecase(): EditRawMaterialUsecase {
        return this.editRawMaterialUsecase;
    }

    getRemoveRawMaterialUsecase(): RemoveRawMaterialUsecase {
        return this.removeRawMaterialUsecase;
    }

    getCheckInRawMaterialUsecase(): CheckInRawMaterialUsecase {
        return this.checkInRawMaterialUsecase;
    }

    getCheckOutRawMaterialUsecase(): CheckOutRawMaterialUsecase {
        return this.checkOutRawMaterialUsecase;
    }

    getViewProductionBatchesUsecase(): ViewProductionBatchesUsecase {
        return this.viewProductionBatchesUsecase;
    }

    getRegisterProductionBatchUsecase(): RegisterProductionBatchUsecase {
        return this.registerProductionBatchUsecase;
    }

    getSamplingResultData(): SamplingResultDataContract {
        return this.samplingResultData;
    }

    getViewSamplingResultsUsecase(): ViewSamplingResultsUsecase {
        return this.viewSamplingResultsUsecase;
    }

    getAttachSamplingResultUsecase(): AttachSamplingResultUsecase {
        return this.attachSamplingResultUsecase;
    }

    getExcludeSamplingResultUsecase(): ExcludeSamplingResultUsecase {
        return this.excludeSamplingResultUsecase;
    }

    getFinishProductionBatchUsecase(): FinishProductionBatchUsecase {
        return this.finishProductionBatchUsecase;
    }

    getCancelProductionBatchUsecase(): CancelProductionBatchUsecase {
        return this.cancelProductionBatchUsecase;
    }

    getDoLogoutUsecase(): DoLogoutUsecase {
        return this.doLogoutUsecase;
    }

    getEditProductionBatchUsecase() {
        if (!this.editProductionBatchUsecase) {
            this.editProductionBatchUsecase = new (require('../features/domain/usecases/production/editProductionBatchUsecase').EditProductionBatchUsecase)(this.batchData);
        }
        return this.editProductionBatchUsecase;
    }

    getViewProductsUsecase(): ViewProductsUsecase {
        return this.viewProductsUsecase;
    }

    getCreateProductUsecase(): CreateProductUsecase {
        return this.createProductUsecase;
    }

    getEditProductUsecase(): EditProductUsecase {
        return this.editProductUsecase;
    }

    getDeleteProductUsecase(): DeleteProductUsecase {
        return this.deleteProductUsecase;
    }
}

