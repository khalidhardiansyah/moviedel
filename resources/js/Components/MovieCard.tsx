import { PlayIcon } from "hugeicons-react";
interface MovieCard {
    poster: string;
    title: string;
    release_date: string;
    onWatch: React.MouseEventHandler<HTMLButtonElement>;
}
export default function MovieCard<Movie>({
    poster,
    title,
    release_date,
    onWatch,
}: MovieCard) {
    return (
        <div className="relative overflow-hidden rounded-md group">
            <img src={poster} className=" w-full object-cover" />
            <div className="absolute inset-0 z-10 transition-opacity duration-300  bg-zinc-600/45 opacity-0 group-hover:opacity-100 group-hover:backdrop-blur-sm  flex items-end ">
                <div className=" w-full p-3 z-20 ">
                    <h1 className=" text-sm font-bold sm:text-lg whitespace-normal">
                        {title}
                    </h1>
                    <span className=" text-xs sm:text-sm block md:mb-1">
                        {release_date}
                    </span>
                    <button
                        type="button"
                        className="transition-all text-sm duration-100 rounded-lg w-full min-h-7 sm:min-h-9 max-h-10 flex items-center justify-center  bg-red-500 hover:bg-red-600 cursor-pointer"
                        onClick={onWatch}
                    >
                        <PlayIcon
                            size={19}
                            color="white"
                            className="sm:hidden"
                        />
                        <PlayIcon
                            size={23}
                            color="white"
                            className="hidden sm:block"
                        />
                        <span className=" text-sm sm:max-2xl:text-base tracking-wider font-medium">
                            Watch
                        </span>
                    </button>
                    {/* <Link
                                                href={`movie/detail/${movie.id}`}
                                                className=" bg-red-600 w-full hover:backdrop-blur-sm flex justify-center text-center py-2 rounded-md"
                                            >
                                                <PlayIcon />
                                                <span className=" font-medium">
                                                    Watch
                                                </span>
                                            </Link> */}
                </div>
            </div>
        </div>
    );
}
