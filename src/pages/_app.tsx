import type { AppProps } from "next/app";
import "../styles/globals.css";

// components
import OnAuthStateChange from "../components/onInitApp/onAuthStateChange";
import Snapshots from "../components/snapshots";

// toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// redux
import { Provider } from "react-redux";
import { store } from "../store";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <ToastContainer theme="dark" />
            <Provider store={store}>
                <OnAuthStateChange />
                <Snapshots />
                <Component {...pageProps} />
            </Provider>
        </>
    );
}

export default MyApp;
