import { PlayIcon } from "hugeicons-react";
export default function MovieCard({ poster, title, release_date, onWatch }) {
    return (
        <div className="relative overflow-hidden rounded-md group">
            <img src={poster} className=" w-full object-cover" />
            <div className="absolute inset-0 z-10 transition-opacity duration-300  bg-zinc-600/45 opacity-0 group-hover:opacity-100 group-hover:backdrop-blur-sm  flex items-end ">
                <div className=" w-full p-3 space-y-2 z-20 ">
                    <h1 className="">{title}</h1>
                    <p>{release_date}</p>
                    <button
                        type="button"
                        className="transition-all duration-100 rounded-lg w-full min-h-9 max-h-10 flex items-center justify-center  bg-red-500 hover:bg-red-600 cursor-pointer"
                        onClick={onWatch}
                    >
                        <PlayIcon size={28} color="white" />
                        <span className=" font-medium">Watch</span>
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
