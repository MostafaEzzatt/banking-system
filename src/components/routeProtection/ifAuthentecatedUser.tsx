import { useEffect } from "react";
import { useRouter } from "next/router";

// Types
import { NextComponentType } from "next";

// redux
import { useAppSelector } from "../../hooks/redux";

// componenets
import LoadingFullScreen from "../shared/loadingFullScreen";

const ifAuthentecatedUser = <T,>(Component: NextComponentType<T>) => {
    return function Authentecated(props: T) {
        const auth = useAppSelector((state) => state.auth);
        const router = useRouter();

        useEffect(() => {
            if (!auth.isLoggedIn) {
                router.replace("/");
            } else if (auth.isLoggedIn && auth.user.role !== "user") {
                router.replace("/");
            }
        }, [auth.isLoggedIn, auth.user.role, router]);

        if (auth.isLoggedIn == null) return <LoadingFullScreen />;
        return <Component {...props} />;
    };
};

export default ifAuthentecatedUser;
