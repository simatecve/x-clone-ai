export interface User {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  verified?: boolean;
}

export interface TweetData {
  id: string;
  user: User;
  content: string;
  timestamp: string;
  likes: number;
  retweets: number;
  replies: number;
  views: string;
  liked?: boolean;
  retweeted?: boolean;
  image?: string;
}

export enum TweetFilter {
  FOR_YOU = 'For you',
  FOLLOWING = 'Following'
}