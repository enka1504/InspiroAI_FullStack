import React from 'react';
import SparklesCore from "../../components/ui/sparkles.jsx";
import { useClerk } from '@clerk/clerk-react'

const Hero = () => {
  const { openSignIn } = useClerk();
  return (
    <section className="bg-slate-950 relative overflow-hidden min-h-screen flex items-center justify-center text-center px-4">
      <div className="relative max-w-5xl mx-auto">


        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Your All-in-One AI Creative Suite <span className="text-emerald-400">Inspiro AI</span>
        </h1>

        <p className="font-normal text-sm sm:text-base lg:text-base text-emerald-100 mb-8 p-2 leading-relaxed">
          Supercharge your creativity with smart AI tools — generate articles, craft catchy blog titles, design stunning images, analyze resumes with precision. All in one platform, powered by AI.
        </p>

        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          onClick={openSignIn}
        >
          Get started for free
        </button>

        <div className="w-full sm:w-[40rem] h-40 mx-auto mt-12 relative">

          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />


          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />


          <div className="absolute inset-0 w-full h-full bg-slate-950 [mask-image:radial-gradient(350px_200px_at_top,transparent_40%,white)]" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
