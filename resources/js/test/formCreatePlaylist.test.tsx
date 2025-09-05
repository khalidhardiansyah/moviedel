import FormCreatePlaylist from "@/Components/FormCreatePlaylist";
import { useForm } from "@inertiajs/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Form create Playlists", () => {
    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    });

    test("show error message", () => {
        vi.mocked(useForm).mockReturnValueOnce({
            data: {
                name: 123,
            },
            setData: vi.fn(),
            processing: false,
            errors: {
                name: "name is required",
            },
            post: vi.fn(),
        } as any);
        render(<FormCreatePlaylist />);
        const errMsg = screen.getByText("name is required");
        expect(errMsg).toBeInTheDocument();
    });

    test("button not allowed when processing is true and isDirty", () => {
        vi.mocked(useForm).mockReturnValueOnce({
            data: {
                name: "Watch ",
            },
            setData: vi.fn(),
            errors: {
                name: "",
            },
            processing: true,
            isDirty: false,
            post: vi.fn(),
        } as any);
        render(<FormCreatePlaylist />);
        const btn = screen.getByText("Save");
        expect(btn).toHaveClass("cursor-not-allowed");
    });

    test("form typing", async () => {
        const mockSetData = vi.fn();
        const submit = vi.fn();
        vi.mocked(useForm).mockReturnValueOnce({
            data: {
                name: "",
            },
            setData: mockSetData,
            errors: {
                name: "",
            },
            post: submit,
            isDirty: true,
            processing: false,
        } as any);
        const user = userEvent.setup();
        render(<FormCreatePlaylist />);
        const input = screen.getByPlaceholderText("Cult movie");
        const btn = screen.getByText("Save");
        await user.type(input, "watch later");
        await user.click(btn);
        expect(submit.mock.calls).toHaveLength(1);
        expect(mockSetData).toHaveBeenLastCalledWith("name", "r");
    });
});
