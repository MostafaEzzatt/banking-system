import { ForwardedRef, forwardRef } from "react";

//types
import inputProp from "../../type/inputProp";

const Input = forwardRef(
    ({ ...props }: inputProp, ref: ForwardedRef<HTMLInputElement>) => {
        const { label, msg, ...others } = props;

        return (
            <div className="relative pt-6">
                <input
                    ref={ref}
                    {...others}
                    className="
                        block w-full bg-transparent 
                        border-t-0 border-x-0 border-b-2 border-b-slate-600 
                        hover:border-b-slate-400 
                        focus:border-b-slate-400 focus-within:border-b-sla-te-400
                        focus:border-t-0 focus:border-x-0 
                        focus-within:border-t-0 focus-within:border-x-0
                        focus:ring-0  
                        outline-none focus-within:outline-none focus:outline-none
                        transition-colors
                        // placeholder-transparent
                        text-slate-400
                        peer
                "
                />

                <label
                    className="
                        absolute
                        capitalize
                        peer-placeholder-shown:text-slate-600
                        peer-placeholder-shown:font-normal
                        peer-placeholder-shown:left-3
                        peer-placeholder-shown:top-8
                        peer-placeholder-shown:text-base
                        peer-focus:top-0
                        peer-focus:left-0
                        peer-focus:text-slate-400
                        peer-focus:font-medium
                        top-0
                        left-0
                        text-slate-400
                        font-medium
                        transition-all
                        pointer-events-none
                    "
                >
                    {label}
                </label>

                <p className="bg-red-400 text-white pl-2.5 capitalize">{msg}</p>
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;
