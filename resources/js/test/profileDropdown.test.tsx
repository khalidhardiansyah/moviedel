import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProfileDropdown from "@/Components/ProfileDropdown";
import { usePage } from "@inertiajs/react";
import { userAuth } from "./factory/factory";

describe("profile dropdown user guest", () => {
    test("profile drop down show login if user unauthenticated", async () => {
        vi.mocked(usePage).mockReturnValueOnce({
            props: {
                auth: userAuth(),
            },
        } as any);
        render(<ProfileDropdown />);
        const linkLogin = screen.getByTestId("link");
        expect(linkLogin).toBeDefined();
    });
});

describe("profile dropdown user authenticated", () => {
    test("profile drop down show login if user authenticated", async () => {
        const user = userEvent.setup();
        vi.mocked(usePage).mockReturnValueOnce({
            props: {
                auth: userAuth(true),
            },
        } as any);
        render(<ProfileDropdown />);
        const button = screen.getByTestId("dropdown-trigger");
        await user.click(button);
        expect(screen.getByTestId("dropdown-content")).toBeVisible();
    });
});
