import React, { useState, useEffect, useCallback } from 'react';
import Tweet from './Tweet';
import Composer from './Composer';
import { TweetData, TweetFilter } from '../types';
import { Settings, Loader2 } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';

const Feed: React.FC = () => {
  const [tweets, setTweets] = useState<TweetData[]>([]);
  const [activeFilter, setActiveFilter] = useState<TweetFilter>(TweetFilter.FOR_YOU);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchTweets = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tweets')
        .select(`
          *,
          profiles:user_id (
            id,
            username,
            full_name,
            avatar_url,
            verified
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }
      
      setTweets(data as unknown as TweetData[]);
    } catch (error) {
      console.error('Error fetching tweets:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTweets();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchTweets]);

  return (
    <div className="border-x border-x-border min-h-screen max-w-[600px] w-full">
      {/* Header */}
      <div className={`sticky top-0 z-10 backdrop-blur-md bg-black/60 transition-colors border-b border-x-border ${isScrolled ? '' : 'bg-opacity-90'}`}>
        <div className="flex justify-between items-center px-4 h-[53px]">
           <div className="flex-1 flex justify-center h-full relative group cursor-pointer" onClick={() => setActiveFilter(TweetFilter.FOR_YOU)}>
             <div className="flex flex-col justify-center h-full">
               <span className={`font-bold text-[15px] ${activeFilter === TweetFilter.FOR_YOU ? 'text-white' : 'text-x-gray'}`}>For you</span>
               {activeFilter === TweetFilter.FOR_YOU && (
                 <div className="absolute bottom-0 h-1 w-14 bg-x-blue rounded-full self-center"></div>
               )}
             </div>
             <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           </div>
           
           <div className="flex-1 flex justify-center h-full relative group cursor-pointer" onClick={() => setActiveFilter(TweetFilter.FOLLOWING)}>
             <div className="flex flex-col justify-center h-full">
                <span className={`font-bold text-[15px] ${activeFilter === TweetFilter.FOLLOWING ? 'text-white' : 'text-x-gray'}`}>Following</span>
                {activeFilter === TweetFilter.FOLLOWING && (
                 <div className="absolute bottom-0 h-1 w-20 bg-x-blue rounded-full self-center"></div>
               )}
             </div>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           </div>

           <div className="absolute right-4 p-2 rounded-full hover:bg-white/10 cursor-pointer">
              <Settings className="h-5 w-5 text-white" />
           </div>
        </div>
      </div>

      <Composer onTweetPosted={fetchTweets} />

      {/* Tweets */}
      <div>
        {loading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 text-x-blue animate-spin" />
          </div>
        ) : (
          <>
            {tweets.map(tweet => (
              <Tweet key={tweet.id} tweet={tweet} />
            ))}
            {tweets.length === 0 && (
               <div className="p-10 text-center text-x-gray">
                 No tweets yet. Be the first to post!
               </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Feed;