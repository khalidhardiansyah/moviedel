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

// <nav className="border-b border-gray-100 bg-black ">
//     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 justify-between">
//             <div className="flex">
//                 <div className="flex shrink-0 items-center">
//                     <Link href="/">
//                         <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
//                     </Link>
//                 </div>

//                 <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
//                     <NavLink
//                         href={route("dashboard")}
//                         active={route().current("dashboard")}
//                     >
//                         My Playlist
//                     </NavLink>
//                 </div>
//             </div>

//             <div className="hidden sm:ms-6 sm:flex sm:items-center">
//
//             </div>

//             <div className="-me-2 flex items-center sm:hidden">
//                 <button
//                     onClick={() =>
//                         setShowingNavigationDropdown(
//                             (previousState) => !previousState
//                         )
//                     }
//                     className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
//                 >
//                     <svg
//                         className="h-6 w-6"
//                         stroke="currentColor"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                     >
//                         <path
//                             className={
//                                 !showingNavigationDropdown
//                                     ? "inline-flex"
//                                     : "hidden"
//                             }
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M4 6h16M4 12h16M4 18h16"
//                         />
//                         <path
//                             className={
//                                 showingNavigationDropdown
//                                     ? "inline-flex"
//                                     : "hidden"
//                             }
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M6 18L18 6M6 6l12 12"
//                         />
//                     </svg>
//                 </button>
//             </div>
//         </div>
//     </div>

//     <div
//         className={
//             (showingNavigationDropdown ? "block" : "hidden") +
//             " sm:hidden"
//         }
//     >
//         <div className="space-y-1 pb-3 pt-2">
//             <ResponsiveNavLink
//                 href={route("dashboard")}
//                 active={route().current("dashboard")}
//             >
//                 Dashboard
//             </ResponsiveNavLink>
//         </div>

//         <div className="border-t border-gray-200 pb-1 pt-4">
//             <div className="px-4">
//                 <div className="text-base font-medium text-gray-800">
//                     {user.name}
//                 </div>
//                 <div className="text-sm font-medium text-gray-500">
//                     {user.email}
//                 </div>
//             </div>

//             <div className="mt-3 space-y-1">
//                 <ResponsiveNavLink href={route("profile.edit")}>
//                     Profile
//                 </ResponsiveNavLink>
//                 <ResponsiveNavLink
//                     method="post"
//                     href={route("logout")}
//                     as="button"
//                 >
//                     Log Out
//                 </ResponsiveNavLink>
//             </div>
//         </div>
//     </div>
// </nav>
