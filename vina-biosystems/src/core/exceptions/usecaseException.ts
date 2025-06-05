export class UsecaseException extends Error {
    constructor(message: string) {
        super(message);

        // 👇️ because we are extending a built-in class
        Object.setPrototypeOf(this, UsecaseException.prototype);
    }

    getErrorMessage() {
        return `Erro nas regras de negócio": ${this.message}`;
    }
}