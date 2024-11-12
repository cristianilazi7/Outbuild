"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteTaskFromFirestore } from "@/store/slices/taskSlice";
import { AppDispatch } from "@/store/store";

interface TaskProps {
  task: { id: string; content: string; status: string };
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
    <div className="bg-white p-4 rounded shadow flex justify-between items-center">
        <div>
        <p className="font-semibold">{task.content}</p>
        <select
            value={task.status}
            onChange={handleStatusChange}
            className="mt-2 w-full border rounded p-1"
        >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
        </select>
        </div>
            <button
            onClick={onEditTask}
            className="ml-4 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
            >
            Edit
            </button>
            <button
            onClick={handleDeleteTask}
            className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
            Delete
        </button>
    </div>
  );
};

export default TaskComponent;