import ApplicationLogo from "@/Components/ApplicationLogo";
import NavigationBar from "@/Components/NavigationBar";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col sm:pt-0">
            <NavigationBar />
            <div className=" w-full bg-slate-900 overflow-hidden flex-1  px-6 py-4   text-gray-100">
                {children}
            </div>
        </div>
    );
}
