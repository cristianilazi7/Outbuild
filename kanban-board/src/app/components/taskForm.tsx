"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { addTaskToFirestore, updateTaskContentInFirestore, updateTaskEditingStatus,  } from "@/store/slices/taskSlice";
import { Task } from "../interface/task";

interface TaskFormProps {
    taskId?: string | null;
    closeForm: () => void;
    email?: string;
  }
  

const TaskForm: React.FC<TaskFormProps> = ({ taskId, closeForm, email }) => {
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
        dispatch(updateTaskEditingStatus({taskId: task.id, lastEditedBy: email, editing:false}));
        } else {
        dispatch(addTaskToFirestore({ content, status: "To Do" as Task["status"]}));
        }
        closeForm();
    };

   const handleCancel = () => {
        closeForm();
        if (task)
        dispatch(updateTaskEditingStatus({taskId: task.id, lastEditedBy: '', editing:false}));
   };

    useEffect(() => {
        console.log("closeForm activated");
    }, [closeForm]);

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Task Content</label>
                <input
                type="text"
                placeholder="Enter task content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <div className="flex justify-end space-x-3">
                <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition ease-in-out duration-200"
                >
                {task ? "Update" : "Add"}
                </button>
                <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition ease-in-out duration-200"
                >
                Cancel
                </button>
            </div>
        </form>

    );
 };

 export default TaskForm;