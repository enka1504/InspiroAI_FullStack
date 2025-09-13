import React, { use } from 'react';
import {
  Home,
  PenTool,
  Image,
  MessageCircle,
  CodeIcon,
  Video,
  BookOpen,
  Diamond,
  LogOut,
  BadgeDollarSign

} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom';
import { UserButton} from '@clerk/clerk-react';

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true, navigator: '/dashboard' },
    { icon: PenTool, label: 'Article Generator', active: false, navigator: '/article' },
    { icon: BookOpen, label: 'Blog Generator', active: false, navigator: '/blog' },
    { icon: Image, label: 'Image Generator', active: false, navigator: '/image' },
    { icon: Video, label: 'Video Generator', active: false, navigator: '/video' },
    { icon: CodeIcon, label: 'AI Code Assistant', active: false, navigator: '/code' },
    { icon: BadgeDollarSign, label: 'Pricing', active: false, navigator: '/pricing' },
  ];

  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  }

  return (
    <div className="w-64 bg-slate-950 border-r border-slate-700 p-6">

      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center">
          <Diamond className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Inspiro AI</h1>
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <Link to={item.navigator}>
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-6 py-3 rounded-lg text-left transition-all duration-200 ${item.active
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white mt-1'
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          </Link>
        ))}
      </nav>

      <button

        className="flex items-center gap-3 px-4 py-3  mt-52"
      >
        <UserButton />

      </button>
    </div>
  );
};

export default Sidebar;