import { useState } from "react";
import api from "../services/api";
import { useData } from "../contexts/DataContext";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate, useLocation } from "react-router-dom";

export default function DeleteTaskButton({ taskId }: { taskId: string }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { deleteTask } = useData();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/${taskId}`);
      deleteTask(taskId);

      if (location.pathname.startsWith("/tarefa/")) {
        navigate(-1);
      }
    } catch (err) {
      console.error("Erro ao deletar tarefa:", err);
    }
  };

  return (
    <>
      {!confirmDelete ? (
        <button
          onClick={() => setConfirmDelete(true)}
          aria-label="Excluir tarefa"
          className="p-1.5 rounded-full hover:bg-red-100 hover:text-red-500 transition-colors"
          title="Excluir"
        >
          <TrashIcon className="w-5 h-5 " />
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
    </>
  );
}
