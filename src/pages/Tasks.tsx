import { useEffect, useMemo, useState } from "react";
import {
  CarouselDays,
  CarouselFilterTasks,
  type TaskFilter,
} from "../components/CarouselTaks";
import { TaskCard } from "../components/TaskCard";
import type { Task } from "../types/Task";
import Header from "../components/Header";

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
    <>
      <Header text="Tarefas do Dia" />
      <CarouselDays month={currentDate.month} year={currentDate.year} />
      <CarouselFilterTasks setFilter={setFilter} currentFilter={filter} />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredTasks.map((task: Task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </section>
    </>
  );
}
