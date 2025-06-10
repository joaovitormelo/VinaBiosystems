import { AuthenticationException } from "./authenticationException";

export class ExistentUserException extends Error {
    constructor(email: string) {
        super("Já existe um usuário com o email: " + email + "!");

        // 👇️ because we are extending a built-in class
        Object.setPrototypeOf(this, ExistentUserException.prototype);
    }
}