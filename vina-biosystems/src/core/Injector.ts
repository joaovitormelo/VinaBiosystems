import { UserDataContract } from "../features/data/authentication/userDataContract";
import { UserDataMock } from "../features/data/authentication/userDataMock";
import { InventoryDataContract } from "../features/data/inventory/inventoryDataContract";
import { InventoryDataMock } from "../features/data/inventory/inventoryDataMock";
import { DoLoginUsecase } from "../features/domain/usecases/authentication/doLoginUsecase";
import { EditUserUsecase } from "../features/domain/usecases/authentication/editUserUsecase";
import { ExcludeUserUsecase } from "../features/domain/usecases/authentication/excludeUserUsercase";
import { RegisterNewUserUsecase } from "../features/domain/usecases/authentication/registerNewUserUsecase";
import { ViewRegisteredUsersListUsecase } from "../features/domain/usecases/authentication/viewRegisteredUsersListUsecase";
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
    private viewRegisteredUsersListUsecase: ViewRegisteredUsersListUsecase;
    private editUserUsecase: EditUserUsecase;
    private excludeUserUsecase: ExcludeUserUsecase;
    private registerNewUserUsecase: RegisterNewUserUsecase;
    private viewRawMaterialInventoryUsecase: ViewRawMaterialInventoryUsecase;
    private registerRawMaterialUsecase: RegisterRawMaterialUsecase;
    private editRawMaterialUsecase: EditRawMaterialUsecase;
    private removeRawMaterialUsecase: RemoveRawMaterialUsecase;

    private constructor()
    {
        this.userData = new UserDataMock();
        this.criptography = new CriptographyMock();
        this.sessionManager = new SessionManager();
        this.inventoryData = new InventoryDataMock();
        this.doLoginUsecase = new DoLoginUsecase(this.userData, this.criptography, this.sessionManager);
        this.viewRegisteredUsersListUsecase = new ViewRegisteredUsersListUsecase(this.userData);
        this.editUserUsecase = new EditUserUsecase(this.userData, this.sessionManager);
        this.excludeUserUsecase = new ExcludeUserUsecase(this.userData);
        this.registerNewUserUsecase = new RegisterNewUserUsecase(this.userData, this.criptography, this.sessionManager);
        this.viewRawMaterialInventoryUsecase = new ViewRawMaterialInventoryUsecase(this.inventoryData);
        this.registerRawMaterialUsecase = new RegisterRawMaterialUsecase(this.inventoryData);
        this.editRawMaterialUsecase = new EditRawMaterialUsecase(this.inventoryData);
        this.removeRawMaterialUsecase = new RemoveRawMaterialUsecase(this.inventoryData);
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
}

