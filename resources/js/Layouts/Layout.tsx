import ApplicationLogo from "@/Components/ApplicationLogo";
import NavigationBar from "@/Components/NavigationBar";
import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col sm:pt-0">
            <NavigationBar />
            <div className="overflow-hidden  h-full px-6 py-4 mt-24">
                {children}
            </div>
            <ToastContainer autoClose={1000} />
        </div>
    );
}
