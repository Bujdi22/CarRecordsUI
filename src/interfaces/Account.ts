export interface Account {
    id: string,
    displayName: string,
    username: string,
    role: string,
    createdAt: string,
    verifiesWithPassword: boolean,
    verifiesWithGoogle: boolean,
}