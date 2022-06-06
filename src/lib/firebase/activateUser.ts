import { doc, setDoc } from "firebase/firestore";
import { fireStore } from "./config";

const activateUser = (id: string, value: boolean) => {
    if (!id.trim() || typeof value === undefined || value === null)
        return false;

    try {
        const userDocRef = doc(fireStore, "users", id);
        setDoc(userDocRef, { active: value }, { merge: true });
        return true;
    } catch (e: any) {
        return false;
    }
};

export default activateUser;
