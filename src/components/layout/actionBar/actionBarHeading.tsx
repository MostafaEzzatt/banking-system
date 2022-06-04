import React from "react";

const ActionBarHeading = ({ txt }: { txt: string }) => {
    return (
        <h4 className="font-medium text-xl capitalize text-slate-200">{txt}</h4>
    );
};

export default ActionBarHeading;
