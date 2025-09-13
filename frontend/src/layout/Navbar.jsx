import React from 'react';
import { Menu, X } from 'lucide-react';
import { UserButton, useClerk, useUser } from '@clerk/clerk-react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  useEffect( () => {
    if(user) {
      navigate('/dashboard');
    }
  } , [user, navigate])

  return (
    <div className="flex justify-center items-center sticky top-2 z-[9999] mt-2">
      <header className="bg-slate-900/50 backdrop-blur-md text-white rounded-2xl w-[80%] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-emerald-950 font-bold text-sm p-4">AI</span>
              </div>
              <span className="text-xl font-bold p-2">Inspiro AI</span>
            </div>


            <nav className="hidden md:flex items-center space-x-8">

              {
                user ? <UserButton /> : (
                  <button className="bg-emerald-600 hover:bg-emerald-800 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                    onClick={openSignIn}
                  >
                    Get started
                  </button>
                )
              }

            </nav>


            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>


          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-emerald-800">
              <div className="flex flex-col space-y-4">
                {
                  user ? <UserButton /> : (
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 w-full">
                      Get started
                    </button>
                  )
                }

              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
