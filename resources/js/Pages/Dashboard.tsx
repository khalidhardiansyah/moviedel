import DangerButton from "@/Components/DangerButton";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import MovieCard from "@/Components/MovieCard";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SliderMovieList from "@/Components/SliderMovieList";
import TextInput from "@/Components/TextInput";
import ToggleInput from "@/Components/ToggleInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TypeToast, UserPlaylists } from "@/types";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import {
    Link05Icon,
    MoreVerticalCircle01Icon,
    MultiplicationSignIcon,
} from "hugeicons-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
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
        <div className=" max-w-7xl mx-auto">
            <Head title="Playlist" />
            {user_playlist.map((playlist, i) => (
                <section
                    className="mb-5 bg-secondary py-4 px-5 rounded-md shadow"
                    key={i}
                >
                    <div className="w-full border-b-1 border-gray-100/55 justify-between flex items-center">
                        <h1 className=" sub-heading">{playlist.name}</h1>

                        <Popover className=" relative">
                            <PopoverButton
                                className=" cursor-pointer"
                                onClick={() => openModal(playlist.id)}
                            >
                                <MoreVerticalCircle01Icon />
                            </PopoverButton>

                            <PopoverPanel
                                anchor="bottom end"
                                className="flex flex-col z-10 bg-primary  px-5 py-4 rounded-lg shadow border"
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
                                        loading || playlist.is_public === false
                                    }
                                    className=" mt-2"
                                    onClick={copyToClipboard}
                                >
                                    <Link05Icon size={20} className=" mr-1.5" />
                                    Copy link
                                </SecondaryButton>

                                <DangerButton
                                    disabled={loading}
                                    className=" mt-2"
                                    onClick={copyToClipboard}
                                >
                                    <MultiplicationSignIcon
                                        size={20}
                                        color="white"
                                        className=" mr-1.5"
                                    />
                                    Remove Playlist
                                </DangerButton>
                            </PopoverPanel>
                        </Popover>
                    </div>

                    {playlist.collections.length > 0 ? (
                        <div className="mt-3">
                            <Swiper
                                speed={500}
                                modules={[Scrollbar]}
                                spaceBetween={15}
                                cssMode={true}
                                grabCursor={true}
                                scrollbar={{ draggable: true, hide: true }}
                                slidesPerView={3}
                                breakpoints={{
                                    500: {
                                        slidesPerView: 4,
                                    },
                                    700: {
                                        slidesPerView: 5,
                                    },
                                    900: {
                                        slidesPerView: 7,
                                    },
                                }}
                            >
                                {playlist.collections.map((movie, i) => (
                                    <SwiperSlide key={i}>
                                        <MovieCard
                                            key={i}
                                            poster={movie.poster}
                                            title={movie.original_title}
                                            release_date={movie.release_date}
                                            onWatch={() =>
                                                router.get(movie.url)
                                            }
                                            playlistMode
                                            onDelete={() => {
                                                router.delete(
                                                    route(
                                                        "collection.destroy",
                                                        {
                                                            playlist:
                                                                playlist.id,
                                                            id: movie.id,
                                                        }
                                                    ),
                                                    {
                                                        onSuccess: (page) => {
                                                            const typeToast =
                                                                page.props.flash
                                                                    .response
                                                                    .status ||
                                                                ("info" as TypeToast);
                                                            toast[typeToast](
                                                                page.props.flash
                                                                    .response
                                                                    .message
                                                            );
                                                            router.reload({
                                                                only: [
                                                                    "user_playlist",
                                                                ],
                                                            });
                                                        },
                                                    }
                                                );
                                            }}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    ) : (
                        <h2 className=" capitalize md:text-xl mt-3">
                            No saved movie
                        </h2>
                    )}
                </section>
            ))}
        </div>
    );
}
