'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import PostCard from '@/components/Feed/PostCard';
import SkeletonLoader from '@/components/Feed/SkeletonLoader';
import { Search, Sparkles, Terminal } from 'lucide-react';

const SEED_POSTS = [
  {
    id: 'post-1',
    user_id: 'user-1',
    title: 'Virat Kohli: A Decade of Statistical Dominance in Modern Cricket',
    category: 'Cricket Stats',
    read_time: '6 min read',
    cover_image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-06-20T10:00:00Z',
    user: { display_name: 'Aditya Sharma', id: 'user-1' },
    content: `
# Virat Kohli: The Run-Machine's Statistical Legacy

Virat Kohli's career stats place him firmly in the pantheon of cricket legends. Let's look at his career statistics across formats.

### Career Summary Table
| Format | Matches | Innings | Runs | Average | Strike Rate | 100s | 50s | High Score |
|---|---|---|---|---|---|---|---|---|
| **Test** | 113 | 191 | 8,848 | 49.15 | 55.56 | 29 | 30 | 254* |
| **ODI** | 292 | 280 | 13,848 | 58.67 | 93.54 | 50 | 72 | 183 |
| **T20I** | 125 | 117 | 4,188 | 48.69 | 137.04 | 1 | 37 | 122* |

### Run Distribution & Innings Progression
Kohli's ability to chase targets in ODI cricket is unmatched, averaging over **65.24** in second-innings chases, with **27 centuries** in successful chases alone.
    `
  },
  {
    id: 'post-2',
    user_id: 'user-2',
    title: 'The Streetwear Uniform: Deconstructing Mom-Fit Baggy Jeans & Messy Fringe Fades',
    category: 'Streetwear',
    read_time: '4 min read',
    cover_image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-06-22T14:30:00Z',
    user: { display_name: 'Zara Chen', id: 'user-2' },
    content: `
# Deconstructing the Modern Streetwear Aesthetic

Streetwear in 2026 revolves around comfort, retro proportions, and effortless styling. Here's a mood board breakdown of the ultimate streetwear uniform.

### 1. The Foundation: Mom-Fit Baggy Jeans
* **Material:** Heavyweight 14oz raw selvedge denim.
* **Fit:** High-waisted, tapering slightly at the ankle, dragging over retro tennis sneakers.
* **Vibe:** Relaxed 90s skater meets modern architectural styling.

### 2. The Core: Heavyweight White T-Shirts
* **Grammage:** 280-360 GSM combed cotton.
* **Cut:** Boxy, drop-shoulder, mock neck collar that holds its structure.

### 3. The Silhouette: Messy Fringe Fade Hairstyles
* **Sides:** High-drop skin fade, keeping the temple clean.
* **Top:** Textured volume with a messy fringe hanging over the forehead, styled with matte clay for a natural finish.
    `
  },
  {
    id: 'post-3',
    user_id: 'user-1',
    title: 'Sachin Tendulkar: The Eternal Centurion Career Milestones',
    category: 'Cricket Stats',
    read_time: '8 min read',
    cover_image: 'https://images.unsplash.com/photo-1540747737956-37872404a8de?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-06-18T08:00:00Z',
    user: { display_name: 'Aditya Sharma', id: 'user-1' },
    content: `
# Sachin Tendulkar: The Landmark Centuries and Figures

Sachin Tendulkar's 24-year career remains the gold standard of longevity and statistical perfection. 

### Performance Against Quality Bowlers (1990-2013)
* **Runs in Test Matches:** 15,921 (Average: 53.78, 51 Centuries)
* **Runs in ODIs:** 18,426 (Average: 44.83, 49 Centuries)
* **Total International Runs:** 34,357

### Decade-by-Decade Century Progress
1. **1990 - 1999:** 52 Centuries (The Golden Era of Desert Storm)
2. **2000 - 2009:** 35 Centuries (Adaptation and mastering the straight drive)
3. **2010 - 2013:** 13 Centuries (Longevity and the double century peak)
    `
  },
  {
    id: 'post-4',
    user_id: 'user-3',
    title: 'Next.js 16 and the React Compiler: The Next Horizon',
    category: 'Tech',
    read_time: '5 min read',
    cover_image: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-06-23T11:15:00Z',
    user: { display_name: 'Marcus Vance', id: 'user-3' },
    content: `
# How React Compiler Changes Optimization in Next.js 16

Next.js 16 fully leverages the React Compiler (React Forget), rendering manual optimizations like \`useMemo\` and \`useCallback\` obsolete.

### Key Enhancements:
- **Auto-memoization:** Components compile to memoized forms under the hood.
- **Component Actions:** Asynchronous state actions with native hook bindings.
- **Turbopack Stable:** Asset compiling is 40x faster than traditional webpack configurations.
    `
  },
  {
    id: 'post-5',
    user_id: 'user-2',
    title: 'Vintage Japanese Denim: The Art of Indigo Dyeing',
    category: 'Streetwear',
    read_time: '7 min read',
    cover_image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-06-21T09:00:00Z',
    user: { display_name: 'Zara Chen', id: 'user-2' },
    content: `
# Crafting the Perfect Fade: Okayama Selvedge Denim

Okayama denim is world-famous. The secret lies in loop-dyeing cotton yarn with natural indigo, creating deep tones that fade into unique, beautiful stories over years of wear.
    `
  }
];

