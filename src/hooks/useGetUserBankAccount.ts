import { useEffect, useState } from "react";
import { account } from "../type/reduxAccountsState";
import { useAppSelector } from "./redux";

const useGetUserBankAccount = (id: string | string[] | undefined) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [account, setAccount] = useState<account | null>(null);
    const accounts = useAppSelector((state) => state.accounts);

    useEffect(() => {
        if (accounts.isLoading) {
            setLoading(true);
            setError(false);
        } else if (!id || typeof id == "undefined" || Array.isArray(id)) {
            setLoading(true);
            setError(false);
        } else if (id) {
            const accountId = accounts.accounts.findIndex(
                (acc) => acc.id === id
            );

            if (accountId !== -1) {
                setAccount(accounts.accounts[accountId]);
                setLoading(false);
                setError(false);
            } else {
                setError(true);
                setLoading(false);
            }
        } else {
            setError(true);
            setLoading(false);
        }
    }, [id, accounts.accounts, accounts.isLoading]);

    return { loading, error, account };
};

export default useGetUserBankAccount;
