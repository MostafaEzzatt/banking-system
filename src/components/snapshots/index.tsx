import { useAppSelector } from "../../hooks/redux";
import Accounts from "./accounts";
import Logs from "./logs";

const Index = () => {
    const auth = useAppSelector((state) => state.auth);
    return (
        <>
            <Accounts user={auth} />
            <Logs user={auth} />
        </>
    );
};

export default Index;
