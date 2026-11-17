"use client";

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  Sun,
  Activity,
  Salad,
  Wind,
  CalendarHeart,
  LineChart,
  Sparkles,
  HeartHandshake,
} from 'lucide-react';
import { LeafEmblem, OliveSprig } from '@/components/ui/BotanicalDecor';

export const DesktopSidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    userProfile,
    todayCheckIn,
    setIsHappyThoughtModalOpen,
    setIsSelfAppreciationModalOpen,
  } = useApp();

  const navItems = [
    { id: 'today', label: 'Today', description: 'Daily wellness & rituals', icon: Sun },
    { id: 'move', label: 'Move', description: 'Home fitness & joint care', icon: Activity },
    { id: 'nourish', label: 'Nourish', description: 'Everyday intuitive nutrition', icon: Salad },
    { id: 'breathe', label: 'Breathe', description: 'Breathwork & mindfulness', icon: Wind },
    ...(userProfile.trackCycle
      ? [{ id: 'cycle', label: 'My Cycle', description: 'Menstrual harmony & flow', icon: CalendarHeart }]
      : []),
    { id: 'progress', label: 'My Progress', description: 'Consistency beyond weight', icon: LineChart },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 border-r border-[#536451]/10 bg-[#FFFFFF]/70 backdrop-blur-md p-5 shrink-0 min-h-[calc(100vh-65px)]">
      {/* Botanical Header Card */}
      <div className="bg-[#FAF6EE] border border-[#A9B7A0]/30 rounded-2xl p-4 mb-6 relative overflow-hidden">
        <OliveSprig className="absolute -bottom-3 -right-3 w-16 h-16 opacity-30 pointer-events-none" />
        <div className="flex items-center gap-2 mb-1.5">
          <LeafEmblem className="w-4 h-4" color="#536451" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#536451]">
            Daily Intention
          </span>
        </div>
        <p className="text-xs text-[#2C382A] italic leading-relaxed font-serif">
          &ldquo;Progress without pressure. Movement without intimidation.&rdquo;
        </p>
      </div>

      {/* Main Navigation Links */}
      <nav className="space-y-1.5 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as typeof activeTab)}
              className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-left transition-all group ${
                isActive
                  ? 'bg-[#EDF2EB] text-[#536451] shadow-xs font-semibold'
                  : 'text-[#647362] hover:bg-[#FAF6EE] hover:text-[#2C382A]'
              }`}
            >
              <div
                className={`p-2 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-[#FFFFFF] text-[#536451] shadow-xs'
                    : 'bg-[#FAF6EE] group-hover:bg-[#EDF2EB] text-[#647362]'
                }`}
              >
                <Icon className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div className="min-w-0">
                <p className="text-sm tracking-tight leading-tight">{item.label}</p>
                <p className="text-[11px] text-[#647362]/80 truncate mt-0.5 font-normal">
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Bottom Shortcuts: Little Joys & Daily Energy */}
      <div className="pt-4 border-t border-[#536451]/10 space-y-2">
        <div className="flex items-center justify-between text-xs px-2 py-1 text-[#647362]">
          <span>Today&apos;s Energy:</span>
          <span className="font-semibold text-[#536451]">
            {'🌿'.repeat(todayCheckIn.energy)} ({todayCheckIn.energy}/5)
          </span>
        </div>

        <button
          onClick={() => setIsHappyThoughtModalOpen(true)}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#FAF6EE] hover:bg-[#F5EBD8] border border-[#A9B7A0]/30 text-xs font-medium text-[#2C382A] transition-colors"
        >
          <Sparkles className="w-4 h-4 text-[#A9B7A0]" />
          <span>Little Joys Sparkle</span>
        </button>

        <button
          onClick={() => setIsSelfAppreciationModalOpen(true)}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#FAEFF1] hover:bg-[#E8C4CA]/40 border border-[#E8C4CA]/40 text-xs font-medium text-[#2C382A] transition-colors"
        >
          <HeartHandshake className="w-4 h-4 text-[#C497A0]" />
          <span>Something Good About Me</span>
        </button>
      </div>
    </aside>
  );
};
