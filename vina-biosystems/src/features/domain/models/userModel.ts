export class UserModel {
    private id: number | null;
    private name: string;
    private login: string;
    private email: string;
    private birthDate: string;
    private isAdmin: boolean;
    private password: string | null;

    constructor(
        id: number | null, name: string, login: string, email: string, birthDate: string, isAdmin: boolean,
        password: string | null
    ) {
        this.id = id;
        this.name = name;
        this.login = login;
        this.email = email;
        this.birthDate = birthDate;
        this.password = password;
        this.isAdmin = isAdmin;
    }

    getId(): number | null {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getLogin(): string {
        return this.login;
    }

    getEmail(): string {
        return this.email;
    }

    getBirthDate(): string {
        return this.birthDate;
    }

    getPassword(): string | null {
        return this.password;
    }

    getIsAdmin(): boolean {
        return this.isAdmin;
    }

    setId(id: number | null) {
        this.id = id;
    }

    setName(name: string) {
        this.name = name;
    }

    setLogin(login: string) {
        this.login = login;
    }

    setEmail(email: string) {
        this.email = email;
    }

    setBirthDate(birthDate: string) {
        this.birthDate = birthDate;
    }

    setPassword(password: string | null) {
        this.password = password;
    }

    setIsAdmin(isAdmin: boolean) {
        this.isAdmin = isAdmin;
    }

    static getMock(): UserModel {
        return new UserModel(
            1, "Usuário Teste", "joao", "joao.teste@gmail.com", "17/04/2003", false, "123"
        );
    }

    static fromJson(json: any): UserModel {
        return new UserModel(
            json.id || null,
            json.name || "",
            json.login || "",
            json.email || "",
            json.birthDate || "",
            json.isAdmin || false,
            json.password || null
        );
    }

    toJson(): any {
        return {
            id: this.id,
            name: this.name,
            login: this.login,
            email: this.email,
            birthDate: this.birthDate,
            isAdmin: this.isAdmin,
            password: this.password
        };
    }
}