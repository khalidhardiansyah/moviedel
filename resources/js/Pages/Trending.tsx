import MovieCard from "@/Components/MovieCard";
import Guest from "@/Layouts/GuestLayout";
import { router, usePage } from "@inertiajs/react";
import React from "react";

function Trending() {
    const { movies } = usePage().props;
    return (
        <Guest>
            <div className=" mt-4 max-w-7xl mx-auto ">
                <h1 className=" mb-4 text-center font-semibold sm:text-xl">
                    Trending movies
                </h1>

                <div className="grid grid-cols-2 grid-flow-row gap-x-10 gap-y-4 md:grid-cols-4 lg:grid-cols-6">
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
        </Guest>
    );
}

export default Trending;
