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
        }
    }, [auth.isLoggedIn, auth.user, usersSlice.isLoading, usersSlice.users]);

    return (
        <>
            <Accounts user={auth} />
            <Logs user={auth} />
            <Users user={auth} />
        </>
    );
};

export default Index;
