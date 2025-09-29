import NavigationBar from "@/Components/NavigationBar";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { router, Link, usePage, Head, useForm } from "@inertiajs/react";
import { SyntheticEvent, useState } from "react";
import MovieCard from "@/Components/MovieCard";
import ListLayout from "@/Layouts/ListLayout";
import InputError from "@/Components/InputError";
import SkeletonMovieCard from "@/Components/SkeletonMovieCard";

export default function Index() {
    const { movies, flash, errors, keyword } = usePage().props;
    const { get, setData, data, reset, isDirty } = useForm<{
        keyword: string;
    }>({
        keyword: "",
    });

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        get("/search?keyword=" + data.keyword, {
            preserveScroll: true,
            onFinish: () => {
                reset("keyword");
            },
        });
    }

    return (
        <>
            <Head title="Home" />
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
                            id="keyword"
                            value={data.keyword}
                            onChange={(e) => setData("keyword", e.target.value)}
                        />
                        <InputError message={errors.keyword} />
                        <PrimaryButton disabled={!isDirty}>
                            Search
                        </PrimaryButton>
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
                            Search Result for {keyword}
                        </h1>

                        <div className="movies__result">
                            <ListLayout classname=" max-w-7xl mx-auto">
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
                )}
            </section>
        </>
    );
}
