import { Tasks, Task, CreateTask } from "../../models/Task";
import axios from "axios";
import { JWT_TOKEN_SECRET } from "../../../../todo-backend/src/utils/constants";

const taskApi = axios.create({
  baseURL: "http://localhost:5000/api/task",
});

const fetchTasks = async (): Promise<Tasks[]> => {
  const response = await taskApi.get<Tasks[]>("/");
  return response.data;
};

const createTasks = async (taskData: CreateTask): Promise<CreateTask> => {
  // const token = getToken();
  const response = await taskApi.post<CreateTask>("/", taskData);
  return response.data as CreateTask;
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
};
