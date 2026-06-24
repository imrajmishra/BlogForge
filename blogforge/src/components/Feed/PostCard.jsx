'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

export default function PostCard({ post }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  // Formatting date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="masonry-item mb-6 break-inside-avoid overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/10 backdrop-blur-md transition-all duration-200 hover:border-violet-500/40 flex flex-col group"
    >
      {/* Cover Image with custom aspect ratio */}
      {post.cover_image && (
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950 border-b border-zinc-900">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102 filter grayscale contrast-110 group-hover:grayscale-0"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 px-2 py-0.5 text-[9px] font-mono font-bold bg-black/80 text-violet-400 border border-zinc-800 backdrop-blur-sm uppercase">
            {post.category || 'Article'}
          </div>
        </div>
      )}

      {/* Content body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Strict Monospace Metadata */}
          <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-500 mb-3 flex-wrap">
            <span className="flex items-center gap-1">
              BY / 
              <Link href={`/profile/${post.user_id}`} className="text-zinc-400 hover:text-violet-400 transition-colors uppercase font-bold">
                {post.user?.display_name || 'CREATOR'}
              </Link>
            </span>
            <span>•</span>
            <span className="uppercase">{formatDate(post.created_at)}</span>
            {post.read_time && (
              <>
                <span>•</span>
                <span className="uppercase text-violet-400/80">{post.read_time}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold tracking-tight text-white mb-2 leading-snug line-clamp-2 hover:text-violet-400 transition-colors uppercase">
            <Link href={`/post/${post.id}`}>{post.title}</Link>
          </h3>

          {/* Content snippet */}
          <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 mb-4 font-sans font-light">
            {post.content ? post.content.replace(/[#*`_-]/g, '').substring(0, 150) + '...' : 'No preview available.'}
          </p>
        </div>

        {/* Read action */}
        <div className="pt-3 border-t border-zinc-900 flex items-center justify-between">
          <Link
            href={`/post/${post.id}`}
            className="text-[10px] font-mono font-bold text-violet-400 hover:text-violet-300 transition-colors uppercase tracking-wider flex items-center gap-1 group/btn"
          >
            INDEX.READ()
            <span className="transition-transform duration-200 group-hover/btn:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
