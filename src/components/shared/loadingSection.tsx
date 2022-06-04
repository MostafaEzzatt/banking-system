// assets
import Spinner from "../../assets/svg/spinner.svg";

const LoadingSection = () => {
    return (
        <div className="px-8 py-8">
            <Spinner className="w-8 h-8 mr-2 text-slate-600 animate-spin fill-orange-600" />
        </div>
    );
};

export default LoadingSection;
