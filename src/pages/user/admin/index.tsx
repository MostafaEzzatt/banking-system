// components
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import AdminActionBar from "../../../components/layout/actionBar/admin";
import ifAuthintecatedAdmin from "../../../components/routeProtection/ifAuthentecatedAdmin";
import DialogContainer from "../../../components/shared/dialogContainer";
import FWMessage from "../../../components/shared/fwMessage";
import LoadingFullScreen from "../../../components/shared/loadingFullScreen";
import UserDetialsDialog from "../../../components/shared/userDetialsDialog";
import Table from "../../../components/table";
import { useAppSelector } from "../../../hooks/redux";
import { user } from "../../../type/reduxUsersState";
import { heading, row, rows } from "../../../type/tableProps";
import prepUsersRow from "../../../utility/prepUsersRow";

const Dashboard = () => {
    const usersSelector = useAppSelector((state) => state.users);
    const [rows, setRows] = useState<rows[]>([]);
    const [userDetialsDialog, setUserDetialsDialog] = useState<boolean>(false);
    const [userDetials, setUserDetials] = useState<user>();

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
            setRows(
                prepUsersRow(
                    usersSelector.users,
                    setUserDetials,
                    setUserDetialsDialog
                )
            );
        }
    }, [usersSelector.isLoading, usersSelector.users]);

    if (usersSelector.isLoading) return <LoadingFullScreen />;
    return (
        <>
            <AnimatePresence exitBeforeEnter>
                {userDetialsDialog && (
                    <DialogContainer handle={setUserDetialsDialog}>
                        <UserDetialsDialog
                            handle={setUserDetialsDialog}
                            user={userDetials}
                        />
                    </DialogContainer>
                )}
            </AnimatePresence>

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
