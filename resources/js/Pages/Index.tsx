import NavigationBar from "@/Components/NavigationBar";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import Guest from "@/Layouts/GuestLayout";
import { router, Link, usePage } from "@inertiajs/react";
import { SyntheticEvent, useState } from "react";
import { PlayIcon } from "hugeicons-react";
import MovieCard from "@/Components/MovieCard";

export default function Index() {
    const { movies } = usePage().props;
    const [keyword, setKeyword] = useState("");

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        router.get(
            route("movies.findMovie"),
            {
                q: keyword,
            },
            {
                only: ["movies"],
            }
        );
    }

    return (
        <Guest>
            <div className=" mt-24">
                <div className="bg-zinc-600/60 text-gray-100 shadow-sm rounded-md sm:max-w-xl sm:mx-auto overflow-hidden px-4 py-6 ">
                    <form
                        onSubmit={handleSubmit}
                        className=" flex flex-col space-y-2"
                    >
                        <label className=" font-semibold" htmlFor="keyword">
                            Search Movie
                        </label>
                        <TextInput
                            name="keyword"
                            placeholder="movie title ex: sekawan limo"
                            id="name"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <PrimaryButton>Search</PrimaryButton>
                        <Link
                            href={route("movies.trending")}
                            className=" underline underline-offset-4"
                        >
                            Browse Trending Movies
                        </Link>
                    </form>
                </div>
            </div>

            {movies && (
                <div className=" mt-4">
                    <h1 className=" mb-4 text-center font-semibold sm:text-xl">
                        Search Result
                    </h1>

                    <div className="movies__result">
                        <div className="max-w-7xl mx-auto grid grid-cols-2 grid-flow-row gap-x-10 gap-y-4 md:grid-cols-4 lg:grid-cols-6">
                            {movies.map((movie) => (
                                <MovieCard
                                    poster={movie.poster}
                                    title={movie.original_title}
                                    release_date={movie.release_date}
                                    onWatch={() =>
                                        router.get(`/movie/detail/${movie.id}`)
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </Guest>
    );
}
