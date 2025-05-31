import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import TaskList from "./TaskList";
import { useData } from "../contexts/DataContext";
import type { PriorityFilter, TaskFilter } from "../types/Task";
import orderTasks from "../utils/orderTasks";
import Search from "./Search";
import { CarouselFilterTasks } from "./CarouselFilterTasks";

export default function AllTasks({
  viewMode,
  selectedDate,
  setSearching,
  searching = true,
}: {
  setSearching?: Dispatch<SetStateAction<boolean>>;
  searching?: boolean;
  viewMode?: string;
  selectedDate?: Date;
}) {
  const [filterCompleted, setFilterCompleted] = useState<TaskFilter>("all");
  const [filterPriority, setFilterPriority] = useState<PriorityFilter>(0);
  const [searchString, setSearchString] = useState<string>("");
  const { tasks } = useData();

  const filteredTasks = useMemo(() => {
    if (!tasks) return [];

    let result = [...tasks];

    if (searchString) {
      result = result.filter((task) =>
        task.title.toLowerCase().includes(searchString.toLowerCase())
      );
    }

    if (viewMode !== "all" && selectedDate) {
      result = result.filter((task) => {
        if (!task.end_date) return false;
        const taskDate = new Date(task.end_date);
        return (
          taskDate.getDate() === selectedDate.getDate() &&
          taskDate.getMonth() === selectedDate.getMonth() &&
          taskDate.getFullYear() === selectedDate.getFullYear()
        );
      });
    }

    if (filterCompleted === "pending") {
      result = result.filter((task) => !task.completed);
    } else if (filterCompleted === "done") {
      result = result.filter((task) => task.completed);
    }

    // Filtro por prioridade (adicionado aqui)
    if (filterPriority !== 0) {
      result = result.filter((task) => task.priority === filterPriority);
    }

    return orderTasks(result);
  }, [
    tasks,
    searchString,
    filterCompleted,
    selectedDate,
    viewMode,
    filterPriority,
  ]); // Adicionei filterPriority nas dependências

  return (
    <>
      <Search
        setSearchString={setSearchString}
        searching={searching}
        setSearching={setSearching}
      />
      {searching && (
        <>
          <CarouselFilterTasks
            setFilterCompleted={setFilterCompleted}
            filterCompleted={filterCompleted}
            filterPriority={filterPriority}
            setFilterPriority={setFilterPriority}
          />

          <TaskList
            filteredTasks={filteredTasks}
            viewMode={viewMode}
            selectedDate={selectedDate}
          />
        </>
      )}
    </>
  );
}
