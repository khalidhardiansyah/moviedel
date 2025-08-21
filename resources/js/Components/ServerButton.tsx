import { AirdropIcon } from "hugeicons-react";
import { ButtonHTMLAttributes } from "react";
function ServerButton({
    children,
    className = "",
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                ` flex w-full justify-center gap-x-1 cursor-pointer min-h-9 rounded-xl overflow-hidden items-center hover:border-slate-200 hover:bg-slate-100/10 ` +
                className
            }
        >
            <AirdropIcon size={20} />
            {children}
        </button>
    );
}

export default ServerButton;
