import Header from "../components/Header";
import profileImage from "../assets/profile.jpg";
import Button from "../components/Button";
import {
  MoonIcon,
  PresentationChartBarIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import type { ElementType } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <>
      <Header text="Seu Perfil" />
      <div className="flex flex-col  gap-4 items-center py-4 h-full">
        <img
          src={profileImage}
          alt="Profile"
          width={100}
          height={100}
          className="rounded-full"
        />
        <h1 className="text-3xl font-bold">Jubs</h1>
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
          <span className="flex justify-between items-center border w-full h-15 px-4 bg-gray-primary rounded-lg shadow-md">
            <span className="flex gap-4 items-center">
              <MoonIcon className="w-8 h-8" />
              <p className="text-xl font-bold">Dark Mode</p>
            </span>
            <ToggleSwitch checked={false} onChange={() => {}} />
          </span>
        </div>
      </div>
      <span className="w-full flex justify-end py-2">
        <a href="#">Sair da conta</a>
      </span>{" "}
    </>
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
      <span className="flex justify-between items-center border w-full h-15 px-4 bg-gray-primary rounded-lg shadow-md">
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
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="w-11 h-6 bg-gray-300 rounded-full shadow-inner peer-checked:bg-purple-600 transition-colors" />
        <div className="absolute left-0 top-0 w-6 h-6 bg-white border rounded-full shadow transform transition-transform peer-checked:translate-x-5" />
      </div>
    </label>
  );
}
