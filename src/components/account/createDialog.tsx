import {
    Dispatch,
    SetStateAction,
    SyntheticEvent,
    useRef,
    useState,
} from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "../../hooks/redux";
import createUserBankAccount from "../../lib/firebase/createUserBankAccount";
import messages from "../../messages/firebase";
import checkUserAccountName from "../../utility/checkUserAccountName";
import ButtonPrimary from "../forms/buttonPrimary";
import Input from "../inputs/input";

const CreateDialog = (props: { handle: Dispatch<SetStateAction<boolean>> }) => {
    const accountNameRef = useRef<HTMLInputElement>(null);
    const balanceRef = useRef<HTMLInputElement>(null);
    const [isDisabled, SetIsDisabled] = useState(false);
    const [inputMessages, setInputMessages] = useState({
        name: "",
        balance: "",
    });
    const auth = useAppSelector((state) => state.auth);

    const handleCreateAccount = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (!auth.isLoggedIn) return;
        SetIsDisabled(true);

        const accountName = accountNameRef.current?.value.trim();
        const balance = balanceRef.current?.value.trim();

        if (!accountName || !balance) {
            setInputMessages({
                name: "All Fields Required",
                balance: "All Fields Required",
            });
            SetIsDisabled(false);
            return;
        }

        if (!checkUserAccountName(accountName)) {
            setInputMessages({
                name: "Account Name Length Must Be Between 3 and 20 Characters",
                balance: "",
            });
            SetIsDisabled(false);
            return;
        }

        if (
            typeof balance == "undefined" ||
            isNaN(parseFloat(balance)) ||
            parseFloat(balance) <= 0
        ) {
            setInputMessages({
                name: "",
                balance: "Balance Must Be A Positive Number",
            });

            SetIsDisabled(false);
            return;
        }
        const create = await createUserBankAccount(
            accountName,
            parseFloat(balance),
            auth.user.uid
        );

        const toastMessage = messages[create.error] || messages["unknown"];

        toast(toastMessage, { type: create.type, toastId: "createAccount" });

        if (!create.complete) {
            SetIsDisabled(false);
        }
        props.handle(false);
    };

    return (
        <div
            className="w-80 bg-gray-50 rounded px-3 py-4 drop-shadow-md"
            onClick={(e) => e.stopPropagation()}
        >
            <h3 className="font-semibold mb-2 text-slate-900">
                Create Account
            </h3>
            <hr />

            <form
                className="flex flex-col gap-4"
                onSubmit={handleCreateAccount}
            >
                <Input
                    autoComplete="create-account-name"
                    label="account name"
                    required
                    type="text"
                    placeholder="account name"
                    ref={accountNameRef}
                    msg={inputMessages.name}
                />

                <Input
                    autoComplete="create-account-balance"
                    label="balance"
                    required
                    type="text"
                    placeholder="balance"
                    ref={balanceRef}
                    msg={inputMessages.balance}
                />

                <ButtonPrimary
                    disabled={isDisabled}
                    txt="create"
                    type="submit"
                />
            </form>
        </div>
    );
};

export default CreateDialog;
