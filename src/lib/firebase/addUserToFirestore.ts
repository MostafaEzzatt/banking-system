import { doc, setDoc } from "firebase/firestore";
import { fireStore } from "./config";

async function addUserToFirestore(mail: string, phone: string, id: string) {
    if (!mail || !id) return false;

    try {
        const userDocRef = doc(fireStore, "users", id);
        await setDoc(userDocRef, {
            mail,
            phone,
            role: "user",
            active: false,
            suspend: false,
            created_at: new Date(),
            modified_at: new Date(),
        });

        return true;
    } catch (e) {
        return false;
    }
}

export default addUserToFirestore;
