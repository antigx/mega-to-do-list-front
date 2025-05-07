import Navbar from "./components/Navbar";
import TaskCard from "./components/TaskCard";
import TodayTasks from "./components/TodayTasks";
import type { Task } from "./types/Task";


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
    remaining: "2 dias restante",
    progress: 10,
    status: "pending",
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
    remaining: "2 dias restante",
    progress: 50,
    status: "pending",
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
    remaining: "2 dias restante",
    progress: 50,
    status: "pending",
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
    remaining: "2 dias restante",
    progress: 50,
    status: "pending",
  },
];




export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Navbar />

      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex items-center gap-4">
{/*           <Image
            src="/profile.jpg"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          /> */}
          <h2 className="text-xl font-semibold">Olá, Jubileu!</h2>
        </div>

        <TodayTasks />

        <div className="mt-4">
          <input
            type="text"
            placeholder="Pesquisar"
            className="w-full max-w-sm px-4 py-2 border rounded"
          />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-14 sm:mb-0">
          {tasks.map((task: Task, i: number) => (
            <TaskCard key={i} task={task} />
          ))}
        </div>
      </main>
    </div>
  );
}
