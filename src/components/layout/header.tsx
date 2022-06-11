// redux

import { signOut } from "firebase/auth";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { auth } from "../../lib/firebase/config";
import { clearAccounts } from "../../store/features/accounts/accounsSlice";
import { logout } from "../../store/features/auth/authSlice";
import { loadSnapToggle } from "../../store/features/configs/configsSlice";
import { clearLogs } from "../../store/features/logs/logsSlice";
import { clearUsers } from "../../store/features/users/usersSlice";
import ButtonSecondary from "../forms/buttonSecondary";

const Header = () => {
    const authSelector = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const handleSignout = () => {
        dispatch(loadSnapToggle(false));
        signOut(auth);
        dispatch(logout());
        dispatch(clearAccounts());
        dispatch(clearLogs());
        dispatch(clearUsers());
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
