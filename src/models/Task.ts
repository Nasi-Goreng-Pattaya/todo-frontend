export type Task = {
  taskId: string;
  priority: "low" | "medium" | "high";
  hasReminder: boolean;
  reminderDateTime: Date | null;
  createdDateTime: Date;
  title: string;
  progress: number;
  content: string;
  category: string;
  dueDateTime: Date;
  isCompleted: boolean;
  completedDateTime: Date | null;
};

export interface updateTaskPayload {
  taskId: string;
  updatedTask: Partial<Task>;
}
