import Link from "next/link";
import { useRouter } from "next/router";
import ActionBar from ".";
import ActionBarHeading from "./actionBarHeading";

const AdminActionBar = () => {
    const router = useRouter();

    const TitleTxt =
        router.pathname == "/user/admin/accounts" ? "Accounts" : "Users";

    return (
        <ActionBar>
            <ActionBarHeading txt={TitleTxt} />
            <div className="space-x-5">
                <Link href="/user/admin">
                    <a className="text-slate-200 hover:text-slate-50 transition-colors">
                        Users
                    </a>
                </Link>
                <Link href="/user/admin/accounts">
                    <a className="text-slate-200 hover:text-slate-50 transition-colors">
                        Accounts
                    </a>
                </Link>
            </div>
        </ActionBar>
    );
};

export default AdminActionBar;
