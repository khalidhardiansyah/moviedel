import Modal from "@/Components/Modal";
import { PageProps } from "@/types";
import { router, Link, useForm } from "@inertiajs/react";
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
    playlists,
}: PageProps<{ movie: Movie; recommendation_list: Movie[] }>) {
    const [open, setOpen] = useState(false);
    const { data, setData, processing, errors } = useForm({
        id: movie.id,
        title: movie.title,
        original_title: movie.original_title,
        year: movie.release_date,
        poster: movie.poster_path,
        playlist_id: [],
    });
    const [values, setValues] = useState({
        name: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;

        setValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        router.post("/playlist", values);
    }

    function handleSaveMovie(e) {
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
                    src={movie.videos[0]}
                    className=" w-96 h-72"
                    allow="fullscreen"
                    allowFullScreen={true}
                    referrerPolicy="origin"
                ></iframe>
                <button
                    className=" px-5 py-2 bg-blue-600"
                    onClick={() => setOpen(true)}
                >
                    add to watched
                </button>
            </div>

            {/* modal */}
            <Modal show={open} onClose={() => setOpen(false)} maxWidth="sm">
                <div className=" w-full bg-gray-50 px-5 py-4 space-y-4">
                    <h2>save film to...</h2>
                    <form onSubmit={handleSaveMovie} method="post">
                        {playlists.map((playlist) => (
                            <div className=" flex space-x-5 items-center">
                                <input
                                    type="checkbox"
                                    name="playlist_id"
                                    id={playlist.name.replace(" ", "-")}
                                    value={playlist.id}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setData("playlist_id", [
                                                ...data.playlist_id,
                                                Number(e.target.value),
                                            ]);
                                        } else {
                                            setData(
                                                "playlist_id",
                                                data.playlist_id.filter(
                                                    (item) =>
                                                        item !== e.target.value
                                                )
                                            );
                                        }
                                    }}
                                />
                                <label
                                    htmlFor={playlist.name.replace(" ", "-")}
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
