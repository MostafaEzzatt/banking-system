import { addDoc, collection, doc, runTransaction } from "firebase/firestore";
import ToastType from "../../type/toast";
import { fireStore } from "./config";

const chargeAccount = async (
    accountId: string | undefined,
    amount: number,
    userId: string
) => {
    const error: ToastType = "error";
    const success: ToastType = "success";

    if (!accountId || amount <= 0 || !userId)
        return { complete: false, error: "unknown", type: error };

    try {
        let balanceBeforeUpdate: number = 0;
        await runTransaction(fireStore, async (transition) => {
            const accountDocRef = doc(fireStore, "accounts", accountId);
            const checkAccount = await transition.get(accountDocRef);

            if (!checkAccount.exists) {
                throw "not-found";
            }

            balanceBeforeUpdate = checkAccount.data()!.balance;
            const newBalance = checkAccount.data()!.balance + amount;
            transition.update(accountDocRef, { balance: newBalance });
        });

        const logcolRef = collection(fireStore, "logs");
        await addDoc(logcolRef, {
            account: doc(fireStore, "accounts", accountId),
            owner: doc(fireStore, "users", userId),
            beforeAmount: balanceBeforeUpdate,
            afterAmount: balanceBeforeUpdate + amount,
        });

        return {
            complete: true,
            error: "account-balance-updated",
            type: success,
        };
    } catch (e: any) {
        const code: string = e.code || e;
        return { complete: false, error: code, type: error };
    }
};

export default chargeAccount;
