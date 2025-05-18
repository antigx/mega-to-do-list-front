import type { Task } from "../types/Task";
import { TaskCardDash } from "./TaskCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import {
  format,
  getDaysInMonth,
  getDay,
  addDays,
  isToday as isDateToday,
} from "date-fns";
import { setDefaultOptions } from "date-fns/setDefaultOptions";
import { ptBR } from "date-fns/locale";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

export function CarouselTasks({ tasks }: { tasks: Task[] }) {
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
                <TaskCardDash task={task} />
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

export function CarouselDays({ month, year }: { month: number; year: number }) {
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const today = new Date();
  useEffect(() => {
    if (today.getFullYear() === year && today.getMonth() + 1 === month) {
      setActiveDay(today.getDate());
      console.log("hoje", today.getDate());
    } else {
      setActiveDay(0);
    }
  }, [month, year]);

  const handleDayClick = (dayNumber: number) => {
    console.log("Dia clicado:", dayNumber);
    setActiveDay(activeDay === dayNumber ? null : dayNumber);
  };

  const days = gerarDiasDoMes(month, year);

  const initialDay =
    today.getFullYear() === year && today.getMonth() + 1 === month
      ? today.getDate() - 1
      : 0;

  return (
    <div className="my-4 sm:mb-0 relative select-none">
      <div className="overflow-visible -mx-6">
        <Swiper
          slidesPerView="auto"
          spaceBetween={10}
          initialSlide={initialDay}
          centeredSlides={true}
          className="!py-4"
        >
          {days.map((day, i) => {
            const isActive = activeDay === parseInt(day.day);
            const isToday = isDateToday(day.date);

            return (
              <SwiperSlide key={i} className="!w-auto h-auto">
                <div
                  onClick={() => handleDayClick(parseInt(day.day))}
                  className={`flex flex-col items-center justify-center w-20 h-full p-3 rounded-xl shadow-lg cursor-pointer
                  ${
                    isActive
                      ? "bg-gray-secondary text-white"
                      : isToday
                      ? "border-2 border-blue-300"
                      : "border-2 border-gray-200/70 bg-gray-primary"
                  }
                  transition-all duration-200 ease-out
                  hover:shadow-md hover:scale-[1.03] hover:border-gray-seconday
                  active:scale-95`}
                >
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider`}
                  >
                    {day.month}
                  </span>

                  <span
                    className={`text-2xl font-bold 
                    } my-1`}
                  >
                    {day.day}
                  </span>

                  <span
                    className={`text-xs font-medium 
                    `}
                  >
                    {day.weekDay.slice(0, 3)}
                  </span>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

interface DiaDoMes {
  day: string;
  weekDay: string;
  month: string;
  date: Date;
}

export function gerarDiasDoMes(mes: number, ano: number): DiaDoMes[] {
  const dataInicio = new Date(ano, mes - 1, 1);
  const diasNoMes = getDaysInMonth(dataInicio);

  const dias: DiaDoMes[] = [];

  const diasDaSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  setDefaultOptions({ locale: ptBR });
  for (let i = 0; i < diasNoMes; i++) {
    const dataAtual = addDays(dataInicio, i);
    const diaFormatado = format(dataAtual, "dd");
    const diaDaSemana = diasDaSemana[getDay(dataAtual)];
    const mesFormatado = format(dataAtual, "MMMM");

    dias.push({
      day: diaFormatado,
      weekDay: diaDaSemana,
      month: mesFormatado,
      date: dataAtual,
    });
  }

  return dias;
}

export type TaskFilter = "all" | "pending" | "ongoing" | "done";

export interface FilterOption {
  value: TaskFilter;
  label: string;
}

export function CarouselFilterTasks({
  setFilter,
  currentFilter, // Add currentFilter prop
}: {
  setFilter: Dispatch<SetStateAction<TaskFilter>>;
  currentFilter: TaskFilter; // Track active filter from parent
}) {
  const filterOptions: FilterOption[] = [
    { value: "all", label: "Todas" },
    { value: "pending", label: "A fazer" },
    { value: "ongoing", label: "Em progresso" },
    { value: "done", label: "Concluídas" },
  ];

  const handleFilterClick = (filterValue: TaskFilter) => {
    setFilter(filterValue);
  };

  return (
    <div className="my-4 sm:mb-0 relative flex items-center justify-center">
      <div className="overflow-visible -mx-6">
        <Swiper
          slidesPerView="auto"
          spaceBetween={10}
          className="!px-4"
          breakpoints={{
            640: { spaceBetween: 12 },
            1024: { spaceBetween: 14 },
          }}
        >
          {filterOptions.map((option) => (
            <SwiperSlide key={option.value} className="!w-auto h-auto">
              <button
                onClick={() => handleFilterClick(option.value)}
                className={`flex items-center justify-center min-w-[60px] h-full py-2 px-5 rounded-2xl cursor-pointer
                ${
                  currentFilter === option.value
                    ? "bg-gray-secondary text-white"
                    : "border-2 border-gray-200/70 bg-gray-primary"
                }
                transition-all duration-200 ease-out
                hover:shadow-md hover:scale-[1.03] hover:border-gray-secondary
                active:scale-95 focus:outline-none`}
                aria-label={`Filtrar por ${option.label}`}
                aria-current={currentFilter === option.value}
              >
                <span className="text-xs font-medium tracking-wider">
                  {option.label}
                </span>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
