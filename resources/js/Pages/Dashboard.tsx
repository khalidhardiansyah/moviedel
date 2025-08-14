import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SliderMovieList from "@/Components/SliderMovieList";
import TextInput from "@/Components/TextInput";
import ToggleInput from "@/Components/ToggleInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TypeToast, UserPlaylists } from "@/types";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { Link05Icon, MoreVerticalCircle01Icon } from "hugeicons-react";
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
    const [playlist, setPlaylist] = useState<UserPlaylists>();
    const [loading, setLoading] = useState<boolean>(false);

    function openModal(id: number) {
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
            <div className="">
                {user_playlist.map((playlist, i) => (
                    <section
                        className="mb-5 bg-secondary py-4 px-5 rounded-md shadow"
                        key={i}
                    >
                        <div className="w-full border-b-1 border-gray-100/55 justify-between flex items-center">
                            <h1 className=" sub-heading">{playlist.name}</h1>

                            <Popover className=" relative">
                                <PopoverButton
                                    onClick={() => openModal(playlist.id)}
                                >
                                    <MoreVerticalCircle01Icon />
                                </PopoverButton>

                                <PopoverPanel
                                    anchor="bottom end"
                                    className="flex flex-col z-30 bg-primary  px-5 py-4 rounded-lg shadow border"
                                >
                                    <h2 className="first-letter:capitalize font-bold text-lg">
                                        Share playlist
                                        <span className=" capitalize">
                                            {" "}
                                            "{playlist.name}"
                                        </span>
                                    </h2>
                                    <div className="mt-2 flex items-center justify-between">
                                        <InputLabel
                                            value="Share playlist"
                                            className=" capitalize"
                                        />
                                        <ToggleInput
                                            checkedValue={playlist.is_public}
                                            onSwitch={switchToggle}
                                        />
                                    </div>
                                    <SecondaryButton
                                        disabled={
                                            loading ||
                                            playlist.is_public === false
                                        }
                                        className=" mt-2"
                                        onClick={copyToClipboard}
                                    >
                                        <Link05Icon
                                            size={20}
                                            className=" mr-1.5"
                                        />
                                        Copy link
                                    </SecondaryButton>
                                </PopoverPanel>
                            </Popover>
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
        </AuthenticatedLayout>
    );
}
