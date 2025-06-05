import { UserDataContract } from "../features/data/authentication/userDataContract";
import { UserDataMock } from "../features/data/authentication/userDataMock";
import { DoLoginUsecase } from "../features/domain/usecases/authentication/doLoginUsecase";
import { EditUserUsecase } from "../features/domain/usecases/authentication/editUserUsecase";
import { ExcludeUserUsecase } from "../features/domain/usecases/authentication/excludeUserUsercase";
import { ViewRegisteredUsersListUsecase } from "../features/domain/usecases/authentication/viewRegisteredUsersListUsecase";
import { CriptographyContract } from "../utils/criptography/criptographyContract";
import { CriptographyMock } from "../utils/criptography/criptographyMock";
import { SessionManager } from "./session/sessionManager";
import { SessionManagerContract } from "./session/sessionManagerContract";
import { SessionManagerMock } from "./session/sessionManagerMock";

export class Injector
{
    private static instance: Injector;
    private doLoginUsecase: DoLoginUsecase;
    private userData: UserDataContract;
    private criptography: CriptographyContract;
    private sessionManager: SessionManagerContract;
    private viewRegisteredUsersListUsecase: ViewRegisteredUsersListUsecase;
    private editUserUsecase: EditUserUsecase;
    private excludeUserUsecase: ExcludeUserUsecase;

    private constructor()
    {
        this.userData = new UserDataMock();
        this.criptography = new CriptographyMock();
        this.sessionManager = new SessionManager();
        this.doLoginUsecase = new DoLoginUsecase(this.userData, this.criptography, this.sessionManager);
        this.viewRegisteredUsersListUsecase = new ViewRegisteredUsersListUsecase(this.userData);
        this.editUserUsecase = new EditUserUsecase(this.userData, this.sessionManager);
        this.excludeUserUsecase = new ExcludeUserUsecase(this.userData);
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
}

