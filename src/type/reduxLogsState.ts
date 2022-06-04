export interface log {
    id: string;
    owner: string;
    account: string;
    type: "charge" | "withdraw" | "transaction";
    beforeAmount: number;
    afterAmount: number;
    from: string;
    to: string;
    toAccount: string;
    amount: number;
    created_at: string;
}

export default interface logsState {
    logs: log[];
    isLoading: boolean;
}
