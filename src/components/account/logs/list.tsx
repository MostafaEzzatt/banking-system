import React from "react";

const List = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-slate-500 mt-7 rounded px-2.5 py-3.5">
            <div className="bg-slate-900 px-3 py-2">
                <ul className="space-y-2">{children}</ul>
            </div>
        </div>
    );
};

export default List;
