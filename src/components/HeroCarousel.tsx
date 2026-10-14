import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { HERO_IMAGES } from '../data/mockData';
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const HeroCarousel: React.FC = () => {
  const { t, setActiveTab, setSelectedDistrict } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentSlide = HERO_IMAGES[currentIndex];

  return (
    <section
      className="relative overflow-hidden bg-[#14532D] text-white min-h-[580px] lg:min-h-[620px] flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Sri Lanka Agricultural Showcase"
    >
      {/* Background Image Carousel with Ken Burns zoom effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {HERO_IMAGES.map((image, idx) => (
          <div
            key={image.url}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={image.url}
              alt={image.caption}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover ${idx === currentIndex ? 'animate-kenburns' : ''}`}
            />
            {/* Measured Multi-stop Scrim for WCAG AA readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#14532D]/95 via-[#14532D]/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14532D] via-transparent to-black/30" />
          </div>
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top Subtitle / Initiative Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-200 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-display leading-[1.15] text-white max-w-3xl">
              {t.hero.title}{' '}
              <span className="text-[#22C55E] block sm:inline">
                {t.hero.titleHighlight}
              </span>
            </h1>

            {/* Subtitle description */}
            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl font-light">
              {t.hero.subtitle}
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  setActiveTab('marketplace');
                  const target = document.getElementById('marketplace-section');
                  target?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-xl bg-[#22C55E] hover:bg-emerald-400 text-emerald-950 font-bold text-sm tracking-wide shadow-lg shadow-emerald-900/30 hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer group whitespace-nowrap"
              >
                <span>{t.hero.exploreBtn}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setActiveTab('farmer_dashboard')}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/20 transition-all cursor-pointer whitespace-nowrap"
              >
                {t.hero.farmerJoinBtn}
              </button>
            </div>

            {/* Trust Markers Bar */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-emerald-200/90 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                <span>Zero Middlemen Margin</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                <span>Direct LKR Farmer Payouts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                <span>Simulated SMS Dispatch Tracking</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Farm Spotlight Card */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl p-5 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl space-y-4">
              <div className="flex items-center justify-between text-xs text-emerald-300">
                <div className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-4 h-4 text-[#22C55E]" />
                  <span>District Spotlight</span>
                </div>
                <span className="font-mono text-emerald-200">
                  {currentIndex + 1} / {HERO_IMAGES.length}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white font-display">
                  {currentSlide.caption}
                </h3>
                <p className="text-xs text-emerald-100/80 mt-1 leading-normal">
                  {currentSlide.subtext}
                </p>
              </div>

              <div className="pt-2 border-t border-white/15 flex items-center justify-between">
                <button
                  onClick={() => {
                    setSelectedDistrict(currentSlide.district as any);
                    setActiveTab('marketplace');
                    document.getElementById('marketplace-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-semibold text-[#22C55E] hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Filter {currentSlide.district} crops</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {/* Carousel Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() =>
                      setCurrentIndex(
                        (prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length
                      )
                    }
                    className="p-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length)
                    }
                    className="p-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Metric Strip below hero */}
        <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-0.5">
            <div className="text-2xl sm:text-3xl font-bold font-display text-white tabular-nums">
              450+
            </div>
            <div className="text-xs text-emerald-200/80 font-medium">
              {t.hero.statsFarmers}
            </div>
          </div>

          <div className="space-y-0.5">
            <div className="text-2xl sm:text-3xl font-bold font-display text-white tabular-nums">
              8
            </div>
            <div className="text-xs text-emerald-200/80 font-medium">
              {t.hero.statsDistricts}
            </div>
          </div>

          <div className="space-y-0.5">
            <div className="text-2xl sm:text-3xl font-bold font-display text-white tabular-nums">
              100%
            </div>
            <div className="text-xs text-emerald-200/80 font-medium">
              {t.hero.statsDirectTrade}
            </div>
          </div>

          <div className="space-y-0.5">
            <div className="text-2xl sm:text-3xl font-bold font-display text-white tabular-nums">
              SL-GAP
            </div>
            <div className="text-xs text-emerald-200/80 font-medium">
              {t.hero.statsOrganic}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
