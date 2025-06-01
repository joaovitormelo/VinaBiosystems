export class AuthenticationException extends Error {
    private login: string;
    constructor(login: string, message: string) {
        super(message);
        this.login = login;

        // 👇️ because we are extending a built-in class
        Object.setPrototypeOf(this, AuthenticationException.prototype);
    }

    getErrorMessage() {
        return `Erro ao autenticar com o usuário "${this.login}": ${this.message}`;
    }
}