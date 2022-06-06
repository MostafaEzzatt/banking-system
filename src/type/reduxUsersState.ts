export interface user {
    uid: string;
    username: string;
    phone: string;
    role: string | null;
    active: boolean;
    suspend: boolean;
    created_at: string;
    modified_at: string;
}

export default interface usersState {
    users: user[];
    isLoading: boolean | null;
}
