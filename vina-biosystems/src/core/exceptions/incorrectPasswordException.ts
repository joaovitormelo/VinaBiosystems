import { AuthenticationException } from "./authenticationException";

export class IncorrectPasswordException extends AuthenticationException {
    constructor(email: string) {
        super(email, "Senha incorreta!");

        // 👇️ because we are extending a built-in class
        Object.setPrototypeOf(this, IncorrectPasswordException.prototype);
    }
}