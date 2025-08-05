import { PropsWithChildren } from "react";

function ListLayout({
    children,
    classname = "",
}: PropsWithChildren<{ classname?: string }>) {
    return (
        <div
            className={
                `grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(7,_fit-content(12vw))] gap-2  ` +
                classname
            }
        >
            {children}
        </div>
    );
}

export default ListLayout;
