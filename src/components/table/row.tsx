import React from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "../../hooks/redux";
import { row, rows } from "../../type/tableProps";

const TableRow = ({ row }: { row: rows }) => {
    const authSelector = useAppSelector((state) => state.auth.user.uid);

    const handleClick = (cell: row) => {
        if (cell.user.uid === authSelector) {
            toast.info(
                "unable to do that ask another admin to do that for you",
                {
                    toastId: "changeSelf",
                }
            );
            return;
        }

        if (cell.button) {
            const done = cell.click(cell.user.uid, cell.value);

            if (done) {
                toast.success("Change Applyed", {
                    toastId: `changePropSuccess${cell.value}`,
                });
            } else {
                toast.error("Change Failed", { toastId: "changePropFailed" });
            }
        }
    };

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            {row.map((cell, idx) => (
                <td
                    key={idx}
                    className={`px-6 py-4${cell.button ? " text-center" : ""}`}
                >
                    {cell.button ? (
                        <button
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline capitalize"
                            onClick={() => handleClick(cell)}
                        >
                            {cell.txt}
                        </button>
                    ) : (
                        cell.txt
                    )}
                </td>
            ))}
        </tr>
    );
};

export default TableRow;
