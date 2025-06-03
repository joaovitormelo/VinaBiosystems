<<<<<<< HEAD
import { UserDataContract } from "../features/authentication/data/authentication/userDataContract";
import { UserDataMock } from "../features/authentication/data/authentication/userDataMock";
import { DoLoginUsecase } from "../features/authentication/domain/usecases/authentication/doLoginUsecase";
import { ViewRegisteredUsersListUsecase } from "../features/authentication/domain/usecases/authentication/viewRegisteredUsersListUsecase";
import { CriptographyContract } from "../utils/criptography/criptographyContract";
import { CriptographyMock } from "../utils/criptography/criptographyMock";
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

    private constructor()
    {
        this.userData = new UserDataMock();
        this.criptography = new CriptographyMock();
        this.sessionManager = new SessionManagerMock();
        this.doLoginUsecase = new DoLoginUsecase(this.userData, this.criptography, this.sessionManager);
        this.viewRegisteredUsersListUsecase = new ViewRegisteredUsersListUsecase(this.userData);
    }

    public static getInstance(): Injector
    {
        if (this.instance) return this.instance;
        return this.instance = new Injector();
    }

    public getDoLoginUsecase() : DoLoginUsecase {
        return this.doLoginUsecase;
    }

    public getViewRegisteredUsersListUsecase(): ViewRegisteredUsersListUsecase {
        return this.viewRegisteredUsersListUsecase;
    }
}

=======
import { UserDataContract } from "../features/authentication/data/authentication/userDataContract";
import { UserDataMock } from "../features/authentication/data/authentication/userDataMock";
import { DoLoginUsecase } from "../features/authentication/domain/usecases/authentication/doLoginUsecase";
import { CriptographyContract } from "../utils/criptography/criptographyContract";
import { CriptographyMock } from "../utils/criptography/criptographyMock";
import { SessionManagerContract } from "./session/sessionManagerContract";
import { SessionManagerMock } from "./session/sessionManagerMock";

export class Injector
{
    private static instance: Injector;
    private doLoginUsecase: DoLoginUsecase;
    private userData: UserDataContract;
    private criptography: CriptographyContract;
    private sessionManager: SessionManagerContract;

    private constructor()
    {
        this.userData = new UserDataMock();
        this.criptography = new CriptographyMock();
        this.sessionManager = new SessionManagerMock();
        this.doLoginUsecase = new DoLoginUsecase(this.userData, this.criptography, this.sessionManager);
    }

    public static getInstance(): Injector
    {
        if (this.instance) return this.instance;
        return this.instance = new Injector();
    }

    public getDoLoginUsecase() : DoLoginUsecase {
        return this.doLoginUsecase;
    }
}

>>>>>>> 06d9aa372929c3002a9cbb7fe9cf7998b588df5e
