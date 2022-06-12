import { doc, updateDoc } from "firebase/firestore";
import { fireStore } from "./config";

const toggleUserOnline = async (userId: string, online: boolean) => {
    if (!userId.trim() || online === undefined || online === null) return false;

    try {
        const userRef = doc(fireStore, `users`, userId);
        await updateDoc(userRef, { online: online });

        return true;
    } catch (e: any) {
        return false;
    }
};

export default toggleUserOnline;
