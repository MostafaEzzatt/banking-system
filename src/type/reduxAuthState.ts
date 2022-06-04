export interface user {
    uid: string;
    username: string;
    phone: string;
    role: string | null;
    active: boolean;
    created_at: string;
    modified_at: string;
}

export default interface authState {
    user: user;
    isLoggedIn: boolean | null;
}
