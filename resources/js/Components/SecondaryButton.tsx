import { ButtonHTMLAttributes } from "react";

export default function SecondaryButton({
    type = "button",
    className = "",
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex justify-center items-center rounded-md bg-[#333434] px-4 py-2  transition duration-150 ease-in-out hover:bg-[#333434]/55 cursor-pointer ${
                    disabled && "opacity-25 cursor-not-allowed"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
