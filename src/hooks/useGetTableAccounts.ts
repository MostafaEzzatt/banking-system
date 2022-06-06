import { useEffect, useState } from "react";
import { account } from "../type/reduxAccountsState";
import { user } from "../type/reduxUsersState";
import { rows } from "../type/tableProps";
import prepAccountsRows from "../utility/prepAccountsRows";
import { useAppSelector } from "./redux";

const useGetTableAccounts = (accounts: account[], accountsLoading: boolean) => {
    const users = useAppSelector((state) => state.users);
    const [data, setDate] = useState<rows[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("Loading...");

    useEffect(() => {
        if (accounts.length > 0 && users.users.length > 0) {
            let accountsWithUser: account[] = [];

            accounts.forEach((acc) => {
                const ownerDetails: user | undefined = users.users.find(
                    (user) => user.uid === acc.owner
                );

                const fullAcoount: account = { ...acc, owner: ownerDetails };
                if (ownerDetails !== undefined) {
                    accountsWithUser.push(fullAcoount);
                }
            });

            setDate(prepAccountsRows(accountsWithUser));
            setLoading(false);
            setError("");
        } else if (
            users.isLoading === null ||
            users.isLoading === true ||
            accountsLoading
        ) {
            setLoading(true);
        } else {
            setLoading(false);
            setError("No data");
        }
    }, [
        accounts,
        accounts.length,
        accountsLoading,
        users.isLoading,
        users.users,
        users.users.length,
    ]);

    return { data, loading, error };
};

export default useGetTableAccounts;
