import React from "react";
import { UserIcon } from "hugeicons-react";
import { Link } from "@inertiajs/react";

function NavigationBar() {
    return (
        <nav className=" bg-black w-full h-14 px-5 flex items-center justify-center">
            <div className="flex items-center justify-between w-full h-full max-w-7xl">
                <Link className=" text-slate-100" href={route("movies.index")}>
                    MovieDel
                </Link>

                <Link href={route("login")} className="text-slate-100">
                    <UserIcon />
                </Link>
            </div>
        </nav>
    );
}

export default NavigationBar;
