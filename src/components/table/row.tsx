import React from "react";
import { toast } from "react-toastify";
import { clearLine } from "readline";
import { useAppSelector } from "../../hooks/redux";
import { row, rows } from "../../type/tableProps";

// assets
import DocumentIcon from "../../assets/svg/document.svg";

const TableRow = ({ row }: { row: rows }) => {
    const authSelector = useAppSelector((state) => state.auth.user.uid);

    const handleClick = (cell: row) => {
        if (cell.user !== undefined && cell.user.uid === authSelector) {
            toast.info(
                "unable to do that ask another admin to do that for you",
                {
                    toastId: "changeSelf",
                }
            );
            return;
        }

        if (cell.button && cell.click !== undefined) {
            const done = cell.click(cell.targetId, cell.value);

            if (done) {
                toast.success("Change Applyed", {
                    toastId: `changePropSuccess${cell.value}`,
                });
            } else {
                toast.error("Change Failed", { toastId: "changePropFailed" });
            }
        }
    };

    const handleUserDialog = (cell: row) => {
        if (
            cell.setUserDetails === undefined ||
            cell.userDetailsDialog === undefined
        )
            return;

        cell.setUserDetails();
        cell.userDetailsDialog(true);
    };
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            {row.map((cell, idx) => (
                <td
                    key={idx}
                    className={`px-6 py-4${cell.button ? " text-center" : ""}`}
                >
                    <div className="flex items-center gap-2">
                        {cell.button ? (
                            <button
                                className="font-medium text-orange-600 dark:text-orange-500 hover:underline capitalize"
                                onClick={() => handleClick(cell)}
                            >
                                {cell.txt}
                            </button>
                        ) : (
                            cell.txt
                        )}

                        {cell.setUserDetails !== undefined &&
                            cell.userDetailsDialog !== undefined && (
                                <button
                                    className="font-medium text-orange-600 dark:text-orange-500 hover:underline capitalize"
                                    onClick={() => handleUserDialog(cell)}
                                >
                                    <DocumentIcon className="h-4 w-4" />
                                </button>
                            )}
                    </div>
                </td>
            ))}
        </tr>
    );
};

export default TableRow;
