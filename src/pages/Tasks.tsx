import { useMemo, useState } from "react";
import { CarouselDays } from "../components/Carousels";
import Header from "../components/Header";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import AllTasks from "../components/AllTasks";

type ViewMode = "all" | "byDate";

export default function Tasks() {
  const [viewMode, setViewMode] = useState<ViewMode>("all"); // Estado para controlar a view
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const changeMonth = (direction: "prev" | "next") => {
    let newMonth = currentMonth;
    let newYear = currentYear;

    if (direction === "prev") {
      newMonth = currentMonth - 1;
      if (newMonth < 1) {
        newMonth = 12;
        newYear = currentYear - 1;
      }
    } else {
      newMonth = currentMonth + 1;
      if (newMonth > 12) {
        newMonth = 1;
        newYear = currentYear + 1;
      }
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);

    // Reset para o primeiro dia do novo mês
    const firstDayOfNewMonth = new Date(newYear, newMonth - 1, 1);
    setSelectedDate(firstDayOfNewMonth);
  };

  const monthName = useMemo(() => {
    return new Date(currentYear, currentMonth - 1, 1).toLocaleDateString(
      "pt-BR",
      {
        month: "long",
        year: "numeric",
      }
    );
  }, [currentMonth, currentYear]);

  return (
    <>
      <Header
        text={viewMode === "all" ? "Todas as Tarefas" : "Tarefas por Dia"}
      />

      <div className="flex border-b border-gray-200 mb-4">
        <button
          className={`py-2 px-4 font-medium text-sm focus:outline-none ${
            viewMode === "byDate"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setViewMode("byDate")}
        >
          Por Data
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm focus:outline-none ${
            viewMode === "all"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setViewMode("all")}
        >
          Todas
        </button>
      </div>

      {viewMode === "byDate" && (
        <>
          {/* Controle de mês */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => changeMonth("prev")}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
            </button>

            <h2 className="text-xl font-semibold text-gray-800 capitalize">
              {monthName}
            </h2>

            <button
              onClick={() => changeMonth("next")}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          <CarouselDays
            month={currentMonth}
            year={currentYear}
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate}
          />
        </>
      )}

      <AllTasks viewMode={viewMode} selectedDate={selectedDate} />
    </>
  );
}
