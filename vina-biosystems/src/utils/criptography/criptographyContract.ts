export interface CriptographyContract {
    checkIfPasswordsMatch(hash: string, password: string) : boolean;
}