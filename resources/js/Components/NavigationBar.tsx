import React from "react";
import { UserIcon } from "hugeicons-react";
import { Link } from "@inertiajs/react";

function NavigationBar() {
    return (
        <nav className=" bg-black w-full h-14 px-5 flex items-center justify-center">
            <div className="flex items-center justify-between w-full h-full max-w-7xl">
                <div className=" flex gap-x-3">
                    <Link
                        className=" text-slate-100 "
                        href={route("movies.create")}
                    >
                        MovieDel
                    </Link>
                    <Link
                        className=" text-slate-100 "
                        href={route("movies.trending")}
                    >
                        Trending
                    </Link>
                </div>

                <Link href={route("login")} className="text-slate-100">
                    <UserIcon />
                </Link>
            </div>
        </nav>
    );
}

export default NavigationBar;
