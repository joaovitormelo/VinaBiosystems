export class ValidationException extends Error {
    private field: string;

    constructor(field: string, details: string) {
        super(details);
        this.field = field;

        // 👇️ because we are extending a built-in class
        Object.setPrototypeOf(this, ValidationException.prototype);
    }

    getField(): string {
        return this.field;
    }
}