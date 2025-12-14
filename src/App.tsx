import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { supabase } from './integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import RightSection from './components/RightSection';
import Login from './pages/Login';

// Layout component for authenticated pages
const AppLayout = () => {
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
          <Outlet />
        </main>

        {/* Right Section */}
        <aside className="hidden lg:block w-[350px] flex-shrink-0 relative">
          <RightSection />
        </aside>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-x-blue"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!session ? <Login /> : <Navigate to="/" />} />
        
        <Route element={session ? <AppLayout /> : <Navigate to="/login" />}>
          <Route path="/" element={<Feed />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;