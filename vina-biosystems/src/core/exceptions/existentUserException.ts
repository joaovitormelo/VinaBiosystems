import { AuthenticationException } from "./authenticationException";

export class ExistentUserException extends Error {
    constructor(login: string) {
        super("Já existe um usuário com o login: " + login + "!");

        // 👇️ because we are extending a built-in class
        Object.setPrototypeOf(this, ExistentUserException.prototype);
    }
}