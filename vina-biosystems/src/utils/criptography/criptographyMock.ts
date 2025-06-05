import { CriptographyContract } from "./criptographyContract";

export class CriptographyMock implements CriptographyContract {
    checkIfPasswordsMatch(hash: string | null, password: string | null): boolean {
        return hash == password;
    }
}