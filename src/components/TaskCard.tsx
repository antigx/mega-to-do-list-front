import { ChevronDoubleRightIcon, StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import type { Task } from "../types/Task";
import { useState } from "react";
import { useData } from "../contexts/DataContext";
import api from "../services/api";
import { Link } from "react-router-dom";

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
  const color = getColor(Number(task.priority));
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
      className={`rounded-[15px] p-4 w-full overflow-visible shadow-sm hover:shadow-md transition-shadow duration-200`}
      style={{
        backgroundColor: `${color}50`,
      }}
    >
      <div className="flex gap-5 items-start justify-between">
        <div>
          {/*           <div className="text-sm text-gray-600 flex justify-between items-center mb-1">
            {task.group || "No group"}
          </div> */}

          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {task.title}
          </h3>

          {task.description && (
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
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

      <div className="flex justify-between items-center mt-2">
        {task.remaining && (
          <span className="text-xs text-gray-500">{task.remaining}</span>
        )}
        <span className="text-xs text-gray-500 ml-auto h-7 w-7">
          <Link to={`/tarefa/${task.id}`}>
            <ChevronDoubleRightIcon />
          </Link>
        </span>
      </div>
    </div>
  );
}

export function TaskCard({ task }: TaskCardProps) {
  const legendaStatus: Record<string, string> = {
    pending: "Pendente",
    done: "Concluído",
  };
  const [completed, setCompleted] = useState(task.completed);
  const color = getColor(Number(task.priority));
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
      className="bg-gray-primary rounded-[15px] px-4 py-2 w-full overflow-visible shadow-sm hover:shadow-md transition-shadow duration-200 flex justify-between items-center"
      style={{
        backgroundColor: `${color}99`,
      }}
    >
      <div className="flex flex-col gap-0">
        {/*         <div className="text-sm text-gray-600 flex justify-between items-center">
          <span>{task.group || "No group"}</span>
        </div> */}
        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
        {task.description && (
          <p className="text-sm text-gray-600 ">{task.description}</p>
        )}
      </div>
      <div
        className="flex flex-col items-center justify-center gap-1 w-20"
        onClick={toggleComplete}
      >
        <span onClick={toggleComplete}>
          {completed === true ? (
            <StarIconSolid color={color} className="w-10" />
          ) : (
            <StarIcon color={color} className="w-10" />
          )}
        </span>
        <div className="w-full bg-gray-400 text-[8px] text-gray-100 rounded-lg flex items-center justify-center">
          {legendaStatus[task.status]}
        </div>
      </div>
    </div>
  );
}

export const getColor = (priority: number): string => {
  switch (priority) {
    case 1:
      return "#33C1FF";
    case 2:
      return "#28A745";
    case 3:
      return "#FF5733";
    default:
      return "#28A745";
  }
};
