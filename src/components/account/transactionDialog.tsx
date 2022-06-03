import {
    Dispatch,
    SetStateAction,
    SyntheticEvent,
    useRef,
    useState,
} from "react";
import { useAppSelector } from "../../hooks/redux";
import transactBalanceFromUserToUserAccount from "../../lib/firebase/transactBalanceFromUserToUserAccount";
import { account } from "../../type/reduxAccountsState";
import checkAccountAmount from "../../utility/checkAccountAmount";
import checkAccountId from "../../utility/checkAccountId";
import ButtonPrimary from "../forms/buttonPrimary";
import Input from "../inputs/input";
import messages from "../../messages/firebase";
import { toast } from "react-toastify";

const Transaction = (props: {
    handle: Dispatch<SetStateAction<boolean>>;
    account: account | null;
}) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const amountRef = useRef<HTMLInputElement>(null);
    const accountIdRef = useRef<HTMLInputElement>(null);
    const [inputMessage, setInputMessage] = useState({
        accountId: "",
        amount: "",
    });
    const auth = useAppSelector((state) => state.auth);

    const handleTransaction = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (typeof props.account == null || !props.account) return;

        setIsDisabled(true);
        setInputMessage({ accountId: "", amount: "" });

        const amount = parseFloat(amountRef.current?.value || "0");
        const transactionAccountId = accountIdRef.current?.value || "";

        if (!amount) {
            setInputMessage({
                ...inputMessage,
                amount: "All Fields Required",
            });
            setIsDisabled(false);
            return;
        }

        if (!transactionAccountId) {
            setInputMessage({
                ...inputMessage,
                accountId: "All Fields Required",
            });
            setIsDisabled(false);
            return;
        }

        if (!checkAccountAmount(amount)) {
            setInputMessage({
                ...inputMessage,
                amount: "Amount Must Be Greater Than 0",
            });
            setIsDisabled(false);
            return;
        }

        if (!checkAccountId(transactionAccountId)) {
            setInputMessage({
                ...inputMessage,
                accountId: "Account ID Incorrect",
            });
            setIsDisabled(false);
            return;
        }

        if (props.account?.id == "undefined") {
            setInputMessage({
                ...inputMessage,
                accountId: "Account Not Found Try Again Later",
            });
            setIsDisabled(false);
            return;
        }

        if (props.account.balance < amount) {
            setInputMessage({
                ...inputMessage,
                accountId: "Insufficient Balance",
            });
            setIsDisabled(false);
            return;
        }

        const transaction = await transactBalanceFromUserToUserAccount(
            props.account?.id,
            transactionAccountId,
            amount,
            auth.user.uid
        );

        const q = messages[transaction.error] || messages["unknown"];
        toast(q, {
            type: transaction.type || "default",
            toastId: "balanceTransaction",
        });

        if (transaction.success) {
            props.handle(false);
            return;
        } else {
            setIsDisabled(false);
            return;
        }
    };
    return (
        <div
            className="w-80 bg-gray-50 rounded px-3 py-4 drop-shadow-md"
            onClick={(e) => e.stopPropagation()}
        >
            <h3 className="font-semibold mb-2 text-slate-900">Transaction</h3>
            <hr />

            <form className="flex flex-col gap-4" onSubmit={handleTransaction}>
                <Input
                    autoComplete="transaction-account-balance"
                    label="account id"
                    required
                    type="text"
                    placeholder="balance"
                    ref={accountIdRef}
                    msg={inputMessage.accountId}
                />

                <Input
                    autoComplete="create-account-balance"
                    label="amount"
                    required
                    type="text"
                    placeholder="balance"
                    ref={amountRef}
                    msg={inputMessage.amount}
                />

                <ButtonPrimary
                    disabled={isDisabled}
                    txt="Send Transaction"
                    type="submit"
                />
            </form>
        </div>
    );
};

export default Transaction;
