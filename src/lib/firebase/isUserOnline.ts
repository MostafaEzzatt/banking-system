import { doc, getDoc } from "firebase/firestore";
import { fireStore } from "./config";

const isUserOnline = async (userId: string) => {
    if (!userId.trim()) return null;

    try {
        const userRef = doc(fireStore, `users`, userId);
        const user = await getDoc(userRef);

        if (user.exists()) {
            return user.data().online;
        }

        return false;
    } catch (error: any) {
        return false;
    }
};

export default isUserOnline;
