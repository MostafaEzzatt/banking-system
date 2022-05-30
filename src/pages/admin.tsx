import React from "react";

// components
import ifAuthintecatedAdmin from "../components/routeProtection/ifAuthentecatedAdmin";

// firebase
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase/config";

// redux
import { useAppDispatch } from "../hooks/redux";
import { logout } from "../store/features/auth/authSlice";

const Dashboard = () => {
    const dispatch = useAppDispatch();

    const handleSignout = () => {
        signOut(auth);
        dispatch(logout);
    };

    return (
        <>
            <h2 className="text-white">Admin Area Only</h2>
            <button
                className="bg-orange-500 text-white px-4 py-2"
                onClick={handleSignout}
            >
                Dashboard
            </button>
        </>
    );
};

export default ifAuthintecatedAdmin(Dashboard);
