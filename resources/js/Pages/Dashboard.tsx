import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import MovieCard from "@/Components/MovieCard";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ListLayout from "@/Layouts/ListLayout";
import { UserPlaylists } from "@/types";
import { Head, router, usePage } from "@inertiajs/react";
import { Link02Icon, Link05Icon, Share01Icon } from "hugeicons-react";
import { useState } from "react";

export default function Dashboard() {
    const { user_playlist } = usePage().props;
    const [open, setOpen] = useState(false);
    const [playlist, setPlaylist] = useState<UserPlaylists>();
    function openModal(id: number) {
        console.log(id);
        setOpen(true);
        const selectedPlaylist = user_playlist.find((item) => item.id === id);
        setPlaylist(selectedPlaylist);
    }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight  text-slate-100">
                    My Playlist
                </h2>
            }
        >
            <Head title="Playlist" />
            <div className="mt-5 ">
                {user_playlist.map((playlist) => (
                    <section className="mb-5">
                        <div className="w-full border-b-2 flex">
                            <h1 className=" md:text-2xl font-bold capitalize">
                                {playlist.name}
                            </h1>
                            <button
                                type="button"
                                className="ml-auto"
                                onClick={() => openModal(playlist.id)}
                            >
                                <Share01Icon />
                            </button>
                        </div>

                        {playlist.collections.length !== 0 ? (
                            <ListLayout classname="mt-3">
                                {playlist.collections.map((movie) => (
                                    <MovieCard
                                        poster={movie.poster}
                                        title={movie.title}
                                        release_date={movie.release_date}
                                        onWatch={() =>
                                            router.get(
                                                `/movie/movie/detail/${movie.id}`
                                            )
                                        }
                                    />
                                ))}
                            </ListLayout>
                        ) : (
                            <h2 className=" capitalize md:text-xl mt-3">
                                No saved movie
                            </h2>
                        )}
                    </section>
                ))}
            </div>
            <Modal show={open} maxWidth="md" onClose={() => setOpen(false)}>
                <div className="w-full bg-gray-50 px-5 py-4">
                    <h2 className="first-letter:capitalize font-bold text-lg">
                        Share playlist{" "}
                        <span className=" capitalize">"{playlist?.name}"</span>
                    </h2>
                    <form action="" method="post" className="">
                        <div className="mt2">
                            <InputLabel
                                value="playlist"
                                className=" capitalize mb-1"
                            />
                            <TextInput
                                className=" w-full"
                                value={playlist?.name}
                            />
                        </div>
                        <div className="mt-2">
                            <InputLabel
                                value="privacy"
                                className=" capitalize mb-1"
                            />
                            <SelectInput />
                        </div>
                    </form>
                    <div className="flex w-full justify-between mt-5">
                        <SecondaryButton className="hover:bg-sky-500/20 hover:border-blue-600">
                            <Link05Icon size={20} className=" mr-1.5" />
                            Copy link
                        </SecondaryButton>
                        <PrimaryButton onClick={() => setOpen(false)}>
                            close
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
