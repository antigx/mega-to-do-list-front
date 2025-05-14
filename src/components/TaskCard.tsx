import { Star } from "lucide-react";
import type { Task } from "../types/Task";

export default function TaskCard({ task }: { task: Task }) {
    return (
        <div
            style={{
                boxShadow: "0 4px 4px -25px rgba(0, 0, 0, 0.25)",
                backgroundColor: task.color + "40",
            }}
            className="rounded-[15px] p-4 w-full"
        >
            <div className="text-sm text-gray-500 flex justify-between">
                <p>{task.group ? task.group : "Sem grupo"}</p>
                <Star color={task.color} />
            </div>
            <div className="text-lg font-semibold">{task.title}</div>
            {task.description && (
                <div className="text-sm text-gray-600">{task.description}</div>
            )}

            <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                <div
                    className={`h-2 rounded-full ${
                        task.status === "done" ? "bg-green-500" : "bg-red-500"
                    }`}
                    style={{
                        width: `${task.progress}%`,
                        backgroundColor: task.color,
                    }}
                />
            </div>
            <div className="flex justify-between">
                {task.remaining && (
                    <p className="text-xs rounded-3xl w-25 text-left">
                        {task.remaining}
                    </p>
                )}
                <p className="text-xs text-gray-600 text-right mt-1">
                    {task.progress}%
                </p>
            </div>
        </div>
    );
}
