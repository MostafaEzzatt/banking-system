import React from "react";

const ActionBarButton = ({
    txt,
    click,
}: {
    txt: string;
    click: () => void;
}) => {
    return (
        <button
            className="px-2 bg-orange-50 rounded hover:bg-slate-200 transition-colors text-slate-900"
            onClick={() => click()}
        >
            {txt}
        </button>
    );
};

export default ActionBarButton;
