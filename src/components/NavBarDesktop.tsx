import { NavLink } from "react-router-dom";
import { UserIcon as UserIconOutline } from "@heroicons/react/24/outline";
import { UserIcon as UserIconFilled } from "@heroicons/react/24/solid";

export default function NavBarDesktop() {
  return (
    <nav className="hidden sm:flex w-full h-16 bg-[#333333] text-white px-10 items-center justify-between shadow-lg fixed top-0 left-0 z-40">
      {/* Menu à esquerda */}
      <div className="flex gap-10 text-base font-medium">
        <NavItem to="/dash" label="Início" />
        <NavItem to="/tarefas" label="Tarefas" />
        <NavItem to="/add-tarefas" label="Nova Tarefa" />
        <NavItem to="/foco" label="Foco" />
      </div>

      {/* Ícone de perfil à direita */}
      <NavLink to="/perfil">
        {({ isActive }) =>
          isActive ? (
            <UserIconFilled className="w-6 h-6 text-white" />
          ) : (
            <UserIconOutline className="w-6 h-6 text-white opacity-80 hover:opacity-100 transition-opacity" />
          )
        }
      </NavLink>
    </nav>
  );
}

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "text-white underline underline-offset-4"
          : "text-white/80 hover:text-white transition-colors"
      }
    >
      {label}
    </NavLink>
  );
}
