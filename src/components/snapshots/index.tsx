import { useAppSelector } from "../../hooks/redux";
import Accounts from "./accounts";

const Index = () => {
    const auth = useAppSelector((state) => state.auth);
    return (
        <>
            <Accounts user={auth} />
        </>
    );
};

export default Index;
