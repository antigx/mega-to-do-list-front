import { useMemo, useState } from "react";
import {
  CarouselDays,
  CarouselFilterTasks,
  type TaskFilter,
} from "../components/Carousels";
import { TaskCard } from "../components/TaskCard";
import type { Task } from "../types/Task";
import Header from "../components/Header";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useData } from "../contexts/DataContext";

export default function Tasks() {
  const { tasks, loading, error } = useData();

  const [filter, setFilter] = useState<TaskFilter>("all");
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

  const filteredTasks = useMemo(() => {
    if (!tasks) return undefined;

    // First filter by date
    const dateFilteredTasks = tasks.filter((task) => {
      if (!task.scheduled_for) return false;
      const taskDate = new Date(task.scheduled_for);
      return (
        taskDate.getDate() === selectedDate.getDate() &&
        taskDate.getMonth() === selectedDate.getMonth() &&
        taskDate.getFullYear() === selectedDate.getFullYear()
      );
    });

    // Then apply status filter if needed
    switch (filter) {
      case "pending":
        return dateFilteredTasks.filter((task) => task.completed === false);
      case "done":
        return dateFilteredTasks.filter((task) => task.completed === true);

      default:
        return dateFilteredTasks;
    }
  }, [filter, tasks, selectedDate]);

  return (
    <>
      <Header text="Tarefas do Dia" />

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

      <CarouselFilterTasks setFilter={setFilter} currentFilter={filter} />

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="col-span-full bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : filteredTasks && filteredTasks.length > 0 ? (
          filteredTasks.map((task: Task) => (
            <TaskCard key={task.id} task={task} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 px-4 text-center">
            <svg
              className="w-16 h-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              Nenhuma tarefa encontrada
            </h3>
            <p className="text-gray-500 max-w-md">
              Não há tarefas agendadas para{" "}
              {selectedDate.toLocaleDateString("pt-BR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
              .
            </p>
          </div>
        )}
      </section>
    </>
  );
}
