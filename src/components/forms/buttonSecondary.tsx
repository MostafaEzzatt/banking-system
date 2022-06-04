// types
import buttonSecondary from "../../type/buttonSecondary";

const ButtonSecondary = (props: buttonSecondary) => {
    const { txt, onClickHandler, ...others } = props;
    return (
        <button
            className="text-orange-600 px-3 py-2 border-2 border-solid border-orange-600 rounded ml-2 hover:text-orange-400 hover:border-orange-400 transition-colors"
            onClick={onClickHandler}
            {...others}
        >
            {txt}
        </button>
    );
};

export default ButtonSecondary;
