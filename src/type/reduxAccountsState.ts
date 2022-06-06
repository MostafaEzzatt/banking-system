import { user } from "./reduxUsersState";

export interface account {
    id: string;
    name: string;
    balance: number;
    created_at: string;
    modified_at: string;
    activated: boolean;
    owner: string | user | undefined;
}

export type accounts = account[];

export default interface accountState {
    accounts: account[];
    isLoading: boolean;
}
