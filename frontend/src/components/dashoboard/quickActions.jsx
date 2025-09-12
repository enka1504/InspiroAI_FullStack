import React from 'react';
import { Plus, Image } from 'lucide-react';

const QuickActions = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-white mb-6">Quick Actions</h2>
      <div className="flex gap-4">
        <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105">
          <Plus className="w-5 h-5" />
          New Document
        </button>
        <button className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 border border-slate-600 hover:border-slate-500">
          <Image className="w-5 h-5" />
          New Image
        </button>
      </div>
    </div>
  );
};

export default QuickActions;