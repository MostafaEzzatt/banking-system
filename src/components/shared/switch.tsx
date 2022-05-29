// framer motion
import { AnimatePresence, motion } from "framer-motion";

// types
import switchProps from "../../type/switchProps";

const Switch = ({
    switchForm,
    setSwitchForm,
    showLabel = false,
    trueValue,
    falseValue,
}: switchProps) => {
    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30,
    };

    return (
        <div>
            <AnimatePresence exitBeforeEnter>
                <motion.div
                    className="text-green-500 text-center mb-2"
                    key={switchForm ? trueValue : falseValue}
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: -20 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.15 }}
                >
                    {showLabel &&
                        (switchForm ? (
                            <span>{trueValue}</span>
                        ) : (
                            <span>{falseValue}</span>
                        ))}
                </motion.div>
            </AnimatePresence>

            <div
                className={`w-20 h-10 flex items-center rounded-full cursor-pointer 
            ${switchForm ? "bg-slate-900" : "bg-green-800"}
            ${switchForm ? "justify-start" : "justify-end"}
            `}
                onClick={() => setSwitchForm((old) => !old)}
            >
                <motion.div
                    className={`h-10 w-10 rounded-full ${
                        switchForm ? "bg-slate-500" : "bg-green-500"
                    }`}
                    layout
                    transition={spring}
                />
            </div>
        </div>
    );
};

export default Switch;
