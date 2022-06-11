import {
    collection,
    onSnapshot,
    orderBy,
    query,
    Unsubscribe,
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
} from "../../store/features/users/usersSlice";
import authState from "../../type/reduxAuthState";
import { user } from "../../type/reduxUsersState";

const Users = (props: { user: authState }) => {
    const { user } = props;
    const dispatch = useAppDispatch();
    const startSnap = useAppSelector((state) => state.configs.loadSnaps);

    useEffect(() => {
        let unSub: Unsubscribe;
        if (user.isLoggedIn && startSnap) {
            const getUsers = async () => {
                const usersColRef = collection(fireStore, "users");
                const q =
                    user.user.role === "admin"
                        ? query(usersColRef, orderBy("created_at", "asc"))
                        : query(
                              usersColRef,
                              where("__name__", "==", user.user.uid)
                          );

                return onSnapshot(q, {
                    next: (docs) => {
                        docs.docChanges().map((doc, idx) => {
                            const uid: string = doc.doc.id;
                            const username: string = doc.doc.data()?.mail;
                            const phone: string = doc.doc.data()?.phone;
                            const role: string = doc.doc.data()?.role;
                            const active: boolean = doc.doc.data()?.active;
                            const suspend: boolean = doc.doc.data()?.suspend;
                            const created_at: string = doc.doc
                                .data()
                                ?.created_at.toDate()
                                .toString();
                            const modified_at = doc.doc
                                .data()
                                ?.modified_at.toDate()
                                .toString();

                            const currentUser: user = {
                                uid,
                                username,
                                phone,
                                role,
                                active,
                                created_at,
                                modified_at,
                                suspend,
                            };

                            if (doc.type == "added") {
                                dispatch(add(currentUser));
                            } else if (doc.type == "modified") {
                                dispatch(update(currentUser));
                            } else if (doc.type == "removed") {
                                dispatch(remove(currentUser));
                            }

                            if (docs.docChanges().length == idx + 1) {
                                dispatch(finishLoading());
                            }
                        });
                    },
                });
            };

            getUsers().then((un) => (unSub = un));
        }
        return () => {
            if (typeof unSub == "function") {
                unSub();
            }
        };
    }, [dispatch, startSnap, user.isLoggedIn, user.user.role, user.user.uid]);

    return <></>;
};

export default Users;
