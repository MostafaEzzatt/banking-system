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

const Account = () => {
    const router = useRouter();
    const id = router.query.id;
    const { loading, error, account } = useGetUserBankAccount(id);
    const [showCharge, setShowCharge] = useState(false);
    const [showWithdraw, setShowWithdraw] = useState(false);
    const created_at = account?.created_at || new Date().toString();
    const modified_at = account?.modified_at || new Date().toString();
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

            {error && (
                <div className="mt-7 text-center bg-slate-700 text-white font-medium text-lg py-4 rounded">
                    Something Went Wrong
                </div>
            )}

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

            {!error && (
                <div className="bg-slate-500 mt-7 rounded px-2.5 py-3.5">
                    <div className="bg-slate-900 px-3 py-2">
                        <ul className="space-y-2">
                            <li className="text-slate-300">
                                - [ charge ] Owner Charged The Account From 1010
                                To 1020
                            </li>
                            <li className="text-slate-300">
                                - [ charge ] Owner Charged The Account From 1010
                                To 1020
                            </li>
                            <li className="text-slate-300">
                                - [ charge ] Owner Charged The Account From 1010
                                To 1020
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default ifAuthentecatedUser(Account);
