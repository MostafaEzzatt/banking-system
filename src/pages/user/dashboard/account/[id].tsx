import React from "react";
import ifAuthentecatedUser from "../../../../components/routeProtection/ifAuthentecatedUser";

const Account = () => {
    return <div>Account</div>;
};

export default ifAuthentecatedUser(Account);
