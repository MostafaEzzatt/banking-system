import { motion } from "framer-motion";
import { Children, Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";

const DialogContainer = (props: {
    children: React.ReactNode;
    handle: Dispatch<SetStateAction<boolean>>;
}) => {
    return createPortal(
        <motion.div
            key="createDialog"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/50 flex justify-center items-center"
            onClick={() => props.handle(false)}
        >
            {props.children}
        </motion.div>,
        document.getElementById("bank-dialogs")!
    );
};

export default DialogContainer;
