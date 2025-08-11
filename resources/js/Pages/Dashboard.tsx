import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import MovieCard from "@/Components/MovieCard";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SliderMovieList from "@/Components/SliderMovieList";
import TextInput from "@/Components/TextInput";
import ToggleInput from "@/Components/ToggleInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ListLayout from "@/Layouts/ListLayout";
import { TypeToast, UserPlaylists } from "@/types";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { Link05Icon, Share01Icon } from "hugeicons-react";
import { useState } from "react";
import { toast } from "react-toastify";
export default function Dashboard() {
    const { user_playlist } = usePage().props;
    const { data, setData } = useForm<{
        is_public: boolean | undefined;
        id: number | undefined;
    }>({
        id: undefined,
        is_public: undefined,
    });
    const [open, setOpen] = useState(false);
    const [playlist, setPlaylist] = useState<UserPlaylists>();
    const [loading, setLoading] = useState<boolean>(false);

    function openModal(id: number) {
        setOpen(true);
        const selectedPlaylist = user_playlist.find((item) => item.id === id);
        setData("id", selectedPlaylist?.id);
        setData("is_public", selectedPlaylist?.is_public);
        setPlaylist(selectedPlaylist);
    }

    function switchToggle(e: boolean) {
        setLoading(true);
        setData("is_public", e);

        router.patch(
            `/playlist/${data.id}`,
            {
                ...data,
                is_public: e,
            },

            {
                async: true,
                onSuccess: (page) => {
                    setLoading(false);
                    const typeToast =
                        page.props.flash.response.status ||
                        ("info" as TypeToast);
                    toast[typeToast](page.props.flash.response.message);
                    router.reload({
                        only: ["user_playlist"],
                    });
                },
            }
        );
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(playlist?.url || "").then(() => {
            toast.success("Copied URL", {
                position: "bottom-center",
            });
        });
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

                        {playlist.collections.length > 0 ? (
                            <SliderMovieList
                                list={playlist.collections}
                                classname=" mt-3"
                            />
                        ) : (
                            <h2 className=" capitalize md:text-xl mt-3">
                                No saved movie
                            </h2>
                        )}
                    </section>
                ))}
            </div>
            <Modal show={open} maxWidth="sm" onClose={() => setOpen(false)}>
                <div className="w-full relative bg-gray-50 px-5 py-4">
                    <h2 className="first-letter:capitalize font-bold text-lg">
                        Share playlist
                        <span className=" capitalize"> "{playlist?.name}"</span>
                    </h2>
                    <form action="" method="post">
                        <div className="mt2">
                            <InputLabel
                                value="playlist"
                                className=" capitalize mb-1"
                            />
                            <TextInput
                                disabled
                                className=" w-full capitalize"
                                value={playlist?.name}
                            />
                        </div>
                        <div className="mt-2 flex items-center gap-x-3">
                            <ToggleInput
                                checkedValue={data.is_public}
                                onSwitch={switchToggle}
                            />
                            <InputLabel
                                value="Share playlist"
                                className=" capitalize mb-1"
                            />
                        </div>
                    </form>
                    <div className="flex w-full justify-between mt-5">
                        <SecondaryButton
                            disabled={loading || data.is_public === false}
                            className="hover:bg-sky-500/20 hover:border-blue-600"
                            onClick={copyToClipboard}
                        >
                            <Link05Icon size={20} className=" mr-1.5" />
                            Copy link
                        </SecondaryButton>
                        <PrimaryButton
                            disabled={loading}
                            onClick={() => setOpen(false)}
                        >
                            {loading ? "saving" : "close"}
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
