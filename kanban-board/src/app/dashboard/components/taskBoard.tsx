
"use client"
import React, { useState} from "react";

import { Task } from "../interface/task";
import Column from "./column";


const initialTasks: Task[] = [
    {
      id: "1",
      content: "Task 1",
      status: "To Do",
    },
    {
      id: "2",
      content: "Task 2",
      status: "In Progress",
    },
    {
      id: "3",
      content: "Task 3",
      status: "Done",
    },
];

const TaskBoard: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const updateTaskStatus = (taskId: string, newStatus: Task["status"]) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          )
        );
      };
    return (
      <div className="grid grid-cols-3 gap-4 p-4">
      {["To Do", "In Progress", "Done"].map((status) => (
        <Column
          key={status}
          status={status as Task["status"]}
          tasks={tasks.filter((task) => task.status === status)}
          updateTaskStatus={updateTaskStatus}
        />
      ))}
    </div>
    );
  };
  
  export default TaskBoard;