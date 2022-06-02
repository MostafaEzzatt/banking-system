import React, { useEffect } from "react";
import { log } from "../type/reduxLogsState";
import { useAppSelector } from "./redux";

const useGetAccountLogs = (id: string | string[] | undefined) => {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [log, setLog] = React.useState<null | log[]>(null);
    const allLogs = useAppSelector((state) => state.logs);

    useEffect(() => {
        if (!allLogs.isLoading && !id) {
            setLoading(false);
            setError(true);
        } else if (
            id &&
            typeof id !== "undefined" &&
            !Array.isArray(id) &&
            !allLogs.isLoading
        ) {
            const log = allLogs.logs.filter((log) => log.account == id);

            console.log({ allLogs, log });
            if (log.length > 0) {
                setLog(log);
                setLoading(false);
                setError(false);
            } else {
                setLoading(false);
                setError(true);
            }
        }
    }, [allLogs, id]);

    return { log, loading, error };
};

export default useGetAccountLogs;
