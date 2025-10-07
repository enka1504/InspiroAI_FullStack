import React from 'react';
import { HelpCircle, User } from 'lucide-react';
import { UserButton , useUser} from '@clerk/clerk-react';

const Header = () => {

 const {user,isLoaded} = useUser();
 if(!isLoaded){
  return null;
 }
 const username = user.username || user.fullName || user.firstName;
 console.log(username);
 
  return (
    <div className='flex justify-center items-center sticky top-2 z-[9999] mt-2'>
    <header className="bg-slate-900/50 backdrop-blur-md text-white rounded-2xl w-[90%] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-4 bg-green-500 rounded-full"></div>
                <div className="w-2 h-4 bg-green-500 rounded-full"></div>
                <div className="w-2 h-4 bg-green-500 rounded-full"></div>
              </div>
              <a href='/'><span className="text-white text-lg font-semibold">Inspiro AI</span></a>

            </div>

            <nav className="flex space-x-6 ml-28">
              <a href="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Dashboard
              </a>
              <a href="/article" className="text-white px-3 py-2 text-sm font-medium ">
                Article
              </a>
              <a href="/blog" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Blog
              </a>
              <a href="/image" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Image
              </a>
              <a href="/video" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Video
              </a>
              <a href="/resume" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Resume Analyzer
              </a>
             
              <a href="/pricing" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Pricing
              </a>
            </nav>
          </div>


          <div className="flex items-center space-x-4">
            <h1>{user.username || user.fullName || user.firstName}</h1>
            <UserButton/>
          </div>
        </div>
      </div>
    </header>
    </div>
  );
};

export default Header;