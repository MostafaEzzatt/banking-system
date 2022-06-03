import buttonPrimary from "../../type/buttonPrimary";
import LoadingIcon from "../../assets/svg/spinner.svg";

const ButtonPrimary = (props: buttonPrimary) => {
    const { disabled, type = "button", txt } = props;
    return (
        <button
            type={type}
            className="w-full bg-orange-600 text-white py-3 font-medium hover:bg-orange-500 focus:bg-orange-300 cursor-pointer capitalize disabled:cursor-not-allowed"
            disabled={disabled}
        >
            {disabled ? (
                <LoadingIcon className="w-5 h-5 fill-gray-50 text-orange-300 mx-auto animate-spin" />
            ) : (
                txt
            )}
        </button>
    );
};

export default ButtonPrimary;
