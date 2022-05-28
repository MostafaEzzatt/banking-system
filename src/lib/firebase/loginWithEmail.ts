import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config";

// type
import ToastType from "../../type/toast";

const loginWithEmail = async (username: string, password: string) => {
    const infoIcon: ToastType = "info";
    const iconSuccess: ToastType = "success";
    const iconError: ToastType = "error";

    if (!username || !password) {
        return { icon: infoIcon, error: "all-fields-required" };
    }

    try {
        const user = await signInWithEmailAndPassword(auth, username, password);

        if (user) {
            // get user data and add it to the store
            return { icon: iconSuccess, error: "auth/user-authenticated" };
        }
    } catch (error: any) {
        const newError: string = error.code;
        return { icon: iconError, error: newError };
    }

    return { icon: iconError, error: "unknown" };
};

export default loginWithEmail;
