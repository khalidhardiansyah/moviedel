import { HTMLAttributes } from "react";
function Capsule({ text }: { text: string }) {
    return (
        <div className=" text-xs rounded-xl px-2 py-1 border hover:bg-slate-900/25 hover:text">
            {text}
        </div>
    );
}

export default Capsule;
