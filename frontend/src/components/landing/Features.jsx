import React from 'react';
import { Sparkles, MessageSquare, Search, BarChart3, Code, Zap } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Sparkles className="w-8 h-8 text-emerald-400" />,
      title: "Article Generator 📝",
      description: "Generate high-quality, long-form articles instantly. Just provide a title and desired length, and let AI do the heavy lifting"
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-emerald-400" />,
      title: "Blog Title Generator ✍️",
      description: "Create catchy, SEO-friendly blog titles by simply entering a keyword and category."
    },
    {
      icon: <Search className="w-8 h-8 text-emerald-400" />,
      title: "Image Generator 🎨",
      description: "Enhance your search capabilities with AI-powered search that understands user intent."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-emerald-400" />,
      title: "Resume Analyzer 📄",
      description: "Get a detailed analysis of your resume with insights, strengths, and improvement suggestions powered by AI."
    },
    {
      icon: <Code className="w-8 h-8 text-emerald-400" />,
      title: "AI Code Assistant 💻",
      description: "Accelerate your development process with AI-powered code generation and debugging."
    },
    {
      icon: <Zap className="w-8 h-8 text-emerald-400" />,
      title: "Video Generator 🎬",
      description: "Transform your ideas into engaging videos—just provide a script or prompt, and AI will generate high-quality visuals."
    }
  ];

  return (
    <section className="bg-slate-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-emerald-400 font-bold mb-4 text-5xl">Our AI Services</p>
          <h2 className="text-3xl sm:text-2xl lg:text-3xl font-semibold text-white mb-6">
            AI tools that inspire productivity & creativity.
          </h2>
          <p className="text-emerald-100 text-md max-w-3xl mx-auto">
          Our AI-powered services make content creation and editing effortless — from generating articles and blog titles to creating and enhancing images, and even analyzing resumes with precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-emerald-900/50 backdrop-blur-sm p-8 rounded-xl border border-emerald-800 hover:border-emerald-600 transition-all duration-300 hover:transform hover:scale-105 group"
            >
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {service.title}
              </h3>
              <p className="text-emerald-100 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;