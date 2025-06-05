export interface CriptographyContract {
    checkIfPasswordsMatch(hash: string | null, password: string | null) : boolean;
}