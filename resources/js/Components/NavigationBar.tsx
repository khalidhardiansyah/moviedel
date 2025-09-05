import React, { useEffect, useState } from "react";
import { Search01Icon, UserIcon } from "hugeicons-react";
import { Link, router, usePage } from "@inertiajs/react";
import NavLink from "./NavLink";
import ResponsiveNavLink from "./ResponsiveNavLink";
import Dropdown from "./Dropdown";
import ProfileDropdown from "./ProfileDropdown";
import TextInput from "./TextInput";

export default function NavigationBar() {
    const { auth } = usePage().props;
    return (
        <nav className=" bg-primary/55 backdrop-blur-xs fixed z-20  w-full h-20 top-0 px-5 flex items-center justify-center">
            <div className="flex items-center justify-between w-full h-full max-w-7xl">
                <div className=" flex gap-x-3">
                    <NavLink
                        href={route("movies.create")}
                        active={route().current("movies.create")}
                    >
                        Movie Del
                    </NavLink>
                    <NavLink
                        href={route("movies.trending")}
                        active={route().current("movies.trending")}
                    >
                        trending
                    </NavLink>
                    {auth.user && (
                        <>
                            <NavLink
                                className=" hidden sm:block"
                                href={route("playlists")}
                                active={route().current("playlists")}
                            >
                                Playlist
                            </NavLink>
                            <NavLink
                                className=" hidden sm:block"
                                href={route("profile.edit")}
                                active={route().current("profile.edit")}
                            >
                                Profile
                            </NavLink>
                        </>
                    )}
                </div>
                <ProfileDropdown />
            </div>
        </nav>
    );
}
