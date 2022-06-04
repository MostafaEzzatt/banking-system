// components
import AdminActionBar from "../../../components/layout/actionBar/admin";
import ifAuthintecatedAdmin from "../../../components/routeProtection/ifAuthentecatedAdmin";

const Dashboard = () => {
    return (
        <>
            <AdminActionBar />
        </>
    );
};

export default ifAuthintecatedAdmin(Dashboard);
