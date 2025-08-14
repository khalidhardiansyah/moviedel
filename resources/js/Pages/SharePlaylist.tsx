import Guest from "@/Layouts/GuestLayout";
import ListLayout from "@/Layouts/ListLayout";
import MovieCard from "@/Components/MovieCard";
import { usePage, router } from "@inertiajs/react";
import React from "react";

function Collection() {
    const { playlist } = usePage().props;
    return (
        <>
            {playlist.collections.length > 0 ? (
                <ListLayout classname=" pt-4">
                    {playlist.collections.map((movie, i) => (
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
            ) : (
                <h3 className=" mt-2.5">
                    Looks like this playlist doesn’t have any films yet. Check
                    back soon for recommendations.
                </h3>
            )}
        </>
    );
}

function SharePlaylist() {
    const { user, playlist } = usePage().props;
    return (
        <Guest>
            <div className=" mt-4 max-w-7xl mx-auto  flex-1">
                <section className=" space-y-1.5">
                    <h1 className="heading">{playlist.name}</h1>
                    <h2 className="sub-heading">Curated by {user.name}</h2>
                </section>
                <Collection />
            </div>
        </Guest>
    );
}

export default SharePlaylist;
