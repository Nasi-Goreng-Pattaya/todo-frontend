import axios from "axios";
import User, { LoginRegisterUser } from "../../models/User";
import { taskApi } from "../task/taskService";

const userApi = axios.create({
  baseURL: "http://localhost:5000/api/user",
});

// Login user
const login = async (userData: LoginRegisterUser): Promise<User> => {
  const response = await userApi.post<User>("/login", userData);
  if (response.data) {
    const user = response.data;
    localStorage.setItem("user", JSON.stringify(user));
    const { token } = user;
    taskApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return response.data as User;
};

// Register user
const register = async (userData: LoginRegisterUser): Promise<User> => {
  const response = await userApi.post<User>("/register", userData);
  return response.data as User;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
  taskApi.defaults.headers.common["Authorization"] = null;
};

// update user info
const updateUser = async (
  userId: string,
  updatedUser: Partial<User>
): Promise<User> => {
  const response = await userApi.patch(`/${userId}`, updatedUser);
  const responseData = JSON.stringify(response.data);
  const responseJSON = JSON.parse(responseData);
  localStorage.setItem("user", JSON.stringify(response.data));
  return responseJSON as User;
};

export default {
  register,
  login,
  logout,
  updateUser,
};
