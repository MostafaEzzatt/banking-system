import { useState } from "react";
import { AnimatePresence } from "framer-motion";

// assets
import Clock from "../../../assets/svg/clock.svg";

// components
import ifAuthintecatedUser from "../../../components/routeProtection/ifAuthentecatedUser";
import Header from "../../../components/layout/header";
import CreateDialog from "../../../components/account/createDialog";

// redux
import { useAppSelector } from "../../../hooks/redux";

const Dashboard = () => {
    const [show, setShow] = useState(false);
    const accounts = useAppSelector((state) => state.accounts);
    return (
        <>
            <AnimatePresence exitBeforeEnter>
                {show && <CreateDialog handle={setShow} />}
            </AnimatePresence>
            <Header />
            <main className="container mx-auto px-8">
                <div className="bg-slate-500 px-5 py-3 rounded-tl-lg rounded-tr-lg flex justify-between">
                    <h4 className="font-medium text-xl text-slate-200">
                        Your Accounts
                    </h4>

                    <button
                        className="px-2 bg-orange-50 rounded"
                        onClick={() => setShow(true)}
                    >
                        Create
                    </button>
                </div>
                {accounts.accounts.length > 0 ? (
                    <ul className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 gap-5 mt-8">
                        {accounts.accounts.map((acc) => (
                            <li
                                key={acc.id}
                                className="col-span-3 bg-slate-500 shadow-sm hover:shadow-md transition-all text-slate-200 px-2.5 py-3.5 rounded space-y-2"
                            >
                                <div className="flex gap-1 items-center capitalize">
                                    <span className="text-orange-200">
                                        name:
                                    </span>
                                    <h2 className="font-medium text-xl">
                                        {acc.name}
                                    </h2>
                                </div>
                                <div className="flex gap-1 items-center capitalize">
                                    <span className="text-orange-200">
                                        Balance:
                                    </span>
                                    <span>{acc.balance}</span>
                                </div>
                                <div className="flex gap-1 items-center capitalize">
                                    <span className="flex text-orange-200">
                                        <Clock className="h-6 w-6" />:
                                    </span>
                                    {new Date(acc.modified_at).toLocaleString()}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    ""
                )}
            </main>
        </>
    );
};

export default ifAuthintecatedUser(Dashboard);
