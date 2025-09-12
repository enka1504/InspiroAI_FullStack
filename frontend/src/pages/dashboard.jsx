import React from 'react'
import Dashboard from '../components/dashoboard/dashboard.jsx'
import Sidebar from '../components/dashoboard/sidebar.jsx'

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
    
      <aside className="w-64 h-screen fixed left-0 top-0 bg-slate-900">
        <Sidebar />
      </aside>

      
      <main className="flex-1 ml-64 h-screen overflow-y-auto p-4">
        <Dashboard />
      </main>
    </div>
  )
}

export default DashboardPage
