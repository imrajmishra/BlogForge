'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Heart, MessageCircle, Share2, ArrowLeft, Volume2, VolumeX, Terminal, Cpu } from 'lucide-react';

const REELS_DATA = [
  {
    id: 'reel-1',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1249-large.mp4',
    author: 'zara_chen',
    caption: 'Deconstructing the raw Okayama selvedge denim. Baggy fits are forever. 👖✨ #streetwear #aesthetic #fashion',
    likes: 1248,
    comments: 42,
    shares: 19,
    category: 'Streetwear'
  },
  {
    id: 'reel-2',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-skater-doing-tricks-in-a-skatepark-34347-large.mp4',
    author: 'skate_core',
    caption: 'Messy fringe fade hairstyle + oversize drop-shoulder white tee. Absolute skater uniform. 🛹🔥 #streetstyle #outfit',
    likes: 852,
    comments: 31,
    shares: 12,
    category: 'Streetwear'
  },
  {
    id: 'reel-3',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-holding-a-smartphone-in-vertical-position-41712-large.mp4',
    author: 'tech_vibe',
    caption: 'React Compiler auto-memoizing everything in Next.js 16. The future of frontends is compiling! 💻🚀 #programming #webdev',
    likes: 2410,
    comments: 112,
    shares: 88,
    category: 'Tech'
  }
];

