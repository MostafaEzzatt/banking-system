import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";

// components
import ActionBar from "../../../../components/layout/actionBar";
import ActionBarHeading from "../../../../components/layout/actionBar/actionBarHeading";
import ActionBarButton from "../../../../components/layout/actionBar/button";
import DashboardLayout from "../../../../components/layout/dashboardLayout";
import ifAuthentecatedUser from "../../../../components/routeProtection/ifAuthentecatedUser";
import DialogContainer from "../../../../components/shared/dialogContainer";
import LoadingSection from "../../../../components/shared/loadingSection";
import useGetUserBankAccount from "../../../../hooks/useGetUserBankAccount";
import ChargeDialog from "../../../../components/account/chargeDialog";
import List from "../../../../components/account/logs/list";
import ListItem from "../../../../components/account/logs/listItem";
import useGetAccountLogs from "../../../../hooks/useGetAccountLogs";
import FWMessage from "../../../../components/shared/fwMessage";

const Account = () => {
    const router = useRouter();
    const id = router.query.id;
    const { loading, error, account } = useGetUserBankAccount(id);
    const [showCharge, setShowCharge] = useState(false);
    const [showWithdraw, setShowWithdraw] = useState(false);
    const created_at = account?.created_at || new Date().toString();
    const modified_at = account?.modified_at || new Date().toString();
    const accountLogs = useGetAccountLogs(id);

    // console.log(accountLogs);
    if (loading) return <LoadingSection />;

    return (
        <DashboardLayout>
            <AnimatePresence exitBeforeEnter>
                {showCharge && (
                    <DialogContainer handle={setShowCharge}>
                        <ChargeDialog
                            handle={setShowCharge}
                            accountId={account?.id}
                        />
                    </DialogContainer>
                )}
            </AnimatePresence>
            <ActionBar>
                <ActionBarHeading txt={`Account Name: ${account?.name}`} />

                <div className="space-x-8 sm:space-x-4">
                    <ActionBarButton
                        txt="Charge"
                        click={() => setShowCharge(true)}
                    />
                    <ActionBarButton
                        txt="Withdraw"
                        click={() => setShowWithdraw(true)}
                    />
                </div>
            </ActionBar>

            {error && <FWMessage txt="Something Went Wrong" />}

            {!error && (
                <div className="bg-slate-500 mt-7 rounded px-2.5 py-3.5">
                    <h2 className="text-white font-semibold text-xl border-b border-slate-600 pb-3">
                        Account Information:
                    </h2>

                    <ul className="space-y-3 text-slate-200 mt-3 px-2 sm:pr-0">
                        <li className="space-x-1">
                            <span className="text-orange-200 font-medium">
                                Account ID:
                            </span>
                            <span> {account?.id}</span>
                        </li>
                        <li className="space-x-1">
                            <span className="text-orange-200 font-medium">
                                Balance:
                            </span>
                            <span> {account?.balance}</span>
                        </li>
                        <li className="space-x-1">
                            <span className="text-orange-200 font-medium">
                                Created At:
                            </span>
                            <span>{new Date(created_at).toLocaleString()}</span>
                        </li>
                        <li className="space-x-1">
                            <span className="text-orange-200 font-medium">
                                Last Modification:
                            </span>
                            <span>
                                {new Date(modified_at).toLocaleString()}
                            </span>
                        </li>
                    </ul>
                </div>
            )}

            {!error && !accountLogs.error && !accountLogs.loading ? (
                <List>
                    <>
                        {accountLogs.log &&
                            accountLogs.log.map((l) => (
                                <ListItem
                                    key={l.id}
                                    type={l.type}
                                    before={l.beforeAmount}
                                    after={l.afterAmount}
                                />
                            ))}
                    </>
                </List>
            ) : (
                <FWMessage txt="No Logs Yet" />
            )}
        </DashboardLayout>
    );
};

export default ifAuthentecatedUser(Account);
