import React from 'react';
import AuthGuard from '../../utils/guards/authGuard';
import TaskBoard from './components/taskBoard';
import Nav from '../components/nav';

const DashboardPage: React.FC = () => {
  return (
    <AuthGuard>
      <div>
        <Nav />
        <TaskBoard />
      </div>
    </AuthGuard>
  );
};

export default DashboardPage;
