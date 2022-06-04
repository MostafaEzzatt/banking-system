import { doc, runTransaction } from "firebase/firestore";
import ToastType from "../../type/toast";
import addLog from "./addLog";
import { fireStore } from "./config";

const transactBalanceFromUserToUserAccount = async (
    acountId: string,
    transactionAccountId: string,
    amount: number,
    authId: string
) => {
    const error: ToastType = "error";
    const success: ToastType = "success";
    const warning: ToastType = "warning";

    // check all props not null
    if (!acountId || !transactionAccountId || !amount || !authId)
        return { success: false, error: "unknown", type: warning };

    // check if accountId not equal to transactionAccountId
    if (acountId === transactionAccountId)
        return { success: false, error: "unknown", type: error };

    const userRef = doc(fireStore, "users", authId);
    const accountRef = doc(fireStore, "accounts", acountId);
    const transactionAccountRef = doc(
        fireStore,
        "accounts",
        transactionAccountId
    );

    try {
        let transactionToAuthId: string = "";

        await runTransaction(fireStore, async (transaction) => {
            const user = await transaction.get(userRef);
            const account = await transaction.get(accountRef);
            const transactionAccount = await transaction.get(
                transactionAccountRef
            );

            if (
                !user.exists() ||
                !account.exists() ||
                !transactionAccount.exists()
            )
                throw Error("unknows");

            if (account.data()!.balance < amount)
                throw Error("not-enough-balance");

            if (account.data()!.owner.id !== authId)
                throw Error("auth_problem");

            const newAccountBalance = account.data()!.balance - amount;
            const newTransactionAccountBalance =
                transactionAccount.data()!.balance + amount;

            transactionToAuthId = transactionAccount.data()!.owner.id;

            transaction.update(accountRef, {
                balance: newAccountBalance,
                modified_at: new Date(),
            });

            transaction.update(transactionAccountRef, {
                balance: newTransactionAccountBalance,
                modified_at: new Date(),
            });
        });

        await addLog({
            type: "transaction",
            from: doc(fireStore, "users", authId),
            to: doc(fireStore, "users", transactionToAuthId),
            owner: [
                doc(fireStore, "users", authId),
                doc(fireStore, "users", transactionToAuthId),
            ],
            account: accountRef,
            toAccount: transactionAccountRef,
            amount,
            created_at: new Date(),
        });

        return { success: true, error: "transaction_done", type: success };
    } catch (e: any) {
        const code = e.code || e.message;
        return { success: false, error: code, type: error };
    }
};

export default transactBalanceFromUserToUserAccount;
