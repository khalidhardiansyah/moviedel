import MovieCard from "@/Components/MovieCard";
import Guest from "@/Layouts/GuestLayout";
import ListLayout from "@/Layouts/ListLayout";
import { router, usePage } from "@inertiajs/react";
import React from "react";

function Trending() {
    const { movies } = usePage().props;
    return (
        <Guest>
            <div className=" mt-4 max-w-7xl mx-auto ">
                <h1 className=" mb-4 text-center sub-heading">
                    Trending movies
                </h1>

                <ListLayout>
                    {movies.map((movie, i) => (
                        <MovieCard
                            key={i}
                            poster={movie.poster}
                            title={movie.original_title}
                            release_date={movie.release_date}
                            onWatch={() =>
                                router.get(`/movie/detail/${movie.id}`)
                            }
                        />
                    ))}
                </ListLayout>
            </div>
        </Guest>
    );
}

export default Trending;
