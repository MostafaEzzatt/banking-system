import { heading, row, rows } from "../../type/tableProps";
import TableHeading from "./heading";
import TableRow from "./row";

const Table = ({ headings, rows }: { headings: heading[]; rows: rows[] }) => {
    return (
        <div className="relative overflow-x-auto shadow-md mt-8 ">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {headings.map((heading) => (
                            <TableHeading key={heading.txt} heading={heading} />
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, idx) => (
                        <TableRow key={idx} row={row} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
