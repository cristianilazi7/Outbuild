"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { useRouter } from "next/navigation";

interface NavProps {
    openTaskForm: () => void; // Prop para abrir el modal de nueva tarea
}

const Nav:  React.FC<NavProps> = ({ openTaskForm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Task Board</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden block focus:outline-none"
        >
          ☰
        </button>
        <ul
        className={`${
          isOpen ? "block" : "hidden"
        } sm:flex space-y-4 sm:space-y-0 sm:space-x-6 mt-4 sm:mt-0 text-lg`}
      >
        <li>
          <a href="/dashboard" className="hover:underline">
            Dashboard
          </a>
        </li>
        <li>
          <a href="/profile" className="hover:underline">
            Profile
          </a>
        </li>
        <li>
            <button
              onClick={openTaskForm}
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition"
            >
              + New Task
            </button>
          </li>
        <li>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </li>
      </ul>
      </div>
    </nav>
  );
};

export default Nav;