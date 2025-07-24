import { usePage } from "@inertiajs/react";
import React from "react";

function SharePlaylist() {
    const { user, playlist } = usePage().props;
    console.log(playlist);

    return (
        <div>
            SharePlaylist
            <pre>{user}</pre>
            <h1>{playlist.name}</h1>
            <ul>
                {playlist.collections.map((film) => (
                    <li>
                        <img
                            src={`https://image.tmdb.org/t/p/original${film.poster}`}
                            className=" w-28"
                            alt=""
                        />
                        <p>{film.title}</p>
                        <p>{film.year}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SharePlaylist;
