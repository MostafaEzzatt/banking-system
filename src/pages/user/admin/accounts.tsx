import React from "react";
import AdminActionBar from "../../../components/layout/actionBar/admin";
import ifAuthentecatedAdmin from "../../../components/routeProtection/ifAuthentecatedAdmin";

const Accounts = () => {
    return (
        <>
            <AdminActionBar />
        </>
    );
};

export default ifAuthentecatedAdmin(Accounts);
