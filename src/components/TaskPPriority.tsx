import type { Task } from "../types/Task";
import { getColor } from "../utils/getColor";
import PriorityGroupTask from "./PriorityGroupTask";

export default function TaskPriority({ tasks }: { tasks: Task[] }) {
  const highPriorityTasks = tasks.filter((task) => task.priority === 3);
  const normalPriorityTasks = tasks.filter((task) => task.priority === 2);
  const lowPriorityTasks = tasks.filter((task) => task.priority === 1);

  const priorityGroupTask = [
    {
      name: "Prioridade Alta",
      tasks: highPriorityTasks,
      nTasks: highPriorityTasks.length,
      color: getColor(3),
      percentage: calculateCompletionPercentage(highPriorityTasks),
    },
    {
      name: "Prioridade Normal",
      tasks: normalPriorityTasks,
      nTasks: normalPriorityTasks.length,
      color: getColor(2),
      percentage: calculateCompletionPercentage(normalPriorityTasks),
    },
    {
      name: "Prioridade Baixa",
      tasks: lowPriorityTasks,
      nTasks: lowPriorityTasks.length,
      color: getColor(1),
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
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 text-black">
        {priorityGroupTask.map((priority, index) => (
          <PriorityGroupTask
            name={priority.name}
            nTasks={priority.nTasks}
            color={priority.color}
            percentage={priority.percentage}
            key={index}
            tasks={priority.tasks}
          />
        ))}
      </div>
    </div>
  );
}
