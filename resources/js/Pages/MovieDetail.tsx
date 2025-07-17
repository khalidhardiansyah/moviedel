import { PageProps } from "@/types";
import { router, Link } from "@inertiajs/react";
import {
    ChangeEvent,
    ChangeEventHandler,
    FormEventHandler,
    SyntheticEvent,
    useState,
} from "react";
type Movie = {
    id: number;
    original_title: string;
    title: string;
    genres: [];
    overview: string;
    release_date: string;
    poster_path: string;
    videos: [];
};
export default function MovieDetail({
    movie,
    recommendation_list,
}: PageProps<{ movie: Movie; recommendation_list: Movie[] }>) {
    console.log(movie);

    return (
        <div>
            <div>
                <h1>{movie.original_title}</h1>
                <p>{movie.overview}</p>
                <p>{movie.release_date}</p>
                <p>Genre</p>
                <p>
                    {movie.genres.map((genre) => (
                        <span>{genre.name}</span>
                    ))}
                </p>
                <iframe
                    src={movie.videos[0]}
                    className=" w-96 h-72"
                    allow="fullscreen"
                    allowFullScreen={true}
                    referrerPolicy="origin"
                ></iframe>
                <button className=" px-5 py-2 bg-blue-600">
                    add to watched
                </button>
            </div>

            <div className="recommendations">
                <h2>Movie Recommendation</h2>
                <ul>
                    {recommendation_list.map((movie) => (
                        <li>
                            title = {movie.original_title} <br />
                            <img
                                className="w-9"
                                src={movie.poster_path}
                                alt=""
                            />
                            <Link
                                href={movie.link}
                                className=" bg-green-700 py-3 px-5"
                            >
                                Detail
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
