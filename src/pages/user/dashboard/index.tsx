import { AnimatePresence } from "framer-motion";
import { useState } from "react";

// components
import CardItem from "../../../components/account/cardItem";
import CardList from "../../../components/account/cardList";
import CreateDialog from "../../../components/account/createDialog";
import ActionBar from "../../../components/layout/actionBar";
import ActionBarHeading from "../../../components/layout/actionBar/actionBarHeading";
import ActionBarButton from "../../../components/layout/actionBar/button";
import DashboardLayout from "../../../components/layout/dashboardLayout";
import ifAuthintecatedUser from "../../../components/routeProtection/ifAuthentecatedUser";

// redux
import { useAppSelector } from "../../../hooks/redux";

const Dashboard = () => {
    const [show, setShow] = useState(false);
    const accounts = useAppSelector((state) => state.accounts);
    return (
        <>
            <AnimatePresence exitBeforeEnter>
                {show && <CreateDialog handle={setShow} />}
            </AnimatePresence>

            <DashboardLayout>
                <ActionBar>
                    <>
                        <ActionBarHeading txt="Your Accounts" />

                        <ActionBarButton
                            txt="Create"
                            click={() => setShow(true)}
                        />
                    </>
                </ActionBar>
                {accounts.accounts.length > 0 ? (
                    <CardList>
                        {accounts.accounts.map((acc) => (
                            <CardItem key={acc.id} {...acc} />
                        ))}
                    </CardList>
                ) : (
                    ""
                )}
            </DashboardLayout>
        </>
    );
};

export default ifAuthintecatedUser(Dashboard);
