import React from 'react';
import {useClerk} from '@clerk/clerk-react'

const CTA = () => {
  const {openSignIn} = useClerk();
  return (
    <section className="bg-slate-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-900/50 backdrop-blur-sm rounded-2xl p-12 lg:p-16 text-center border border-emerald-800">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          ✨ Transform your Life with the power of AI
          </h2>
          <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
          Become smarter , boost productivity
          
          
           and stay ahead of the competition. Start your free trial today and experience AI that works for you.
          </p>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          onClick={openSignIn}
          >
            Start your free trial
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;