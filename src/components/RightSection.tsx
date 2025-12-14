import React from 'react';
import { Search, MoreHorizontal } from 'lucide-react';

const RightSection: React.FC = () => {
  const trends = [
    { category: 'Technology · Trending', topic: '#GeminiAI', posts: '245K posts' },
    { category: 'Sports · Trending', topic: 'World Cup', posts: '1.2M posts' },
    { category: 'Trending in US', topic: 'React 19', posts: '54.2K posts' },
    { category: 'Politics · Trending', topic: 'Elections', posts: '890K posts' },
    { category: 'Business · Trending', topic: 'NVIDIA', posts: '120K posts' },
  ];

  const whoToFollow = [
    { name: 'Google', handle: '@google', img: 'https://picsum.photos/100/100?random=10' },
    { name: 'OpenAI', handle: '@openai', img: 'https://picsum.photos/100/100?random=11' },
    { name: 'Tailwind CSS', handle: '@tailwindcss', img: 'https://picsum.photos/100/100?random=12' },
  ];

  return (
    <div className="hidden lg:flex flex-col w-[350px] pl-8 py-2 h-screen sticky top-0">
      {/* Search Bar */}
      <div className="sticky top-0 bg-black z-10 pb-2 pt-1">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-x-gray group-focus-within:text-x-blue">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            className="block w-full bg-[#202327] border border-transparent rounded-full py-2.5 pl-10 pr-3 text-white placeholder-x-gray focus:outline-none focus:bg-black focus:border-x-blue focus:ring-1 focus:ring-x-blue transition-colors sm:text-sm"
            placeholder="Search"
          />
        </div>
      </div>

      {/* Trends Box */}
      <div className="bg-[#16181c] rounded-2xl mt-4 pt-3 overflow-hidden">
        <h2 className="px-4 text-xl font-extrabold text-white mb-3">Trends for you</h2>
        {trends.map((trend, idx) => (
          <div key={idx} className="px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors relative">
            <div className="flex justify-between text-xs text-x-gray">
              <span>{trend.category}</span>
              <MoreHorizontal className="h-4 w-4 hover:text-x-blue" />
            </div>
            <p className="font-bold text-white text-[15px] mt-0.5">{trend.topic}</p>
            <p className="text-xs text-x-gray mt-0.5">{trend.posts}</p>
          </div>
        ))}
        <div className="px-4 py-4 hover:bg-white/5 cursor-pointer text-x-blue text-sm transition-colors rounded-b-2xl">
          Show more
        </div>
      </div>

      {/* Who to follow */}
      <div className="bg-[#16181c] rounded-2xl mt-4 pt-3 overflow-hidden">
        <h2 className="px-4 text-xl font-extrabold text-white mb-3">Who to follow</h2>
        {whoToFollow.map((user, idx) => (
          <div key={idx} className="px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={user.img} alt={user.name} className="h-10 w-10 rounded-full" />
              <div className="truncate max-w-[100px] xl:max-w-[140px]">
                <p className="font-bold text-white text-sm hover:underline truncate">{user.name}</p>
                <p className="text-x-gray text-sm truncate">{user.handle}</p>
              </div>
            </div>
            <button className="bg-white text-black font-bold text-sm px-4 py-1.5 rounded-full hover:bg-gray-200 transition-colors">
              Follow
            </button>
          </div>
        ))}
        <div className="px-4 py-4 hover:bg-white/5 cursor-pointer text-x-blue text-sm transition-colors rounded-b-2xl">
          Show more
        </div>
      </div>

       <div className="mt-4 px-4 flex flex-wrap text-xs text-x-gray gap-x-3 gap-y-1 leading-4">
         <span className="hover:underline cursor-pointer">Terms of Service</span>
         <span className="hover:underline cursor-pointer">Privacy Policy</span>
         <span className="hover:underline cursor-pointer">Cookie Policy</span>
         <span className="hover:underline cursor-pointer">Accessibility</span>
         <span className="hover:underline cursor-pointer">Ads info</span>
         <span className="flex items-center gap-1 hover:underline cursor-pointer">More <MoreHorizontal className="h-3 w-3"/></span>
         <span className="mt-1">© 2024 X Corp.</span>
       </div>
    </div>
  );
};

export default RightSection;