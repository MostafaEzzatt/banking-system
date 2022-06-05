import { useEffect } from "react";
import { useRouter } from "next/router";

// Types
import { NextComponentType } from "next";

// redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

// componenets
import LoadingFullScreen from "../shared/loadingFullScreen";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase/config";
import { logout } from "../../store/features/auth/authSlice";
import { toast } from "react-toastify";
import { clearUsers } from "../../store/features/users/usersSlice";
import { clearAccounts } from "../../store/features/accounts/accounsSlice";
import { clearLogs } from "../../store/features/logs/logsSlice";

const ifAuthentecatedUser = <T extends object>(
    Component: NextComponentType<T>
) => {
    return function Authentecated(props: T) {
        const authSelector = useAppSelector((state) => state.auth);
        const authFromUserSlice = useAppSelector((state) => state.users);
        const dispatch = useAppDispatch();
        const router = useRouter();

        useEffect(() => {
            const authUserSlice = authFromUserSlice.isLoading
                ? authSelector.user
                : authFromUserSlice.users.find(
                      (u) => u.uid == authSelector.user.uid
                  );

            if (
                authSelector.isLoggedIn &&
                !authFromUserSlice.isLoading &&
                authUserSlice?.suspend
            ) {
                signOut(auth);
                dispatch(logout());
                dispatch(clearUsers());
                dispatch(clearAccounts());
                dispatch(clearLogs());
                toast.info("Your Account Susspended", {
                    toastId: "userSuspended",
                });
            } else if (
                !authSelector.isLoggedIn &&
                authSelector.isLoggedIn != null
            ) {
                router.replace("/");
            } else if (
                authSelector.isLoggedIn &&
                authUserSlice?.role !== "user"
            ) {
                router.replace("/");
            } else if (
                authSelector.isLoggedIn &&
                authUserSlice?.role == "user" &&
                authUserSlice?.active === false
            ) {
                signOut(auth);
                dispatch(logout());
                dispatch(clearUsers());
                dispatch(clearAccounts());
                dispatch(clearLogs());
                toast.info("Please Wait Until Your Account Be Verified", {
                    toastId: "verifyUserMessage",
                });
            }
        }, [
            authFromUserSlice.isLoading,
            authFromUserSlice.users,
            authSelector.isLoggedIn,
            authSelector.user,
            authSelector.user.active,
            authSelector.user.role,
            authSelector.user.suspend,
            dispatch,
            router,
        ]);

        if (authSelector.isLoggedIn == null) return <LoadingFullScreen />;
        return <Component {...props} />;
    };
};

export default ifAuthentecatedUser;
