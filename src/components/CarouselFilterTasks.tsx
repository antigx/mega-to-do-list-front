import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import type { TaskFilter, PriorityFilter } from "../types/Task";
import type { Dispatch, SetStateAction } from "react";
import { useData } from "../contexts/DataContext";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export function CarouselFilterTasks({
  setFilterCompleted,
  filterCompleted,
  filterPriority,
  setFilterPriority,
}: {
  setFilterCompleted: Dispatch<SetStateAction<TaskFilter>>;
  filterCompleted: TaskFilter;
  filterPriority: PriorityFilter;
  setFilterPriority: Dispatch<SetStateAction<PriorityFilter>>;
}) {
  const { deleteCompletedTasks } = useData();

  const filterOptions = [
    { value: "all", label: "Todas" },
    { value: "pending", label: "A fazer" },
    { value: "done", label: "Concluídas" },
  ];

  const priorityOptions = [
    { value: 0, label: "Todas Prioridades" },
    { value: 3, label: "Alta" },
    { value: 2, label: "Normal" },
    { value: 1, label: "Baixa" },
  ];

  return (
    <div className="my-4 sm:mb-0 relative flex flex-col gap-2 items-center justify-center">
      {/* Filtros por status */}
      <div className="overflow-visible -mx-6 w-full md:w-auto">
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
                onClick={() => setFilterCompleted(option.value as TaskFilter)}
                className={`flex items-center justify-center min-w-[60px] h-full py-2 px-5 rounded-2xl cursor-pointer
                ${
                  filterCompleted === option.value
                    ? "bg-gray-secondary text-white"
                    : "border-2 border-gray-200/70 bg-gray-primary"
                }
                transition-all duration-200 ease-out
                hover:shadow-md hover:scale-[1.03] hover:border-gray-secondary
                active:scale-95 focus:outline-none`}
                aria-label={`Filtrar por ${option.label}`}
                aria-current={filterCompleted === option.value}
              >
                <span className="text-xs font-medium tracking-wider">
                  {option.label}
                </span>
              </button>
            </SwiperSlide>
          ))}

          <SwiperSlide className="!w-auto h-auto">
            <div className="relative">
              <select
                value={filterPriority}
                onChange={(e) =>
                  setFilterPriority(Number(e.target.value) as PriorityFilter)
                }
                style={{
                  backgroundColor:
                    filterPriority === 1
                      ? "#33C1FF"
                      : filterPriority === 2
                      ? "#28A745"
                      : filterPriority === 3
                      ? "#FF5733"
                      : "#d9d9d9", // cor padrão (gray-primary)
                  color: filterPriority !== 0 ? "white" : "inherit",
                }}
                className={`appearance-none flex items-center justify-center min-w-[60px] h-full py-2 pl-5 pr-8 rounded-2xl cursor-pointer
    border-2 border-gray-200/70
    text-xs font-medium tracking-wider
    transition-all duration-200 ease-out
    focus:outline-none`}
                aria-label="Filtrar por prioridade"
              >
                {priorityOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="bg-gray-primary text-black"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </SwiperSlide>

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
                Deletar Concluídas
              </span>
            </button>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
