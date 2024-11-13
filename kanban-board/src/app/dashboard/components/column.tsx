import React from "react";

import TaskComponent from "./task";
import { Column } from "../interface/column";

interface ColumnProps extends Column {
    updateTaskStatus: (taskId: string, newStatus: Column["status"]) => void;
    onEditTask: (taskId: string, email: string) => void;
    email: string;
  }

const ColumnComponent: React.FC<ColumnProps> = ({ status, tasks, updateTaskStatus, onEditTask, email }) => {
  return (
    <div className="bg-gray-100 p-4 rounded shadow-md">
      <h2 className="text-lg font-bold">{status}</h2>
      <div className="mt-4 space-y-2">
        {tasks.map((task) => (
          <TaskComponent 
          key={task.id} 
          task={task} 
          updateTaskStatus={updateTaskStatus} 
          onEditTask={() => onEditTask(task.id, email )}/>
        ))}
      </div>
    </div>
  );
};

export default ColumnComponent;