"use client";

import React from 'react';
import { useApp } from '@/context/AppContext';
import { LeafEmblem, GentleSparkle } from '@/components/ui/BotanicalDecor';
import { Volume2, VolumeX, UserCheck, Heart } from 'lucide-react';

export const TopHeader: React.FC = () => {
  const {
    userProfile,
    isMuted,
    toggleAudioMute,
    setIsHappyThoughtModalOpen,
    setIsSelfAppreciationModalOpen,
    resetOnboarding,
  } = useApp();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Gentle afternoon';
    return 'Peaceful evening';
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <header className="sticky top-0 z-30 bg-[#F8F5EE]/90 backdrop-blur-md border-b border-[#536451]/10 px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand & Date */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#EDF2EB] border border-[#A9B7A0]/40 flex items-center justify-center shadow-sm shrink-0">
            <LeafEmblem className="w-6 h-6" color="#536451" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg tracking-wider text-[#2C382A] font-serif">
                RESET
              </span>
              <span className="hidden sm:inline-block text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-[#E8C4CA]/30 text-[#536451] border border-[#E8C4CA]/50">
                A little care, every day
              </span>
            </div>
            <p className="text-xs text-[#647362] font-medium">
              {getGreeting()}, {userProfile.name || 'dear friend'} • {formattedDate}
            </p>
          </div>
        </div>

        {/* Right: Quick Calming Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Daily Happy Thought Pill */}
          <button
            onClick={() => setIsHappyThoughtModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF6EE] hover:bg-[#F5EBD8] border border-[#A9B7A0]/30 text-xs font-medium text-[#2C382A] transition-all hover:scale-[1.02] shadow-xs"
            title="Read Daily Happy Thought"
          >
            <GentleSparkle className="w-3.5 h-3.5" color="#A9B7A0" />
            <span className="hidden md:inline">Little Joys</span>
          </button>

          {/* Self-Appreciation Journal Pill */}
          <button
            onClick={() => setIsSelfAppreciationModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAEFF1] hover:bg-[#E8C4CA]/40 border border-[#E8C4CA]/40 text-xs font-medium text-[#2C382A] transition-all hover:scale-[1.02] shadow-xs"
            title="Something Good About Me"
          >
            <Heart className="w-3.5 h-3.5 text-[#C497A0]" />
            <span className="hidden md:inline">Something Good</span>
          </button>

          {/* Calming Sound Mute Toggle */}
          <button
            onClick={toggleAudioMute}
            className={`p-2 rounded-xl border transition-all ${
              isMuted
                ? 'bg-[#FAF6EE] border-[#536451]/15 text-[#647362]'
                : 'bg-[#EDF2EB] border-[#A9B7A0]/50 text-[#536451]'
            }`}
            title={isMuted ? 'Unmute gentle singing bowl chimes' : 'Mute singing bowl chimes'}
            aria-label="Toggle sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Profile / Preferences */}
          <button
            onClick={resetOnboarding}
            className="p-2 rounded-xl bg-[#FAF6EE] hover:bg-[#F5EBD8] border border-[#536451]/15 text-[#536451] transition-all"
            title="Adjust Wellbeing Preferences"
            aria-label="Settings"
          >
            <UserCheck className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
