export type TaskPriority = "baixa" | "media" | "alta";

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  date?: Date | null;
  priority: number;
  user_id: string;
  created_at: Date | null;
  updated_at: Date | null;
  progress: number;
  status: string;
  remaining: string | null;
  start_date: Date;
  end_date: Date;
  completed: boolean;
}

export type TaskFilter = "all" | "pending" | "done";

export type PriorityFilter = 0 | 1 | 2 | 3; // 0 = Todas, 3 = Alta, 2 = Normal, 1 = Baixa
