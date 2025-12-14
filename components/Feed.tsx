import React, { useState, useEffect } from 'react';
import Tweet from './Tweet';
import Composer from './Composer';
import { TweetData, TweetFilter } from '../types';
import { Settings } from 'lucide-react';

const INITIAL_TWEETS: TweetData[] = [
  {
    id: '1',
    user: {
      id: 'google_devs',
      name: 'Google for Developers',
      handle: 'googledevs',
      avatarUrl: 'https://picsum.photos/100/100?random=1',
      verified: true,
    },
    content: 'Building with the Gemini API is just different. The speed and context window allow for some truly next-gen apps. 🚀 #Gemini #AI',
    timestamp: '2h',
    likes: 1240,
    retweets: 350,
    replies: 42,
    views: '85K',
    liked: false,
    retweeted: false,
    image: 'https://picsum.photos/600/300?random=tech'
  },
  {
    id: '2',
    user: {
      id: 'react_fan',
      name: 'React Enthusiast',
      handle: 'reactjs_fan',
      avatarUrl: 'https://picsum.photos/100/100?random=2',
    },
    content: 'Just migrated my whole codebase to TypeScript. Best decision ever? Or am I in for a world of pain with generic types? 😅',
    timestamp: '4h',
    likes: 856,
    retweets: 24,
    replies: 128,
    views: '12K',
    liked: true,
    retweeted: false,
  },
  {
    id: '3',
    user: {
      id: 'elon_clone',
      name: 'Tech Mogul',
      handle: 'techking',
      avatarUrl: 'https://picsum.photos/100/100?random=3',
      verified: true
    },
    content: 'Mars looks nice this time of year.',
    timestamp: '5h',
    likes: 54000,
    retweets: 12000,
    replies: 4500,
    views: '1.2M',
    liked: false,
    retweeted: true,
  }
];

const Feed: React.FC = () => {
  const [tweets, setTweets] = useState<TweetData[]>(INITIAL_TWEETS);
  const [activeFilter, setActiveFilter] = useState<TweetFilter>(TweetFilter.FOR_YOU);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNewTweet = (content: string) => {
    const newTweet: TweetData = {
      id: Date.now().toString(),
      user: {
        id: 'current_user',
        name: 'Demo User',
        handle: 'demouser',
        avatarUrl: 'https://picsum.photos/100/100?random=user',
      },
      content: content,
      timestamp: 'Just now',
      likes: 0,
      retweets: 0,
      replies: 0,
      views: '1',
      liked: false,
      retweeted: false,
    };
    setTweets([newTweet, ...tweets]);
  };

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

      <Composer onTweet={handleNewTweet} />

      {/* Tweets */}
      <div>
        {tweets.map(tweet => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
        <div className="p-10 text-center text-x-blue text-sm cursor-pointer hover:bg-white/5 transition-colors border-b border-x-border">
          Show 346 Tweets
        </div>
      </div>
    </div>
  );
};

export default Feed;