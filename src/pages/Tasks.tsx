import { useEffect, useMemo, useState } from "react";
import { ButtonBack, ButtonNotification } from "../components/Button";
import {
  CarouselDays,
  CarouselFilterTasks,
  type TaskFilter,
} from "../components/CarouselTaks";
import { TaskCard } from "../components/TaskCard";
import type { Task } from "../types/Task";

export default function Tasks({ tasks }: { tasks: Task[] }) {
  const [filter, setFilter] = useState<TaskFilter>("all");

  const currentDate = useMemo(
    () => ({
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    }),
    []
  );

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "done":
        return tasks.filter((task) => task.status === "done");
      case "ongoing":
        return tasks.filter((task) => task.status === "ongoing");
      case "pending":
        return tasks.filter((task) => task.status === "pending");
      default:
        return tasks;
    }
  }, [filter, tasks]);

  useEffect(() => {
    console.log("Filter changed to:", filter);
    console.log("Filtered tasks:", filteredTasks);
  }, [filter]);

  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <div className="w-full flex items-center justify-between gap-4 font-family-body font-bold text-xl">
        <ButtonBack />

        <div className="flex-1 text-center">
          <h1 className="truncate">Tarefas do Dia</h1>
        </div>

        <ButtonNotification />
      </div>
      <CarouselDays month={currentDate.month} year={currentDate.year} />
      <CarouselFilterTasks setFilter={setFilter} currentFilter={filter} />
      <section className="flex flex-col gap-4 mt-4">
        {filteredTasks.map((task: Task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </section>
    </main>
  );
}
