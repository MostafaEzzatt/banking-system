import Link from "next/link";
import Clock from "../../assets/svg/clock.svg";

// type
import cardItem from "../../type/cardItem";

const CardItem = ({ id, name, balance, modified_at }: cardItem) => {
    return (
        <li className="col-span-3 bg-slate-500 shadow-sm hover:shadow-md transition-all text-slate-200 px-2.5 py-3.5 rounded space-y-2">
            <Link href={`dashboard/account/${id}`}>
                <a>
                    <div className="flex gap-1 items-center capitalize">
                        <span className="text-orange-200">name:</span>
                        <h2 className="font-medium text-xl">{name}</h2>
                    </div>
                    <div className="flex gap-1 items-center capitalize">
                        <span className="text-orange-200">Balance:</span>
                        <span>{balance}</span>
                    </div>
                    <div className="flex gap-1 items-center capitalize">
                        <span className="flex text-orange-200">
                            <Clock className="h-6 w-6" />:
                        </span>
                        {new Date(modified_at).toLocaleString()}
                    </div>
                </a>
            </Link>
        </li>
    );
};

export default CardItem;
