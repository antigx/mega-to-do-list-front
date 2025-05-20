import GroupTask from "../components/GroupTask";
import TodayTasks from "../components/TodayTasks";
import type { Task } from "../types/Task";
import profileImage from "../assets/profile.jpg";
import { CarouselTasks } from "../components/Carousels";
import { ButtonNotification } from "../components/Button";

export default function Dashboard({ tasks }: { tasks: Task[] }) {
  return (
    <>
      <div className="flex justify-between pt-4">
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
        <ButtonNotification />
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
    </>
  );
}
