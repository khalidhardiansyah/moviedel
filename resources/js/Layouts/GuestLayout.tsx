import ApplicationLogo from "@/Components/ApplicationLogo";
import NavigationBar from "@/Components/NavigationBar";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col sm:pt-0">
            <NavigationBar />
            <div className=" w-full overflow-hidden flex-1 h-full px-6 py-4 mt-24 flex">
                {children}
            </div>
        </div>
    );
}
