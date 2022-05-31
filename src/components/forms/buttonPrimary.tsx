import buttonPrimary from "../../type/buttonPrimary";

const ButtonPrimary = (props: buttonPrimary) => {
    const { disabled, type = "button", txt } = props;
    return (
        <button
            type={type}
            className="w-full bg-orange-600 text-white py-3 font-medium hover:bg-orange-500 focus:bg-orange-300 cursor-pointer capitalize disabled:cursor-not-allowed"
            disabled={disabled}
        >
            {txt}
        </button>
    );
};

export default ButtonPrimary;
