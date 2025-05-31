import TaskPPriority from "../components/TaskPPriority";
import TodayTasks from "../components/TodayTasks";
import profileImage from "../assets/profile.jpg";
import { CarouselTasks } from "../components/Carousels";
import { ButtonNotification } from "../components/Button";
import { NavLink } from "react-router-dom";
import { useData } from "../contexts/DataContext";
import { useState } from "react";
import AllTasks from "../components/AllTasks";

export default function Dashboard() {
  const { tasks, loading, error } = useData();
  const [searching, setSearching] = useState<boolean>(false);

  return (
    <div className="md:p-4">
      <div className="flex justify-between py-4">
        <NavLink
          to="/perfil"
          className="flex items-center gap-4 hover:opacity-80 transition-opacity"
        >
          <img
            src={profileImage}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div>
            <p className="text-gray-600">Olá,</p>
            <h2 className="text-2xl font-semibold">Jubileu!</h2>
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
