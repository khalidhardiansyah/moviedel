import { InertiaLinkProps } from "@inertiajs/react";
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import { Ziggy } from "@/ziggy";
import { route as _route } from "ziggy-js";

vi.mock("@inertiajs/react", () => {
    return {
        usePage: vi.fn(),
        Link: ({ children }: InertiaLinkProps) => (
            <div data-testid="link">{children}</div>
        ),
        Head: ({ title }: { title: string }) => (
            <div data-testid="head">{title}</div>
        ),
        router: { get: vi.fn() },
        useForm: vi.fn(() => ({
            data: {},
            setData: vi.fn(),
            post: vi.fn(),
            processing: false,
            errors: {},
            reset: vi.fn(),
        })),
    };
});
(global as any).route = (name: string) => _route(name, undefined, false, Ziggy);
