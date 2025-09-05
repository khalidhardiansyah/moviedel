import MovieDetail from "@/Pages/MovieDetail";
import { router, useForm, usePage } from "@inertiajs/react";
import { getByTestId, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { movie, recommendation_list, userAuth } from "./factory/factory";
describe("movie detail page", () => {
    test("redirect to login page when unauthenticated user click save to playlist ", async () => {
        const user = userEvent.setup();
        vi.mocked(usePage).mockReturnValueOnce({
            props: {
                auth: userAuth(),
                movie: movie,
                recommendation_list: recommendation_list,
            },
        } as any);
        render(<MovieDetail />);
        const button = screen.getByText("Save to playlist");
        await user.click(button);
        expect(router.get).toHaveBeenCalled();
    });
});
