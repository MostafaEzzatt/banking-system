import { useRouter } from "next/router";

// Types
import { NextComponentType } from "next";

// redux
import { useAppSelector } from "../../hooks/redux";

// componenets
import LoadingFullScreen from "../shared/loadingFullScreen";
import { useEffect } from "react";

const ifUnAuthentecated = <T extends object>(
    Component: NextComponentType<T>
) => {
    return function UnAuthentecated(props: T) {
        const auth = useAppSelector((state) => state.auth);
        const router = useRouter();

        useEffect(() => {
            if (auth.isLoggedIn) {
                router.replace(
                    auth.user.role == "user" ? "/dashboard" : "admin"
                );
            }
        }, [auth.isLoggedIn, auth.user.role, router]);

        if (auth.isLoggedIn == null) return <LoadingFullScreen />;
        return <Component {...props} />;
    };
};

export default ifUnAuthentecated;
