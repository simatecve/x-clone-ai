import React, { useState } from 'react';
import { MessageCircle, Repeat2, Heart, BarChart2, Share, CheckCircle2 } from 'lucide-react';
import { TweetData } from '../types';

interface TweetProps {
  tweet: TweetData;
}

const Tweet: React.FC<TweetProps> = ({ tweet }) => {
  const [liked, setLiked] = useState(false); // Placeholder logic
  const [likeCount, setLikeCount] = useState(tweet.likes_count);
  const [retweeted, setRetweeted] = useState(false); // Placeholder logic
  const [retweetCount, setRetweetCount] = useState(tweet.retweets_count);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  const handleRetweet = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (retweeted) {
      setRetweetCount(prev => prev - 1);
    } else {
      setRetweetCount(prev => prev + 1);
    }
    setRetweeted(!retweeted);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    return date.toLocaleDateString();
  };

  // Safe access to profile data
  const user = tweet.profiles || {
    username: 'unknown',
    full_name: 'Unknown User',
    avatar_url: 'https://picsum.photos/100/100?random=unknown',
    verified: false
  };

  return (
    <div className="border-b border-x-border p-4 hover:bg-white/5 transition-colors cursor-pointer">
      <div className="flex space-x-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={user.avatar_url || "https://picsum.photos/100/100?random=unknown"}
            alt={user.full_name}
            className="h-10 w-10 rounded-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center text-sm mb-1">
            <span className="font-bold truncate text-white mr-1">{user.full_name}</span>
            {user.verified && (
              <CheckCircle2 className="h-4 w-4 text-x-blue fill-current mr-1" />
            )}
            <span className="text-x-gray truncate mr-1">@{user.username}</span>
            <span className="text-x-gray mx-1">·</span>
            <span className="text-x-gray hover:underline">{formatDate(tweet.created_at)}</span>
          </div>

          <p className="text-white text-[15px] whitespace-pre-wrap mb-3 leading-normal">
            {tweet.content}
          </p>

          {tweet.image_url && (
            <div className="mb-3 rounded-2xl overflow-hidden border border-x-border">
              <img src={tweet.image_url} alt="Tweet attachment" className="w-full h-auto object-cover max-h-[500px]" />
            </div>
          )}

          {/* Action Bar */}
          <div className="flex justify-between max-w-md text-x-gray">
            <button className="group flex items-center space-x-2 transition-colors hover:text-x-blue">
              <div className="p-2 rounded-full group-hover:bg-x-blue/10">
                <MessageCircle className="h-4 w-4" />
              </div>
              <span className="text-xs">{tweet.replies_count}</span>
            </button>

            <button
              onClick={handleRetweet}
              className={`group flex items-center space-x-2 transition-colors ${retweeted ? 'text-green-500' : 'hover:text-green-500'}`}
            >
              <div className="p-2 rounded-full group-hover:bg-green-500/10">
                <Repeat2 className="h-4 w-4" />
              </div>
              <span className="text-xs">{retweetCount}</span>
            </button>

            <button
              onClick={handleLike}
              className={`group flex items-center space-x-2 transition-colors ${liked ? 'text-pink-600' : 'hover:text-pink-600'}`}
            >
              <div className="p-2 rounded-full group-hover:bg-pink-600/10">
                <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
              </div>
              <span className="text-xs">{likeCount}</span>
            </button>

            <button className="group flex items-center space-x-2 transition-colors hover:text-x-blue">
              <div className="p-2 rounded-full group-hover:bg-x-blue/10">
                <BarChart2 className="h-4 w-4" />
              </div>
              <span className="text-xs">{tweet.views_count}</span>
            </button>

            <button className="group flex items-center transition-colors hover:text-x-blue">
              <div className="p-2 rounded-full group-hover:bg-x-blue/10">
                <Share className="h-4 w-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;