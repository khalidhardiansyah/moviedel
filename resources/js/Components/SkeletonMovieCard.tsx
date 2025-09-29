export default function SkeletonMovieCard() {
    return (
        <div className=" rounded-md relative rounded-m overflow-hidden bg-gray-50/20 animate-pulse min-h-[180px] min-w-[120px] md:min-h-[198px] lg:max-w-40 lg:min-h-60">
            <div className="w-full h-full object-cover " />
            <div className="w-full p-3 flex flex-col absolute z-20 bottom-0 ">
                <div className="animate-pulse bg-gray-300 h-4 w-3/4 mb-2 rounded"></div>
                <div className="animate-pulse bg-gray-300 h-4 w-3/4 mb-2 rounded"></div>
                <div className="flex-col flex gap-y-1 5 animate-pulse bg-primary h-8  rounded w-full"></div>
            </div>
        </div>
    );
}
