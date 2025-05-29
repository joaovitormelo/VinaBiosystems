export class UserModel {
    private name: string;
    private login: string;

    constructor(name: string, login: string) {
        this.name = name;
        this.login = login;
    }

    public getName(): string {
        return this.name;
    }

    public getLogin(): string {
        return this.login;
    }
}