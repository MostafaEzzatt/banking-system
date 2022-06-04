const ListItem = ({ label, val }: { label: string; val: string }) => {
    return (
        <li className="space-x-1">
            <span className="text-orange-200 font-medium">{label}:</span>
            <span> {val}</span>
        </li>
    );
};

export default ListItem;
