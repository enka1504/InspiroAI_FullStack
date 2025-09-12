import React from 'react';
import { Gauge, Shield, Users, TrendingUp } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: <Gauge className="w-12 h-12 text-emerald-400" />,
      title: "High Performance",
      description: "Our AI services are optimized for speed and efficiency, ensuring you get results quickly."
    },
    {
      icon: <Shield className="w-12 h-12 text-emerald-400" />,
      title: "Secure and Reliable",
      description: "We prioritize the security of your data and provide reliable AI solutions you can trust."
    },
    {
      icon: <Users className="w-12 h-12 text-emerald-400" />,
      title: "User-Friendly Interface",
      description: "Inspiro AI has an intuitive interface that makes it easy to use, even for beginners."
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-emerald-400" />,
      title: "Scalable Solutions",
      description: "Our platform is built to scale with your needs, supporting projects of any size."
    }
  ];

  return (
    <section className="bg-slate-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-emerald-400 font-bold text-5xl mb-4">Why Choose Inspiro AI?</p>
          <h2 className="text-3xl sm:text-2xl lg:text-3xl font-semibold text-white mb-6 pt-2">
            Experience the benefits of  Inspiro AI
          </h2>
          <p className="text-emerald-100 text-md max-w-3xl mx-auto">
            Inspiro AI is designed to provide you with the best AI experience. We focus on performance, 
            security, user-friendliness, and scalability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start space-x-6 group"
            >
              <div className="flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-emerald-100 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;