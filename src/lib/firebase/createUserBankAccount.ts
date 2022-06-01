import { addDoc, collection, doc } from "firebase/firestore";
import ToastType from "../../type/toast";
import checkBankAccountExist from "./checkBankAccountExist";
import { fireStore } from "./config";

const createUserBankAccount = async (
    name: string,
    balance: number,
    uid: string
) => {
    const error: ToastType = "error";
    const success: ToastType = "success";
    const info: ToastType = "info";

    if (!name || !balance)
        return { complete: false, error: "unknown", type: error };

    // check if account with the same name and user exist before adding new one
    const accountExist = await checkBankAccountExist(uid, name);
    if (accountExist)
        return { complete: false, error: "already-exists", type: info };

    try {
        const accountColRef = collection(fireStore, "accounts");
        const userRef = doc(fireStore, `users`, uid);
        await addDoc(accountColRef, {
            name,
            balance,
            created_at: new Date(),
            modified_at: new Date(),
            owner: userRef,
        });

        return { complete: true, error: "account-created", type: success };
    } catch (error: any) {
        const code: string = error.code;
        return { complete: false, error: code, type: error };
    }
};

export default createUserBankAccount;
