import { StarIcon } from "@heroicons/react/24/outline";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface GroupTaskCardProps {
  name: string;
  nTasks: number;
  color: string;
  percentage: number;
  className?: string;
}

export default function GroupTaskCard({
  name,
  nTasks,
  color,
  percentage,
  className = "",
}: GroupTaskCardProps) {
  return (
    <div
      className={`flex w-full h-20 items-center justify-between gap-4 bg-gray-primary p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      <div className="flex items-center gap-4 min-w-0">
        <div
          className="p-2 rounded-full"
          style={{ backgroundColor: `${color}20` }}
        >
          <StarIcon color={color} className="w-10" />
        </div>
        <div className="min-w-0">
          <h3 className="text-md font-bold truncate">{name}</h3>
          <p className="text-sm text-gray-500">
            {nTasks} {nTasks !== 1 ? "Tarefas" : "Tarefa"}
          </p>
        </div>
      </div>

      <div className="w-15 h-15 flex-shrink-0">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          counterClockwise
          styles={buildStyles({
            rotation: 0.2,
            strokeLinecap: "round",
            pathColor: color,
            trailColor: "#e0e0e0",
            textColor: "#333",
            textSize: "24px",
            pathTransitionDuration: 0.5,
          })}
        />
      </div>
    </div>
  );
}
