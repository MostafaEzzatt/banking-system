import React from "react";

const FWMessage = ({ txt }: { txt: string }) => {
    return (
        <div className="mt-7 text-center bg-slate-700 text-white font-medium text-lg py-4 rounded">
            {txt}
        </div>
    );
};

export default FWMessage;
