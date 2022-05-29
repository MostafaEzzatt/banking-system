import { doc, getDoc } from "firebase/firestore";
import { fireStore } from "./config";

const getUserById = async (id: string) => {
    const emptyUser = {
        uid: "",
        username: "",
        phone: "",
        role: null,
    };

    if (!id || id === "")
        return {
            complete: false,
            user: emptyUser,
            error: "unknown",
            isLoggedin: false,
        };

    try {
        const userDocRef = doc(fireStore, "users", id);
        const user = await getDoc(userDocRef);

        if (user.exists()) {
            const uid: string = user.id;
            const username: string = user.data()!.mail;
            const phone: string = user.data()!.phone;
            const role: string = user.data()!.role;
            return {
                complete: true,
                user: {
                    uid,
                    username,
                    phone,
                    role,
                },

                error: false,
                isLoggedin: true,
            };
        }
    } catch (e: any) {
        const err: string = e.code;
        return {
            complete: false,
            error: err,
            user: emptyUser,
            isLoggedin: false,
        };
    }

    return {
        complete: false,
        error: "unknown",
        user: emptyUser,
        isLoggedin: false,
    };
};

export default getUserById;
