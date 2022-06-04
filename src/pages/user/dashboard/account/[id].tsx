import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

// components
import ChargeDialog from "../../../../components/account/chargeDialog";
import Info from "../../../../components/account/info";
import List from "../../../../components/account/logs/list";
import ListItem from "../../../../components/account/logs/listItem";
import Transaction from "../../../../components/account/transactionDialog";
import WithdrawDialog from "../../../../components/account/withdrawDialog";
import ActionBar from "../../../../components/layout/actionBar";
import ActionBarHeading from "../../../../components/layout/actionBar/actionBarHeading";
import ActionBarButton from "../../../../components/layout/actionBar/button";
import DashboardLayout from "../../../../components/layout/dashboardLayout";
import ifAuthentecatedUser from "../../../../components/routeProtection/ifAuthentecatedUser";
import DialogContainer from "../../../../components/shared/dialogContainer";
import FWMessage from "../../../../components/shared/fwMessage";
import LoadingSection from "../../../../components/shared/loadingSection";
import useGetAccountLogs from "../../../../hooks/useGetAccountLogs";
import useGetUserBankAccount from "../../../../hooks/useGetUserBankAccount";

const Account = () => {
    const router = useRouter();
    const id = router.query.id;
    const { loading, error, account } = useGetUserBankAccount(id);
    const [showCharge, setShowCharge] = useState(false);
    const [showWithdraw, setShowWithdraw] = useState(false);
    const [showTransaction, setShowTransaction] = useState(false);
    const accountLogs = useGetAccountLogs(id);

    if (loading) return <LoadingSection />;

    if (!account?.activated) {
        toast.info(
            "Your account is not activated yet. Please wait for admin to activate your account.",
            { toastId: "account-activation" }
        );
        router.replace("/");
        return <></>;
    }

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

                {showWithdraw && (
                    <DialogContainer handle={setShowWithdraw}>
                        <WithdrawDialog
                            handle={setShowWithdraw}
                            account={account}
                        />
                    </DialogContainer>
                )}

                {showTransaction && (
                    <DialogContainer handle={setShowTransaction}>
                        <Transaction
                            handle={setShowTransaction}
                            account={account}
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

                    <ActionBarButton
                        txt="Transaction"
                        click={() => setShowTransaction(true)}
                    />
                </div>
            </ActionBar>

            {error && <FWMessage txt="Something Went Wrong" />}

            {!error && (
                <div className="bg-slate-500 mt-7 rounded px-2.5 py-3.5">
                    <h2 className="text-white font-semibold text-xl border-b border-slate-600 pb-3">
                        Account Information:
                    </h2>

                    <Info account={account} />
                </div>
            )}

            {!error && !accountLogs.error && !accountLogs.loading ? (
                <List>
                    <>
                        {accountLogs.log &&
                            accountLogs.log.map((l) => (
                                <ListItem key={l.id} log={l} accountId={id} />
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
