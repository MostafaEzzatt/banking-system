// redux

import { signOut } from "firebase/auth";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { auth } from "../../lib/firebase/config";
import { clearAccounts } from "../../store/features/accounts/accounsSlice";
import { logout } from "../../store/features/auth/authSlice";
import { clearLogs } from "../../store/features/logs/logsSlice";
import ButtonSecondary from "../forms/buttonSecondary";

const Header = () => {
    const authSelector = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const handleSignout = () => {
        signOut(auth);
        dispatch(logout());
        dispatch(clearAccounts());
        dispatch(clearLogs());
    };

    return (
        <header>
            <nav className="container mx-auto py-6 px-8 flex items-center justify-between">
                <Link href="/">
                    <a className="text-gray-200 font-bold text-2xl hover:text-white transition-colors">
                        Bank System
                    </a>
                </Link>

                <div>
                    <span className="text-orange-300">
                        welcome,{" "}
                        {authSelector.isLoggedIn && authSelector.user.username}
                    </span>
                    <ButtonSecondary
                        onClickHandler={handleSignout}
                        txt="signout"
                        type="button"
                    />
                </div>
            </nav>
        </header>
    );
};

export default Header;
