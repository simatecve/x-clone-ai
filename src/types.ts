export interface User {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  verified?: boolean;
}

export interface TweetData {
  id: string;
  user_id: string;
  content: string;
  image_url?: string;
  likes_count: number;
  retweets_count: number;
  replies_count: number;
  views_count: number;
  created_at: string;
  // This comes from the join with the profiles table
  profiles?: User; 
}

export enum TweetFilter {
  FOR_YOU = 'For you',
  FOLLOWING = 'Following'
}