import React from "react";
import { heading } from "../../type/tableProps";

const TableHeading = ({ heading }: { heading: heading }) => {
    return (
        <th key={heading.txt} scope="col" className="px-6 py-3">
            {heading.srOnly ? (
                <span className="sr-only">{heading.txt}</span>
            ) : (
                heading.txt
            )}
        </th>
    );
};

export default TableHeading;
