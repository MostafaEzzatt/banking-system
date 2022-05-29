import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, fireStore } from "./config";

// types
import ToastType from "../../type/toast";

const createUserWithEmail = async (
    username: string,
    password: string,
    phone: string
) => {
    const infoIcon: ToastType = "info";
    const iconSuccess: ToastType = "success";
    const iconError: ToastType = "error";

    if (!username || !password || !phone) {
        return { icon: infoIcon, error: "all-fields-required" };
    }

    try {
        const user: UserCredential = await createUserWithEmailAndPassword(
            auth,
            username,
            password
        );

        if (user) {
            const userDocRef = doc(fireStore, "users", user.user.uid);
            await setDoc(userDocRef, { mail: username, phone, role: "user" });

            return { icon: iconSuccess, error: "auth/user-registered" };
        }
    } catch (error: any) {
        const newError: string = error.code;
        return { icon: iconError, error: newError };
    }

    return { icon: iconError, error: "unknown" };
};

export default createUserWithEmail;
