import NavigationBar from "@/Components/NavigationBar";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import Guest from "@/Layouts/GuestLayout";
import { router, Link, usePage } from "@inertiajs/react";
import { SyntheticEvent, useState } from "react";
import { PlayIcon } from "hugeicons-react";
import MovieCard from "@/Components/MovieCard";
import ListLayout from "@/Layouts/ListLayout";

export default function Index() {
    const { movies, flash } = usePage().props;
    const [keyword, setKeyword] = useState("");

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        router.get(
            route("findMovie"),
            {
                q: keyword,
            },
            {
                only: ["movies", "flash"],
            }
        );
    }

    return (
        <Guest>
            <div className="flex-1">
                <div className=" mt-24">
                    <div className="bg-secondary  text-white shadow-sm rounded-md min-w-80 sm:max-w-xl sm:mx-auto overflow-hidden px-4 py-6 ">
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

                <section className=" mt-4 w-full">
                    {flash && (
                        <h1 className=" mb-4 text-center font-semibold sm:text-xl">
                            {flash.response?.message}
                        </h1>
                    )}
                    {movies && (
                        <>
                            <h1 className=" mb-4 heading text-center">
                                Search Result
                            </h1>

                            <div className="movies__result">
                                <ListLayout classname=" max-w-7xl mx-auto">
                                    {movies.map((movie, i) => (
                                        <MovieCard
                                            key={i}
                                            poster={movie.poster}
                                            title={movie.original_title}
                                            release_date={movie.release_date}
                                            onWatch={() =>
                                                router.get(
                                                    `/movie/detail/${movie.id}`
                                                )
                                            }
                                        />
                                    ))}
                                </ListLayout>
                            </div>
                        </>
                    )}
                </section>
            </div>
        </Guest>
    );
}
