import React from "react";
import Header from "./header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main className="container mx-auto px-8">{children}</main>
        </>
    );
};

export default DashboardLayout;
