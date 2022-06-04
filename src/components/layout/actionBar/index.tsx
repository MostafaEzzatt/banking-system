import React from "react";

const ActionBar = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-slate-500 px-5 py-3 rounded-tl-lg rounded-tr-lg flex flex-col gap-5 sm:flex-row justify-between items-center drop-shadow-md">
            {children}
        </div>
    );
};

export default ActionBar;
