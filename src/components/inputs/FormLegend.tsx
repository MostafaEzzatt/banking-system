import formLegendsProps from "../../type/formLegendsProps";

const FormLegend = ({ txt }: formLegendsProps) => {
    return (
        <legend className="mb-5 text-3xl font-semibold text-shark text-slate-300 text-center">
            {txt}
        </legend>
    );
};

export default FormLegend;
