import GroupTask from "../components/GroupTask";
import TodayTasks from "../components/TodayTasks";
import type { Task } from "../types/Task";
import profileImage from "../assets/profile.jpg";
import { CarouselTasks } from "../components/CarouselTaks";

export default function Dashboard({ tasks }: { tasks: Task[] }) {
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
        <div>
          <p>Olá,</p>
          <h2 className="text-2xl font-semibold">Jubileu!</h2>
        </div>
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
