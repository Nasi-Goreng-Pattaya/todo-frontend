import axios from "axios";
import User, { LoginRegisterUser } from "../../models/User";

const userApi = axios.create({
  baseURL: "http://localhost:5000/api/user",
});

// Login user
const login = async (userData: LoginRegisterUser): Promise<User> => {
  const response = await userApi.post<User>("/login", userData);
  if (response.data)
    localStorage.setItem("user", JSON.stringify(response.data));
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
};

export default {
  register,
  login,
  logout,
};
