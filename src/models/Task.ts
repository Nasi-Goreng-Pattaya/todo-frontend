export type Task = {
  taskId: string;
  priority: "low" | "medium" | "high";
  hasReminder: boolean;
  reminderDateTime: Date | null;
  createdAt?: Date;
  title: string;
  content: string;
  category: string;
  dueDateTime: Date;
  status: "todo" | "inprogress" | "completed";
  updatedAt?: Date;
  completedDateTime: Date | null;
};

export type TaskJson = {
  _id: string;
  taskId: string | null;
  priority: "low" | "medium" | "high";
  hasReminder: boolean;
  reminderDateTime: string | Date;
  createdAt: string | Date;
  title: string;
  content: string;
  category: string;
  dueDateTime: string | Date;
  status: "todo" | "inprogress" | "completed";
  updatedAt: string | Date;
  completedDateTime: string | Date;
};

export interface updateTaskPayload {
  taskId: string;
  updatedTask: Partial<Task>;
}

type KeyOfType<T, V> = keyof {
  [P in keyof T as T[P] extends V ? P : never]: any;
};

export function toTask(taskJson: TaskJson): Task {
  const newTask = { ...taskJson };
  const dateFields = [
    "dueDateTime",
    "completedDateTime",
    "createdAt",
    "reminderDateTime",
    "updatedAt",
  ] as KeyOfType<Task, Date>[];
  dateFields.forEach((dateField) => {
    if (newTask[dateField] === null || newTask[dateField] === undefined) {
      return;
    }
    newTask[dateField] = new Date(newTask[dateField]);
  });
  newTask.taskId = newTask._id;
  return newTask as Task;
}

export function toTaskArray(tasksJson: TaskJson[]): Task[] {
  const newTasks = tasksJson.map((taskJson) => {
    return toTask(taskJson);
  });
  return newTasks as Task[];
}
