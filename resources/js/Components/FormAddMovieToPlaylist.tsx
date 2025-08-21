import { router, useForm, usePage } from "@inertiajs/react";
import { SyntheticEvent, useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { TypeToast } from "@/types";
import { toast } from "react-toastify";
import InputError from "./InputError";
import { Cancel01Icon } from "hugeicons-react";

function FormAddMovieToPlaylist() {
    const { movie, playlists } = usePage().props;
    const [Playlist, setPlaylist] = useState(playlists);

    const { data, setData, processing, errors, post } = useForm({
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
        post(route("collection.store"), {
            preserveScroll: true,
            onSuccess: (page) => {
                const typeToast =
                    page.props.flash.response.status || ("info" as TypeToast);
                toast[typeToast](page.props.flash.response.message);
            },
        });
    }
    return (
        <form onSubmit={handleSubmit} method="post" className="text-white">
            {playlists.length !== 0 ? (
                <>
                    {Playlist.map((playlist, i) => (
                        <div className=" flex space-x-3 items-center" key={i}>
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
                    <InputError
                        message={errors.playlist_id}
                        className="my-1.5"
                    />
                    <PrimaryButton className=" w-full" disabled={processing}>
                        Save
                    </PrimaryButton>
                </>
            ) : (
                <span>You ain't got no playlist</span>
            )}
        </form>
    );
}

export default FormAddMovieToPlaylist;
