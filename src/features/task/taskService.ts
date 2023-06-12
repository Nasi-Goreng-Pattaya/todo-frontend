import { Tasks, Task } from "../../models/Task";
import axios from "axios";

const taskApi = axios.create({
  baseURL: "http://localhost:5000/api/task",
});

const fetchTasks = async (): Promise<Task[]> => {
  const response = await taskApi.get<Task[]>("/");
  return response.data as Task[];
};

const createTasks = async (taskData: Task): Promise<Task> => {
  // const token = getToken();
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
