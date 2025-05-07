export type TaskPriority = 'baixa' | 'media' | 'alta';

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  date?: Date | null;
  priority?: string | null;
  completed: boolean | null;
  user_id: string;
  created_at: Date | null;
  updated_at: Date | null;
  progress: number;
  status: string;
  remaining: string | null;
}

