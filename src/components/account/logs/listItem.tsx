interface listItem {
    type: "charge" | "withdraw";
    before: number;
    after: number;
}

const ListItem = ({ type, before, after }: listItem) => {
    console.log({ type, before, after });
    return (
        <li className="text-slate-300 capitalize">
            - [ {type} ] Owner {type == "charge" ? "Charged" : "withdraw"}{" "}
            {after - before}
        </li>
    );
};

export default ListItem;
