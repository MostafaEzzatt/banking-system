import React from "react";

const CheckList = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <ul className="space-y-4">
                <li className="text-slate-50 space-x-3">
                    <span className="w-60 inline-block text-green-400">
                        Login
                    </span>
                    <span className="px-2 w-28 text-center uppercase bg-green-400 text-green-900 inline-block">
                        [done]
                    </span>
                </li>

                <li className="text-slate-50 space-x-3">
                    <span className="w-60 inline-block">See User Details</span>
                    <span className="px-2 w-28 text-center uppercase bg-red-400 text-red-900 inline-block">
                        [on-going]
                    </span>
                </li>

                <li className="text-slate-50 space-x-3">
                    <span className="w-60 inline-block">Verify User</span>
                    <span className="px-2 w-28 text-center uppercase bg-red-400 text-red-900 inline-block">
                        [on-going]
                    </span>
                </li>

                <li className="text-slate-50 space-x-3">
                    <span className="w-60 inline-block">
                        Approve User Bank Account
                    </span>
                    <span className="px-2 w-28 text-center uppercase bg-red-400 text-red-900 inline-block">
                        [on-going]
                    </span>
                </li>

                <li className="text-slate-50 space-x-3">
                    <span className="w-60 inline-block">Suspend User</span>
                    <span className="px-2 w-28 text-center uppercase bg-red-400 text-red-900 inline-block">
                        [on-going]
                    </span>
                </li>
            </ul>
        </div>
    );
};

export default CheckList;
