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
import { clearUsers } from "../../store/features/users/usersSlice";
import { clearAccounts } from "../../store/features/accounts/accounsSlice";
import { clearLogs } from "../../store/features/logs/logsSlice";
import { toast } from "react-toastify";

const ifAuthentecatedAdmin = <T extends object>(
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
                !authFromUserSlice.isLoading &&
                authUserSlice?.role !== "admin"
            ) {
                router.replace("/");
            }
        }, [
            authFromUserSlice.isLoading,
            authFromUserSlice.users,
            authSelector.isLoggedIn,
            authSelector.user,
            authSelector.user.role,
            dispatch,
            router,
        ]);

        if (authSelector.isLoggedIn == null) return <LoadingFullScreen />;
        return <Component {...props} />;
    };
};

export default ifAuthentecatedAdmin;
