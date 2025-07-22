import { PageProps } from "@/types";
import { router, Link } from "@inertiajs/react";
import {
    ChangeEvent,
    ChangeEventHandler,
    FormEventHandler,
    SyntheticEvent,
    useState,
} from "react";
type Movies = {
    id: number;
    original_title: string;
    genre_ids: [];
    overview: string;
    release_date: string;
    poster_path: string;
};
export default function Index({ movies }: PageProps<{ movies: Movies[] }>) {
    const [keyword, setKeyword] = useState("");

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        router.get(
            route("movies.index"),
            { keyword },
            {
                preserveState: false,
            }
        );
    }

    return (
        <div>
            <Link
                href={route("login")}
                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
            >
                Log in
            </Link>
            <form onSubmit={handleSubmit}>
                <label htmlFor="keyword">keyword</label>
                <input
                    type="text"
                    name="keyword"
                    id="name"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit" className=" bg-red-800 py-3 px-5">
                    cari
                </button>
            </form>

            <ul>
                {movies.map((movie) => (
                    <li>
                        title = {movie.original_title} <br />
                        <img className="w-9" src={movie.poster_path} alt="" />
                        <Link
                            href={`movie/detail/${movie.id}`}
                            className=" bg-green-700 py-3 px-5"
                        >
                            Detail
                        </Link>
                    </li>
                ))}
            </ul>

            <div>halaman index</div>
        </div>
    );
}
