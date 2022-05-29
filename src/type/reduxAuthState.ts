export default interface authState {
    user: {
        uid: string;
        username: string;
        phone: string;
        role: string | null;
    };
    isLoggedIn: boolean | null;
}
