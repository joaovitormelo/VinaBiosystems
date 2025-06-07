export class ValidationException extends Error {
    constructor(field: string, details?: string) {
        let message = "Campo inválido: " + field;
        if (details) {
            message += " - " + details;
        }
        super(message);

        // 👇️ because we are extending a built-in class
        Object.setPrototypeOf(this, ValidationException.prototype);
    }
}