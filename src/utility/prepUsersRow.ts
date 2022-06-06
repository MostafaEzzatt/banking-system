import suspendUser from "../lib/firebase/suspendUser";
import activateUser from "../lib/firebase/activateUser";
import { user } from "../type/reduxUsersState";
import changeUserRole from "../lib/firebase/changeUserRole";
import { rows } from "../type/tableProps";
import { Dispatch, SetStateAction } from "react";

const prepUsersRow = (
    users: user[],
    userDetails: Dispatch<SetStateAction<user | undefined>>,
    userDetailsDialog: Dispatch<SetStateAction<boolean>>
): rows[] => {
    if (!users || !Array.isArray(users)) return [];

    return users.map((user) => {
        const row: rows = [
            {
                txt: user.username,
                button: false,
                user,
                setUserDetails: () => userDetails(user),
                userDetailsDialog,
            },
            {
                txt: user.uid,
                button: false,
                user,
            },
            {
                txt: user.suspend ? "allow" : "suspend",
                button: true,
                user,
                click: suspendUser,
                value: !user.suspend,
                targetId: user.uid,
            },
            {
                txt: user.active ? "deactivate" : "activate",
                button: true,
                user,
                click: activateUser,
                value: !user.active,
                targetId: user.uid,
            },
            {
                txt: `Change TO ${user.role === "admin" ? "User" : "Admin"}`,
                button: true,
                user,
                click: changeUserRole,
                value: user.role == "admin" ? "user" : "admin",
                targetId: user.uid,
            },
        ];

        return row;
    });
};

export default prepUsersRow;
