// type
import { account } from "../../../type/reduxAccountsState";

// components
import List from "./list";
import ListItem from "./listItem";

const Info = ({ account }: { account: account | null }) => {
    const created_at = account?.created_at || new Date().toString();
    const modified_at = account?.modified_at || new Date().toString();

    if (account === null) return <></>;
    return (
        <List>
            <ListItem label="Account ID" val={account.id} />
            <ListItem label="Balance" val={account.balance.toString()} />
            <ListItem
                label="Created At"
                val={new Date(created_at).toLocaleString()}
            />
            <ListItem
                label="Last Modification"
                val={new Date(modified_at).toLocaleString()}
            />
        </List>
    );
};

export default Info;
