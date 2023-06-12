import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Task, updateTaskPayload } from "../../models/Task";
import taskService from "./taskService";
import User from "../../models/User";

const userItem = localStorage.getItem("user");
const user: User | null = userItem ? JSON.parse(userItem) : null;

export interface TaskState {
  task: Task | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: TaskState = {
  task: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const createTask = createAsyncThunk<Task, Task, { rejectValue: string }>(
  "/",
  async (task, thunkAPI) => {
    try {
      return await taskService.createTasks(task);
    } catch (error: any) {
      const errorMessage =
        (error.response && error.response && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const fetchTasks = createAsyncThunk<
  Task[],
  void,
  { rejectValue: string }
>("/", async (_, thunkAPI) => {
  try {
    return await taskService.fetchTasks();
  } catch (error: any) {
    const errorMessage =
      (error.response && error.response && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const updateTask = createAsyncThunk<
  Task,
  updateTaskPayload,
  { rejectValue: string }
>("/updateTask", async (payload: updateTaskPayload, thunkAPI) => {
  try {
    const { taskId, updatedTask } = payload;
    return await taskService.updateTask(`/${taskId}`, updatedTask);
  } catch (error: any) {
    const errorMessage =
      (error.response && error.response && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const deleteTask = createAsyncThunk<
  Task,
  updateTaskPayload,
  { rejectValue: string }
>("/deleteTask", async (payload: updateTaskPayload, thunkAPI) => {
  try {
    const { taskId, updatedTask } = payload;
    return await taskService.deleteTask(`/${taskId}`);
  } catch (error: any) {
    const errorMessage =
      (error.response && error.response && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const taskSlice = createSlice({
  name: "task",
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
      //   .addCase(register.pending, (state) => {
      //     state.isLoading = true;
      //   })
      .addCase(updateTask.fulfilled, (state, action) => { });
    //   .addCase(register.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.isError = true;
    //     state.message = action.payload as string;
    //   })
    //   .addCase(login.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(login.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.isSuccess = true;
    //     state.user = action.payload;
    //     state.message = "Login successful";
    //   })
    //   .addCase(login.rejected, (state, action) => {
    //     state.isError = true;
    //     state.isLoading = false;
    //     state.message = action.payload as string;
    //   })
    //   .addCase(logout.fulfilled, (state) => {
    //     state.user = null;
    //   });
  },
});

export default taskSlice.reducer;
