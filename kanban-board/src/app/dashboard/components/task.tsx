"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteTaskFromFirestore } from "@/store/slices/taskSlice";
import { AppDispatch } from "@/store/store";
import { Task } from "@/app/interface/task";


interface TaskProps {
  task: Task;
  updateTaskStatus: (taskId: string, newStatus: "To Do" | "In Progress" | "Done") => void;
  onEditTask: () => void;
}

const TaskComponent: React.FC<TaskProps> = ({ task, updateTaskStatus, onEditTask }) => {
  const dispatch = useDispatch<AppDispatch>();
    
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateTaskStatus(task.id, e.target.value as "To Do" | "In Progress" | "Done");
  };

  const handleDeleteTask = () => {
    dispatch(deleteTaskFromFirestore(task.id));
  };


  return (
    <div className="bg-white p-4 rounded-lg shadow">
    <div className="mb-2">
      <p className="font-semibold text-gray-800 text-left">{task.content}</p>
      {task.lastEditedBy && (
        <div className="mt-2 text-sm text-gray-600">
          {task.editing ? (
            <span className="mt-2 text-sm font-semibold text-red-500">
              Editing by: {task.lastEditedBy}
            </span>
            ) : (
            <span className="mt-2 text-sm text-gray-600">
              Last edited by: {task.lastEditedBy}
            </span>
          )}
        </div>
      )}
    </div>
    <div className="flex items-center space-x-4">
      <select
        value={task.status}
        onChange={handleStatusChange}
        className="flex-grow border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button
        onClick={onEditTask}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 ease-in-out flex-shrink-0"
        style={{ height: '100%' }}
      >
        Edit
      </button>
      <button
        onClick={handleDeleteTask}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 ease-in-out flex-shrink-0"
        style={{ height: '100%' }}
      >
        Delete
      </button>
    </div>
  </div>  
  );
};

export default TaskComponent;