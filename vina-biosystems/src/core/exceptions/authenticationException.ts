export class AuthenticationException extends Error {
    private email: string;
    constructor(email: string, message: string) {
        super(message);
        this.email = email;

        // 👇️ because we are extending a built-in class
        Object.setPrototypeOf(this, AuthenticationException.prototype);
    }

    getErrorMessage() {
        return `Erro ao autenticar com o usuário "${this.email}": ${this.message}`;
    }
}