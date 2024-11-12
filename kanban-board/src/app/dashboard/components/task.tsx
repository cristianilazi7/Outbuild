import React from "react";

interface TaskProps {
  task: { id: string; content: string; status: string };
  updateTaskStatus: (taskId: string, newStatus: "To Do" | "In Progress" | "Done") => void;
}

const TaskComponent: React.FC<TaskProps> = ({ task, updateTaskStatus }) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateTaskStatus(task.id, e.target.value as "To Do" | "In Progress" | "Done");
  };

  return (
    <div className="bg-white p-2 rounded shadow">
      <p>{task.content}</p>
      <select
        value={task.status}
        onChange={handleStatusChange}
        className="mt-2 w-full border rounded"
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    </div>
  );
};

export default TaskComponent;