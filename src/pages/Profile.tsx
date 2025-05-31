import Header from "../components/Header";
import Button from "../components/Button";
import {
  ArrowRightStartOnRectangleIcon,
  MoonIcon,
  PresentationChartBarIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import { type Dispatch, type ElementType, type SetStateAction } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useData } from "../contexts/DataContext";
import { getAvatar } from "../utils/getAvatar";

export default function Profile({
  darkMode,
  setDarkMode,
}: {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const { user } = useData();

  async function handleLogout() {
    try {
    } catch (error) {
      console.error("Erro durante logout:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.clear();
      delete api.defaults.headers.common["Authorization"];
      navigate("/");
      window.location.reload();
    }
  }
  return (
    <section className="flex flex-col justify-center h-full">
      <Header text="Seu Perfil" />
      <div className="flex flex-col  gap-4 items-center py-4 h-full">
        <img
          src={getAvatar(user?.static_num ?? 0)}
          alt="Profile"
          width={150}
          height={150}
          className="rounded-full bg-gray-primary"
        />
        <h1 className="text-3xl font-bold">{user?.name}</h1>
        <Link to="/editar-perfil">
          <Button text="Editar perfil" />
        </Link>
        <div className="flex flex-col gap-5 w-full">
          <ProfileOptionSelect
            icon={PresentationChartBarIcon}
            text={"Resumo rápido"}
            route="/resumo"
          />
          <ProfileOptionSelect
            icon={TrophyIcon}
            text={"Conquistas"}
            route="/conquistas"
          />
          <span className="flex justify-between items-center border w-full h-15 px-4 bg-gray-primary rounded-lg shadow-md dark:bg-gray-800">
            <span className="flex gap-4 items-center">
              <MoonIcon className="w-8 h-8" />
              <p className="text-xl font-bold dark:text-white">Dark Mode</p>
            </span>
            <ToggleSwitch checked={darkMode} onChange={setDarkMode} />
          </span>
        </div>
      </div>
      <span className="w-full flex justify-end py-2 px-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-md font-medium dark:text-white hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          Sair da Conta
          <ArrowRightStartOnRectangleIcon className="w-8 h-8" />
        </button>
      </span>
    </section>
  );
}

interface ProfileOptionSelectProps {
  icon: ElementType;
  text: string;
  route: string;
}

export function ProfileOptionSelect({
  icon: Icon,
  text,
  route,
}: ProfileOptionSelectProps) {
  return (
    <Link to={route}>
      <span className="dark:text-black flex justify-between items-center border w-full h-15 px-4 bg-gray-primary rounded-lg shadow-md">
        <span className="flex gap-4 items-center">
          <Icon className="w-8 h-8" />
          <p className="text-xl font-bold">{text}</p>
        </span>{" "}
        <PlayIcon className="w-5 h-5" />
      </span>
    </Link>
  );
}
interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function ToggleSwitch({ checked, onChange }: ToggleSwitchProps) {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="w-11 h-6 bg-gray-300 rounded-full shadow-inner peer-checked:bg-purple-600 transition-colors" />
        <div className="absolute left-0 top-0 w-6 h-6 bg-white border rounded-full shadow transform transition-transform peer-checked:translate-x-5" />
      </div>
    </label>
  );
}
