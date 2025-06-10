export class PermissionException extends Error {
    private email: string;
    constructor(email: string, message: string) {
        super(message);
        this.email = email;

        // 👇️ because we are extending a built-in class
        Object.setPrototypeOf(this, PermissionException.prototype);
    }

    getErrorMessage() {
        return `Erro de permissão para usuário "${this.email}": ${this.message}`;
    }
}