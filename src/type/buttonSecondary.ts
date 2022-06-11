interface buttonSecondary {
    txt: string;
    onClickHandler: () => void;
    type: "button" | "submit" | "reset";
    disabled?: boolean;
}

export default buttonSecondary;
