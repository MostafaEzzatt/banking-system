import { Dispatch, SetStateAction } from "react";

export default interface switchProps {
    switchForm: boolean;
    setSwitchForm: Dispatch<SetStateAction<boolean>>;
    showLabel?: boolean;
    trueValue?: string;
    falseValue?: string;
}
