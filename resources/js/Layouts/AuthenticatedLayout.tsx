import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavigationBar from "@/Components/NavigationBar";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen pb-6">
            <NavigationBar />
            <main className="max-w-7xl mx-auto px-6 py-4 lg:py-0 lg:px-0  mt-24">
                {children}
            </main>
            <ToastContainer autoClose={1000} />
        </div>
    );
}
