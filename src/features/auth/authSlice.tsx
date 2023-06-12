import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import User, { LoginRegisterUser, updateUserPayload } from "../../models/User";
import authService from "./authService";

const userItem = localStorage.getItem("user");
const user: User | null = userItem ? JSON.parse(userItem) : null;

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: AuthState = {
  user,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
export const register = createAsyncThunk<
  User,
  LoginRegisterUser,
  { rejectValue: string }
>("auth/register", async (user, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error: any) {
    const errorMessage =
      (error.response && error.response && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

// Login user
export const login = createAsyncThunk<
  User,
  LoginRegisterUser,
  { rejectValue: string }
>("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error: any) {
    const errorMessage =
      (error.response && error.response && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

// Logout user
export const logout = createAsyncThunk("auth/logout", () => {
  authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      (state.isLoading = false), (state.message = "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Registration successful";
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "Login successful";
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

// update user info
export const updateUser = createAsyncThunk<
  User,
  updateUserPayload,
  { rejectValue: string }
>("/updateUser", async (payload: updateUserPayload, thunkAPI) => {
  try {
    const { userId, updatedUser } = payload;
    return await authService.updateUser(`/${userId}`, updatedUser);
  } catch (error: any) {
    const errorMessage =
      (error.response && error.response && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
