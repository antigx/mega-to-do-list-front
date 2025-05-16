import { ArrowLeft, Bell } from "lucide-react";
import type { MouseEventHandler } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <button onClick={handleClick} className="flex items-center">
      <ArrowLeft size={35} />
    </button>
  );
}

export function ButtonNotification() {
  return (
    <Link to="/notificacoes" className="text-black ">
      <Bell fill="black" />
    </Link>
  );
}
