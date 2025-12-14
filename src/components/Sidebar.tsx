import React, { useEffect, useState } from 'react';
import { Home, Search, Bell, Mail, Bookmark, User as UserIcon, MoreHorizontal, PenSquare, LogOut } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import { User } from '../types';

const Sidebar: React.FC = () => {
  const [profile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (data) {
          setProfile(data as User);
        }
      }
    };
    getProfile();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const navItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Search, label: 'Explore' },
    { icon: Bell, label: 'Notifications' },
    { icon: Mail, label: 'Messages' },
    { icon: Bookmark, label: 'Bookmarks' },
    { icon: UserIcon, label: 'Profile' },
    { icon: MoreHorizontal, label: 'More' },
  ];

  return (
    <div className="flex flex-col h-screen p-2 xl:items-start items-center">
      {/* Logo */}
      <div className="p-3 mb-2 rounded-full hover:bg-x-dark cursor-pointer w-fit transition-colors">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-white fill-current">
          <g>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </g>
        </svg>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={`flex items-center p-3 rounded-full cursor-pointer hover:bg-x-dark transition-all w-fit xl:w-full ${item.active ? 'font-bold' : ''}`}
          >
            <item.icon className="h-7 w-7" />
            <span className="hidden xl:block ml-4 text-xl">{item.label}</span>
          </div>
        ))}
        
        {/* Logout Button (added for functionality) */}
        <div
            onClick={handleLogout}
            className="flex items-center p-3 rounded-full cursor-pointer hover:bg-x-dark transition-all w-fit xl:w-full text-red-500"
          >
            <LogOut className="h-7 w-7" />
            <span className="hidden xl:block ml-4 text-xl">Logout</span>
          </div>
      </nav>

      {/* Tweet Button */}
      <button className="bg-x-blue hover:bg-x-blueHover text-white rounded-full p-4 xl:px-8 xl:py-3 font-bold shadow-lg transition-colors mt-4 w-fit xl:w-11/12">
        <span className="hidden xl:block text-lg">Post</span>
        <PenSquare className="xl:hidden h-6 w-6" />
      </button>

      {/* User Profile */}
      {profile && (
        <div className="mt-auto mb-4 p-3 rounded-full hover:bg-x-dark cursor-pointer flex items-center w-full justify-center xl:justify-start transition-colors">
          <img
            src={profile.avatar_url || "https://picsum.photos/100/100?random=user"}
            alt={profile.full_name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="hidden xl:block ml-3 truncate">
            <p className="font-bold text-sm truncate">{profile.full_name}</p>
            <p className="text-x-gray text-sm truncate">@{profile.username}</p>
          </div>
          <MoreHorizontal className="hidden xl:block ml-auto h-4 w-4 text-x-gray" />
        </div>
      )}
    </div>
  );
};

export default Sidebar;