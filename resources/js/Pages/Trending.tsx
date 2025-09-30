import MovieCard from "@/Components/MovieCard";
import SkeletonMovieCard from "@/Components/SkeletonMovieCard";
import ListLayout from "@/Layouts/ListLayout";
import { Head, router, usePage, WhenVisible } from "@inertiajs/react";
import { H } from "vitest/dist/chunks/environment.d.cL3nLXbE.js";

const MovieList = () => {
    const { movies } = usePage().props;
    return (
        <ListLayout>
            {movies.map((movie, i) => (
                <MovieCard
                    key={i}
                    poster={movie.poster}
                    title={movie.original_title}
                    release_date={movie.release_date}
                    onWatch={() => router.get(movie.url)}
                />
            ))}
        </ListLayout>
    );
};

const SkeletonList = () => {
    const length = 20;
    return (
        <ListLayout>
            {Array.from({ length }).map((_, i) => (
                <SkeletonMovieCard key={i} />
            ))}
        </ListLayout>
    );
};

function Trending() {
    const { movies } = usePage().props;
    return (
        <>
            <Head title="Trending Movies" />
            <div className=" mt-4 max-w-7xl mx-auto ">
                <h1 className=" mb-4 text-center heading">Trending movies</h1>
                <WhenVisible data="movies" fallback={<SkeletonList />}>
                    <MovieList />
                </WhenVisible>
            </div>
        </>
    );
}

export default Trending;
