import React from "react";

export const TextSkeleton = ({ className = "" }: { className?: string }) => {
    return (
        <div
            className={
                `h-5 bg-gray-200 rounded-full w-48 mb-4 animate-pulse ` +
                className
            }
        ></div>
    );
};
