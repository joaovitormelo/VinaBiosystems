import { CriptographyContract } from "./criptographyContract";

export class CriptographyMock implements CriptographyContract {
    checkIfPasswordsMatch(hash: string, password: string): boolean {
        return hash == password;
    }
}