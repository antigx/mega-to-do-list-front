import { useData } from "../contexts/DataContext";
import type { Task } from "../types/Task";
import { TaskCard } from "./TaskCard";

export default function TaskList({
  filteredTasks,
  viewMode,
  selectedDate,
}: {
  filteredTasks: Task[];
  viewMode?: string;
  selectedDate?: Date;
}) {
  const { loading, error } = useData();

  return (
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
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
            Nenhuma tarefa encontrada
          </h3>
          <p className="text-gray-500 max-w-md">
            {viewMode === "byDate"
              ? selectedDate
                ? `Não há tarefas agendadas para ${selectedDate.toLocaleDateString(
                    "pt-BR",
                    {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    }
                  )}.`
                : "Não há tarefas agendadas para a data selecionada."
              : "Não há tarefas cadastradas nessas condições."}
          </p>
        </div>
      )}
    </section>
  );
}
