import { InertiaLinkProps, Link } from "@inertiajs/react";
import React from "react";

function BaseLink({ className = "", children, ...props }: InertiaLinkProps) {
    return (
        <Link
            {...props}
            className={
                "rounded-md text-sm text-gray-500 underline hover:text-gray-100  " +
                className
            }
        >
            {children}
        </Link>
    );
}

export default BaseLink;
