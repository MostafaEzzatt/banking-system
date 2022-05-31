export interface account {
    id: string;
    name: string;
    balance: number;
    created_at: string;
    modified_at: string;
}

export default interface accountState {
    accounts: account[];
    isLoading: boolean;
}
