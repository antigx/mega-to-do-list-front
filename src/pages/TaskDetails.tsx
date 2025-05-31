import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useData } from "../contexts/DataContext";
import type { Task } from "../types/Task";
import {
  CalendarIcon,
  FlagIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { getColor } from "../utils/getColor";
import api from "../services/api";

export default function TaskDetails() {
  const { id } = useParams<{ id: string }>();
  const { tasks, updateTask } = useData(); // Usando updateTask do contexto
  const [task, setTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const foundTask = tasks.find((t) => t.id === id);
      if (foundTask) {
        setTask(foundTask);
        setEditedTask({ ...foundTask });
      } else {
        fetchTaskFromAPI();
      }
    }
  }, [id, tasks]);

  const fetchTaskFromAPI = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/tasks/${id}`);
      setTask(response.data as Task);
      setEditedTask(response.data as Task);
    } catch (err) {
      setError("Falha ao carregar tarefa");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editedTask || !id) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await api.put(`/tasks/${id}`, editedTask);

      updateTask(id, response.data as Partial<Task>);

      setTask(response.data as Task);

      setIsEditing(false);
    } catch (err) {
      setError("Falha ao salvar tarefa");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiscard = () => {
    if (task) {
      setEditedTask({ ...task });
    }
    setIsEditing(false);
    setError(null);
  };

  const handleChange = (field: keyof Task, value: any) => {
    if (field === "priority") value = Number(value);
    if (editedTask) {
      setEditedTask({
        ...editedTask,
        [field]: value,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <div className="bg-white rounded-xl shadow-sm p-6 max-w-md w-full text-center border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Carregando...
          </h2>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <div className="bg-white rounded-xl shadow-sm p-6 max-w-md w-full text-center border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {error || "Tarefa não encontrada"}
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  const priorityColor = getColor(
    Number(isEditing ? editedTask?.priority : task.priority)
  );

  const getPriorityText = (priority: number) => {
    switch (priority) {
      case 1:
        return "Baixa";
      case 2:
        return "Normal";
      case 3:
        return "Alta";
      default:
        return "Desconhecida";
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] p-4 md:p-6">
      <div
        className="rounded-xl shadow-sm w-full max-w-2xl overflow-hidden 
        transition-all duration-200"
        style={{
          backgroundColor: `${priorityColor}30`,
          border: `1px solid ${priorityColor}40`,
        }}
      >
        <div
          className="relative px-6 py-4 border-b"
          style={{ borderColor: `${priorityColor}20` }}
        >
          <button
            onClick={() => navigate(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 transition-colors duration-200 p-1 rounded-full hover:bg-gray-50"
            aria-label="Voltar"
          >
            <ArrowLeftIcon className="h-5 w-5 dark:text-white" />
          </button>
          {isEditing ? (
            <input
              type="text"
              value={editedTask?.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
              className="text-xl font-bold text-center w-full max-w-[70%] mx-auto bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              style={{ color: priorityColor }}
            />
          ) : (
            <h1
              className="text-xl font-bold text-center text-gray-800 truncate max-w-[70%] mx-auto"
              style={{ color: priorityColor }}
            >
              {task.title}
            </h1>
          )}
        </div>

        <div
          className="p-6 space-y-6"
          style={{ backgroundColor: `${priorityColor}05` }}
        >
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <section>
            <h2 className="text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider mb-2">
              Descrição
            </h2>
            {isEditing ? (
              <textarea
                value={editedTask?.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-full text-gray-700 dark:text-white p-4 rounded-lg border shadow-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                style={{
                  backgroundColor: `${priorityColor}08`,
                  borderColor: `${priorityColor}15`,
                  minHeight: "100px",
                }}
                placeholder="Adicione uma descrição..."
              />
            ) : (
              <div
                className="text-gray-700 dark:text-white p-4 rounded-lg border shadow-xs"
                style={{
                  backgroundColor: `${priorityColor}08`,
                  borderColor: `${priorityColor}15`,
                }}
              >
                {task.description || (
                  <span className="text-gray-500">
                    Nenhuma descrição fornecida
                  </span>
                )}
              </div>
            )}
          </section>

          {/* Grid de Infos */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem
              icon={
                <CalendarIcon
                  className="w-5 h-5"
                  style={{ color: priorityColor }}
                />
              }
              label="Data de Início"
              value={
                isEditing ? (
                  <input
                    type="date"
                    value={
                      editedTask?.start_date.toString().split("T")[0] || ""
                    }
                    onChange={(e) =>
                      handleChange("start_date", new Date(e.target.value))
                    }
                    className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  />
                ) : (
                  new Date(task.start_date).toLocaleDateString("pt-BR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                )
              }
              color={priorityColor}
              isEditing={isEditing}
            />
            <InfoItem
              icon={
                <CalendarIcon
                  className="w-5 h-5"
                  style={{ color: priorityColor }}
                />
              }
              label="Data de Término"
              value={
                isEditing ? (
                  <input
                    type="date"
                    value={editedTask?.end_date?.toString().split("T")[0] || ""}
                    onChange={(e) =>
                      handleChange(
                        "end_date",
                        e.target.value ? new Date(e.target.value) : null
                      )
                    }
                    className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  />
                ) : task.end_date ? (
                  new Date(task.end_date).toLocaleDateString("pt-BR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                ) : (
                  "Não definida"
                )
              }
              color={priorityColor}
              isEditing={isEditing}
            />
            <InfoItem
              icon={
                <FlagIcon
                  className="w-5 h-5"
                  style={{ color: priorityColor }}
                />
              }
              label="Prioridade"
              value={
                isEditing ? (
                  <select
                    value={editedTask?.priority || "2"}
                    onChange={(e) => handleChange("priority", e.target.value)}
                    className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  >
                    <option value={1}>Baixa</option>
                    <option value={2}>Normal</option>
                    <option value={3}>Alta</option>
                  </select>
                ) : (
                  getPriorityText(task.priority ?? 2)
                )
              }
              color={priorityColor}
              isEditing={isEditing}
            />
            <InfoItem
              icon={
                <CheckCircleIcon
                  className="w-5 h-5"
                  style={{ color: task.completed ? "#16a34a" : priorityColor }}
                />
              }
              label="Status"
              value={
                isEditing ? (
                  <select
                    value={editedTask?.completed ? "true" : "false"}
                    onChange={(e) =>
                      handleChange("completed", e.target.value === "true")
                    }
                    className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="false">Pendente</option>
                    <option value="true">Concluída</option>
                  </select>
                ) : task.completed ? (
                  "Concluída"
                ) : (
                  "Pendente"
                )
              }
              color={task.completed ? "text-green-600" : priorityColor}
              isEditing={isEditing}
            />
          </section>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleDiscard}
                  disabled={isLoading}
                  className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
                  style={{
                    borderColor: `${priorityColor}30`,
                    backgroundColor: `${priorityColor}10`,
                  }}
                >
                  Descartar
                </button>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
                  style={{
                    backgroundColor: priorityColor,
                  }}
                >
                  {isLoading ? "Salvando..." : "Salvar"}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 border rounded-lg text-gray-700 dark:text-white hover:bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{
                    borderColor: `${priorityColor}30`,
                    backgroundColor: `${priorityColor}10`,
                  }}
                >
                  Voltar
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{
                    backgroundColor: priorityColor,
                  }}
                >
                  Editar Tarefa
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Subcomponente reutilizável
function InfoItem({
  icon,
  label,
  value,
  color = "#4b5563",
  isEditing = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  color?: string | any;
  isEditing?: boolean;
}) {
  return (
    <div
      className="p-4 rounded-lg border shadow-xs hover:shadow-sm transition-all duration-200"
      style={{
        backgroundColor: `${color}08`,
        borderColor: `${color}20`,
      }}
    >
      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-white mb-1 uppercase tracking-wider">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      <div
        className={`text-sm font-semibold mt-1 ${
          isEditing
            ? ""
            : typeof color === "string" && color.startsWith("text-")
            ? color
            : ""
        }`}
        style={!isEditing && !color.startsWith("text-") ? { color } : {}}
      >
        {value}
      </div>
    </div>
  );
}
