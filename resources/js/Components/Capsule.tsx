import { HTMLAttributes } from "react";
function Capsule({ text }: { text: string }) {
    return (
        <div className=" text-xs rounded-xl px-2 py-1 border hover:bg-slate-100  hover:text-black cursor-default min-w-12 text-center hover:text">
            {text}
        </div>
    );
}

export default Capsule;
