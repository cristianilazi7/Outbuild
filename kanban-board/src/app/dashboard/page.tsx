"use client";

import React, { useState } from 'react';
import AuthGuard from '../../utils/guards/authGuard';
import TaskBoard from './components/taskBoard';
import Nav from '../components/nav';
import Modal from '../components/modal';
import TaskForm from '../components/taskForm';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import ConnectedUsersList from './components/connectedUserList';
import Image from "next/image";

const DashboardPage: React.FC = () => {
  const email = useSelector((state: RootState) => state.user.email);
  const [isModalOpen, setModalOpen] = useState(false);
  const openTaskForm = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <AuthGuard>
      <div>
        <Nav email={email ?? ''} openTaskForm={openTaskForm} />
        <ConnectedUsersList />
        <TaskBoard />
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <TaskForm closeForm={closeModal} />
          </Modal>
        )}
      </div>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm text-gray-600">
            <p className="text-center text-gray-600">
               &copy; {new Date().getFullYear()} Cristian Castro Arias. All rights reserved.
            </p>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://github.com/cristianilazi7/Outbuild"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/github.svg"
                alt="GitHub icon"
                width={16}
                height={16}
              />
              View Repository
            </a>
      </footer>
    </AuthGuard>
  );
};

export default DashboardPage;
