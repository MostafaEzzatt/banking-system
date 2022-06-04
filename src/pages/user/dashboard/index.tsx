import React from "react";

// components
import CardItem from "../../../components/account/cardItem";
import CardList from "../../../components/account/cardList";
import CreateDialog from "../../../components/account/createDialog";
import ActionBar from "../../../components/layout/actionBar";
import ActionBarHeading from "../../../components/layout/actionBar/actionBarHeading";
import ActionBarButton from "../../../components/layout/actionBar/button";
import ifAuthintecatedUser from "../../../components/routeProtection/ifAuthentecatedUser";

// firebase
import { signOut } from "firebase/auth";
import { auth } from "../../../lib/firebase/config";

// redux
import { useAppDispatch } from "../../../hooks/redux";
import { logout } from "../../../store/features/auth/authSlice";

const Dashboard = () => {
    const dispatch = useAppDispatch();

    const handleSignout = () => {
        signOut(auth);
        dispatch(logout);
    };
    return (
        <>
            <AnimatePresence exitBeforeEnter>
                {show && (
                    <DialogContainer handle={setShow}>
                        <CreateDialog handle={setShow} />
                    </DialogContainer>
                )}
            </AnimatePresence>

            <ActionBar>
                <>
                    <ActionBarHeading txt="Your Accounts" />

                    <ActionBarButton txt="Create" click={() => setShow(true)} />
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
        </>
    );
};

export default ifAuthintecatedUser(Dashboard);
