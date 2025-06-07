import { UserDataContract } from "../features/data/authentication/userDataContract";
import { UserDataMock } from "../features/data/authentication/userDataMock";
import { InventoryDataContract } from "../features/data/inventory/inventoryDataContract";
import { InventoryDataMock } from "../features/data/inventory/inventoryDataMock";
import { NotificationManagerContract } from "../features/data/system/notificationManagerContract";
import { NotificationManagerMock } from "../features/data/system/notificationManagerMock";
import { DoLoginUsecase } from "../features/domain/usecases/authentication/doLoginUsecase";
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
import { CriptographyContract } from "../utils/criptography/criptographyContract";
import { CriptographyMock } from "../utils/criptography/criptographyMock";
import { SessionManager } from "./session/sessionManager";
import { SessionManagerContract } from "./session/sessionManagerContract";

export class Injector
{
    private static instance: Injector;
    private doLoginUsecase: DoLoginUsecase;
    private userData: UserDataContract;
    private criptography: CriptographyContract;
    private sessionManager: SessionManagerContract;
    private inventoryData: InventoryDataContract;
    private notificationManager: NotificationManagerContract;
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

    private constructor()
    {
        this.userData = new UserDataMock();
        this.criptography = new CriptographyMock();
        this.sessionManager = new SessionManager();
        this.inventoryData = new InventoryDataMock();
        this.notificationManager = new NotificationManagerMock();
        this.doLoginUsecase = new DoLoginUsecase(this.userData, this.criptography, this.sessionManager);
        this.viewRegisteredUsersListUsecase = new ViewRegisteredUsersListUsecase(this.userData);
        this.editUserUsecase = new EditUserUsecase(this.userData, this.sessionManager);
        this.excludeUserUsecase = new ExcludeUserUsecase(this.userData);
        this.registerNewUserUsecase = new RegisterNewUserUsecase(this.userData, this.criptography, this.sessionManager);
        this.viewRawMaterialInventoryUsecase = new ViewRawMaterialInventoryUsecase(this.inventoryData);
        this.registerRawMaterialUsecase = new RegisterRawMaterialUsecase(this.inventoryData);
        this.editRawMaterialUsecase = new EditRawMaterialUsecase(this.inventoryData);
        this.removeRawMaterialUsecase = new RemoveRawMaterialUsecase(this.inventoryData);
        this.checkInRawMaterialUsecase = new CheckInRawMaterialUsecase(this.inventoryData);
        this.checkOutRawMaterialUsecase = new CheckOutRawMaterialUsecase(this.inventoryData, this.notificationManager);
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
}

