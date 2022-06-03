import React from "react";

const List = ({ children }: { children: React.ReactNode }) => {
    return (
        <ul className="space-y-3 text-slate-200 mt-3 px-2 sm:pr-0">
            {children}
        </ul>
    );
};

export default List;
