export interface log {
    id: string;
    owner: string;
    account: string;
    type: "charge" | "withdraw";
    beforeAmount: number;
    afterAmount: number;
    created_at: string;
}

export default interface logsState {
    logs: log[];
    isLoading: boolean;
}
