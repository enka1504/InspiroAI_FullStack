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
  BookAIcon,
  BadgeDollarSign

} from 'lucide-react';

import { Link } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true, navigator: '/dashboard' },
    { icon: PenTool, label: 'Article Generator', active: false, navigator: '/article' },
    { icon: BookOpen, label: 'Blog Generator', active: false, navigator: '/blog' },
    { icon: Image, label: 'Image Generator', active: false, navigator: '/image' },
    { icon: Video, label: 'Video Generator', active: false, navigator: '/video' },
    { icon: BookAIcon, label: 'Resume Analyzer', active: false, navigator: '/resume' },
    { icon: BadgeDollarSign, label: 'Pricing', active: false, navigator: '/pricing' },
  ];

  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }

  const username = user.username || user.fullName || user.firstName;
  console.log(username);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  }

  return (
    <div className="w-64 bg-slate-950 border-r border-slate-700 p-6">

      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center">
          <Diamond className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white ">Inspiro AI</h1>
        </div>

      </div>
      <div className='flex justify-center '>
        <UserButton />
      </div>
      <div className='mt-2 text-xl font-bold text-green-600 text-center mb-6'>
        <h1>{user.username || user.firstName || user.fullName}</h1>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <Link to={item.navigator}>
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-6 py-3 rounded-lg text-left transition-all duration-200 ${item.active
                ? 'bg-emerald-600 text-white shadow-lg cursor-pointer'
                : 'text-slate-300 hover:bg-slate-700 hover:text-white mt-1 cursor-pointer'
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          </Link>
        ))}
      </nav>

      <div

        className="flex items-center justify-center gap-3 px-4 py-3  mt-32"
      >
        <UserButton />
        <button onClick={handleSignOut}><LogOut className="w-5 h-5 text-green-600 cursor-pointer" /></button>

      </div>
    </div>
  );
};

export default Sidebar;