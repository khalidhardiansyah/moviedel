import { ButtonHTMLAttributes } from "react";

export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `inline-flex justify-center items-center rounded-md  bg-slate-100  px-4 py-2  capitalize  text-black transition duration-150 ease-in-out hover:bg-slate-100/80 ${
                    disabled
                        ? "opacity-25 cursor-not-allowed"
                        : "cursor-pointer"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
