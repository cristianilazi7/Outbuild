"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { useRouter } from "next/navigation";

const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Task Board</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden block focus:outline-none"
        >
          ☰
        </button>
      </div>

      <ul
        className={`${
          isOpen ? "block" : "hidden"
        } sm:flex space-y-4 sm:space-y-0 sm:space-x-6 mt-4 sm:mt-0`}
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
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;