import React from "react";
import AdminActionBar from "../../../components/layout/actionBar/admin";
import ifAuthentecatedAdmin from "../../../components/routeProtection/ifAuthentecatedAdmin";
import FWMessage from "../../../components/shared/fwMessage";
import LoadingFullScreen from "../../../components/shared/loadingFullScreen";
import Table from "../../../components/table";
import { useAppSelector } from "../../../hooks/redux";
import useGetAccountLogs from "../../../hooks/useGetAccountLogs";
import useGetTableAccounts from "../../../hooks/useGetTableAccounts";
import { heading } from "../../../type/tableProps";

const Accounts = () => {
    const accounts = useAppSelector((state) => state.accounts);
    const accountsData = useGetTableAccounts(
        accounts.accounts,
        accounts.isLoading
    );

    console.log(accountsData);

    const tableHeadings: heading[] = [
        {
            txt: "Name",
            srOnly: false,
        },
        {
            txt: "ID",
            srOnly: false,
        },
        {
            txt: "Balance",
            srOnly: false,
        },
        {
            txt: "Create Date",
            srOnly: false,
        },
        {
            txt: "Activated",
            srOnly: true,
        },
    ];

    if (accountsData.loading) return <LoadingFullScreen />;
    if (!accountsData.loading && accountsData.error)
        return <FWMessage txt={accountsData.error} />;
    return (
        <>
            <AdminActionBar />
            <Table headings={tableHeadings} rows={accountsData.data || []} />
        </>
    );
};

export default ifAuthentecatedAdmin(Accounts);
