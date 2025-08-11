import Capsule from "@/Components/Capsule";
import Modal from "@/Components/Modal";
import SectionInfo from "@/Components/SectionInfo";
import ServerButton from "@/Components/ServerButton";
import Guest from "@/Layouts/GuestLayout";
import { Bookmark02Icon } from "hugeicons-react";
import { router, useForm, usePage } from "@inertiajs/react";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import FormCreatePlaylist from "@/Components/FormCreatePlaylist";
import FormAddMovieToPlaylist from "@/Components/FormAddMovieToPlaylist";
import SliderMovieList from "@/Components/SliderMovieList";

export type status = "add_to_playlist" | "create_playlist";

export default function MovieDetail() {
    const { movie, recommendation_list, playlists, auth } = usePage().props;
    const [open, setOpen] = useState(false);
    const [server, setServer] = useState(movie.videos[0]);
    const [modeForm, setModeForm] = useState<status>("add_to_playlist");

    function formatDate(tanggal: string) {
        let date = new Date(tanggal);
        return new Intl.DateTimeFormat("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).format(date);
    }
    return (
        <Guest>
            <div className="max-w-7xl mx-auto">
                <iframe
                    src={server}
                    className=" aspect-video"
                    allow="fullscreen"
                    allowFullScreen
                    referrerPolicy="origin"
                ></iframe>
                <SectionInfo className="mt-5">
                    <h1 className=" text-xl font-bold mb-3">
                        Stream resources
                    </h1>
                    <div className="grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {movie.videos.map((source: string, i: number) => (
                            <ServerButton
                                onClick={() => setServer(source)}
                                className={`${
                                    server === source
                                        ? "border border-white bg-slate-100/20"
                                        : "border border-slate-300/35 text-white/50"
                                }`}
                            >
                                <span className=" tracking-wider text-sm">
                                    Server {i + 1}
                                </span>
                            </ServerButton>
                        ))}
                    </div>
                </SectionInfo>
                <SectionInfo className="p-0 md:hidden my-5 md:mb-0">
                    <div className="relative">
                        <img
                            className=" w-full h-full"
                            src={movie.poster}
                            alt={`Image of ${movie.original_title}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute z-10 bottom-0 w-full p-5 ">
                            <h2 className=" text-xl font-bold">
                                {movie.original_title}
                            </h2>
                            <p className="">{formatDate(movie.release_date)}</p>
                            <div className=" flex gap-x-3 mt-2">
                                {movie.genres.map((genre) => (
                                    <Capsule text={genre.name} />
                                ))}
                            </div>
                        </div>
                    </div>
                </SectionInfo>
                <div className="mt-5 gap-x-4 md:grid-cols-[180px_minmax(300px,1fr)] grid md:grid-rows-1">
                    <div className="hidden md:block relative rounded-md overflow-hidden">
                        <img
                            className=" w-full h-full"
                            src={movie.poster}
                            alt={`Image of ${movie.original_title}`}
                        />
                    </div>
                    <SectionInfo className="md:space-y-3">
                        <h3 className="text-xl font-bold hidden md:block ">
                            {`${movie.original_title} (${movie.release_date})`}
                        </h3>
                        <div>
                            <h3 className="text-xl font-bold">Synopsis</h3>
                            <p>{movie.overview}</p>
                        </div>
                        <div className="mt-2 hidden md:block">
                            <h4 className="text-xl font-bold">Genre</h4>
                            <div className=" flex gap-x-3 mt-2">
                                {movie.genres.map((genre) => (
                                    <Capsule text={genre.name} />
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() =>
                                auth.user ? setOpen(true) : router.get("/login")
                            }
                            className=" mt-3 bg-slate-700/80 flex items-center px-5 h-10 rounded-md text-slate-400 group hover:text-white transition-all duration-150 hover:bg-slate-700/100 hover:scale-105 gap-x-2"
                            type="submit"
                        >
                            <Bookmark02Icon
                                size={24}
                                className=" group-hover:fill-white transition-all duration-150 "
                            />
                            Save to playlist
                        </button>
                    </SectionInfo>
                </div>
                <div>
                    <SectionInfo className=" mt-5">
                        <h5 className=" text-xl font-bold mb-5">
                            Movie Recommendation
                        </h5>
                        <SliderMovieList list={recommendation_list} />
                    </SectionInfo>
                </div>
            </div>

            {/* modal */}
            <Modal show={open} onClose={() => setOpen(false)} maxWidth="sm">
                <div className=" w-full bg-gray-50 px-5 py-4 space-y-4">
                    {modeForm === "add_to_playlist" ? (
                        <FormAddMovieToPlaylist />
                    ) : (
                        <FormCreatePlaylist />
                    )}

                    {modeForm === "add_to_playlist" ? (
                        <button
                            className=" bg-gray-300 rounded-md py-3 w-full"
                            onClick={() => setModeForm("create_playlist")}
                        >
                            + new playlist
                        </button>
                    ) : (
                        <button
                            className=" bg-gray-300 rounded-md py-3 w-full"
                            onClick={() => {
                                setOpen(false);
                                setModeForm("add_to_playlist");
                            }}
                        >
                            cancel
                        </button>
                    )}
                </div>
            </Modal>
        </Guest>
    );
}