// Individual Monitor Reel Component
function ReelCard({ reel, isActive, isMuted, toggleMute, index }) {
  const videoRef = useRef(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(reel.likes);

  // Live Shuffling Telemetry States
  const [fps, setFps] = useState(60.0);
  const [audioLevel, setAudioLevel] = useState(-14);
  const [frameCount, setFrameCount] = useState(0);

  // Play/pause and setup timer
  useEffect(() => {
    let intervalId;
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(err => console.log('Autoplay blocked:', err));
        
        // Start shuffling live telemetry values
        intervalId = setInterval(() => {
          setFps((59.4 + Math.random() * 0.8).toFixed(2));
          setAudioLevel(Math.floor(-18 + Math.random() * 8));
          setFrameCount(prev => (prev + 2) % 3600);
        }, 150);

      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setFrameCount(0);
      }
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isActive]);

  const handleLike = () => {
    if (liked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="relative w-full h-[100dvh] snap-start snap-always bg-black flex flex-col md:flex-row items-center justify-center p-4">
      
      {/* 1. LEFT MONITOR DIAGNOSTICS (Monospace Logs, Visible on MD+) */}
      <div className="hidden md:flex flex-col gap-6 w-56 text-zinc-500 font-mono text-[10px] pr-6 border-r border-zinc-900 h-96 justify-between select-none">
        <div className="space-y-4">
          <div className="flex items-center gap-1.5 text-violet-400 font-bold">
            <Terminal className="w-3.5 h-3.5" />
            <span>STREAM.DIAG</span>
          </div>
          <div className="space-y-2">
            <div className="telemetry-row"><span>STREAM STATE</span><span className="text-emerald-500 font-bold">ACTIVE</span></div>
            <div className="telemetry-row"><span>SOURCE CHN</span><span>REEL_0{index + 1}</span></div>
            <div className="telemetry-row"><span>VIDEO RES</span><span>1080x1920</span></div>
            <div className="telemetry-row"><span>FPS TELEMETRY</span><span className="text-zinc-300 font-bold">{fps} Hz</span></div>
            <div className="telemetry-row"><span>AUDIO DECI</span><span className="text-zinc-300 font-bold">{audioLevel} dB</span></div>
            <div className="telemetry-row"><span>ELAPSED FRAME</span><span className="text-zinc-300 font-bold">{frameCount} F</span></div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-zinc-400 font-bold">
            <Cpu className="w-3.5 h-3.5" />
            <span>RENDER CORE</span>
          </div>
          <div>REACT COMPILE: OK</div>
          <div>NHOST_STORAGE: CONNECTED</div>
        </div>
      </div>

      {/* 2. CENTER VIEWER (The Retro-Monitor Frame) */}
      <div className="relative h-[80vh] md:h-[85vh] aspect-[9/16] border border-zinc-800 bg-zinc-950 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] mx-auto md:mx-8">
        
        {/* HTML5 video element */}
        <video
          ref={videoRef}
          src={reel.videoUrl}
          loop
          playsInline
          muted={isMuted}
          onClick={toggleMute}
          className="w-full h-full object-cover cursor-pointer grayscale group-hover:grayscale-0 transition-all duration-300"
        />

        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/85 pointer-events-none" />

        {/* Neon Status Badge */}
        <div className="absolute top-4 left-4 px-2 py-0.5 rounded text-[8px] font-mono font-bold bg-black/80 text-violet-400 border border-zinc-800 backdrop-blur-sm uppercase flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-violet-500 animate-ping" />
          MON.0{index + 1} // LIVE
        </div>

        {/* Creator Details (Slides up from bottom) */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={isActive ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 180, damping: 20 }}
          className="absolute left-4 right-16 bottom-6 z-20"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs font-bold text-white tracking-wider">@{reel.author}</span>
            <span className="px-1.5 py-0.2 text-[8px] font-mono bg-violet-950 text-violet-400 border border-violet-800/40 uppercase">
              {reel.category}
            </span>
          </div>
          <p className="text-[11px] text-zinc-300 leading-relaxed font-sans line-clamp-3">
            {reel.caption}
          </p>
        </motion.div>
      </div>

      {/* 3. RIGHT SIDE CONTROLS (Spring Slide-in from right) */}
      <div className="flex flex-row md:flex-col items-center justify-center gap-6 mt-4 md:mt-0 z-20">
        
        {/* Creator profile */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={isActive ? { x: 0, opacity: 1 } : { x: 60, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
          className="relative hidden md:block"
        >
          <div className="w-10 h-10 rounded-xl border border-zinc-800 overflow-hidden bg-zinc-900">
            <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${reel.author}`} alt={reel.author} className="w-full h-full object-cover" />
          </div>
        </motion.div>

        {/* Like */}
        <motion.button
          initial={{ x: 60, opacity: 0 }}
          animate={isActive ? { x: 0, opacity: 1 } : { x: 60, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.2 }}
          onClick={handleLike}
          whileTap={{ scale: 0.8 }}
          className="flex flex-col items-center gap-1 group"
        >
          <div className={`p-2.5 rounded-xl border transition-all ${liked ? 'bg-rose-500/10 border-rose-500/30 text-rose-500' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'}`}>
            <Heart className="w-4 h-4 fill-current" />
          </div>
          <span className="text-[10px] font-mono text-zinc-500">{likesCount}</span>
        </motion.button>

        {/* Comments */}
        <motion.button
          initial={{ x: 60, opacity: 0 }}
          animate={isActive ? { x: 0, opacity: 1 } : { x: 60, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.3 }}
          whileTap={{ scale: 0.8 }}
          className="flex flex-col items-center gap-1"
        >
          <div className="p-2.5 rounded-xl border bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white transition-colors">
            <MessageCircle className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-mono text-zinc-500">{reel.comments}</span>
        </motion.button>

        {/* Share */}
        <motion.button
          initial={{ x: 60, opacity: 0 }}
          animate={isActive ? { x: 0, opacity: 1 } : { x: 60, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.4 }}
          whileTap={{ scale: 0.8 }}
          className="flex flex-col items-center gap-1"
        >
          <div className="p-2.5 rounded-xl border bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white transition-colors">
            <Share2 className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-mono text-zinc-500">{reel.shares}</span>
        </motion.button>
      </div>

    </div>
  );
}

export default function ReelsPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef(null);

  // Intersection observer to track active slide
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const options = {
      root: container,
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index'), 10);
          setActiveIdx(index);
        }
      });
    }, options);

    const children = container.querySelectorAll('.snap-start');
    children.forEach((child) => observer.observe(child));

    return () => {
      children.forEach((child) => observer.unobserve(child));
    };
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-black text-white">
      
      {/* Top Floating Control Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-40">
        <Link
          href="/"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-850 text-zinc-400 hover:text-white transition-colors text-[10px] font-mono"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>INDEX.CLOSE()</span>
        </Link>
        
        <h1 className="text-xs font-black tracking-widest bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent uppercase">
          REEL_VIEWPORT //
        </h1>

        <button
          onClick={toggleMute}
          className="p-1.5 rounded-xl bg-zinc-950 border border-zinc-850 text-zinc-400 hover:text-white transition-colors"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Snap-Scrolling Container */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-y-scroll snap-y snap-mandatory scrollbar-none flex flex-col"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {REELS_DATA.map((reel, index) => (
          <div key={reel.id} data-index={index} className="snap-start w-full h-full">
            <ReelCard
              reel={reel}
              isActive={index === activeIdx}
              isMuted={isMuted}
              toggleMute={toggleMute}
              index={index}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
