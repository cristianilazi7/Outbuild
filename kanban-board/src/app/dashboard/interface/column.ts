import { Task } from "@/app/interface/task";


export interface Column {
  status: "To Do" | "In Progress" | "Done";
  tasks: Task[];
}