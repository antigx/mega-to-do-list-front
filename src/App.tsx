import { Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import type { ReactNode } from "react";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Tasks from "./pages/Tasks";
import type { Task } from "./types/Task";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import AddTask from "./pages/AddTask";
import Cronometer from "./pages/Cronometer";

const tasks: Task[] = [
  {
    id: "1",
    title: "Levar lixo para fora",
    description: "Descrição",
    date: new Date("2025-05-01"),
    priority: null,
    completed: true,
    user_id: "user_001",
    created_at: new Date("2025-04-30"),
    updated_at: new Date("2025-05-01"),
    remaining: "1 dia restante",
    progress: 70,
    status: "done",
    color: "#ff0000",
    group: "Grupo",
  },
  {
    id: "2",
    title: "Terminar PS Mega Jr.",
    description: "Descrição",
    date: new Date("2025-05-30"),
    priority: null,
    completed: false,
    user_id: "user_001",
    created_at: new Date("2025-04-30"),
    updated_at: new Date("2025-05-06"),
    remaining: "2 dias restantes",
    progress: 10,
    status: "ongoing",
    color: "#00ff00",
    group: "Grupo",
  },
  {
    id: "3",
    title: "Reunião Grupo 6",
    description: "Descrição",
    date: new Date("2025-05-03"),
    priority: null,
    completed: false,
    user_id: "user_001",
    created_at: new Date("2025-04-30"),
    updated_at: new Date("2025-05-06"),
    remaining: "2 dias restantes",
    progress: 50,
    status: "pending",
    color: "#0000ff",
    group: "Grupo",
  },
  {
    id: "4",
    title: "Reunião Grupo 6",
    description: "Descrição",
    date: new Date("2025-05-03"),
    priority: null,
    completed: false,
    user_id: "user_001",
    created_at: new Date("2025-04-30"),
    updated_at: new Date("2025-05-06"),
    remaining: "2 dias restantes",
    progress: 50,
    status: "pending",
    color: "#ffff00",
    group: "Grupo",
  },
  {
    id: "5",
    title: "Reunião Grupo 6",
    description: "Descrição",
    date: new Date("2025-05-03"),
    priority: null,
    completed: false,
    user_id: "user_001",
    created_at: new Date("2025-04-30"),
    updated_at: new Date("2025-05-06"),
    remaining: "2 dias restantes",
    progress: 50,
    status: "pending",
    color: "#00ffff",
    group: "Grupo",
  },
];
// Layout with Navbar
const LayoutWithNavbar = ({ children }: { children: ReactNode }) => (
  <>
    <Navbar />

    <div className="flex-1 p-6 overflow-y-auto">{children}</div>
  </>
);

// Layout without Navbar (plain)
const LayoutWithoutNavbar = ({ children }: { children: ReactNode }) => (
  <>{children}</>
);
function App() {
  return (
    <main className="h-screen flex justify-center bg-gray-100">
      <Routes>
        {/* Routes WITHOUT Navbar */}
        <Route
          element={
            <LayoutWithoutNavbar>
              <Outlet />
            </LayoutWithoutNavbar>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          /*
          <Route path="/cadastro" element={<SignUp />} /> */
        </Route>

        {/* Routes WITH Navbar */}
        <Route
          element={
            <LayoutWithNavbar>
              <Outlet />
            </LayoutWithNavbar>
          }
        >
          <Route path="/dash" element={<Dashboard tasks={tasks} />} />
          <Route path="/tarefas" element={<Tasks tasks={tasks} />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/notificacoes" element={<Notifications />} />
          <Route path="/add-tarefas" element={<AddTask />} />
          <Route path="/foco" element={<Cronometer />} />
        </Route>

        {/* 404 Page (No Navbar) */}
        <Route
          path="*"
          element={
            <LayoutWithoutNavbar>
              <NotFound />
            </LayoutWithoutNavbar>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
