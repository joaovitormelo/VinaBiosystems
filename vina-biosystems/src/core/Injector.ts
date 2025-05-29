import { AuthenticationUsecases } from "../features/authentication/domain/authenticationUsecases";

export class Injector
{
    private static instance: Injector;
    private authenticationUsecases: AuthenticationUsecases;

    private constructor()
    {
        this.authenticationUsecases = new AuthenticationUsecases();
    }

    public static getInstance(): Injector
    {
        if (this.instance) return this.instance;
        return this.instance = new Injector();
    }

    public getAuthenticationUsecases() : AuthenticationUsecases {
        return this.authenticationUsecases;
    }
}