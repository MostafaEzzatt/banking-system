import React, {
    Dispatch,
    SetStateAction,
    SyntheticEvent,
    useRef,
    useState,
} from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "../../hooks/redux";
import chargeAccount from "../../lib/firebase/chargeAccount";
import messages from "../../messages/firebase";
import checkAccountChargeAmount from "../../utility/checkAccountChargeAmount";
import ButtonPrimary from "../forms/buttonPrimary";
import Input from "../inputs/input";

const ChargeDialog = (props: {
    handle: Dispatch<SetStateAction<boolean>>;
    accountId: string | undefined;
}) => {
    const amountRef = useRef<HTMLInputElement>(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [inputMessages, setInputMessages] = useState("");
    const auth = useAppSelector((state) => state.auth);

    const handleCreateAccount = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsDisabled(true);

        const amount = parseFloat(amountRef.current?.value || "0");

        if (!amount) {
            setInputMessages("All Fields Required");
            setIsDisabled(false);
            return;
        }

        if (!checkAccountChargeAmount(amount)) {
            setInputMessages("Amount Must Be Greater Than 0");
            setIsDisabled(false);
            return;
        }

        if (props.accountId == "undefined") {
            setInputMessages("Account Not Found Try Again Later");
            setIsDisabled(false);
            return;
        }

        const charge = await chargeAccount(
            props.accountId,
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

    if (props.accountId === "undefined") return <></>;
    return (
        <div
            className="w-80 bg-gray-50 rounded px-3 py-4 drop-shadow-md"
            onClick={(e) => e.stopPropagation()}
        >
            <h3 className="font-semibold mb-2 text-slate-900">
                Charge Account
            </h3>
            <hr />

            <form
                className="flex flex-col gap-4"
                onSubmit={handleCreateAccount}
            >
                <Input
                    autoComplete="create-account-balance"
                    label="amount"
                    required
                    type="text"
                    placeholder="balance"
                    ref={amountRef}
                    msg={inputMessages}
                />

                <ButtonPrimary disabled={isDisabled} txt="add" type="submit" />
            </form>
        </div>
    );
};

export default ChargeDialog;