const CATEGORIES = [
  { id: 'All', index: '00', label: 'ALL ARCHIVES' },
  { id: 'Cricket Stats', index: '01', label: 'CRICKET STATS' },
  { id: 'Streetwear', index: '02', label: 'STREETWEAR LOGS' },
  { id: 'Tech', index: '03', label: 'TECH INDEX' }
];

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const sentinelRef = useRef(null);
  const isSentinelInView = useInView(sentinelRef, { margin: '200px' });

  // Initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(SEED_POSTS);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter logic
  const getFilteredPosts = () => {
    return posts.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.user?.display_name || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  const filteredPosts = getFilteredPosts();

  // Reset page when category or search changes
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setDisplayedPosts(filteredPosts.slice(0, 3));
  }, [selectedCategory, searchQuery, posts]);

  // Infinite scroll
  useEffect(() => {
    if (isSentinelInView && hasMore && !loading && posts.length > 0) {
      setLoading(true);
      const timer = setTimeout(() => {
        const nextPageIndex = page + 1;
        const start = page * 3;
        const end = start + 3;
        const nextBatch = filteredPosts.slice(start, end);

        if (nextBatch.length > 0) {
          setDisplayedPosts((prev) => [...prev, ...nextBatch]);
          setPage(nextPageIndex);
        } else {
          setHasMore(false);
        }
        setLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isSentinelInView, hasMore, loading, page, filteredPosts, posts]);

  return (
    <div className="flex-1 w-full flex flex-col md:flex-row bg-black min-h-screen sm:pl-20">
      
      {/* 1. FIXED LEFT SIDE: Masthead & Directory Info (35% Width on Desktop) */}
      <aside className="w-full md:w-[35%] border-r border-zinc-900 px-6 py-10 md:h-screen md:sticky md:top-0 flex flex-col justify-between bg-black z-20">
        <div className="space-y-10">
          
          {/* Masthead */}
          <div className="space-y-4">
            <span className="px-2 py-0.5 rounded text-[9px] font-bold font-mono bg-violet-950/40 border border-violet-800/40 text-violet-400 inline-flex items-center gap-1.5">
              <Terminal className="w-3 h-3" /> ONLINE INDEX
            </span>
            <h2 className="text-3xl font-black tracking-tight text-white leading-none uppercase">
              BLOGFORGE // <br />
              <span className="text-zinc-600">SUB.LOG</span>
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans max-w-sm">
              An opinionated, tactile catalog of digital artifacts, professional batting telemetry, and vintage streetwear details.
            </p>
          </div>

          {/* Search Ink */}
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-3 w-4 h-4 text-zinc-600" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search index logs..."
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:border-violet-500/80 text-white placeholder-zinc-700 transition-colors"
            />
          </div>

          {/* Index Category Toggles (Zine Style Numbered List) */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-widest text-zinc-600 font-bold uppercase">
              LOG INDEX
            </span>
            <ul className="space-y-1.5">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <li key={cat.id}>
                    <button
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left py-1 text-xs font-mono flex items-center gap-3 transition-colors ${
                        isActive 
                          ? 'text-violet-400 font-bold' 
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      <span>{cat.index} //</span>
                      <span className={isActive ? 'underline underline-offset-4 decoration-violet-500/60' : ''}>
                        {cat.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>

        {/* Ambient indicator tag */}
        <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-zinc-600 mt-8">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>REALTIME DB SYNC ACTIVE</span>
        </div>
      </aside>

      {/* 2. SCROLLABLE RIGHT SIDE: Masonry Catalog (65% Width on Desktop) */}
      <section className="flex-1 px-6 py-10 overflow-y-auto">
        {displayedPosts.length > 0 ? (
          <div className="masonry-grid w-full">
            {displayedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          !loading && (
            <div className="w-full text-center py-24 rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/20">
              <p className="text-zinc-500 text-sm font-mono">EOF // NO CORRESPONDING DATA LOGS</p>
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="mt-4 px-4 py-2 border border-zinc-800 bg-zinc-900 rounded-xl text-xs font-mono text-white hover:border-zinc-700 transition-colors"
              >
                Reset Filter Query
              </button>
            </div>
          )
        )}

        {/* Shimmer Loader */}
        {loading && (
          <div className="w-full mt-4">
            <SkeletonLoader />
          </div>
        )}

        {/* Infinite Scroll Sentinel */}
        <div ref={sentinelRef} className="w-full h-24 flex items-center justify-center text-zinc-700 font-mono text-[10px] tracking-wide">
          {hasMore && displayedPosts.length > 0 && !loading && (
            <span className="animate-pulse">FETCHING NEXT SEGMENT...</span>
          )}
          {!hasMore && displayedPosts.length > 0 && (
            <span className="text-zinc-600">END OF INDEX FILE // ALL ARTIFACTS RENDERED</span>
          )}
        </div>
      </section>

    </div>
  );
}
