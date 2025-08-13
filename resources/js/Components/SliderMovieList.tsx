import { Swiper, SwiperSlide } from "swiper/react";
import { Collection } from "@/types";
import MovieCard from "./MovieCard";
import { router } from "@inertiajs/react";
import { Navigation, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
interface List {
    list: Collection[];
    classname?: string;
}
export default function SliderMovieList({ list, classname = "" }: List) {
    return (
        <div className={classname}>
            <Swiper
                speed={500}
                modules={[Scrollbar]}
                spaceBetween={12}
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
                {list.map((movie, i) => (
                    <SwiperSlide key={i}>
                        <MovieCard
                            key={i}
                            poster={movie.poster}
                            title={movie.original_title}
                            release_date={movie.release_date}
                            onWatch={() =>
                                router.get(`/movie/detail/${movie.id}`)
                            }
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
