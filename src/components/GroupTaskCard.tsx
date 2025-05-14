import { Star } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function GroupTaskCard({
  name,
  nTasks,
  color,
  percentage,
}: {
  name: string;
  nTasks: number;
  color: string;
  percentage: number;
}) {
  return (
    <div className="flex w-full grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] items-center justify-between gap-4 bg-gray-primary p-4 rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.2)] max-h-20 ">
      <div className="flex items-center gap-4">
        <Star color={color} size={40} />
        <span>
          <h3 className="text-md font-bold">{name}</h3>
          <p className="text-sm text-gray-500">
            {nTasks} {nTasks > 1 ? "Tarefas" : "Tarefa"}
          </p>
        </span>
      </div>
      <div className="w-16 h-16">
        {/* Fixed size container for progress bar */}
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          counterClockwise={true}
          styles={buildStyles({
            rotation: 0.2,
            strokeLinecap: "round",
            pathColor: color,
            trailColor: "#e0e0e0",
            textColor: "#333",
            textSize: "24px",
          })}
        />
      </div>
    </div>
  );
}
