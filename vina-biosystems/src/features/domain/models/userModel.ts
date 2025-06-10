export class UserModel {
    private id: number | null;
    private name: string;
    private email: string;
    private phone: string | null;
    private birthDate: string;
    private isAdmin: boolean;
    private password: string | null;

    constructor(
        id: number | null, name: string, email: string, phone: string | null, birthDate: string,
        isAdmin: boolean, password: string | null
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
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

    getEmail(): string {
        return this.email;
    }

    getPhone(): string | null {
        return this.phone;
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

    setEmail(email: string) {
        this.email = email;
    }

    setPhone(phone: string | null) {
        this.phone = phone;
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
            1, "Usuário Teste", "joao.teste@gmail.com", "99999999", "17/04/2003", false, "123"
        );
    }

    static fromJson(json: any): UserModel {
        return new UserModel(
            json.id || null,
            json.name || "",
            json.email || "",
            json.phone || null,
            json.birthDate || "",
            json.isAdmin || false,
            json.password || null
        );
    }

    toJson(): any {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            phone: this.phone,
            birthDate: this.birthDate,
            isAdmin: this.isAdmin,
            password: this.password
        };
    }
}