import { doc, setDoc } from "firebase/firestore";
import checkAccountId from "../../utility/checkAccountId";
import { fireStore } from "./config";

const changeBankAccountActivation = (id: string, value: boolean) => {
    if (id === undefined || id === null || checkAccountId(id) === false) return;

    try {
        const accountDocRef = doc(fireStore, "accounts", id);
        setDoc(accountDocRef, { activated: value }, { merge: true });

        return true;
    } catch (e) {
        return false;
    }
};

export default changeBankAccountActivation;
