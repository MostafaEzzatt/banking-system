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

const ifAuthentecatedUser = <T extends object>(
    Component: NextComponentType<T>
) => {
    return function Authentecated(props: T) {
        const authSelector = useAppSelector((state) => state.auth);
        const dispatch = useAppDispatch();
        const router = useRouter();

        useEffect(() => {
            if (!authSelector.isLoggedIn && authSelector.isLoggedIn != null) {
                router.replace("/");
            } else if (
                authSelector.isLoggedIn &&
                authSelector.user.role !== "user"
            ) {
                router.replace("/");
            } else if (
                authSelector.isLoggedIn &&
                authSelector.user.role == "user" &&
                authSelector.user.active == false
            ) {
                signOut(auth);
                dispatch(logout());
                toast.info("Please Wait Until Your Account Be Verified", {
                    toastId: "verifyUserMessage",
                });
            }
        }, [
            authSelector.isLoggedIn,
            authSelector.user.active,
            authSelector.user.role,
            dispatch,
            router,
        ]);

        if (authSelector.isLoggedIn == null) return <LoadingFullScreen />;
        return <Component {...props} />;
    };
};

export default ifAuthentecatedUser;
