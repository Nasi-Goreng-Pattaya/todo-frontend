import { Tasks, Task } from "../../models/Task";
import axios from "axios";
import User from "../../models/User";

const userItem = localStorage.getItem("user");
const user: User | null = userItem ? JSON.parse(userItem) : null;

export const taskApi = axios.create({
  baseURL: "http://localhost:5000/api/task",
  headers: { Authorization: `Bearer ${user?.token}` },
});

const fetchTasks = async (): Promise<Tasks[]> => {
  const response = await taskApi.get<Tasks[]>("/");
  return response.data as Tasks[];
};

const createTasks = async (taskData: Task): Promise<Task> => {
  const response = await taskApi.post<Task>("/", taskData);
  return response.data as Task;
};

const updateTask = async (
  taskId: string,
  updatedTask: Partial<Task>
): Promise<Task> => {
  const response = await taskApi.put(`/${taskId}`, updatedTask);
  return response.data as Task;
};

const deleteTask = async (taskId: string): Promise<Task> => {
  const response = await taskApi.delete(`/${taskId}`);
  return response.data as Task;
};

// export function getToken() {
//   const user = localStorage.getItem("user");
//   if (!user) return;
//   const userObj = JSON.parse(user);
//   return userObj.token;
// }

export default {
  createTasks,
  fetchTasks,
  updateTask,
  deleteTask,
};
