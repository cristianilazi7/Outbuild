"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RootState } from "@/store/store";

interface NavProps {
    email: string;
    openTaskForm: () => void; // Prop para abrir el modal de nueva tarea
}

const Nav:  React.FC<NavProps> = ({ email, openTaskForm }) => {
  const isOnline = useSelector((state: RootState) => state.auth.isAuthenticated);
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
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold">Task Board: {email || "Guest"}</h1>
          {isOnline && (
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-sm">Online</span>
            </div>
          )}
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden block focus:outline-none"
        >
          ☰
        </button>
        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } sm:flex items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-4 sm:mt-0 text-lg`}
        >
          <li>
            <Link href="/" className="hover:underline px-4 py-2 block">
              home
            </Link>
          </li>
          <li>
            <button
              onClick={openTaskForm}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 ease-in-out flex-shrink-0"
              style={{ height: "40px" }}
            >
              + New Task
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 ease-in-out flex-shrink-0"
              style={{ height: "40px" }}
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