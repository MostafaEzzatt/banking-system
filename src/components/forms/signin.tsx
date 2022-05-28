import { SyntheticEvent, useRef, useState } from "react";

// components
import FormLegend from "../inputs/FormLegend";
import Input from "../inputs/input";

// utilityes
import checkEmail from "../../utility/checkEmail";
import checkPassword from "../../utility/checkPassword";
import { handleSignInInputError } from "../../utility/handleInputError";

// toastify
import { toast } from "react-toastify";

// firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase/config";
import loginWithEmail from "../../lib/firebase/loginWithEmail";
import messages from "../../messages/firebase";

const Signin = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [errors, setErrors] = useState({
        username: "",
        password: "",
    });

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        setIsDisabled(true);

        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        // check if any field empty
        if (!username || !password) {
            const err = "All fields required";
            handleSignInInputError(
                setErrors,
                {
                    username: err,
                    password: err,
                },
                setIsDisabled
            );

            return;
        }

        // check if username/email valid
        if (!checkEmail(username)) {
            handleSignInInputError(
                setErrors,
                { username: "please enter valid email" },
                setIsDisabled
            );
            return;
        }

        // check if password valid
        if (!checkPassword(password)) {
            handleSignInInputError(
                setErrors,
                { password: "please enter valid password" },
                setIsDisabled
            );
            return;
        }

        const user = await loginWithEmail(username, password);
        const q = messages[user.error] || messages["unknown"];

        toast(q, {
            toastId: "signup",
            type: user.icon || "default",
        });

        if (user.icon == "error") {
            setIsDisabled(false);
        }
    };

    return (
        <>
            <form
                className="divide-y divide-slate-700 w-80"
                onSubmit={handleSubmit}
            >
                <FormLegend txt="Sign In" />
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

                    <button
                        type="submit"
                        className="w-full bg-orange-600 text-white py-3 font-medium hover:bg-orange-500 focus:bg-orange-300"
                        disabled={isDisabled}
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </>
    );
};

export default Signin;
