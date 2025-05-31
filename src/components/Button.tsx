import { ArrowLeftIcon, BellIcon } from "@heroicons/react/24/solid";
import type { MouseEventHandler } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Button({
  text,
  handleClick = undefined,
  disabled = false,
}: {
  text: string;
  handleClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      onClick={handleClick}
      disabled={disabled}
      className="
                bg-gray-secondary 
                font-family-body 
                text-white 
                text-lg 
                py-2 
                px-6 
                my-4 
                rounded-xl
                shadow-md 
                hover:shadow-lg 
                transition-all 
                duration-200 
                hover:bg-opacity-90 
                w-full 
                max-w-[200px]
                focus:outline-none
                focus:ring-2
                focus:ring-gray-400
                active:scale-[0.98]
                dark:text-black
                dark:bg-white
                font-bold
            "
    >
      {text}
    </button>
  );
}

export function ButtonBack() {
  const navigate = useNavigate();

  const handleClick = () => navigate(-1);
  return (
    <button
      onClick={handleClick}
      className="dark:hover:text-black flex items-center w-8 hover:bg-gray-200 rounded-full p-1 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 active:scale-[0.98] "
    >
      <ArrowLeftIcon />
    </button>
  );
}

export function ButtonNotification() {
  return (
    <NavLink to="/notificacoes">
      {/*       {({ isActive }) => (
        <BellIcon className={`w-8 ${isActive ? "invisible" : ""}`} />
      )} */}
      <BellIcon className="w-8 invisible" />
    </NavLink>
  );
}
