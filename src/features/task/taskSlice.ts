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

export const fetchTaskById = createAsyncThunk<
  Task,
  string,
  { rejectValue: string }
>("/", async (payload, thunkAPI) => {
  try {
    const id = payload;
    return await taskService.fetchTaskById(id);
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
    const { _id, updatedTask } = payload;
    return await taskService.updateTask(`${_id}`, updatedTask);
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
  string,
  { rejectValue: string }
>("/deleteTask", async (payload, thunkAPI) => {
  try {
    const taskId = payload;
    return await taskService.deleteTask(`${taskId}`);
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
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTasks.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Task fetched successfully!";
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload as string;
      })
      .addCase(fetchTaskById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTaskById.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Task fetched by ID is successful!";
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload as string;
      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Task created successfully!";
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Task updated successfully!";
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload as string;
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Task deleted successfully!";
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload as string;
      });
  },
});

export default taskSlice.reducer;
