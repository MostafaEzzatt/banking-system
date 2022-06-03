import { addDoc, collection } from "firebase/firestore";
import { fireStore } from "./config";

const addLog = async (content: { [key: string]: any }) => {
    try {
        const logColRef = collection(fireStore, "logs");
        await addDoc(logColRef, content);
    } catch (e: any) {
        const err: string = e.code || e.message;
        throw Error(err);
    }
};

export default addLog;
