import {
    Dispatch,
    SetStateAction,
    SyntheticEvent,
    useRef,
    useState,
} from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "../../hooks/redux";
import withdrawFromUserAccount from "../../lib/firebase/withdrawFromUserAccount";
import messages from "../../messages/firebase";
import { account } from "../../type/reduxAccountsState";
import checkAccountAmount from "../../utility/checkAccountAmount";
import ButtonPrimary from "../forms/buttonPrimary";
import Input from "../inputs/input";

const WithdrawDialog = (props: {
    handle: Dispatch<SetStateAction<boolean>>;
    account: account | null;
}) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const amountRef = useRef<HTMLInputElement>(null);
    const [inputMessage, setInputMessage] = useState("");
    const auth = useAppSelector((state) => state.auth);

    const handleWidthdraw = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (typeof props.account == null || !props.account) return;

        setIsDisabled(true);

        const amount = parseFloat(amountRef.current?.value.trim() || "0");

        if (!amount) {
            setInputMessage("All Fields Required");
            setIsDisabled(false);
            return;
        }

        if (!checkAccountAmount(amount)) {
            setInputMessage("Amount Must Be Greater Than 0");
            setIsDisabled(false);
            return;
        }

        if (props.account?.id == "undefined") {
            setInputMessage("Account Not Found Try Again Later");
            setIsDisabled(false);
            return;
        }

        if (props.account.balance < amount) {
            setInputMessage("Insufficient Balance");
            setIsDisabled(false);
            return;
        }

        const charge = await withdrawFromUserAccount(
            props.account.id,
            amount,
            auth.user.uid
        );
        const messageKey = charge?.error || "unknown";
        toast(messages[messageKey], {
            toastId: "chargeAccount",
            type: charge?.type,
        });

        if (charge?.type == "success") {
            props.handle(false);
            return;
        } else if (charge?.type == "error") {
            setIsDisabled(false);
            return;
        }
    };
    return (
        <div
            className="w-80 bg-gray-50 rounded px-3 py-4 drop-shadow-md"
            onClick={(e) => e.stopPropagation()}
        >
            <h3 className="font-semibold mb-2 text-slate-900">
                Withdraw From Account
            </h3>
            <hr />

            <form className="flex flex-col gap-4" onSubmit={handleWidthdraw}>
                <Input
                    autoComplete="widthdraw-account-balance"
                    label="amount"
                    required
                    type="text"
                    placeholder="balance"
                    ref={amountRef}
                    msg={inputMessage}
                />

                <ButtonPrimary
                    disabled={isDisabled}
                    txt="withdraw"
                    type="submit"
                />
            </form>
        </div>
    );
};

export default WithdrawDialog;
