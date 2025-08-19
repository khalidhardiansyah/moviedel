import Capsule from "@/Components/Capsule";
import Modal from "@/Components/Modal";
import SectionInfo from "@/Components/SectionInfo";
import ServerButton from "@/Components/ServerButton";
import { Bookmark02Icon } from "hugeicons-react";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import FormCreatePlaylist from "@/Components/FormCreatePlaylist";
import FormAddMovieToPlaylist from "@/Components/FormAddMovieToPlaylist";
import SliderMovieList from "@/Components/SliderMovieList";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import { formatDate } from "@/helpers/helper";

export type status = "add_to_playlist" | "create_playlist";

export default function MovieDetail() {
    const { movie, recommendation_list, playlists, auth } = usePage().props;
    const [open, setOpen] = useState(false);
    const [server, setServer] = useState(movie.videos[0]);
    const [modeForm, setModeForm] = useState<status>("add_to_playlist");

    return (
        <>
            <Head title={movie.original_title} />
            <div className="max-w-7xl mx-auto flex-1 grid grid-cols-1">
                <iframe
                    src={server}
                    className=" aspect-video"
                    allow="fullscreen"
                    allowFullScreen
                    referrerPolicy="origin"
                ></iframe>
                <SectionInfo className="mt-5">
                    <h2 className=" sub-heading mb-3">Stream resources</h2>
                    <div className="grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {movie.videos.map((source: string, i: number) => (
                            <ServerButton
                                key={i}
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
                            <h2 className=" sub-heading">
                                {movie.original_title}
                            </h2>
                            <p className="">{formatDate(movie.release_date)}</p>
                            <div className=" flex gap-x-3 mt-2">
                                {movie.genres.map((genre, i) => (
                                    <Capsule key={i} text={genre.name} />
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
                        <h2 className=" sub-heading hidden md:block ">
                            {`${movie.original_title} (${formatDate(
                                movie.release_date
                            )})`}
                        </h2>
                        <div>
                            <h3 className=" sub-heading font-bold">Synopsis</h3>
                            <p>{movie.overview}</p>
                        </div>
                        <div className="mt-2 hidden md:block">
                            <h4 className=" sub-heading font-bold">Genre</h4>
                            <div className=" flex gap-x-3 mt-2">
                                {movie.genres.map((genre, i) => (
                                    <Capsule key={i} text={genre.name} />
                                ))}
                            </div>
                        </div>

                        <PrimaryButton
                            className=" mt-3 md:mt-0"
                            type="submit"
                            onClick={() =>
                                auth.user ? setOpen(true) : router.get("/login")
                            }
                        >
                            <Bookmark02Icon
                                size={24}
                                className=" group-hover:fill-white transition-all duration-150 "
                            />
                            Save to playlist
                        </PrimaryButton>
                    </SectionInfo>
                </div>
                <SectionInfo className=" mt-5">
                    <h2 className=" sub-heading">Movie Recommendation</h2>
                    <SliderMovieList
                        list={recommendation_list}
                        classname=" mt-3"
                    />
                </SectionInfo>
            </div>

            <Modal show={open} onClose={() => setOpen(false)} maxWidth="sm">
                <div className=" w-full bg-[#202228] px-5 py-4">
                    {modeForm === "add_to_playlist" ? (
                        <FormAddMovieToPlaylist />
                    ) : (
                        <FormCreatePlaylist />
                    )}

                    <SecondaryButton
                        className=" w-full mt-2"
                        onClick={
                            modeForm === "add_to_playlist"
                                ? () => setModeForm("create_playlist")
                                : () => {
                                      setOpen(false);
                                      setTimeout(() => {
                                          setModeForm("add_to_playlist");
                                      }, 100);
                                  }
                        }
                    >
                        {modeForm === "add_to_playlist"
                            ? "New playlist"
                            : "Cancel"}
                    </SecondaryButton>
                </div>
            </Modal>
        </>
    );
}
