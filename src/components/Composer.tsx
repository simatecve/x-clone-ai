import React, { useState, useRef, useEffect } from 'react';
import { Image, Smile, Calendar, MapPin, Sparkles, Loader2 } from 'lucide-react';
import { enhanceTweet } from '../services/geminiService';
import { supabase } from '../integrations/supabase/client';
import { User } from '../types';

interface ComposerProps {
  onTweetPosted: () => void;
}

const Composer: React.FC<ComposerProps> = ({ onTweetPosted }) => {
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [showAiMenu, setShowAiMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Get current user for avatar
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (data) setCurrentUser(data as User);
      }
    };
    getUser();
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [content]);

  const handleEnhance = async (tone: 'professional' | 'funny' | 'viral') => {
    if (!content.trim()) return;
    setIsEnhancing(true);
    setShowAiMenu(false);
    try {
      const newText = await enhanceTweet(content, tone);
      setContent(newText);
    } catch (error) {
      console.error(error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleSubmit = async () => {
    if (!content.trim() || !currentUser) return;
    
    setIsPosting(true);
    try {
      const { error } = await supabase.from('tweets').insert({
        user_id: currentUser.id,
        content: content.trim(),
      });

      if (error) throw error;

      setContent('');
      if (textareaRef.current) textareaRef.current.style.height = 'auto';
      onTweetPosted();
    } catch (error) {
      console.error('Error posting tweet:', error);
      alert('Failed to post tweet');
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="border-b border-x-border p-4 bg-black">
      <div className="flex space-x-4">
        <img
          src={currentUser?.avatar_url || "https://picsum.photos/100/100?random=default"}
          alt="Current User"
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="flex-1">
          {isFocused && (
            <div className="mb-2 text-x-blue text-sm font-semibold border border-x-border rounded-full w-fit px-3 py-0.5 hover:bg-x-blue/10 cursor-pointer transition-colors">
              Everyone
            </div>
          )}
          <div className="relative">
             <textarea
              ref={textareaRef}
              value={content}
              onFocus={() => setIsFocused(true)}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What is happening?!"
              className="w-full bg-transparent text-xl text-white placeholder-x-gray outline-none resize-none min-h-[50px] overflow-hidden"
              rows={1}
              disabled={isPosting}
            />
            {isEnhancing && (
              <div className="absolute top-0 right-0 p-2">
                <Loader2 className="h-5 w-5 text-x-blue animate-spin" />
              </div>
            )}
          </div>

          <div className="mt-2 border-t border-x-border/30 pt-3 flex items-center justify-between">
            <div className="flex space-x-1 text-x-blue">
              <div className="p-2 rounded-full hover:bg-x-blue/10 cursor-pointer transition-colors">
                <Image className="h-5 w-5" />
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowAiMenu(!showAiMenu)}
                  className="p-2 rounded-full hover:bg-x-blue/10 cursor-pointer transition-colors group relative"
                  title="AI Enhance"
                >
                   <Sparkles className="h-5 w-5" />
                </button>
                
                {showAiMenu && (
                   <div className="absolute top-10 left-0 bg-black border border-x-border shadow-2xl rounded-xl z-20 w-48 overflow-hidden">
                     <div className="px-4 py-2 text-xs font-bold text-x-gray uppercase tracking-wider bg-x-dark">AI Magic</div>
                     <button onClick={() => handleEnhance('funny')} className="w-full text-left px-4 py-3 hover:bg-white/10 text-sm font-medium transition-colors">
                       Make it Funny 😂
                     </button>
                     <button onClick={() => handleEnhance('professional')} className="w-full text-left px-4 py-3 hover:bg-white/10 text-sm font-medium transition-colors">
                       Make it Professional 👔
                     </button>
                     <button onClick={() => handleEnhance('viral')} className="w-full text-left px-4 py-3 hover:bg-white/10 text-sm font-medium transition-colors">
                       Make it Viral 🚀
                     </button>
                   </div>
                )}
              </div>
              <div className="p-2 rounded-full hover:bg-x-blue/10 cursor-pointer transition-colors hidden sm:block">
                <Smile className="h-5 w-5" />
              </div>
              <div className="p-2 rounded-full hover:bg-x-blue/10 cursor-pointer transition-colors hidden sm:block">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="p-2 rounded-full hover:bg-x-blue/10 cursor-pointer transition-colors hidden sm:block">
                <MapPin className="h-5 w-5" />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!content.trim() || isEnhancing || isPosting}
              className={`rounded-full px-5 py-1.5 font-bold text-sm transition-all flex items-center ${
                content.trim() && !isEnhancing && !isPosting
                  ? 'bg-x-blue hover:bg-x-blueHover text-white'
                  : 'bg-x-blue/50 text-white/50 cursor-not-allowed'
              }`}
            >
              {isPosting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Composer;