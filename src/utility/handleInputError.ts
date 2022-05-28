import { Dispatch, SetStateAction } from "react";

interface signup {
    username: string;
    password: string;
    rePassword: string;
    tele: string;
}

type signUpFileds = Partial<signup>;
type setStateSignUpType = Dispatch<SetStateAction<signup>>;

interface signin {
    username: string;
    password: string;
}
type signInFileds = Partial<signin>;
type setStateSignInType = Dispatch<SetStateAction<signin>>;

type isDisabledType = Dispatch<SetStateAction<boolean>>;

export const handleSignUpInputError = (
    setState: setStateSignUpType,
    erros: signUpFileds,
    isDisabled: isDisabledType
) => {
    setState((old) => ({ ...old, ...erros }));
    isDisabled(false);
};

export const handleSignInInputError = (
    setState: setStateSignInType,
    erros: signInFileds,
    isDisabled: isDisabledType
) => {
    setState((old) => ({ ...old, ...erros }));
    isDisabled(false);
};
