import { AuthenticationException } from "./authenticationException";

export class UserNotFoundException extends AuthenticationException {
    constructor(login: string) {
        super(login, "Usuário não encontrado!");

        // 👇️ because we are extending a built-in class
        Object.setPrototypeOf(this, UserNotFoundException.prototype);
    }
}