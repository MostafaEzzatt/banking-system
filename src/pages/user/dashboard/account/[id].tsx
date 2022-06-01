import { useRouter } from "next/router";

// components
import ActionBar from "../../../../components/layout/actionBar";
import ActionBarHeading from "../../../../components/layout/actionBar/actionBarHeading";
import DashboardLayout from "../../../../components/layout/dashboardLayout";
import ifAuthentecatedUser from "../../../../components/routeProtection/ifAuthentecatedUser";
import useGetUserBankAccount from "../../../../hooks/useGetUserBankAccount";

const Account = () => {
    const router = useRouter();
    const id = router.query.id;
    const { loading, error, account } = useGetUserBankAccount(id);

    console.log({ loading, error, account });
    return (
        <DashboardLayout>
            <ActionBar>
                <ActionBarHeading txt="Account: ?????" />
            </ActionBar>
        </DashboardLayout>
    );
};

export default ifAuthentecatedUser(Account);
