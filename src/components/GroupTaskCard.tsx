import { Star } from "lucide-react";
import { CircularProgressbar } from "react-circular-progressbar";
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
    <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-md max-h-20 ">
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
        {" "}
        {/* Fixed size container for progress bar */}
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={{
            path: {
              stroke: color,
            },
            text: {
              fill: "#333",
              fontSize: "24px",
              fontWeight: "bold",
            },
            trail: {
              stroke: "#e0e0e0",
            },
          }}
        />
      </div>{" "}
    </div>
  );
}
