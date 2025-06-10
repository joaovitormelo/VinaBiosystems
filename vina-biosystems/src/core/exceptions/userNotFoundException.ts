import { AuthenticationException } from "./authenticationException";

export class UserNotFoundException extends AuthenticationException {
    constructor(email: string) {
        super(email, "Usuário não encontrado!");

        // 👇️ because we are extending a built-in class
        Object.setPrototypeOf(this, UserNotFoundException.prototype);
    }
}