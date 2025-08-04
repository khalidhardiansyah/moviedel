import MovieCard from "@/Components/MovieCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ListLayout from "@/Layouts/ListLayout";
import { Head, router, usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { user_playlist } = usePage().props;
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    My Playlist
                </h2>
            }
        >
            <Head title="Playlist" />
            <div className="mt-5">
                {user_playlist.map((playlist) => (
                    <section className="mb-5">
                        <div className=" relative w-full border-b-2 ">
                            <h1 className=" md:text-2xl font-bold capitalize">
                                {playlist.name}
                            </h1>
                        </div>

                        {playlist.collections.length !== 0 ? (
                            <ListLayout classname="mt-3">
                                {playlist.collections.map((movie) => (
                                    <MovieCard
                                        poster={movie.poster}
                                        title={movie.title}
                                        release_date={movie.release_date}
                                        onWatch={() =>
                                            router.get(
                                                `/movie/movie/detail/${movie.id}`
                                            )
                                        }
                                    />
                                ))}
                            </ListLayout>
                        ) : (
                            <h2 className=" capitalize md:text-xl mt-3">
                                No saved movie
                            </h2>
                        )}
                    </section>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
