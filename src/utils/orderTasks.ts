import type { Task } from "../types/Task";

export default function orderTasks(tasks: Task[]) {
  return tasks.slice().sort((a, b) => {
    // 1. Concluídas sempre por último
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;

    // 2. Ordenar por data mais próxima (sem data vai pro final)
    const dateA = a.end_date ? new Date(a.end_date).getTime() : Infinity;
    const dateB = b.end_date ? new Date(b.end_date).getTime() : Infinity;
    if (dateA !== dateB) return dateA - dateB;

    // 3. Se a data for igual, ordenar por prioridade decrescente
    return b.priority - a.priority;
  });
}
