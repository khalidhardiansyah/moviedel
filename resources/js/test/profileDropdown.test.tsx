import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProfileDropdown from "@/Components/ProfileDropdown";
import { usePage } from "@inertiajs/react";

describe("profile dropdown user guest", () => {
    test("profile drop down show login if user unauthenticated", async () => {
        render(<ProfileDropdown />);
        expect(screen.findAllByAltText("login"));
    });
});

describe("profile dropdown user authenticated", () => {
    test("profile drop down show login if user authenticated", async () => {
        const user = userEvent.setup();
        vi.mocked(usePage).mockReturnValueOnce({
            props: {
                auth: { user: { id: 1, name: "Khalid", email: "xxx@xx.com" } },
            },
        } as any);
        render(<ProfileDropdown />);
        const button = screen.getAllByTestId("dropdown-trigger");
        await user.click(button[0]);
        expect(screen.getByTestId("dropdown-content")).toBeVisible();
    });
});
