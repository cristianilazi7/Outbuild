import { Task } from "./task";

export interface Column {
  status: "To Do" | "In Progress" | "Done";
  tasks: Task[];
}