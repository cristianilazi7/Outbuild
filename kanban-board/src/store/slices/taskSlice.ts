import { Task } from "@/app/interface/task";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  listenToTasksInFirestore,
  addTaskToFirestoreService,
  updateTaskStatusInFirestoreService,
  updateTaskContentInFirestoreService,
  deleteTaskFromFirestoreService,
} from "@/app/services/taskService"; 


interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
  };

  // Thunk para escuchar cambios en Firestore
export const subscribeToTasks = createAsyncThunk(
  "tasks/subscribeToTasks",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      listenToTasksInFirestore((tasks) => {
        
        dispatch(setTasks(tasks)); // Actualiza el estado de Redux cuando cambian las tareas en Firestore
      });
    } catch {
      return rejectWithValue("Failed to subscribe to tasks");
    }
  }
);

// Thunk action to add a task
export const addTaskToFirestore = createAsyncThunk<
  Task, // Return type of the thunk
  Omit<Task, "id">, // Argument type passed to the thunk
  { rejectValue: string } // Rejection value type
>(
  "tasks/addTaskToFirestore",
  async (task, { rejectWithValue }) => {
    try {
      const newTaskFirebase: Task = await addTaskToFirestoreService(task); // Explicitly type newTaskFirebase
      return newTaskFirebase;
    } catch {
      return rejectWithValue("Failed to add task to Firestore");
    }
  }
);

// Thunk action to update a task's status
export const updateTaskStatusInFirestore = createAsyncThunk<
  Task, // Return type of the thunk (updated task)
  { taskId: string; newStatus: Task["status"] }, // Argument type (task ID and new status)
  { rejectValue: string } // Rejection value type
>(
  "tasks/updateTaskStatusInFirestore",
  async ({ taskId, newStatus }, { rejectWithValue }) => {
    try {
      const updatedTask: Task = await updateTaskStatusInFirestoreService(taskId, newStatus);
      return updatedTask;
    } catch {
      return rejectWithValue("Failed to update task status in Firestore");
    }
  }
);

// Thunk action to update a task's content
export const updateTaskContentInFirestore = createAsyncThunk<
  Task, // Return type of the thunk
  { taskId: string; newContent: string }, // Argument type
  { rejectValue: string } // Rejection value type
>(
  "tasks/updateTaskContentInFirestore",
  async ({ taskId, newContent }, { rejectWithValue }) => {
    try {
      const updatedTask = await updateTaskContentInFirestoreService(taskId, newContent);
      return updatedTask;
    } catch {
      return rejectWithValue("Failed to update task content in Firestore");
    }
  }
);

// Thunk action to delete a task
export const deleteTaskFromFirestore = createAsyncThunk<
  string, // Return type (task ID)
  string, // Argument type (task ID)
  { rejectValue: string } // Rejection value type
>(
  "tasks/deleteTaskFromFirestore",
  async (taskId, { rejectWithValue }) => {
    try {
      await deleteTaskFromFirestoreService(taskId);
      return taskId; // Return the task ID for local state update
    } catch {
      return rejectWithValue("Failed to delete task from Firestore");
    }
  }
);


const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        setTasks(state, action: PayloadAction<Task[]>) {
          state.tasks = action.payload;
        }
    },
    extraReducers: (builder) => {
      builder
        .addCase(addTaskToFirestore.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addTaskToFirestore.rejected, (state, action) => {
          state.error = action.payload as string;
          state.loading = false;
        })
        .addCase(updateTaskStatusInFirestore.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateTaskStatusInFirestore.rejected, (state, action) => {
          state.error = action.payload as string;
          state.loading = false;
        })
        .addCase(updateTaskContentInFirestore.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateTaskContentInFirestore.rejected, (state, action) => {
          state.error = action.payload as string;
          state.loading = false;
        })
        .addCase(deleteTaskFromFirestore.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteTaskFromFirestore.rejected, (state, action) => {
          state.error = action.payload as string;
          state.loading = false;
        });
  
    },
  });

export const { 
              setTasks,
               } = taskSlice.actions;
export default taskSlice.reducer;

