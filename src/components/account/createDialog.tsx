import { motion } from "framer-motion";
import {
    Dispatch,
    SetStateAction,
    SyntheticEvent,
    useRef,
    useState,
} from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../../hooks/redux";
import createUserBankAccount from "../../lib/firebase/createUserBankAccount";
import checkUserAccountName from "../../utility/checkUserAccountName";
import ButtonPrimary from "../forms/buttonPrimary";
import Input from "../inputs/input";
import messages from "../../messages/firebase";

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

        setInputMessages({ name: "", balance: "" });

        const accountName = accountNameRef.current?.value;
        const balance = balanceRef.current?.value;

        if (!accountName || !balance) {
            setInputMessages({
                name: "All Fields Required",
                balance: "All Fields Required",
            });
            SetIsDisabled(false);
            return;
        }

        if (!checkUserAccountName(accountName)) {
            setInputMessages((old) => ({
                ...old,
                name: "Account Name Length Must Be Between 3 and 20 Characters",
            }));
            SetIsDisabled(false);
            return;
        }

        if (
            typeof balance == "undefined" ||
            isNaN(parseFloat(balance)) ||
            parseFloat(balance) <= 0
        ) {
            setInputMessages((old) => ({
                ...old,
                balance: "Balance Must Be A Positive Number",
            }));

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

    return createPortal(
        <motion.div
            key="createDialog"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/50 flex justify-center items-center"
            onClick={() => props.handle(false)}
        >
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
        </motion.div>,
        document.getElementById("bank-dialogs")!
    );
};

export default CreateDialog;
