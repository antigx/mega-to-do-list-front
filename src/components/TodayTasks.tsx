// TaskProgressCard.jsx
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import { useData } from "../contexts/DataContext";
import { useEffect, useState } from "react";

export default function TodayTasks() {
  const { tasks } = useData();
  const [percentage, setPercentage] = useState<number>(0);
  useEffect(() => {
    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    const total = tasks.filter((i) => {
      const scheduled = new Date(i.end_date);
      return (
        scheduled.getDate() === todayDay &&
        scheduled.getMonth() === todayMonth &&
        scheduled.getFullYear() === todayYear
      );
    });

    const completed = total.filter((i) => i.completed);

    setPercentage((total.length ? completed.length / total.length : 0) * 100);
  }, [tasks]);

  return (
    <div className="bg-gray-secondary text-white p-4 rounded-2xl flex justify-between shadow-md hover:shadow-lg transform-shadow duration-300 my-5 w-full">
      <div className="flex items-center justify-between w-full ">
        <div className="flex flex-col justify-between h-full">
          <div className="text-sm">
            <p className="leading-tight">Suas tarefas do dia</p>
            <p className="leading-tight">estão quase</p>
            <p className="leading-tight">completas!</p>
          </div>
          <Link
            to="/tarefas"
            className="mt-4 bg-gray-200 text-gray-800 text-sm text-center px-4 py-2 rounded-full hover:bg-gray-300 transition"
          >
            Ver Tarefas
          </Link>
        </div>
        <div className="w-20 h-20">
          <CircularProgressbar
            value={percentage}
            text={`${percentage.toFixed(0)}%`}
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
        <EllipsisHorizontalIcon className="bg-gray-400 text-gray-200 mb-2 rounded-lg h-4" />
      </div>
    </div>
  );
}
