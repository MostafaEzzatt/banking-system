import React from "react";

const ActionBarButton = ({
    txt,
    click,
}: {
    txt: string;
    click: () => void;
}) => {
    return (
        <button className="px-2 bg-orange-50 rounded" onClick={() => click()}>
            {txt}
        </button>
    );
};

export default ActionBarButton;
