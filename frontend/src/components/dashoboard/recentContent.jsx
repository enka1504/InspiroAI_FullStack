import React from 'react';
import { Calendar, Eye, Download } from 'lucide-react';

const RecentContent = () => {
  const recentImages = [
    {
      id: 1,
      title: 'Abstract Digital Art',
      thumbnail: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=300',
      createdAt: '2 hours ago',
      views: 24
    },
    {
      id: 2,
      title: 'Futuristic Landscape',
      thumbnail: 'https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=300',
      createdAt: '5 hours ago',
      views: 18
    },
    {
      id: 3,
      title: 'AI Generated Portrait',
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=300',
      createdAt: '1 day ago',
      views: 42
    },
    {
      id: 4,
      title: 'Cyberpunk City',
      thumbnail: 'https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=300',
      createdAt: '2 days ago',
      views: 35
    }
  ];

  const recentVideos = [
    {
      id: 1,
      title: 'Product Demo Animation',
      thumbnail: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=300',
      duration: '2:34',
      createdAt: '3 hours ago',
      views: 156
    },
    {
      id: 2,
      title: 'Brand Intro Video',
      thumbnail: 'https://images.pexels.com/photos/3945317/pexels-photo-3945317.jpeg?auto=compress&cs=tinysrgb&w=300',
      duration: '1:45',
      createdAt: '6 hours ago',
      views: 89
    },
    {
      id: 3,
      title: 'Tutorial Walkthrough',
      thumbnail: 'https://images.pexels.com/photos/3945320/pexels-photo-3945320.jpeg?auto=compress&cs=tinysrgb&w=300',
      duration: '4:12',
      createdAt: '1 day ago',
      views: 203
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Latest Images Created</h3>
        <div className="space-y-4">
          {recentImages.map((image) => (
            <div
              key={image.id}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-700 transition-all duration-200 group"
            >
              <img
                src={image.thumbnail}
                alt={image.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium text-white group-hover:text-emerald-400 transition-colors">
                  {image.title}
                </h4>
                <div className="flex items-center gap-4 text-sm text-slate-400 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {image.createdAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {image.views}
                  </span>
                </div>
              </div>
              <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-slate-600 rounded-lg transition-all duration-200">
                <Download className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Videos */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Latest Videos Created</h3>
        <div className="space-y-4">
          {recentVideos.map((video) => (
            <div
              key={video.id}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-700 transition-all duration-200 group"
            >
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[6px] border-l-slate-800 border-y-[4px] border-y-transparent ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
                  {video.duration}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-white group-hover:text-emerald-400 transition-colors">
                  {video.title}
                </h4>
                <div className="flex items-center gap-4 text-sm text-slate-400 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {video.createdAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {video.views}
                  </span>
                </div>
              </div>
              <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-slate-600 rounded-lg transition-all duration-200">
                <Download className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentContent;