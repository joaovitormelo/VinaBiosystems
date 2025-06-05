export class PermissionException extends Error {
    private login: string;
    constructor(login: string, message: string) {
        super(message);
        this.login = login;

        // 👇️ because we are extending a built-in class
        Object.setPrototypeOf(this, PermissionException.prototype);
    }

    getErrorMessage() {
        return `Erro de permissão para usuário "${this.login}": ${this.message}`;
    }
}