import { ChevronDoubleRightIcon, StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import type { Task } from "../types/Task";
import { useState } from "react";
import { useData } from "../contexts/DataContext";
import api from "../services/api";
import { Link } from "react-router-dom";
import { getColor } from "../utils/getColor";
import { CalendarIcon } from "@heroicons/react/24/outline";
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

      <div className="flex justify-between items-center mt-2">
        {task.remaining && (
          <span className="text-xs text-gray-500">{task.remaining}</span>
        )}
        <span className="text-xs text-gray-500 dark:text-white ml-auto h-7 w-7">
          <Link to={`/tarefa/${task.id}`}>
            <ChevronDoubleRightIcon />
          </Link>
        </span>
      </div>
    </div>
  );
}

import { TrashIcon } from "@heroicons/react/24/outline";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const [completed, setCompleted] = useState(task.completed);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const color = getColor(task.priority);
  const { updateTask, deleteTask } = useData();

  const toggleComplete = async () => {
    setCompleted(!completed);
    await api.put(`/tasks/${task.id}`, { ...task, completed: !task.completed });
    updateTask(task.id, { completed: !task.completed });
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/${task.id}`);
      deleteTask(task.id);
    } catch (err) {
      console.error("Erro ao deletar tarefa:", err);
    }
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
            className={`p-1 rounded-full transition-colors ${
              completed
                ? "text-yellow-500"
                : "text-gray-400 hover:text-gray-600"
            }`}
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
          {task.start_date && (
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-3 h-3" />
              <span>Início: {formatDate(task.start_date)}</span>
            </div>
          )}
          {task.end_date && (
            <div className="flex items-center gap-1 font-medium">
              <FlagIcon className="w-3 h-3" />
              <span>Prazo: {formatDate(task.end_date)}</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <div className="flex gap-2 ">
          <Link
            to={`/tarefa/${task.id}`}
            aria-label="Ver detalhes da tarefa"
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
            title="Ver detalhes"
          >
            <ChevronDoubleRightIcon className="w-5 h-5 dark:text-gray-100" />
          </Link>
          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              aria-label="Excluir tarefa"
              className="p-1.5 rounded-full hover:bg-red-100 transition-colors"
              title="Excluir"
            >
              <TrashIcon className="w-5 h-5 text-red-500" />
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-red-50 rounded-lg px-2 py-1">
              <span className="text-xs text-red-600">Excluir?</span>
              <button
                onClick={handleDelete}
                className="text-red-600 text-xs font-medium hover:underline"
                aria-label="Confirmar exclusão"
              >
                Sim
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="text-gray-600 text-xs hover:underline"
                aria-label="Cancelar exclusão"
              >
                Não
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function formatDate(dateString: Date): string {
  return new Date(dateString).toLocaleDateString("pt-BR");
}
