export class DatabaseException extends Error {
    private details: string;
    constructor(message: string, details?: string) {
        super("Erro na conexão com o banco de dados: " + message);
        this.details = details || "";

        // 👇️ because we are extending a built-in class
        Object.setPrototypeOf(this, DatabaseException.prototype);
    }
}