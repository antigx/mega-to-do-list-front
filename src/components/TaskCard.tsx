import type { Task } from "../types/Task";

export default function TaskCard({ task }: { task: Task}) {
  return (
    <div style={{ boxShadow: '0 4px 4px -25px rgba(0, 0, 0, 0.25)' }} className="bg-gray-primary rounded-[15px]  p-4 w-full">
      <div className="text-sm text-gray-500">
        {task.date ? new Date(task.date).toLocaleDateString("pt-BR") : "Sem data"}
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
    style={{ width: `${task.progress}%` }}
  />
</div>

<p className="text-xs text-gray-600 text-right mt-1">
  {task.progress}%
</p>

{task.remaining && (
  <div className="text-xs text-white bg-black p-1 rounded-3xl w-30 text-center">
    {task.remaining}
  </div>
)}

    </div>
  );
}
