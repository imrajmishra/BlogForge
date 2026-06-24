'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MapPin, Link as LinkIcon, Calendar, Sparkles, LayoutGrid, Film } from 'lucide-react';
import Link from 'next/link';

const CREATORS = {
  'me': {
    id: 'me',
    display_name: 'Alex Rivera',
    handle: 'alex_rivera',
    avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=alex_rivera',
    bio: 'Elite UI/UX Designer & Frontend Engineer. Passionate about glassmorphism, smooth animations, and high-performance React architectures.',
    location: 'San Francisco, CA',
    website: 'riveradesign.io',
    joined: 'Jan 2026',
    followers: 1420,
    following: 382,
    posts: [
      { id: 'post-4', title: 'Next.js 16 and the React Compiler: The Next Horizon', category: 'Tech', cover_image: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=800&q=80', created_at: '2026-06-23T11:15:00Z', read_time: '5 min read', content: 'Auto-memoization, component actions, and Turbopack speed improvements.' }
    ],
    reels: [
      { id: 'reel-3', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-holding-a-smartphone-in-vertical-position-41712-large.mp4', caption: 'Next.js compiler and auto-memoization. Frontends are fast! 💻🚀', likes: 2410 }
    ]
  },
  'user-1': {
    id: 'user-1',
    display_name: 'Aditya Sharma',
    handle: 'aditya_sharma',
    avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Aditya',
    bio: 'Cricket analyst and statistics lover. Deconstructing historic averages, strike rates, and career runs of modern cricket icons.',
    location: 'Mumbai, India',
    website: 'cricketstats.co',
    joined: 'Mar 2026',
    followers: 4890,
    following: 195,
    posts: [
      { id: 'post-1', title: 'Virat Kohli: A Decade of Statistical Dominance in Modern Cricket', category: 'Cricket Stats', cover_image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80', created_at: '2026-06-20T10:00:00Z', read_time: '6 min read', content: 'Virat Kohli career statistics summary across test, ODI, and T20 formats.' },
      { id: 'post-3', title: 'Sachin Tendulkar: The Eternal Centurion Career Milestones', category: 'Cricket Stats', cover_image: 'https://images.unsplash.com/photo-1540747737956-37872404a8de?auto=format&fit=crop&w=800&q=80', created_at: '2026-06-18T08:00:00Z', read_time: '8 min read', content: 'Sachin Tendulkar career overview and historical records.' }
    ],
    reels: []
  },
  'user-2': {
    id: 'user-2',
    display_name: 'Zara Chen',
    handle: 'zara_chen',
    avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=zara_chen',
    bio: 'Streetwear enthusiast and denim restyler. Documenting boxy tees, mom jeans, skin fades, and raw indigo dye processes.',
    location: 'Tokyo, Japan',
    website: 'denimfades.jp',
    joined: 'Feb 2026',
    followers: 8900,
    following: 412,
    posts: [
      { id: 'post-2', title: 'The Streetwear Uniform: Deconstructing Mom-Fit Baggy Jeans & Messy Fringe Fades', category: 'Streetwear', cover_image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80', created_at: '2026-06-22T14:30:00Z', read_time: '4 min read', content: 'Breakdown of oversized tees, baggy jeans, and crop fades.' },
      { id: 'post-5', title: 'Vintage Japanese Denim: The Art of Indigo Dyeing', category: 'Streetwear', cover_image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80', created_at: '2026-06-21T09:00:00Z', read_time: '7 min read', content: 'How vintage denim loop-dye methods create unique custom fades.' }
    ],
    reels: [
      { id: 'reel-1', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1249-large.mp4', caption: 'Deconstructing the raw Okayama selvedge denim. Baggy fits are forever. 👖✨', likes: 1248 },
      { id: 'reel-2', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-skater-doing-tricks-in-a-skatepark-34347-large.mp4', caption: 'Messy fringe fade hairstyle + oversize drop-shoulder white tee. Absolute skater uniform. 🛹🔥', likes: 852 }
    ]
  }
};

export default function ProfilePage() {
  const params = useParams();
  const rawId = params?.id || 'me';
  const creator = CREATORS[rawId] || CREATORS['me'];

  const [activeTab, setActiveTab] = useState('articles'); // 'articles' | 'reels'

  // Scroll variables
  const { scrollY } = useScroll();
  const headerHeight = useTransform(scrollY, [0, 180], [240, 100]);
  const avatarScale = useTransform(scrollY, [0, 180], [1, 0.55]);
  const bioOpacity = useTransform(scrollY, [0, 70], [1, 0]);
  const bioY = useTransform(scrollY, [0, 70], [0, -10]);
  const bgOpacity = useTransform(scrollY, [0, 180], [0.4, 0.85]);

  return (
    <div className="flex-1 w-full bg-black text-white relative min-h-screen sm:pl-20">
      
      {/* Sticky Shrinking Header (Zine Layout) */}
      <motion.div
        style={{ height: headerHeight }}
        className="sticky md:top-0 top-16 z-30 w-full border-b border-zinc-900 bg-zinc-950/40 backdrop-blur-xl overflow-hidden"
      >
        <motion.div 
          style={{ backgroundColor: `rgba(9, 9, 11, ${bgOpacity.get()})` }} 
          className="absolute inset-0 -z-10 bg-zinc-950/20" 
        />

        <div className="max-w-4xl mx-auto px-6 h-full flex items-center justify-between relative">
          <div className="flex items-center gap-6">
            
            {/* Raw Bordered Avatar */}
            <motion.div
              style={{ scale: avatarScale }}
              className="w-20 h-20 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-lg origin-left shrink-0"
            >
              <img src={creator.avatar_url} alt={creator.display_name} className="w-full h-full object-cover grayscale" />
            </motion.div>

            {/* Profile Info */}
            <div className="flex flex-col">
              <motion.h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase flex items-center gap-2">
                {creator.display_name}
              </motion.h2>
              <span className="text-[10px] text-violet-400 font-mono">@{creator.handle}</span>

              {/* Bio & Details (Fades out when scrolled) */}
              <motion.div
                style={{ opacity: bioOpacity, y: bioY }}
                className="hidden sm:flex items-center gap-4 mt-2 text-[10px] font-mono text-zinc-500"
              >
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {creator.location.toUpperCase()}</span>
                <span>/</span>
                <span className="flex items-center gap-1"><LinkIcon className="w-3 h-3" /> <a href={`https://${creator.website}`} target="_blank" className="hover:text-violet-400">{creator.website.toUpperCase()}</a></span>
                <span>/</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> JOINED {creator.joined.toUpperCase()}</span>
              </motion.div>
            </div>
          </div>

          {/* User Follow Stats (Monospace) */}
          <div className="flex items-center gap-6 text-right font-mono">
            <div>
              <div className="text-lg font-bold text-white leading-none">{creator.followers}</div>
              <div className="text-[8px] text-zinc-500 uppercase tracking-widest font-bold mt-1">Followers</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white leading-none">{creator.following}</div>
              <div className="text-[8px] text-zinc-500 uppercase tracking-widest font-bold mt-1">Following</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Bio on Mobile */}
        <div className="block sm:hidden mb-6 p-4 rounded-xl bg-zinc-900/10 border border-zinc-900">
          <p className="text-xs text-zinc-300 leading-relaxed font-sans">{creator.bio}</p>
          <div className="flex flex-col gap-2 mt-4 text-[10px] font-mono text-zinc-500">
            <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {creator.location.toUpperCase()}</span>
            <span className="flex items-center gap-2"><LinkIcon className="w-3.5 h-3.5" /> <a href={`https://${creator.website}`} className="hover:text-violet-400">{creator.website.toUpperCase()}</a></span>
          </div>
        </div>

        {/* Desktop Bio Description */}
        <div className="hidden sm:block mb-8 max-w-2xl">
          <p className="text-sm text-zinc-300 leading-relaxed font-sans font-light">{creator.bio}</p>
        </div>

        {/* Tab Selection Row (Zine Numbered Index) */}
        <div className="flex items-center border-b border-zinc-900 mb-8 relative">
          <button
            onClick={() => setActiveTab('articles')}
            className={`flex items-center gap-2 px-6 py-3.5 text-xs font-mono font-bold transition-colors relative ${activeTab === 'articles' ? 'text-violet-400' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            01 // ARTICLES
            {activeTab === 'articles' && (
              <motion.div
                layoutId="profileTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-linear-to-r from-violet-500 to-blue-500"
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              />
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('reels')}
            className={`flex items-center gap-2 px-6 py-3.5 text-xs font-mono font-bold transition-colors relative ${activeTab === 'reels' ? 'text-violet-400' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Film className="w-3.5 h-3.5" />
            02 // REELS
            {activeTab === 'reels' && (
              <motion.div
                layoutId="profileTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-[1.5px] bg--to-r from-violet-500 to-blue-500"
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              />
            )}
          </button>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          {activeTab === 'articles' ? (
            <motion.div
              key="articles-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {creator.posts.length > 0 ? (
                creator.posts.map((post) => (
                  <div key={post.id} className="p-5 rounded-xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-md flex flex-col justify-between hover:border-violet-500/25 transition-colors">
                    <div>
                      <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase">{post.category}</span>
                      <h4 className="text-base font-bold text-white mt-1 mb-2 hover:text-violet-400 transition-colors uppercase">
                        {post.title}
                      </h4>
                      <p className="text-xs text-zinc-400 line-clamp-2 mb-4 font-sans font-light">{post.content}</p>
                    </div>
                    <div className="flex items-center justify-between text-[9px] text-zinc-500 font-mono">
                      <span>{post.read_time.toUpperCase()}</span>
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-12 text-zinc-600 font-mono text-xs">EOF // NO PUBLISHED ARTICLES RECORDED</div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="reels-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {creator.reels.length > 0 ? (
                creator.reels.map((reel) => (
                  <div key={reel.id} className="relative aspect-9/16 rounded-xl overflow-hidden group bg-zinc-950 border border-zinc-900">
                    <video src={reel.videoUrl} muted loop className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                    <div className="absolute inset-0 bg--to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-4">
                      <p className="text-[10px] text-zinc-300 line-clamp-2 mb-2 font-sans font-light">{reel.caption}</p>
                      <span className="text-[9px] text-violet-400 font-mono font-bold flex items-center gap-1 uppercase">
                        {reel.likes} LIKES
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-12 text-zinc-600 font-mono text-xs">EOF // NO CREATED REELS RECORDED</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
