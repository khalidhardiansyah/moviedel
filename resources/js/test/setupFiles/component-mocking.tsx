import { InertiaLinkProps } from "@inertiajs/react";
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import { Ziggy } from "@/ziggy";
import { route as _route } from "ziggy-js";

(global as any).route = (name: string) => _route(name, undefined, false, Ziggy);

vi.mock("@inertiajs/react", () => ({
    usePage: vi.fn(() => ({
        props: {
            auth: {
                user: null,
            },
        },
    })),
    Link: ({ children }: InertiaLinkProps) => (
        <div data-testid="link">{children}</div>
    ),
}));
