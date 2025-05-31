import TaskPPriority from "../components/TaskPPriority";
import TodayTasks from "../components/TodayTasks";
import { CarouselTasks } from "../components/Carousels";
import { ButtonNotification } from "../components/Button";
import { NavLink } from "react-router-dom";
import { useData } from "../contexts/DataContext";
import { useState } from "react";
import AllTasks from "../components/AllTasks";
import { getAvatar } from "../utils/getAvatar";

export default function Dashboard() {
  const { tasks, loading, error } = useData();
  const [searching, setSearching] = useState<boolean>(false);
  const { user } = useData();

  return (
    <div className="md:p-4 ">
      <div className="flex justify-between py-4">
        <NavLink
          to="/perfil"
          className="flex items-center gap-4 hover:opacity-80 transition-opacity"
        >
          <img
            src={getAvatar(user?.static_num ?? 0)}
            alt="Profile"
            width={60}
            height={60}
            className="rounded-full object-cover bg-gray-primary"
          />
          <div>
            <p className="text-gray-600 dark:text-white">Olá,</p>
            <h2 className="text-2xl font-semibold">{user?.name}!</h2>
          </div>
        </NavLink>
        <ButtonNotification />
      </div>
      <AllTasks searching={searching} setSearching={setSearching} />
      {searching ? (
        ""
      ) : loading ? (
        <div className="mt-4 text-center">Loading tasks...</div>
      ) : error ? (
        <div className="mt-4 text-red-500">{error}</div>
      ) : !tasks ? (
        <></>
      ) : (
        <>
          <TodayTasks />
          <CarouselTasks />
          <TaskPPriority tasks={tasks} />
        </>
      )}
    </div>
  );
}
