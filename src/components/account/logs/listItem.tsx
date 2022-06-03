import { useAppSelector } from "../../../hooks/redux";
import { log } from "../../../type/reduxLogsState";

interface listItem {
    type: "charge" | "withdraw" | "transaction";
    before: number;
    after: number;
}

const ListItem = ({
    log,
    accountId,
}: {
    log: log;
    accountId: string | string[] | undefined;
}) => {
    const auth = useAppSelector((state) => state.auth.user.uid);
    const account = accountId && !Array.isArray(accountId) ? accountId : null;

    if (!account || typeof account == null) return <></>;
    return (
        <li className="text-slate-300 capitalize">
            - {new Date(log.created_at).toLocaleString()} | [ {log.type} ]{" "}
            {log.type == "transaction" && log.from !== auth
                ? log.account
                : "You"}{" "}
            {log.type == "charge"
                ? "Charged"
                : log.type == "transaction"
                ? "transacted"
                : "withdraw"}{" "}
            {log.type == "transaction"
                ? log.amount
                : log.type == "charge"
                ? log.afterAmount - log.beforeAmount
                : log.beforeAmount - log.afterAmount}{" "}
            {log.type == "transaction"
                ? log.toAccount == account
                    ? "To You"
                    : `To ${log.toAccount}`
                : ""}
        </li>
    );
};

export default ListItem;
