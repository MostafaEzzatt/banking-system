// components
import { useEffect, useState } from "react";
import AdminActionBar from "../../../components/layout/actionBar/admin";
import ifAuthintecatedAdmin from "../../../components/routeProtection/ifAuthentecatedAdmin";
import FWMessage from "../../../components/shared/fwMessage";
import LoadingFullScreen from "../../../components/shared/loadingFullScreen";
import Table from "../../../components/table";
import { useAppSelector } from "../../../hooks/redux";
import { heading, row, rows } from "../../../type/tableProps";
import prepUsersRow from "../../../utility/prepUsersRow";

const Dashboard = () => {
    const usersSelector = useAppSelector((state) => state.users);
    const [rows, setRows] = useState<rows[]>([]);

    const tableHeadings: heading[] = [
        {
            txt: "Mail",
            srOnly: false,
        },
        {
            txt: "User ID",
            srOnly: false,
        },
        {
            txt: "Suspended",
            srOnly: true,
        },
        {
            txt: "Activated",
            srOnly: true,
        },
        {
            txt: "Role",
            srOnly: true,
        },
    ];

    useEffect(() => {
        if (!usersSelector.isLoading) {
            setRows(prepUsersRow(usersSelector.users));
        }
    }, [usersSelector.isLoading, usersSelector.users]);

    if (usersSelector.isLoading) return <LoadingFullScreen />;
    return (
        <>
            <AdminActionBar />

            {rows.length > 0 ? (
                <Table headings={tableHeadings} rows={rows} />
            ) : (
                <FWMessage txt="No users found" />
            )}
        </>
    );
};

export default ifAuthintecatedAdmin(Dashboard);
