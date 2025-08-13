import { router, useForm, usePage } from "@inertiajs/react";
import { SyntheticEvent, useState } from "react";

function FormAddMovieToPlaylist() {
    const { movie, playlists } = usePage().props;
    const [Playlist, setPlaylist] = useState(playlists);

    const { data, setData, processing, errors } = useForm({
        id: movie.id,
        title: movie.title,
        original_title: movie.original_title,
        year: movie.release_date,
        poster: movie.poster,
        playlist_id: playlists.filter((p) => p.checked).map((p) => p.id),
    });
    const toggleCheckbox = (id: number) => {
        setPlaylist((prev) =>
            prev.map((p) => (p.id === id ? { ...p, checked: !p.checked } : p))
        );

        setData(
            "playlist_id",
            data.playlist_id.includes(id)
                ? data.playlist_id.filter((pid) => pid !== id)
                : [...data.playlist_id, id]
        );
    };
    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();

        router.post("/save-to-playlist", data);
    }
    return (
        <form onSubmit={handleSubmit} method="post" className="text-slate-900">
            {playlists.length !== 0 ? (
                <>
                    <p className=" sub-heading">save movie to...</p>
                    {Playlist.map((playlist) => (
                        <div className=" flex space-x-5 items-center">
                            <input
                                type="checkbox"
                                name="playlist_id"
                                id={playlist.name.replace(" ", "-")}
                                value={playlist.id}
                                checked={playlist.checked}
                                onChange={() => toggleCheckbox(playlist.id)}
                            />
                            <label htmlFor={playlist.name.replace(" ", "-")}>
                                {playlist.name}
                            </label>
                        </div>
                    ))}
                    <button
                        className="bg-blue-300 rounded-md py-3 w-full mt-4"
                        type="submit"
                    >
                        Save
                    </button>
                </>
            ) : (
                <span>You ain't got no playlist</span>
            )}
        </form>
    );
}

export default FormAddMovieToPlaylist;
