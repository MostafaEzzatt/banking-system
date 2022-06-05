import { user } from "./reduxUsersState";

export type heading = { txt: string; srOnly: boolean };
export type row = {
    txt: string;
    button: boolean;
    user: user;
    click: Function;
    value: boolean | string;
};
export type rows = row[];
