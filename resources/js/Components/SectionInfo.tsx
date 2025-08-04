import { HTMLAttributes } from "react";

export default function SectionInfo({
    children,
    className = "",
}: HTMLAttributes<HTMLElement>) {
    return (
        <section
            className={
                `border border-slate-500 rounded-md w-full p-5 ` + className
            }
        >
            {children}
        </section>
    );
}
