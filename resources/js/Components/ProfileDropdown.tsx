import { usePage, Link } from "@inertiajs/react";
import Dropdown from "./Dropdown";
import React from "react";
import { UserIcon } from "hugeicons-react";

function ProfileDropdown() {
    const { auth } = usePage().props;

    return (
        <div className=" relative">
            {auth.user ? (
                <Dropdown>
                    <Dropdown.Trigger>
                        <button
                            data-testid="dropdown-trigger"
                            className="cursor-pointer text-slate-200/75 hover:text-white"
                        >
                            <UserIcon />
                        </button>
                    </Dropdown.Trigger>

                    <Dropdown.Content contentClasses="bg-secondary ring-0">
                        <Dropdown.Link
                            active={route().current("profile.edit")}
                            href={route("profile.edit")}
                        >
                            Profile
                        </Dropdown.Link>
                        <Dropdown.Link
                            active={route().current("playlists")}
                            href={route("playlists")}
                        >
                            Playlists
                        </Dropdown.Link>
                        <Dropdown.Link
                            active={route().current("logout")}
                            href={route("logout")}
                            method="post"
                            as="button"
                        >
                            Log Out
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            ) : (
                <Link
                    href={route("login")}
                    className="cursor-pointer text-slate-200/75 hover:text-white"
                >
                    <UserIcon />
                </Link>
            )}
        </div>
    );
}

export default ProfileDropdown;
