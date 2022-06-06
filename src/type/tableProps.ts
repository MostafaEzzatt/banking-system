import { Dispatch, SetStateAction } from "react";
import { user } from "./reduxUsersState";

export type heading = { txt: string; srOnly: boolean };
export type row = {
    txt: string;
    button: boolean;
    user?: user;
    click?: Function;
    value?: boolean | string;
    targetId?: string;
    setUserDetails?: () => void;
    userDetailsDialog?: Dispatch<SetStateAction<boolean>>;
};
export type rows = row[];
