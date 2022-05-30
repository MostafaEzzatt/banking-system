export interface user {
    uid: string;
    username: string;
    phone: string;
    role: string | null;
    active: boolean;
    created_at: Date;
    modified_at: Date;
}

export default interface authState {
    user: user;
    isLoggedIn: boolean | null;
}
