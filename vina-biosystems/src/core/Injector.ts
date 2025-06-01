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

