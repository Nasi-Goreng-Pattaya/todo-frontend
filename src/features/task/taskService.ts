import { Tasks, Task, CreateTask } from "../../models/Task";
import axios from "axios";

const taskApi = axios.create({
  baseURL: "http://localhost:5000/api/task",
});

const fetchTasks = async (): Promise<Tasks[]> => {
  const response = await taskApi.get<Tasks[]>("/");
  return response.data as Tasks[];
};

const createTasks = async (taskData: CreateTask): Promise<CreateTask> => {
  // const token = getToken();
  const response = await taskApi.post<CreateTask>("/", taskData);
  return response.data as CreateTask;
};

const updateTask = async (params: type) => {};

// export function getToken() {
//   const user = localStorage.getItem("user");
//   if (!user) return;
//   const userObj = JSON.parse(user);
//   return userObj.token;
// }

export default {
  createTasks,
  fetchTasks,
};
