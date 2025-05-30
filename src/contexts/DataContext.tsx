// src/contexts/DataContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import type { Task } from "../types/Task";
import { useNavigate } from "react-router-dom";

type DataContextType = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (task: Task) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  deleteCompletedTasks: () => void;
  handleLogout: () => void;
};

const DataContext = createContext<DataContextType>({
  tasks: [],
  loading: false,
  error: null,
  fetchTasks: async () => {},
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
  deleteCompletedTasks: () => {},
  handleLogout: () => {},
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Função para logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setTasks([]);
    navigate("/login");
  };

  // Função para verificar erros de autenticação
  const checkAuthError = (error: any) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      handleLogout();
      return true;
    }
    return false;
  };

  // Função para adicionar uma tarefa
  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  // Função para atualizar uma tarefa
  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };

  // Função para deletar uma tarefa
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const fetchTasks = async () => {
    console.log("Fetching tasks...");
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token, skipping fetch");
        setLoading(false);
        return;
      }

      const response = await api.get<Task[]>("/tasks");
      setTasks(response.data);
    } catch (err: any) {
      console.error("Erro ao buscar tarefas:", err);

      if (!checkAuthError(err)) {
        setError("Failed to load tasks");
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteCompletedTasks = async () => {
    const confirmed = window.confirm(
      "Tem certeza que deseja deletar todas as tarefas concluídas? Essa ação não pode ser desfeita."
    );
    if (!confirmed) return;

    try {
      await api.delete("/tasks/bulk/completed");
      setTasks((prev) => prev.filter((task) => !task.completed));
    } catch (err: any) {
      console.error("Erro ao deletar tarefas concluídas:", err);
      if (!checkAuthError(err)) {
        setError("Erro ao deletar tarefas concluídas");
      }
    }
  };
  // erros de autenticação global
  useEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          handleLogout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <DataContext.Provider
      value={{
        tasks,
        loading,
        error,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask,
        handleLogout,
        deleteCompletedTasks,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
