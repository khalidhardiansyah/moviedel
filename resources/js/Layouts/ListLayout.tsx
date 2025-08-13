import { PropsWithChildren } from "react";

function ListLayout({
    children,
    classname = "",
}: PropsWithChildren<{ classname?: string }>) {
    return (
        <div
            className={
                `grid grid-flow-row  grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-2 ` +
                classname
            }
        >
            {children}
        </div>
    );
}

export default ListLayout;
