import MovieCard from "@/Components/MovieCard";
import ListLayout from "@/Layouts/ListLayout";
import { Head, router, usePage } from "@inertiajs/react";

function Trending() {
    const { movies } = usePage().props;
    return (
        <>
            <Head title="Trending Movies" />
            <div className=" mt-4 max-w-7xl mx-auto ">
                <h1 className=" mb-4 text-center heading">Trending movies</h1>

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
            </div>
        </>
    );
}

export default Trending;
