import { Unsubscribe } from "firebase/auth";
import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fireStore } from "../../lib/firebase/config";
import {
    add,
    finishLoading,
    remove,
    update,
} from "../../store/features/logs/logsSlice";
import authState from "../../type/reduxAuthState";
import { log } from "../../type/reduxLogsState";

const Logs = (props: { user: authState }) => {
    const { user } = props;
    const dispatch = useAppDispatch();
    const startSnap = useAppSelector((state) => state.configs.loadSnaps);

    useEffect(() => {
        let unSub: Unsubscribe;
        if (user.isLoggedIn && user.user.role !== "admin" && startSnap) {
            if (user.isLoggedIn) {
                const getAccounts = async () => {
                    const userDocRef = doc(fireStore, "users", user.user.uid);
                    const logsColRef = collection(fireStore, "logs");
                    const q =
                        user.user.role == "user"
                            ? query(
                                  logsColRef,
                                  where("owner", "array-contains", userDocRef),
                                  orderBy("created_at", "asc")
                              )
                            : query(logsColRef);

                    return onSnapshot(q, {
                        next: (docs) => {
                            docs.docChanges().map((doc, idx) => {
                                const id: string = doc.doc.id;
                                const account: string =
                                    doc.doc.data()?.account.id;
                                const owner: string =
                                    doc.doc.data()?.type == "transaction"
                                        ? doc.doc.data()?.from.id
                                        : doc.doc.data()?.owner[0].id;
                                const type:
                                    | "charge"
                                    | "withdraw"
                                    | "transaction" = doc.doc.data()?.type;
                                const beforeAmount: number =
                                    doc.doc.data()?.beforeAmount;
                                const afterAmount: number =
                                    doc.doc.data()?.afterAmount;
                                const from: string = doc.doc.data()?.from?.id;
                                const to: string = doc.doc.data()?.to?.id;
                                const toAccount: string =
                                    doc.doc.data()?.toAccount?.id;
                                const amount: number = doc.doc.data()?.amount;
                                const created_at: string = doc.doc
                                    .data()
                                    ?.created_at.toDate()
                                    .toString();

                                const logRedux: log = {
                                    id,
                                    account,
                                    owner,
                                    type,
                                    beforeAmount,
                                    afterAmount,
                                    created_at,
                                    from,
                                    to,
                                    toAccount,
                                    amount,
                                };

                                if (doc.type == "added") {
                                    dispatch(add(logRedux));
                                } else if (doc.type == "modified") {
                                    dispatch(update(logRedux));
                                } else if (doc.type == "removed") {
                                    dispatch(remove(logRedux));
                                }

                                if (docs.docChanges().length == idx + 1) {
                                    dispatch(finishLoading());
                                }
                            });
                            if (docs.docChanges().length == 0) {
                                dispatch(finishLoading());
                            }
                        },
                    });
                };

                getAccounts().then((un) => (unSub = un));
            }
        }
        return () => {
            if (typeof unSub == "function") {
                unSub();
            }
        };
    }, [dispatch, startSnap, user.isLoggedIn, user.user.role, user.user.uid]);
    return <></>;
};

export default Logs;
