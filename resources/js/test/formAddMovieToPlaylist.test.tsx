import FormAddMovieToPlaylist from "@/Components/FormAddMovieToPlaylist";
import { useForm, usePage } from "@inertiajs/react";
import { render, screen } from "@testing-library/react";
import { movie, playlist } from "./factory/factory";
import userEvent from "@testing-library/user-event";

describe("form save movie to playlist", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });
    test("show error message", () => {
        vi.mocked(usePage).mockReturnValue({
            props: {
                movie,
                playlists: playlist,
            },
        } as any);
        vi.mocked(useForm).mockReturnValue({
            data: {
                id: 123,
                title: "Inception",
                original_title: "Inception",
                year: "2010",
                poster: "/poster.jpg",
                playlist_id: [],
            },
            setData: vi.fn(),
            processing: false,
            errors: {
                playlist_id: "You need to choose at least one playlist.",
            },
            post: vi.fn(),
        } as any);

        render(<FormAddMovieToPlaylist />);
        const errorMessage = screen.getByText(
            "You need to choose at least one playlist."
        );
        expect(errorMessage).toBeInTheDocument();
    });

    test("show checked playlist", async () => {
        const user = userEvent.setup();
        const submit = vi.fn();
        vi.mocked(usePage).mockReturnValue({
            props: {
                movie,
                playlists: playlist,
            },
        } as any);
        vi.mocked(useForm).mockReturnValue({
            data: {
                id: 123,
                title: "Inception",
                original_title: "Inception",
                year: "2010",
                poster: "/poster.jpg",
                playlist_id: [1],
            },
            errors: {
                playlist_id: "",
            },
            setData: vi.fn(),
            processing: false,
            post: submit,
        } as any);

        render(<FormAddMovieToPlaylist />);
        const input = screen.getByText("film kyai NU");
        const button = screen.getByText("Save");
        await user.click(input);
        await user.click(button);
        expect(submit.mock.calls).toHaveLength(1);
    });

    test("show all checkbox playlist", () => {
        vi.mocked(usePage).mockReturnValue({
            props: {
                movie,
                playlists: playlist,
            },
        } as any);

        render(<FormAddMovieToPlaylist />);
        const input = screen.getAllByRole("checkbox");
        expect(input[0]).toBeInTheDocument();
    });
});
