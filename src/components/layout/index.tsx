import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { auth } from "../../lib/firebase/config";
import toggleUserOnline from "../../lib/firebase/toggleUserOnline";
import Header from "./header";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { pathname } = router;

    useEffect(() => {
        const handleCloseTab = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            if (auth.currentUser) {
                toggleUserOnline(auth.currentUser.uid, false);
            }
            return;
        };
        window.addEventListener("beforeunload", handleCloseTab);
        window.onbeforeunload = function () {
            if (auth.currentUser) {
                toggleUserOnline(auth.currentUser.uid, false);
            }
        };
    }, []);

    if (pathname === "/") return <>{children}</>;
    return (
        <>
            <Header />
            <main className="container mx-auto px-8">{children}</main>
        </>
    );
};

export default Layout;
