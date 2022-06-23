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
} from "../../store/features/accounts/accounsSlice";
import { account } from "../../type/reduxAccountsState";
import authState from "../../type/reduxAuthState";

const Accounts = (props: { user: authState }) => {
    const { user } = props;
    const dispatch = useAppDispatch();
    const startSnap = useAppSelector((state) => state.configs.loadSnaps);
    useEffect(() => {
        let unSub: Unsubscribe;
        if (user.isLoggedIn && startSnap) {
            const getAccounts = async () => {
                const userDocRef = doc(fireStore, "users", user.user.uid);
                const accountsColRef = collection(fireStore, "accounts");
                const q =
                    user.user.role == "user"
                        ? query(
                              accountsColRef,
                              where("owner", "==", userDocRef),
                              orderBy("created_at", "asc")
                          )
                        : query(accountsColRef);

                return onSnapshot(q, {
                    next: (docs) => {
                        docs.docChanges().map((doc, idx) => {
                            const id: string = doc.doc.id;
                            const name: string = doc.doc.data()?.name;
                            const balance: number = doc.doc.data()?.balance;
                            const created_at: string = doc.doc
                                .data()
                                .created_at.toDate()
                                .toString();
                            const modified_at: string = doc.doc
                                .data()
                                .modified_at?.toDate()
                                .toString();
                            const owner = doc.doc.data()?.owner.id;

                            const activated = doc.doc.data()?.activated;

                            const account: account = {
                                id,
                                name,
                                balance,
                                created_at,
                                modified_at,
                                activated,
                                owner,
                            };

                            if (doc.type == "added") {
                                dispatch(add(account));
                            } else if (doc.type == "modified") {
                                dispatch(update(account));
                            } else if (doc.type == "removed") {
                                dispatch(remove(account));
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

        return () => {
            if (typeof unSub == "function") {
                unSub();
            }
        };
    }, [dispatch, startSnap, user.isLoggedIn, user.user.role, user.user.uid]);
    return <></>;
};

export default Accounts;
