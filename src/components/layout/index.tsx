import { useRouter } from "next/router";
import React from "react";
import Header from "./header";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { pathname } = router;

    if (pathname === "/") return <>{children}</>;
    return (
        <>
            <Header />
            <main className="container mx-auto px-8">{children}</main>
        </>
    );
};

export default Layout;
