import type { Task } from "../types/Task";
import GroupTaskCard from "./GroupTaskCard";
import { useState } from "react";

export default function TaskPriority({ tasks }: { tasks: Task[] }) {
  // Group tasks by priority
  const highPriorityTasks = tasks.filter((task) => Number(task.priority) === 3);
  const normalPriorityTasks = tasks.filter(
    (task) => Number(task.priority) === 2
  );
  const lowPriorityTasks = tasks.filter((task) => Number(task.priority) === 1);

  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  const toggleGroup = (groupName: string) => {
    setExpandedGroup(expandedGroup === groupName ? null : groupName);
  };

  const groupTasks = [
    {
      name: "Prioridade Alta",
      tasks: highPriorityTasks,
      nTasks: highPriorityTasks.length,
      color: "#FF5733",
      percentage: calculateCompletionPercentage(highPriorityTasks),
    },
    {
      name: "Prioridade Normal",
      tasks: normalPriorityTasks,
      nTasks: normalPriorityTasks.length,
      color: "#28A745",
      percentage: calculateCompletionPercentage(normalPriorityTasks),
    },
    {
      name: "Prioridade Baixa",
      tasks: lowPriorityTasks,
      nTasks: lowPriorityTasks.length,
      color: "#33C1FF",
      percentage: calculateCompletionPercentage(lowPriorityTasks),
    },
  ];

  function calculateCompletionPercentage(taskList: Task[]): number {
    if (taskList.length === 0) return 0;
    const completedCount = taskList.filter((task) => task.completed).length;
    return Math.round((completedCount / taskList.length) * 100);
  }

  return (
    <div className="my-2 mb-20 md:mb-0 w-full">
      <h2 className="text-xl font-semibold py-2">Tarefas por Prioridade</h2>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        {groupTasks.map((group, index) => (
          <div key={index} className="rounded-lg overflow-hidden">
            <div
              onClick={() => toggleGroup(group.name)}
              className="cursor-pointer"
            >
              <GroupTaskCard
                name={group.name}
                nTasks={group.nTasks}
                color={group.color}
                percentage={group.percentage}
              />
            </div>

            {expandedGroup === group.name && (
              <div className="p-3 bg-gray-50 max-h-64 overflow-y-auto">
                {group.tasks.length > 0 ? (
                  group.tasks.map((task, taskIndex) => (
                    <TaskSummary key={taskIndex} task={task} />
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-2">
                    Nenhuma tarefa nesta prioridade
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TaskSummary({ task }: { task: Task }) {
  return (
    <div className="p-2 m-1 bg-white rounded shadow">
      <div className="flex justify-between">
        <span className="font-medium truncate">{task.title}</span>
        <span
          className={`text-xs px-2 py-1 rounded ${
            task.completed
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {task.completed ? "Concluído" : "Pendente"}
        </span>
      </div>
      {task.scheduled_for && (
        <div className="text-xs text-gray-500">
          Prazo: {new Date(task.scheduled_for).toLocaleDateString()}
        </div>
      )}
    </div>
  );
}
