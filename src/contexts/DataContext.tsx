// src/contexts/DataContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type Dispatch,
  type SetStateAction,
} from "react";
import api from "../services/api";
import type { Task } from "../types/Task";
import { useNavigate } from "react-router-dom";
import orderTasks from "../utils/orderTasks";
import { jwtDecode } from "jwt-decode";

// Extend JWT decode types
declare module "jwt-decode" {
  interface JwtPayload {
    name: string;
    email: string;
    // Add other claims you expect
  }
}

type User = {
  name: string;
  email: string;
};

type DataContextType = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  fetchTasks: () => Promise<void>;
  addTask: (task: Task) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  deleteCompletedTasks: () => void;
  handleLogout: () => void;
  fetchUser: () => void;
};

const DataContext = createContext<DataContextType>({
  tasks: [],
  loading: false,
  error: null,
  user: null,
  setUser: () => {},
  fetchTasks: async () => {},
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
  deleteCompletedTasks: () => {},
  handleLogout: () => {},
  fetchUser: () => {},
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Fetch user data from JWT token
  const fetchUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          name: decoded.name,
          email: decoded.email,
        });
      } catch (error) {
        console.error("Error decoding token:", error);
        handleLogout();
      }
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setTasks([]);
    setUser(null);
    navigate("/login");
  };

  // Check for authentication errors
  const checkAuthError = (error: any) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      handleLogout();
      return true;
    }
    return false;
  };

  // Add new task
  const addTask = (task: Task) => {
    const orderedTasks = orderTasks([...tasks, task]);
    setTasks(orderedTasks);
  };

  // Update existing task
  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    const orderedTasks = orderTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
    setTasks(orderedTasks);
  };

  // Delete single task
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Fetch all tasks
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await api.get<Task[]>("/tasks");
      const orderedTasks = orderTasks(response.data);
      setTasks(orderedTasks);
    } catch (err: any) {
      console.error("Error fetching tasks:", err);
      if (!checkAuthError(err)) {
        setError("Failed to load tasks");
      }
    } finally {
      setLoading(false);
    }
  };

  // Delete all completed tasks
  const deleteCompletedTasks = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all completed tasks? This action cannot be undone."
    );
    if (!confirmed) return;

    try {
      await api.delete("/tasks/bulk/completed");
      setTasks((prev) => prev.filter((task) => !task.completed));
    } catch (err: any) {
      console.error("Error deleting completed tasks:", err);
      if (!checkAuthError(err)) {
        setError("Error deleting completed tasks");
      }
    }
  };

  // Set up response interceptor
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

  // Initial data loading
  useEffect(() => {
    fetchUser();
    fetchTasks();
  }, []);

  return (
    <DataContext.Provider
      value={{
        tasks,
        loading,
        error,
        user,
        setUser,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask,
        handleLogout,
        deleteCompletedTasks,
        fetchUser,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
