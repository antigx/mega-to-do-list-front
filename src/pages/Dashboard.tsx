import GroupTask from "../components/GroupTask";
import TodayTasks from "../components/TodayTasks";
import type { Task } from "../types/Task";
import profileImage from "../assets/profile.jpg";
import CarouselTasks from "../components/CarouselTaks";

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
    status: "pending",
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
    color: "#ffff00",
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
    color: "#00ffff",
    group: "Grupo",
  },
];

export default function Dashboard() {
  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <div className="flex items-center gap-4">
        <img
          src={profileImage}
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full"
        />
        <h2 className="text-xl font-semibold">Olá, Jubileu!</h2>
      </div>
      <TodayTasks />
      {/*             <div className="mt-4">
                <input
                    type="text"
                    placeholder="Pesquisar"
                    className="w-full max-w-sm px-4 py-2 border rounded"
                />
            </div> */}
      <CarouselTasks tasks={tasks} />
      <GroupTask />
    </main>
  );
}
