export class UserModel {
    private name: string;
    private login: string;
    private password: string;

    constructor(name: string, login: string, password: string) {
        this.name = name;
        this.login = login;
        this.password = password;
    }

    public getName(): string {
        return this.name;
    }

    public getLogin(): string {
        return this.login;
    }

    public getPassword(): string {
        return this.password;
    }
}