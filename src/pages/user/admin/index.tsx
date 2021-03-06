// components
import { AnimatePresence } from "framer-motion";
import { useEffect, useState, useTransition } from "react";
import AdminActionBar from "../../../components/layout/actionBar/admin";
import ifAuthintecatedAdmin from "../../../components/routeProtection/ifAuthentecatedAdmin";
import DialogContainer from "../../../components/shared/dialogContainer";
import FWMessage from "../../../components/shared/fwMessage";
import LoadingFullScreen from "../../../components/shared/loadingFullScreen";
import LoadingSection from "../../../components/shared/loadingSection";
import UserDetialsDialog from "../../../components/shared/userDetialsDialog";
import Table from "../../../components/table";
import { useAppSelector } from "../../../hooks/redux";
import { user } from "../../../type/reduxUsersState";
import { heading, row, rows } from "../../../type/tableProps";
import prepUsersRow from "../../../utility/prepUsersRow";

const Dashboard = () => {
    const usersSelector = useAppSelector((state) => state.users);
    const [filteredUsers, setFilteredUsers] = useState<user[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [isPending, startTransition] = useTransition();
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
                    // usersSelector.users,
                    filteredUsers,
                    setUserDetials,
                    setUserDetialsDialog
                )
            );
        }
    }, [filteredUsers, usersSelector.isLoading, usersSelector.users]);

    useEffect(() => {
        if (searchValue && searchValue.length > 0 && searchValue !== null) {
            startTransition(() => {
                const tempUsers = usersSelector.users.filter((user) => {
                    return user.username
                        .toLowerCase()
                        .includes(searchValue.toLowerCase());
                });

                setFilteredUsers(tempUsers);
            });
        } else {
            setFilteredUsers(usersSelector.users);
        }
    }, [searchValue, usersSelector.users]);

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

            <div className="mt-4">
                <input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value.trim())}
                    type="text"
                    placeholder="Search by user email"
                    className="w-full bg-slate-600 border-0 text-slate-300 placeholder:text-slate-300 ring-0 focus-within:ring-0"
                />
            </div>
            {isPending ? (
                <div className="w-full flex justify-center">
                    <LoadingSection />
                </div>
            ) : rows.length > 0 ? (
                <Table headings={tableHeadings} rows={rows} />
            ) : (
                <FWMessage txt="No users found" />
            )}
        </>
    );
};

export default ifAuthintecatedAdmin(Dashboard);
