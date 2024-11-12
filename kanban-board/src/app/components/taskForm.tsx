"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { addTaskToFirestore, updateTaskContentInFirestore,  } from "@/store/slices/taskSlice";
import { Task } from "../interface/task";

interface TaskFormProps {
    taskId?: string | null;
    closeForm: () => void;
  }
  

const TaskForm: React.FC<TaskFormProps> = ({ taskId, closeForm }) => {
  const dispatch = useDispatch<AppDispatch>();
  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find((t: Task) => t.id === taskId)
  );
  const [content, setContent] = useState<string>("");

    useEffect(() => {
        if (task) {
        setContent(task.content);
        }
    }, [task]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (task) {
        dispatch(updateTaskContentInFirestore({ taskId: task.id, newContent: content }));
        } else {
        dispatch(addTaskToFirestore({ content, status: "To Do" as Task["status"]}));
        }
        closeForm();
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded shadow">
        <input
            type="text"
            placeholder="Task content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full p-2 border rounded mb-4"
        />
        <button type="submit"
         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >{task ? "Update" : "Add"}</button>
        <button type="button" 
            onClick={closeForm}
            className="ml-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
        >
            Cancel
        </button>
        </form>
    );
 };

 export default TaskForm;