import type { Task } from "../types/Task";
import TaskCard from "./TaskCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";

export default function CarouselTasks({ tasks }: { tasks: Task[] }) {
    return (
        <div className="mt-6 mb-14 sm:mb-0">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={20}
                slidesPerView={1.5}
                pagination={{
                    clickable: true,
                    el: ".swiper-pagination",
                    dynamicBullets: true,
                }}
                navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }}
                autoplay={{ delay: 3000, disableOnInteraction: true }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                    1280: {
                        slidesPerView: 4,
                    },
                }}
            >
                {tasks.map((task: Task, i: number) => (
                    <SwiperSlide key={i}>
                        <TaskCard task={task} />
                    </SwiperSlide>
                ))}
                {/*                 <div className="swiper-pagination !bottom-[-25px] " />

                <div className="swiper-button-next !text-gray-400 !scale-75" />
                <div className="swiper-button-prev !text-gray-400 !scale-75" /> */}
            </Swiper>
        </div>
    );
}
