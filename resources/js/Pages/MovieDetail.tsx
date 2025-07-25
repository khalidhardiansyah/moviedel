import Modal from "@/Components/Modal";
import { PageProps } from "@/types";
import { router, Link, useForm, usePage } from "@inertiajs/react";
import {
    ChangeEvent,
    ChangeEventHandler,
    FormEventHandler,
    SyntheticEvent,
    useState,
} from "react";

export default function MovieDetail() {
    const { user, movie, playlists, recommendation_list } = usePage().props;
    const [open, setOpen] = useState(false);
    const [Playlist, setPlaylist] = useState(playlists);
    const [server, setServer] = useState(movie.videos[0]);
    const { data, setData, processing, errors } = useForm({
        id: movie.id,
        title: movie.title,
        original_title: movie.original_title,
        year: movie.release_date,
        poster: movie.poster,
        playlist_id: playlists.filter((p) => p.checked).map((p) => p.id),
    });
    const [values, setValues] = useState({
        name: "",
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

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        setValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        router.post("/playlist", values);
    }

    function handleSaveMovie(e: SyntheticEvent) {
        e.preventDefault();
        // console.log(data);

        router.post("/save-to-playlist", data);
    }

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
                    src={server}
                    className=" w-96 h-72"
                    allow="fullscreen"
                    allowFullScreen={true}
                    referrerPolicy="origin"
                ></iframe>
                {movie.videos.map((source: string, i: number) => (
                    <button
                        onClick={() => setServer(source)}
                        className={`${
                            server === source ? "bg-red-500" : "bg-green-300"
                        }`}
                        type="submit"
                    >
                        Server {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => setOpen(true)}
                    className="bg-blue-300 rounded-md py-3 w-full mt-4"
                    type="submit"
                >
                    Save
                </button>
            </div>

            {/* modal */}
            <Modal show={open} onClose={() => setOpen(false)} maxWidth="sm">
                <div className=" w-full bg-gray-50 px-5 py-4 space-y-4">
                    <h2>save film to...</h2>
                    {playlists.length > 0 ? (
                        <form onSubmit={handleSaveMovie} method="post">
                            {Playlist.map((playlist) => (
                                <div className=" flex space-x-5 items-center">
                                    <input
                                        type="checkbox"
                                        name="playlist_id"
                                        id={playlist.name.replace(" ", "-")}
                                        value={playlist.id}
                                        checked={playlist.checked}
                                        onChange={() =>
                                            toggleCheckbox(playlist.id)
                                        }
                                    />
                                    <label
                                        htmlFor={playlist.name.replace(
                                            " ",
                                            "-"
                                        )}
                                    >
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
                        </form>
                    ) : (
                        "Masih belum ada playlist"
                    )}
                    <button className=" bg-gray-300 rounded-md py-3 w-full">
                        + new playlist
                    </button>
                </div>
            </Modal>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>

            <div className="recommendations">
                <h2>Movie Recommendation</h2>
                <ul>
                    {recommendation_list.map((movie) => (
                        <li>
                            title = {movie.original_title} <br />
                            <img className="w-9" src={movie.poster} alt="" />
                            <Link
                                href={movie.url}
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
