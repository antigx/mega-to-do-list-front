import { NavLink } from "react-router-dom";
import {
  ClockIcon as ClockIconSolid,
  HomeIcon as HomeIconSolid,
  CalendarIcon as CalendarIconSolid,
  UserIcon as UserIconSolid,
} from "@heroicons/react/24/solid";
import {
  ClockIcon,
  HomeIcon,
  CalendarIcon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  return (
    <aside
      className="text-white bg-[#333333] 
      rounded-t-3xl sm:rounded-none sm:rounded-r-3xl
      w-full sm:w-20 h-16 sm:h-full shadow-lg
      flex sm:flex-col justify-evenly items-center
      fixed bottom-0 left-0 sm:relative
      px-4 sm:px-0 sm:py-6 sm:gap-15 z-40"
    >
      {/* Ícones regulares */}
      <NavLink to="/dash">
        {({ isActive }) => (
          <IconNavbar>
            {isActive ? (
              <HomeIconSolid className="opacity-100" />
            ) : (
              <HomeIcon className="opacity-80 hover:opacity-100 transition-opacity min-w-10" />
            )}
          </IconNavbar>
        )}
      </NavLink>
      <NavLink to="/tarefas">
        {({ isActive }) => (
          <IconNavbar>
            {isActive ? (
              <CalendarIconSolid className="opacity-100" />
            ) : (
              <CalendarIcon className="opacity-80 hover:opacity-100 transition-opacity min-w-10" />
            )}
          </IconNavbar>
        )}
      </NavLink>
      {/* Botão central destacado */}
      <NavLink to="/add-tarefas">
        {({ isActive }) => (
          <div
            className={`p-2 w-20 h-20 rounded-full relative -top-6 sm:top-0 sm:-right-4 flex items-center justify-center ${
              isActive
                ? "border border-gray-secondary bg-white text-gray-secondary"
                : "border border-white bg-gray-secondary text-white"
            }`}
          >
            <IconNavbar>
              <PlusIcon />
            </IconNavbar>
          </div>
        )}
      </NavLink>
      <NavLink to="/foco">
        {({ isActive }) => (
          <IconNavbar>
            {isActive ? (
              <ClockIconSolid className="opacity-100" />
            ) : (
              <ClockIcon className="opacity-80 hover:opacity-100 transition-opacity min-w-10" />
            )}
          </IconNavbar>
        )}
      </NavLink>
      <NavLink to="/perfil">
        {({ isActive }) => (
          <IconNavbar>
            {isActive ? (
              <UserIconSolid className="opacity-100" />
            ) : (
              <UserIcon className="opacity-80 hover:opacity-100 transition-opacity min-w-10" />
            )}
          </IconNavbar>
        )}
      </NavLink>{" "}
    </aside>
  );
}

function IconNavbar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center w-10 h-10 ">
      {children}
    </div>
  );
}
