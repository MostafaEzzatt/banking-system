import { useState } from "react";

// framer motion
import { AnimatePresence, motion } from "framer-motion";

// types
import type { NextPage } from "next";

// components
import Signin from "../components/forms/signin";
import Signup from "../components/forms/signup";
import Switch from "../components/shared/switch";

// Route Protection
import ifUnAuthintecated from "../components/routeProtection/ifUnAuthentecation";

const Home: NextPage = () => {
    const [switchForm, setSwitchForm] = useState(true);

    return (
        <main className="w-full h-screen  flex flex-col justify-center items-center relative">
            <div className="absolute top-8 left-8">
                <Switch
                    switchForm={switchForm}
                    setSwitchForm={setSwitchForm}
                    showLabel
                    trueValue="sign up"
                    falseValue="sign in"
                />
            </div>

            <AnimatePresence exitBeforeEnter>
                <motion.div
                    key={switchForm ? "signup" : "signin"}
                    animate={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: 20 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.15 }}
                >
                    {switchForm ? <Signup /> : <Signin />}
                </motion.div>
            </AnimatePresence>
        </main>
    );
};

export default ifUnAuthintecated(Home);
