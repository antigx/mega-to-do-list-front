import type { Task } from "../types/Task";
import TaskCard from "./TaskCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function CarouselTasks({ tasks }: { tasks: Task[] }) {
  return (
    <div className="my-4 sm:mb-0 relative">
      {/* Main Carousel */}
      <div className="overflow-visible -mx-6">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={1.2}
          centeredSlides={false}
          style={{
            padding: "10px 24px",
          }}
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
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.5,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
        >
          {tasks.map((task: Task, i: number) => (
            <SwiperSlide key={i} className="h-auto">
              <div className="h-full px-1">
                {" "}
                {/* Added padding for visual spacing */}
                <TaskCard task={task} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Navigation Controls */}
      <div className="swiper-pagination !bottom-[-10px]" />
      <div className="swiper-button-next !right-0 !text-gray-400 !scale-75" />
      <div className="swiper-button-prev !left-0 !text-gray-400 !scale-75" />
    </div>
  );
}
