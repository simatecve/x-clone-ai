import React from 'react';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import RightSection from './components/RightSection';

const App: React.FC = () => {
  return (
    <div className="bg-black min-h-screen text-white flex justify-center">
      <div className="flex w-full max-w-[1300px]">
        {/* Left Sidebar */}
        <header className="flex-shrink-0 w-[88px] xl:w-[275px]">
          <div className="fixed top-0 w-[88px] xl:w-[275px] h-screen overflow-y-auto no-scrollbar">
            <Sidebar />
          </div>
        </header>

        {/* Main Feed */}
        <main className="flex-grow max-w-[600px] min-h-screen border-r border-x-border">
          <Feed />
        </main>

        {/* Right Section */}
        <aside className="hidden lg:block w-[350px] flex-shrink-0 relative">
          <RightSection />
        </aside>
      </div>
    </div>
  );
};

export default App;