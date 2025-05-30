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
import { getColor } from "../components/TaskCard";

export default function TaskDetails() {
  const { id } = useParams<{ id: string }>();
  const { tasks } = useData();
  const [task, setTask] = useState<Task | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const foundTask = tasks.find((t) => t.id === id);
      setTask(foundTask || null);
    }
  }, [id, tasks]);

  if (!task) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <div className="bg-white rounded-xl shadow-sm p-6 max-w-md w-full text-center border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Tarefa não encontrada
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

  const priorityColor = getColor(Number(task.priority));

  const getPriorityText = () => {
    switch (task.priority) {
      case "1":
        return "Baixa";
      case "2":
        return "Normal";
      case "3":
        return "Alta";
      default:
        return "Desconhecida";
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] p-4 md:p-6">
      <div
        className="rounded-xl shadow-sm w-full max-w-2xl overflow-hidden transition-all duration-200"
        style={{
          backgroundColor: `${priorityColor}10`,
          border: `1px solid ${priorityColor}20`,
        }}
      >
        {/* Header */}
        <div
          className="relative px-6 py-4 border-b"
          style={{ borderColor: `${priorityColor}20` }}
        >
          <button
            onClick={() => navigate(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 transition-colors duration-200 p-1 rounded-full hover:bg-gray-50"
            aria-label="Voltar"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h1
            className="text-xl font-bold text-center text-gray-800 truncate max-w-[70%] mx-auto"
            style={{ color: priorityColor }}
          >
            {task.title}
          </h1>
        </div>

        {/* Body */}
        <div
          className="p-6 space-y-6"
          style={{ backgroundColor: `${priorityColor}05` }}
        >
          {/* Descrição */}
          <section>
            <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
              Descrição
            </h2>
            <div
              className="text-gray-700 p-4 rounded-lg border shadow-xs"
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
              value={new Date(task.scheduled_for).toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              color={priorityColor}
            />
            <InfoItem
              icon={
                <CalendarIcon
                  className="w-5 h-5"
                  style={{ color: priorityColor }}
                />
              }
              label="Data de Término"
              value={new Date(task.scheduled_for).toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              color={priorityColor}
            />
            <InfoItem
              icon={
                <FlagIcon
                  className="w-5 h-5"
                  style={{ color: priorityColor }}
                />
              }
              label="Prioridade"
              value={getPriorityText()}
              color={priorityColor}
            />
            <InfoItem
              icon={
                <CheckCircleIcon
                  className="w-5 h-5"
                  style={{ color: task.completed ? "#16a34a" : priorityColor }}
                />
              }
              label="Status"
              value={task.completed ? "Concluída" : "Pendente"}
              color={task.completed ? "text-green-600" : priorityColor}
            />
          </section>

          {/* Ações */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                borderColor: `${priorityColor}30`,
                backgroundColor: `${priorityColor}10`,
              }}
            >
              Voltar
            </button>
            <button
              onClick={() => navigate(`/editar-tarefa/${task.id}`)}
              className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: priorityColor,
              }}
            >
              Editar Tarefa
            </button>
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
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color?: string | any;
}) {
  return (
    <div
      className="p-4 rounded-lg border shadow-xs hover:shadow-sm transition-all duration-200"
      style={{
        backgroundColor: `${color}08`,
        borderColor: `${color}20`,
      }}
    >
      <div className="flex items-center gap-2 text-xs text-gray-600 mb-1 uppercase tracking-wider">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      <p
        className={`text-sm font-semibold mt-1 ${
          typeof color === "string" && color.startsWith("text-") ? color : ""
        }`}
        style={!color.startsWith("text-") ? { color } : {}}
      >
        {value}
      </p>
    </div>
  );
}
