import { useEffect } from "react";

// firebase
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../lib/firebase/config";
import getUserById from "../../lib/firebase/getUserById";
import messages from "../../messages/firebase";

// redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { login, logout } from "../../store/features/auth/authSlice";
import { loadSnapToggle } from "../../store/features/configs/configsSlice";

// toastify
import { toast } from "react-toastify";
import toggleUserOnline from "../../lib/firebase/toggleUserOnline";

const OnAuthStateChange = () => {
    let dispatch = useAppDispatch();
    const authSelector = useAppSelector((state) => state.auth);

    useEffect(() => {
        const unSubAuthStateChange = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userFromFirestore = await getUserById(user.uid);
                if (userFromFirestore && userFromFirestore.complete) {
                    dispatch(login(userFromFirestore.user));
                } else if (userFromFirestore && userFromFirestore.error) {
                    dispatch(loadSnapToggle(false));
                    signOut(auth);
                    dispatch(logout());
                    toast.error(messages["not-found"], {
                        toastId: "getUserFromFirebase",
                    });
                }
            } else {
                toggleUserOnline(authSelector.user.uid, false);
                dispatch(loadSnapToggle(false));
                dispatch(logout());
            }
        });

        return () => {
            if (typeof unSubAuthStateChange == "function") {
                unSubAuthStateChange();
            }
        };
    }, [authSelector.user.uid, dispatch]);
    return <></>;
};

export default OnAuthStateChange;
