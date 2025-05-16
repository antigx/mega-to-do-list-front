import { Star } from "lucide-react";
import type { Task } from "../types/Task";

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
  return (
    <div
      role="listitem"
      aria-label={`Task: ${task.title}`}
      className={`rounded-[15px] p-4 w-full overflow-visible shadow-sm hover:shadow-md transition-shadow duration-200`}
      style={{
        backgroundColor: `${task.color}40`,
      }}
    >
      <div className="text-sm text-gray-600 flex justify-between items-center mb-1">
        <span>{task.group || "No group"}</span>
        <Star
          size={16}
          color={task.color}
          fill={task.status === "done" ? task.color : "transparent"}
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
        {task.title}
      </h3>

      {task.description && (
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {task.description}
        </p>
      )}

      <TaskProgress progress={task.progress} color={task.color} />

      <div className="flex justify-between items-center mt-2">
        {task.remaining && (
          <span className="text-xs text-gray-500">{task.remaining}</span>
        )}
        <span className="text-xs text-gray-500 ml-auto">
          {task.progress}% complete
        </span>
      </div>
    </div>
  );
}

export function TaskCard({ task }: TaskCardProps) {
  const legendaStatus: Record<string, string> = {
    pending: "Pendente",
    done: "Concluído",
    ongoing: "Em processo",
  };
  return (
    <div
      role="listitem"
      aria-label={`Task: ${task.title}`}
      className="bg-gray-primary rounded-[15px] px-4 py-2 w-full overflow-visible shadow-sm hover:shadow-md transition-shadow duration-200 flex justify-between items-center"
    >
      <div className="flex flex-col gap-0">
        <div className="text-sm text-gray-600 flex justify-between items-center">
          <span>{task.group || "No group"}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
        {task.description && (
          <p className="text-sm text-gray-600 ">{task.description}</p>
        )}
      </div>
      <div className="flex flex-col items-center justify-center gap-1 w-20">
        <Star
          size={40}
          color={task.color}
          fill={task.status === "done" ? task.color : "transparent"}
        />
        <div className="bg-gray-400 text-[8px] text-gray-100 px-4 rounded-lg flex items-center justify-center">
          {legendaStatus[task.status]}
        </div>
      </div>
    </div>
  );
}
