import React from 'react';

export default function SkeletonLoader() {
  // Generate 6 skeleton cards for the loading state
  const items = Array.from({ length: 6 });

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 w-full">
      {items.map((_, index) => {
        // Stagger heights to simulate a masonry load
        const aspectClass = index % 3 === 0 
          ? 'aspect-[16/10]' 
          : index % 3 === 1 
            ? 'aspect-[4/3]' 
            : 'aspect-[16/9]';

        return (
          <div
            key={index}
            className="masonry-item mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/20 p-4 flex flex-col gap-4 animate-pulse"
          >
            {/* Shimmer Cover */}
            <div className={`w-full ${aspectClass} bg-zinc-800/30 rounded-xl relative overflow-hidden`} />

            {/* Shimmer Content */}
            <div className="space-y-4 pt-2">
              <div className="flex gap-4">
                <div className="h-3 w-16 bg-zinc-800/40 rounded-full" />
                <div className="h-3 w-20 bg-zinc-800/40 rounded-full" />
              </div>
              
              <div className="space-y-2">
                <div className="h-5 w-5/6 bg-zinc-800/50 rounded-lg" />
                <div className="h-5 w-2/3 bg-zinc-800/50 rounded-lg" />
              </div>

              <div className="space-y-1.5">
                <div className="h-3 w-full bg-zinc-800/30 rounded" />
                <div className="h-3 w-11/12 bg-zinc-800/30 rounded" />
              </div>

              <div className="pt-4 border-t border-zinc-800/30 flex justify-between">
                <div className="h-4 w-24 bg-zinc-800/40 rounded" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
