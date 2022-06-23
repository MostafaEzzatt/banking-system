import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "./config";

// types
import ToastType from "../../type/toast";
import addUserToFirestore from "./addUserToFirestore";

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

        console.log({ user });

        if (user) {
            const createUserInDB = await addUserToFirestore(
                username,
                phone,
                user.user.uid
            );

            if (createUserInDB) {
                return { icon: iconSuccess, error: "auth/user-registered" };
            } else {
                return { icon: iconError, error: "unknown" };
            }
        }
    } catch (error: any) {
        const newError: string = error.code;
        return { icon: iconError, error: newError };
    }

    return { icon: iconError, error: "unknown" };
};

export default createUserWithEmail;
