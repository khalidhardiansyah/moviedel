import { InertiaLinkProps, Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                `menu-item  transition-all  duration-150 ease-in-out focus:outline-none group relative after:content[''] after:h-0.5 after:inset-x-0  after:-bottom-2 after:absolute  after:bg-white after:opacity-0 hover:after:opacity-100 hover:text-white ${
                    active
                        ? "text-white after:opacity-100"
                        : "text-slate-200/75"
                }` + className
            }
        >
            {children}
        </Link>
    );
}
