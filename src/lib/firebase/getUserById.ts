import { doc, getDoc } from "firebase/firestore";
import { user } from "../../type/reduxAuthState";
import { fireStore } from "./config";

const getUserById = async (id: string) => {
    const emptyUser: user = {
        uid: "",
        username: "",
        phone: "",
        role: null,
        active: false,
        created_at: new Date(),
        modified_at: new Date(),
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
            const active: boolean = user.data()!.active;
            const created_at: Date = user.data()!.created_at;
            const modified_at: Date = user.data()!.modified_at;
            return {
                complete: true,
                user: {
                    uid,
                    username,
                    phone,
                    role,
                    active,
                    created_at,
                    modified_at,
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
