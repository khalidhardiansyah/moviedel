import { Swiper, SwiperSlide } from "swiper/react";
import { Collection } from "@/types";
import MovieCard from "./MovieCard";
import { router } from "@inertiajs/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
interface List {
    list: Collection[];
}
export default function RecommendationMovie({ list }: List) {
    return (
        <div>
            <Swiper
                speed={500}
                modules={[Scrollbar]}
                spaceBetween={12}
                cssMode={true}
                grabCursor={true}
                scrollbar={{ draggable: true }}
                slidesPerView={3}
                breakpoints={{
                    768: {
                        slidesPerView: 4,
                    },
                    1024: {
                        slidesPerView: 6,
                    },
                }}
            >
                {list.map((movie) => (
                    <SwiperSlide>
                        <MovieCard
                            key={movie.id}
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
