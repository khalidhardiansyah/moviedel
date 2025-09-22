import {
    InformationCircleIcon,
    MoreVerticalCircle01Icon,
    MultiplicationSignIcon,
    PlayIcon,
} from "hugeicons-react";
import DangerButton from "./DangerButton";
import { formatDate } from "@/helpers/helper";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
interface MovieCard {
    poster: string;
    title: string;
    release_date: string;
    onWatch: React.MouseEventHandler<HTMLButtonElement>;
    playlistMode?: boolean;
    onDelete?: () => void;
}
export default function MovieCard({
    poster,
    title,
    release_date,
    onWatch,
    onDelete,
    playlistMode,
}: MovieCard) {
    return (
        <div className="relative overflow-hidden rounded-md group min-w-24 sm:min-w-28 max-w-40 max-h-60">
            <img src={poster} className="w-full h-full object-cover" />
            <div
                className={`absolute  inset-0 z-10 transition-opacity duration-300  bg-zinc-600/45 opacity-0 group-hover:opacity-100 group-hover:backdrop-blur-sm  flex items-end`}
            >
                <div className="w-full p-3 z-20 flex flex-col translate-y-50 group-hover:translate-y-0 transition-all ease-in-out duration-300 delay-75">
                    <h1 className=" text-xs font-bold sm:text-lg/tight whitespace-break-spaces">
                        {title}
                    </h1>
                    <span className=" text-[10px] sm:text-xs block md:mb-1">
                        {formatDate(release_date)}
                    </span>
                    <div className="flex-col flex gap-y-1 5">
                        <SecondaryButton className="text-xs" onClick={onWatch}>
                            <PlayIcon
                                size={20}
                                color="white"
                                className=" text-inherit hidden sm:block"
                            />
                            <span className=" block">Watch</span>
                        </SecondaryButton>
                        {playlistMode && onDelete && (
                            <DangerButton
                                className="text-xs"
                                onClick={onDelete}
                            >
                                <MultiplicationSignIcon
                                    size={20}
                                    color="white"
                                    className=" text-inherit hidden sm:block"
                                />
                                <span className=" block">Remove</span>
                            </DangerButton>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
