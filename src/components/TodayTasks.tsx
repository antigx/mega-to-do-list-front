// TaskProgressCard.jsx
import { MoreHorizontal } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";

export default function TodayTasks() {
  const percentage = 70;

  return (
    <div className="bg-gray-secondary text-white p-4 rounded-2xl flex justify-between shadow-lg my-5 w-full">
      <div className="flex items-center justify-between w-full ">
        <div className="flex flex-col justify-between h-full">
          <div className="text-sm">
            <p className="leading-tight">Suas tarefas do dia</p>
            <p className="leading-tight">estão quase</p>
            <p className="leading-tight">completas!</p>
          </div>
          <Link
            to="/tarefas"
            className="mt-4 bg-gray-200 text-gray-800 text-sm px-4 py-2 rounded-full hover:bg-gray-300 transition"
          >
            Ver Tarefas
          </Link>
        </div>
        <div className="w-20 h-20">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            counterClockwise={true}
            styles={buildStyles({
              rotation: 0.2,
              textColor: "#fff",
              pathColor: "#ffffff",
              trailColor: "#4b5563", // gray-600
              textSize: "20px",
              strokeLinecap: "round",
            })}
          />
        </div>
      </div>

      <div className="relative flex flex-col ">
        <MoreHorizontal className="bg-gray-400 text-gray-200 mb-2 rounded-lg h-4" />
      </div>
    </div>
  );
}
