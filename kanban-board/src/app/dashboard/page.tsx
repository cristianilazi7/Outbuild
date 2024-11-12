"use client";

import React, { useState } from 'react';
import AuthGuard from '../../utils/guards/authGuard';
import TaskBoard from './components/taskBoard';
import Nav from '../components/nav';
import Modal from '../components/modal';
import TaskForm from '../components/taskForm';

const DashboardPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const openTaskForm = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <AuthGuard>
      <div>
        <Nav openTaskForm={openTaskForm} />
        <TaskBoard />
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <TaskForm closeForm={closeModal} />
          </Modal>
        )}
      </div>
    </AuthGuard>
  );
};

export default DashboardPage;
