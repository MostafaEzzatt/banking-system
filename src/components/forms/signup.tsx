import { SyntheticEvent, useRef, useState } from "react";

// components
import FormLegend from "../inputs/FormLegend";
import Input from "../inputs/input";

// utilityes
import checkEmail from "../../utility/checkEmail";
import checkPassword from "../../utility/checkPassword";
import checkTelephone from "../../utility/checkTelephone";
import { handleSignUpInputError } from "../../utility/handleInputError";

// toastify
import { toast } from "react-toastify";

// firebase
import createUserWithEmail from "../../lib/firebase/createUserWithEmail";
import messages from "../../messages/firebase";

// redux
import { useAppSelector } from "../../hooks/redux";
import ButtonPrimary from "./buttonPrimary";

const Signup = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const rePasswordRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [errors, setErrors] = useState({
        username: "",
        password: "",
        rePassword: "",
        tele: "",
    });
    const auth = useAppSelector((state) => state.auth);

    const resetErrors = () => {
        setErrors({
            username: "",
            password: "",
            rePassword: "",
            tele: "",
        });
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (auth.isLoggedIn)
            return toast.error("user already authenticated", {
                toastId: "alreadyAuthenticated",
            });

        setIsDisabled(true);

        resetErrors();

        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const rePassword = rePasswordRef.current?.value;
        const tele = phoneRef.current?.value;

        // check if any field empty
        if (!username || !password || !rePassword || !tele) {
            const err = "All fields required";
            handleSignUpInputError(
                setErrors,
                {
                    username: err,
                    password: err,
                    rePassword: err,
                    tele: err,
                },
                setIsDisabled
            );

            return;
        }

        // check if username/email valid
        if (!checkEmail(username)) {
            handleSignUpInputError(
                setErrors,
                { username: "please enter valid email" },
                setIsDisabled
            );
            return;
        }

        // check if password valid
        if (!checkPassword(password)) {
            handleSignUpInputError(
                setErrors,
                { password: "please enter valid password" },
                setIsDisabled
            );
            return;
        }

        // check if password equal repassword
        if (password !== rePassword) {
            handleSignUpInputError(
                setErrors,
                {
                    password: "password and re-password should be the same",
                    rePassword: "password and re-password should be the same",
                },
                setIsDisabled
            );
            return;
        }

        // check egypt mobile phone number pattern is correct
        if (!checkTelephone(tele)) {
            handleSignUpInputError(
                setErrors,
                {
                    tele: "please enter valid mobile phone number ex:002-10012345678",
                },
                setIsDisabled
            );

            return;
        }

        const create = await createUserWithEmail(username, password, tele);
        const q = messages[create.error] || messages["unknown"];

        toast(q, {
            toastId: "signup",
            type: create.icon || "default",
        });

        if (create.icon == "error") {
            setIsDisabled(false);
        }
    };

    return (
        <>
            <form
                className="divide-y divide-slate-700 w-80"
                onSubmit={handleSubmit}
            >
                <FormLegend txt="Sign up" />
                <div className="pt-2.5 flex flex-col gap-5">
                    <Input
                        type="text"
                        required
                        label="username / email"
                        placeholder="username / email"
                        autoComplete="username"
                        ref={usernameRef}
                        msg={errors.username}
                    />

                    <Input
                        type="password"
                        required
                        label="password"
                        placeholder="password"
                        autoComplete="current-password"
                        ref={passwordRef}
                        msg={errors.password}
                    />

                    <Input
                        type="password"
                        required
                        label="re-password"
                        placeholder="re-password"
                        autoComplete="re-password"
                        ref={rePasswordRef}
                        msg={errors.rePassword}
                    />

                    <Input
                        type="tel"
                        required
                        label="phone"
                        placeholder="phone"
                        autoComplete="current-password"
                        ref={phoneRef}
                        msg={errors.tele}
                    />

                    <ButtonPrimary
                        txt="Sign up"
                        disabled={isDisabled}
                        type="submit"
                    />
                </div>
            </form>
        </>
    );
};

export default Signup;
