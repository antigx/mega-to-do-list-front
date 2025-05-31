import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import type { Task } from "../types/Task";
import { useState } from "react";
import { useData } from "../contexts/DataContext";
import api from "../services/api";
import { getColor } from "../utils/getColor";
import { FlagIcon } from "@heroicons/react/24/outline";

interface TaskCardProps {
  task: Task;
}

function TaskProgress({
  progress,
  color,
}: {
  progress: number;
  color: string;
}) {
  return (
    <div className="w-full bg-gray-200/50 h-2 rounded-full mt-2">
      <div
        className="h-2 rounded-full transition-all duration-300"
        style={{
          width: `${progress}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
}

export function TaskCardDash({ task }: TaskCardProps) {
  const [completed, setCompleted] = useState(task.completed);
  const color = getColor(task.priority);
  const { updateTask } = useData();

  const toggleComplete = async () => {
    setCompleted(!completed);
    updateTask(task.id, { completed: !task.completed });
    await api.put(`/tasks/${task.id}`, { ...task, completed: !task.completed });
  };
  return (
    <div
      role="listitem"
      aria-label={`Task: ${task.title}`}
      className={`rounded-[15px] p-4 w-full overflow-visible 
        shadow-sm hover:shadow-md transition-shadow duration-200`}
      style={{
        backgroundColor: `${color}80`,
      }}
    >
      <div className="flex gap-5 items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-1">
            {task.title}
          </h3>

          {task.description && (
            <p className="text-sm text-gray-600 dark:text-gray-200 mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>
        <span onClick={toggleComplete}>
          {completed === true ? (
            <StarIconSolid color={color} className="w-7" />
          ) : (
            <StarIcon color={color} className="w-7" />
          )}
        </span>
      </div>

      <TaskProgress progress={task.progress} color={color} />

      <div className="flex  justify-between items-center mt-2">
        <DeleteTaskButton taskId={task.id} />
        <DetailsTaskButton taskId={task.id} />
      </div>
    </div>
  );
}

import DeleteTaskButton from "./DeleteTaksButton";
import DetailsTaskButton from "./DetailsTaskButton";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const [completed, setCompleted] = useState(task.completed);
  const color = getColor(task.priority);
  const { updateTask } = useData();

  const toggleComplete = async () => {
    setCompleted(!completed);
    await api.put(`/tasks/${task.id}`, { ...task, completed: !task.completed });
    updateTask(task.id, { completed: !task.completed });
  };

  return (
    <div
      role="listitem"
      aria-label={`Task: ${task.title}`}
      className="rounded-lg px-4 py-3 w-full shadow-sm hover:shadow-md transition-all duration-200 flex justify-between gap-4"
      style={{
        backgroundColor: `${color}60`,
        borderLeft: `4px solid ${color}`,
      }}
    >
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleComplete}
            aria-label={
              completed ? "Marcar como incompleta" : "Marcar como completa"
            }
            className="p-1 rounded-full transition-colors"
          >
            {completed ? (
              <StarIconSolid className="w-5 h-5" />
            ) : (
              <StarIcon className="w-5 h-5" />
            )}
          </button>

          <h3
            className={`text-lg font-semibold truncate ${
              completed
                ? "line-through text-gray-500 "
                : "text-gray-800 dark:text-white"
            }`}
          >
            {task.title}
          </h3>
        </div>
        {task.description && (
          <p className="text-sm text-gray-600 dark:text-gray-200 ml-8 line-clamp-2">
            {task.description}
          </p>
        )}
        <div className="flex flex-wrap gap-3 ml-8 text-xs text-gray-500 dark:text-gray-100">
          {/*           {task.start_date && (
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-3 h-3" />
              <span>Início: {formatDate(task.start_date)}</span>
            </div>
          )} */}
          {task.end_date && (
            <div className="flex items-center gap-1 font-medium">
              <FlagIcon className="w-3 h-3" />
              <span>Prazo: {formatDate(task.end_date)}</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <DeleteTaskButton taskId={task.id} />
        <DetailsTaskButton taskId={task.id} />
      </div>
    </div>
  );
}

function formatDate(dateString: Date): string {
  return new Date(dateString).toLocaleDateString("pt-BR");
}
