import Spinner from "../../assets/svg/spinner.svg";

const LoadingFullScreen = () => {
    return (
        <div className="w-full h-custome-screen flex justify-center items-center">
            <Spinner className="w-8 h-8 mr-2 text-slate-600 animate-spin fill-orange-600" />
        </div>
    );
};

export default LoadingFullScreen;
