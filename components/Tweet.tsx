import React, { useState } from 'react';
import { MessageCircle, Repeat2, Heart, BarChart2, Share, CheckCircle2 } from 'lucide-react';
import { TweetData } from '../types';

interface TweetProps {
  tweet: TweetData;
}

const Tweet: React.FC<TweetProps> = ({ tweet }) => {
  const [liked, setLiked] = useState(tweet.liked);
  const [likeCount, setLikeCount] = useState(tweet.likes);
  const [retweeted, setRetweeted] = useState(tweet.retweeted);
  const [retweetCount, setRetweetCount] = useState(tweet.retweets);

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

  return (
    <div className="border-b border-x-border p-4 hover:bg-white/5 transition-colors cursor-pointer">
      <div className="flex space-x-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={tweet.user.avatarUrl}
            alt={tweet.user.name}
            className="h-10 w-10 rounded-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center text-sm mb-1">
            <span className="font-bold truncate text-white mr-1">{tweet.user.name}</span>
            {tweet.user.verified && (
              <CheckCircle2 className="h-4 w-4 text-x-blue fill-current mr-1" />
            )}
            <span className="text-x-gray truncate mr-1">@{tweet.user.handle}</span>
            <span className="text-x-gray mx-1">·</span>
            <span className="text-x-gray hover:underline">{tweet.timestamp}</span>
          </div>

          <p className="text-white text-[15px] whitespace-pre-wrap mb-3 leading-normal">
            {tweet.content}
          </p>

          {tweet.image && (
            <div className="mb-3 rounded-2xl overflow-hidden border border-x-border">
              <img src={tweet.image} alt="Tweet attachment" className="w-full h-auto object-cover max-h-[500px]" />
            </div>
          )}

          {/* Action Bar */}
          <div className="flex justify-between max-w-md text-x-gray">
            <button className="group flex items-center space-x-2 transition-colors hover:text-x-blue">
              <div className="p-2 rounded-full group-hover:bg-x-blue/10">
                <MessageCircle className="h-4 w-4" />
              </div>
              <span className="text-xs">{tweet.replies}</span>
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
              <span className="text-xs">{tweet.views}</span>
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