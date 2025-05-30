import type { Task } from "../types/Task";
import { TaskCardDash } from "./TaskCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import {
  format,
  getDaysInMonth,
  getDay,
  addDays,
  isToday as isDateToday,
} from "date-fns";
import { setDefaultOptions } from "date-fns/setDefaultOptions";
import { ptBR } from "date-fns/locale";

import { Swiper as SwiperCore } from "swiper";
import { useEffect, useRef } from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { type Dispatch, type SetStateAction } from "react";
import { useData } from "../contexts/DataContext";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export function CarouselTasks() {
  const { tasks } = useData();
  const navigate = useNavigate();

  return (
    <div className="my-4 sm:mb-0 relative">
      {/* Main Carousel */}
      {tasks.filter((i) => !i.completed).length > 0 ? (
        <div className="overflow-visible -mx-10">
          <Swiper
            modules={[Pagination, Navigation]}
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
            {tasks
              .filter((i) => !i.completed)
              .map((task: Task) => (
                <SwiperSlide key={task.id} className="h-auto">
                  <div className="h-full px-1">
                    {/* Added padding for visual spacing */}
                    <TaskCardDash task={task} />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full min-h-[100px] bg-gray-50 rounded-lg border border-dashed border-gray-300 p-6 text-center ">
          <span className="flex justify-center items-center">
            <ClipboardDocumentIcon className="h-10 w-10 text-gray-400 mb-3" />
            <span>
              <h3 className="text-lg font-medium text-gray-700">
                Nenhuma tarefa pendente
              </h3>
              <p className="text-gray-500 mt-1">
                Adicione novas tarefas para começar
              </p>
            </span>
          </span>
          <Button
            text="Criar Tarefa"
            handleClick={() => navigate("/add-tarefas")}
          ></Button>
        </div>
      )}

      {/* <div className="swiper-pagination !bottom-[-10px]" />
      <div className="swiper-button-next !right-0 !text-gray-400 !scale-75" />
      <div className="swiper-button-prev !left-0 !text-gray-400 !scale-75" /> */}
    </div>
  );
}

export function CarouselDays({
  month,
  year,
  onDateSelect,
  selectedDate,
}: {
  month: number;
  year: number;
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
}) {
  const swiperRef = useRef<SwiperCore | null>(null);
  const days = gerarDiasDoMes(month, year);

  useEffect(() => {
    if (swiperRef.current) {
      const selectedIndex = days.findIndex(
        (day) =>
          day.date.getDate() === selectedDate.getDate() &&
          day.date.getMonth() === selectedDate.getMonth() &&
          day.date.getFullYear() === selectedDate.getFullYear()
      );

      if (selectedIndex !== -1) {
        swiperRef.current.slideTo(selectedIndex);
      } else {
        swiperRef.current.slideTo(0); // Fallback to first day
      }
    }
  }, [selectedDate, month, year]); // Added month and year as dependencies

  const handleDayClick = (day: { date: Date }) => {
    onDateSelect(day.date);
  };

  return (
    <div className="my-4 sm:mb-0 relative select-none">
      <div className="overflow-visible -mx-6">
        <Swiper
          slidesPerView="auto"
          spaceBetween={10}
          centeredSlides={true}
          className="!py-4"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            // Initial slide to selected date
            const selectedIndex = days.findIndex(
              (day) =>
                day.date.getDate() === selectedDate.getDate() &&
                day.date.getMonth() === selectedDate.getMonth() &&
                day.date.getFullYear() === selectedDate.getFullYear()
            );
            swiper.slideTo(selectedIndex !== -1 ? selectedIndex : 0);
          }}
        >
          {days.map((day, i) => {
            const isActive =
              day.date.getDate() === selectedDate.getDate() &&
              day.date.getMonth() === selectedDate.getMonth() &&
              day.date.getFullYear() === selectedDate.getFullYear();

            const isToday = isDateToday(day.date);

            return (
              <SwiperSlide key={i} className="!w-auto h-auto">
                <div
                  onClick={() => handleDayClick(day)}
                  className={`flex flex-col items-center justify-center w-20 h-full p-3 rounded-xl shadow-lg cursor-pointer
                  ${
                    isActive
                      ? "bg-gray-secondary text-white"
                      : isToday
                      ? "border-2 border-blue-300"
                      : "border-2 border-gray-200/0 bg-gray-primary"
                  }
                  transition-all duration-200 ease-out
                  hover:shadow-md hover:scale-[1.03] hover:border-gray-secondary
                  active:scale-95`}
                >
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    {day.month}
                  </span>

                  <span className="text-2xl font-bold my-1">{day.day}</span>

                  <span className="text-xs font-medium">
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

//carrosel de filtro
export type TaskFilter = "all" | "pending" | "done";

export interface FilterOption {
  value: TaskFilter;
  label: string;
}

export function CarouselFilterTasks({
  setFilter,
  currentFilter,
}: {
  setFilter: Dispatch<SetStateAction<TaskFilter>>;
  currentFilter: TaskFilter;
}) {
  const filterOptions: FilterOption[] = [
    { value: "all", label: "Todas" },
    { value: "pending", label: "A fazer" },
    { value: "done", label: "Concluídas" },
  ];
  const { deleteCompletedTasks } = useData();

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
          <SwiperSlide className="!w-auto h-auto">
            <button
              onClick={deleteCompletedTasks}
              className="flex items-center justify-center min-w-[60px] h-full 
                py-2 px-5 rounded-2xl cursor-pointer border-2 border-red-200/70 bg-red-200
                transition-all duration-200 ease-out
                text-red-600
                hover:shadow-md hover:scale-[1.03] hover:border-red-500
                active:scale-95 focus:outline-none"
              aria-label="Deletar todas as tarefas completas"
            >
              <span className="text-xs font-medium tracking-wider">
                Deletar Tarefas Concluídas
              </span>
            </button>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
