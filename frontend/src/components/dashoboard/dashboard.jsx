import React from 'react';
import StatsOverview from './stats.jsx';
import QuickActions from './quickActions.jsx';
import RecentContent from './recentContent.jsx';

const Dashboard = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <h2 className="text-2xl font-semibold text-slate-300 mb-8">Overview</h2>
      </div>

      <StatsOverview />
      <QuickActions />
      <RecentContent />
    </div>
  );
};

export default Dashboard;