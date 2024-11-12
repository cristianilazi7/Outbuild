
"use client"
import React, { useEffect, useState } from "react";
import Column from "./column";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";


import { Task } from "@/app/interface/task";
import Modal from "@/app/components/modal";
import TaskForm from "@/app/components/taskForm";
import { subscribeToTasks, updateTaskStatusInFirestore } from "@/store/slices/taskSlice";


const TaskBoard: React.FC = () => {
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const dispatch = useDispatch<AppDispatch>();
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

    const handleUpdateTaskStatus = (taskId: string, newStatus: Task["status"]) => {
        dispatch(updateTaskStatusInFirestore({ taskId, newStatus }));
        
    };
    const openEditTaskModal = (taskId: string) => {
        setEditingTaskId(taskId); // Configurar el ID para editar
        setModalOpen(true);
    };

    useEffect(() => {
        dispatch(subscribeToTasks());
    }, [dispatch]);

    
    return (
      <div className="grid grid-cols-3 gap-4 p-4">
      {["To Do", "In Progress", "Done"].map((status) => (
        <Column
          key={status}
          status={status as Task["status"]}
          tasks={tasks.filter((task) => task.status === status)}
          updateTaskStatus={handleUpdateTaskStatus}
          onEditTask={openEditTaskModal}
        />
      ))}
      <div>
        {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <TaskForm taskId={editingTaskId} closeForm={() => setModalOpen(false)} />
        </Modal>
      )}
        </div>
    </div>
    
    );
  };
  
  export default TaskBoard;