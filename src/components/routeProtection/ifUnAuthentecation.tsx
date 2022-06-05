import { useRouter } from "next/router";

// Types
import { NextComponentType } from "next";

// redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

// componenets
import LoadingFullScreen from "../shared/loadingFullScreen";
import { useEffect } from "react";
import { objectTraps } from "immer/dist/internal";

const ifUnAuthentecated = <T extends object>(
    Component: NextComponentType<T>
) => {
    return function UnAuthentecated(props: T) {
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
                authUserSlice?.uid !== undefined
            ) {
                router.replace(
                    authUserSlice.role == "user"
                        ? "/user/dashboard"
                        : "/user/admin"
                );
            }
        }, [
            authFromUserSlice.isLoading,
            authFromUserSlice.users,
            authSelector.isLoggedIn,
            authSelector.user,
            authSelector.user.role,
            router,
        ]);

        if (authSelector.isLoggedIn == null) return <LoadingFullScreen />;
        if (authSelector.isLoggedIn) return <></>;
        if (!authSelector.isLoggedIn) return <Component {...props} />;
    };
};

export default ifUnAuthentecated;
