import Capsule from "@/Components/Capsule";
import Modal from "@/Components/Modal";
import SectionInfo from "@/Components/SectionInfo";
import ServerButton from "@/Components/ServerButton";
import { Bookmark02Icon, Cancel01Icon } from "hugeicons-react";
import { Head, router, usePage, WhenVisible } from "@inertiajs/react";
import { useState } from "react";
import FormCreatePlaylist from "@/Components/FormCreatePlaylist";
import FormAddMovieToPlaylist from "@/Components/FormAddMovieToPlaylist";
import SliderMovieList from "@/Components/SliderMovieList";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import { formatDate } from "@/helpers/helper";
import { TextSkeleton } from "@/Components/TextSkeleton";
import SkeletonMovieCard from "@/Components/SkeletonMovieCard";
export type status = "add_to_playlist" | "create_playlist";

const SkeletonMoviePlayer = () => {
    return (
        <div
            role="status"
            className="flex items-center justify-center h-full w-full aspect-video bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
        >
            <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
            >
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
            </svg>
        </div>
    );
};

const SkeletonSection = () => {
    const length = 6;
    return (
        <div className="mt-5 animate-pulse h-56 rounded-md p-5">
            <TextSkeleton />
            <div className="grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {Array.from({ length }).map((_, i) => (
                    <div
                        className="min-h-9 rounded-xl bg-gray-50"
                        key={i}
                    ></div>
                ))}
            </div>
        </div>
    );
};

const SkeletonRecomendation = () => {
    const length = 3;
    return (
        <div className="mt-5 animate-pulse h-56 rounded-md ">
            <TextSkeleton />
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-x-5">
                {Array.from({ length }).map((_, i) => (
                    <SkeletonMovieCard key={i} />
                ))}
            </div>
        </div>
    );
};

const SkeletonMovieInfo = () => {
    const length = 3;

    return (
        <div className="mt-5 gap-x-4 md:grid-cols-[180px_minmax(300px,1fr)] grid md:grid-rows-1">
            <div className="hidden md:block relative rounded-md overflow-hidden">
                <div className=" bg-gray-200 animate-pulse w-full h-full block">
                    <div className="flex items-center justify-center h-full mb-4 ">
                        <svg
                            className="w-10 h-10 text-gray-200 dark:text-gray-600"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 20"
                        >
                            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="md:space-y-3 p-5">
                <div className=" sub-heading hidden md:block ">
                    <TextSkeleton />
                </div>
                <div>
                    <TextSkeleton className=" w-10" />
                    <TextSkeleton className=" w-full block " />
                </div>

                <div className="mt-2 hidden md:block">
                    <TextSkeleton />
                    <div className=" flex gap-x-3 mt-2">
                        {Array.from({ length }).map((_, i) => (
                            <div
                                className="bg-gray-200 block w-12 rounded-xl px-2 h-5"
                                key={i}
                            ></div>
                        ))}
                    </div>
                </div>

                <div className="mt-3 md:mt-0 block rounded-md  bg-slate-100  h-8  w-32 animate-pulse"></div>
            </div>
        </div>
    );
};

const SkeletonMobileImage = () => {
    return (
        <div className="p-0 md:hidden my-5 md:mb-0">
            <div className=" bg-gray-200 animate-pulse w-full h-96 rounded-md block">
                <div className="flex items-center justify-center h-full">
                    <svg
                        className="w-10 h-10 text-gray-100 dark:text-gray-600"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 20"
                    >
                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default function MovieDetail() {
    const { movie, recommendation_list, auth } = usePage().props;
    const [open, setOpen] = useState(false);
    const [server, setServer] = useState(movie.videos[0]);
    const [modeForm, setModeForm] = useState<status>("add_to_playlist");
    return (
        <>
            <Head title={`Watch ${movie.original_title}`} />
            <div className="max-w-7xl mx-auto flex-1 grid grid-cols-1">
                <WhenVisible data="movie" fallback={<SkeletonMoviePlayer />}>
                    <iframe
                        src={server}
                        className=" aspect-video"
                        allow="fullscreen"
                        allowFullScreen
                        referrerPolicy="origin"
                    ></iframe>
                </WhenVisible>

                <WhenVisible data="movie" fallback={<SkeletonSection />}>
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
                </WhenVisible>

                <WhenVisible data="movie" fallback={<SkeletonMobileImage />}>
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
                                <p className="">
                                    {formatDate(movie.release_date)}
                                </p>
                                <div className=" flex gap-x-3 mt-2">
                                    {movie.genres.map((genre, i) => (
                                        <Capsule key={i} text={genre.name} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </SectionInfo>
                </WhenVisible>

                <WhenVisible data="movie" fallback={<SkeletonMovieInfo />}>
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
                                <h3 className=" sub-heading font-bold">
                                    Synopsis
                                </h3>
                                <p>{movie.overview}</p>
                            </div>
                            <div className="mt-2 hidden md:block">
                                <h4 className=" sub-heading font-bold">
                                    Genre
                                </h4>
                                <div className=" flex gap-x-3 mt-2">
                                    {movie.genres.map((genre, i) => (
                                        <Capsule key={i} text={genre.name} />
                                    ))}
                                </div>
                            </div>

                            <PrimaryButton
                                type="button"
                                data-testid="btn-save-playlist"
                                className=" mt-3 md:mt-0"
                                onClick={() =>
                                    auth.user
                                        ? setOpen(true)
                                        : router.get("/login")
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
                </WhenVisible>
                <WhenVisible data="movie" fallback={<SkeletonRecomendation />}>
                    <SectionInfo className=" mt-5">
                        <h2 className=" sub-heading">Movie Recommendation</h2>
                        <SliderMovieList
                            list={recommendation_list}
                            classname=" mt-3"
                        />
                    </SectionInfo>
                </WhenVisible>
            </div>

            <Modal
                show={open}
                onClose={() => {
                    setOpen(false);
                }}
                maxWidth="sm"
                onLeave={() => setModeForm("add_to_playlist")}
            >
                <div className=" w-full bg-[#202228] relative px-5 py-4">
                    <div className="flex justify-between items-center">
                        <p className="sub-heading">
                            {modeForm === "add_to_playlist"
                                ? "save movie to..."
                                : "new playlist"}
                        </p>
                        {modeForm === "add_to_playlist" && (
                            <button
                                className=" cursor-pointer"
                                onClick={() => setOpen(false)}
                            >
                                <Cancel01Icon />
                            </button>
                        )}
                    </div>

                    {modeForm === "add_to_playlist" ? (
                        <FormAddMovieToPlaylist />
                    ) : (
                        <FormCreatePlaylist />
                    )}

                    <SecondaryButton
                        className=" w-full mt-2"
                        onClick={() =>
                            modeForm === "add_to_playlist"
                                ? setModeForm("create_playlist")
                                : setOpen(false)
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
