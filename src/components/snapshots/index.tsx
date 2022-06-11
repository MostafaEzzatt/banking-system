import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import authState from "../../type/reduxAuthState";
import Accounts from "./accounts";
import Logs from "./logs";
import Users from "./users";

const Index = () => {
    const { auth, usersSlice } = useAppSelector((state) => ({
        auth: state.auth,
        usersSlice: state.users,
    }));
    const [authUserSlice, setAuthUserSlice] = useState<authState>();
    const loadSnaps = useAppSelector((state) => state.configs);

    useEffect(() => {
        if (auth.isLoggedIn && !usersSlice.isLoading) {
            const authUser: authState = {
                user:
                    usersSlice.users.find(
                        (user) => user.uid === auth.user.uid
                    ) || auth.user,
                isLoggedIn: !usersSlice.isLoading,
            };
            setAuthUserSlice(authUser);
        } else {
            setAuthUserSlice(auth);
        }
    }, [
        auth,
        auth.isLoggedIn,
        auth.user,
        usersSlice.isLoading,
        usersSlice.users,
    ]);

    if (!loadSnaps.loadSnaps) return <></>;
    return (
        <>
            <Accounts user={authUserSlice || auth} />
            <Logs user={authUserSlice || auth} />
            <Users user={authUserSlice || auth} />
        </>
    );
};

export default Index;
