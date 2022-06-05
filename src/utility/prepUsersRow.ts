import suspendUser from "../lib/firebase/suspendUser";
import activateUser from "../lib/firebase/activateUser";
import { user } from "../type/reduxUsersState";
import changeUserRole from "../lib/firebase/changeUserRole";
import { rows } from "../type/tableProps";

const prepUsersRow = (users: user[]): rows[] => {
    if (!users || !Array.isArray(users)) return [];

    return users.map((user) => {
        const row: rows = [
            {
                txt: user.username,
                button: false,
                user,
                click: () => {
                    return false;
                },
                value: "",
            },
            {
                txt: user.uid,
                button: false,
                user,
                click: () => {
                    return false;
                },
                value: "",
            },
            {
                txt: user.suspend ? "allow" : "suspend",
                button: true,
                user,
                click: suspendUser,
                value: !user.suspend,
            },
            {
                txt: user.active ? "deactivate" : "activate",
                button: true,
                user,
                click: activateUser,
                value: !user.active,
            },
            {
                txt: `Change TO ${user.role === "admin" ? "User" : "Admin"}`,
                button: true,
                user,
                click: changeUserRole,
                value: user.role == "admin" ? "user" : "admin",
            },
        ];

        return row;
    });
};

export default prepUsersRow;
