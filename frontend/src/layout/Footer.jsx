import React from 'react';
import { Github, Linkedin , Instagram  , Twitter} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
         
          <div className="flex flex-wrap justify-center md:justify-start items-center space-x-8 text-sm">
            <a href="#" className="text-emerald-200 hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-emerald-200 hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-emerald-200 hover:text-white transition-colors duration-200">
              Contact Us
            </a>
          </div>

     
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-emerald-200 hover:text-white transition-colors duration-200 hover:scale-110 transform"
            >
              <Github size={20} />
            </a>
            <a
              href="#"
              className="text-emerald-200 hover:text-white transition-colors duration-200 hover:scale-110 transform"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#"
              className="text-emerald-200 hover:text-white transition-colors duration-200 hover:scale-110 transform"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="text-emerald-200 hover:text-white transition-colors duration-200 hover:scale-110 transform"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>

      
        <div className="mt-8 pt-8 border-t border-emerald-800 text-center">
          <p className="text-emerald-200 text-sm">
            © 2025 Inspiro AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;