import changeBankAccountActivation from "../lib/firebase/changeBankAccountActivation";
import { account } from "../type/reduxAccountsState";
import { rows } from "../type/tableProps";

const prepAccountsRows = (accounts: account[]) => {
    if (accounts === undefined || accounts === null || accounts.length === 0)
        return [];

    const accountsWithUser = accounts.map((acc) => {
        const row: rows = [
            {
                txt: acc.name,
                button: false,
            },
            {
                txt: acc.id,
                button: false,
            },
            {
                txt: acc.balance.toString(),
                button: false,
            },
            {
                txt: new Date(acc.created_at).toLocaleString().toString(),
                button: false,
            },
            {
                txt: acc.activated ? "deactivate" : "activate",
                button: true,
                click: changeBankAccountActivation,
                value: !acc.activated,
                targetId: acc.id,
            },
        ];

        return row;
    });

    return accountsWithUser;
};

export default prepAccountsRows;
