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
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, userProfile } = useApp();

  const navItems = [
    { id: 'today', label: 'Today', icon: Sun },
    { id: 'move', label: 'Move', icon: Activity },
    { id: 'nourish', label: 'Nourish', icon: Salad },
    { id: 'breathe', label: 'Breathe', icon: Wind },
    ...(userProfile.trackCycle
      ? [{ id: 'cycle', label: 'My Cycle', icon: CalendarHeart }]
      : []),
    { id: 'progress', label: 'Progress', icon: LineChart },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-lg border-t border-[#536451]/12 px-2 py-1.5 shadow-[0_-4px_20px_rgba(83,100,81,0.06)]">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as typeof activeTab)}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-2xl transition-all ${
                isActive
                  ? 'text-[#536451] font-semibold'
                  : 'text-[#647362] hover:text-[#2C382A]'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-[#EDF2EB] text-[#536451] scale-105 shadow-xs'
                    : 'bg-transparent'
                }`}
              >
                <Icon className="w-5 h-5 stroke-[1.8]" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
