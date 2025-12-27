
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { REELS, ReelItem, BRAND_PLACEHOLDER } from '../constants';

const ReelCard: React.FC<{ reel: ReelItem }> = ({ reel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [posterSrc, setPosterSrc] = useState(reel.poster || BRAND_PLACEHOLDER);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.6 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      onClick={() => navigate(`/product/${reel.productId}`)}
      className="flex-none w-[280px] md:w-[380px] aspect-[9/16] relative rounded-[2px] overflow-hidden group cursor-pointer snap-start transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] bg-brand-onyx"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        poster={posterSrc}
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-1000 group-hover:scale-105 transition-transform duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-40'}`}
      />
      
      {/* Loading/Fallback Poster */}
      {!isLoaded && (
        <img 
          src={posterSrc} 
          alt="" 
          onError={() => setPosterSrc(BRAND_PLACEHOLDER)}
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-30"
        />
      )}

      {/* Brand Watermark */}
      <div className="absolute top-8 right-8 z-10 select-none pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity">
        <span className="text-[10px] uppercase tracking-[0.8em] font-black text-white drop-shadow-2xl">ZONE J</span>
      </div>

      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-onyx via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>

      {/* Content Overlay */}
      <div className="absolute bottom-10 left-10 right-10 z-10 flex flex-col items-start transition-all duration-500 ease-out group-hover:-translate-y-2">
        <div className="overflow-hidden mb-3">
          <h3 className="text-2xl md:text-3xl font-serif text-white tracking-tighter leading-none text-balance translate-y-0 group-hover:-translate-y-1 transition-transform duration-500">
            {reel.title}
          </h3>
        </div>
        {reel.subtitle && (
          <div className="flex items-center space-x-4 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-8 h-[1px] bg-brand-gold"></div>
            <p className="text-[9px] uppercase tracking-[0.5em] text-white font-bold">
              {reel.subtitle}
            </p>
          </div>
        )}
      </div>

      {/* View Full Look Hint */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-brand-gold/20 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
    </div>
  );
};

const VideoShorts = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Enable horizontal mouse wheel scroll
  const handleWheel = (e: React.WheelEvent) => {
    if (scrollRef.current) {
      // If user is scrolling vertically, translate to horizontal
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        scrollRef.current.scrollLeft += e.deltaY;
      }
    }
  };

  return (
    <section className="py-40 bg-brand-onyx border-y border-white/5 overflow-hidden select-none">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        <div className="space-y-6">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-[1px] bg-brand-crimson"></div>
            <span className="text-brand-gold text-[10px] uppercase tracking-[1em] font-black">Style Journals</span>
          </div>
          <h2 className="text-6xl md:text-9xl font-serif text-white tracking-tighter leading-none">The Atelier <br />In Motion</h2>
        </div>
        
        <div className="flex flex-col items-start md:items-end">
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/40 font-black mb-4">Swipe to Explore</p>
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-12 h-[1px] bg-white/10"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal Scrolling Container */}
      <div 
        ref={scrollRef}
        onWheel={handleWheel}
        className="flex overflow-x-auto no-scrollbar gap-8 md:gap-12 px-8 md:px-16 snap-x snap-mandatory touch-pan-x pb-20"
      >
        {REELS.map((reel) => (
          <ReelCard key={reel.id} reel={reel} />
        ))}
        {/* Spacer for ending padding */}
        <div className="flex-none w-12 md:w-32 h-1"></div>
      </div>
    </section>
  );
};

export default VideoShorts;
