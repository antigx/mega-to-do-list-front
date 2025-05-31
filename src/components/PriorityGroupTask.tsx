import { StarIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import type { Task } from "../types/Task";
import { getColor } from "../utils/getColor";
import { Link } from "react-router-dom";

interface PriorityGroupTask {
  tasks: Task[];
  name: string;
  nTasks: number;
  color: string;
  percentage: number;
  className?: string;
}

export default function GroupTaskCard({
  tasks,
  name,
  nTasks,
  color,
  percentage,
  className = "",
}: PriorityGroupTask) {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  const toggleGroup = (groupName: string) => {
    setExpandedGroup(expandedGroup === groupName ? null : groupName);
  };
  return (
    <div
      className={`${
        expandedGroup ? "rounded-t-lg" : "rounded-lg"
      } overflow-hidden`}
    >
      <div onClick={() => toggleGroup(name)} className="cursor-pointer">
        <div
          className={`flex w-full h-20 items-center justify-between gap-4 bg-gray-primary p-4  shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
        >
          <div className="flex items-center gap-4 min-w-0">
            <div
              className="p-2 rounded-full"
              style={{ backgroundColor: `${color}20` }}
            >
              <StarIcon color={color} className="w-10" />
            </div>
            <div className="min-w-0">
              <h3 className="text-md font-bold truncate">{name}</h3>
              <p className="text-sm text-gray-500">
                {nTasks} {nTasks !== 1 ? "Tarefas" : "Tarefa"}
              </p>
            </div>
          </div>

          <div className="w-15 h-15 flex-shrink-0">
            <CircularProgressbar
              value={percentage}
              text={`${percentage}%`}
              counterClockwise
              styles={buildStyles({
                rotation: 0.2,
                strokeLinecap: "round",
                pathColor: color,
                trailColor: "#e0e0e0",
                textColor: "#333",
                textSize: "24px",
                pathTransitionDuration: 0.5,
              })}
            />
          </div>
        </div>
      </div>

      {expandedGroup === name && (
        <div className="p-3 bg-gray-50 max-h-64 overflow-y-auto rounded-b-lg">
          {tasks.length > 0 ? (
            tasks.map((task, taskIndex) => (
              <TaskSummary key={taskIndex} task={task} />
            ))
          ) : (
            <p className="text-gray-500 text-center py-2">
              Nenhuma tarefa nesta prioridade
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function TaskSummary({ task }: { task: Task }) {
  return (
    <Link to={`/tarefa/${task.id}`}>
      <div
        className="p-2 m-1 bg-white rounded shadow flex justify-between items-center"
        style={{ backgroundColor: `${getColor(task.priority)}20` }}
      >
        <div className="flex flex-col justify-between">
          <span className="font-medium truncate">{task.title}</span>{" "}
          {task.end_date && (
            <div className="text-xs text-gray-500">
              Prazo: {new Date(task.end_date).toLocaleDateString()}
            </div>
          )}
        </div>
        <span
          className={`text-xs px-2 py-1 rounded ${
            task.completed
              ? "bg-green-100 text-green-800 border border-green-800"
              : "bg-yellow-100 text-yellow-800 border border-yellow-800"
          }`}
        >
          {task.completed ? "Concluído" : "Pendente"}
        </span>
      </div>
    </Link>
  );
}
