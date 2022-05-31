import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { fireStore } from "./config";

const checkBankAccountExist = async (uid: string, name: string) => {
    if (!uid || !name) return true;

    const userDocRef = doc(fireStore, "users", uid);
    const accountsColRef = collection(fireStore, "accounts");
    const q = query(
        accountsColRef,
        where("owner", "==", userDocRef),
        where("name", "==", name)
    );

    const getAccounts = await getDocs(q);

    return getAccounts.size >= 1 ? true : false;
};

export default checkBankAccountExist;
