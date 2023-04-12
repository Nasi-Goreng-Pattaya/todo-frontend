type Task = {
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
