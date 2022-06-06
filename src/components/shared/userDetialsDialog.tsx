import React, { Dispatch, SetStateAction } from "react";
import { user } from "../../type/reduxUsersState";

const UserDetialsDialog = (props: {
    handle: Dispatch<SetStateAction<boolean>>;
    user: user | undefined;
}) => {
    if (props.user === undefined)
        return (
            <div className="w-80 bg-gray-50 rounded px-3 py-4 drop-shadow-md">
                Cant Find User
            </div>
        );

    return (
        <div
            className="ma-w-[375px] bg-gray-50 rounded px-3 py-4 drop-shadow-md text-slate-900"
            onClick={(e) => e.stopPropagation()}
        >
            <h3 className="font-semibold mb-2 text-slate-900">User Details</h3>
            <hr />

            <ul className="mt-4 flex flex-col gap-2">
                <li className="space-x-2">
                    <span className="font-semibold inline-block">Id :</span>
                    <span className="text-slate-700 inline-block">
                        {props.user.uid}
                    </span>
                </li>
                <li className="space-x-2">
                    <span className="font-semibold inline-block">
                        Username :
                    </span>
                    <span className="text-slate-700 inline-block">
                        {props.user.username}
                    </span>
                </li>
                <li className="space-x-2">
                    <span className="font-semibold inline-block">Phone :</span>
                    <span className="text-slate-700 inline-block">
                        {props.user.phone}
                    </span>
                </li>
                <li className="space-x-2">
                    <span className="font-semibold inline-block">Role :</span>
                    <span className="text-slate-700 inline-block">
                        {props.user.role}
                    </span>
                </li>
                <li className="space-x-2">
                    <span className="font-semibold inline-block">
                        Create At :
                    </span>
                    <span className="text-slate-700 inline-block">
                        {new Date(props.user.created_at).toLocaleString()}
                    </span>
                </li>
            </ul>
        </div>
    );
};

export default UserDetialsDialog;
