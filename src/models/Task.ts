type Task = {
  priority: 1 | 2 | 3;
  hasReminder: 0 | 1;
  reminderDateTime: Date | null;
  createdDateTime: Date;
  title: string;
  progress: number;
  content: string;
  category: string;
  dueDateTime: Date;
  isCompleted: 0 | 1;
  completedDateTime: Date | null;
};
