import { ArrowLeftIcon, BellIcon } from "@heroicons/react/24/solid";
import type { MouseEventHandler } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Button({
  text,
  handleClick = undefined,
}: {
  text: string;
  handleClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  return (
    <button
      type="submit"
      onClick={handleClick}
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
    <button onClick={handleClick} className="flex items-center w-8">
      <ArrowLeftIcon />
    </button>
  );
}

export function ButtonNotification() {
  return (
    <NavLink to="/notificacoes">
      {({ isActive }) => (
        <BellIcon className={`w-8 ${isActive ? "invisible" : ""}`} />
      )}
    </NavLink>
  );
}
