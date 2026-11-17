"use client";

import React from 'react';
import { useApp } from '@/context/AppContext';
import { TopHeader } from '@/components/navigation/TopHeader';
import { DesktopSidebar } from '@/components/navigation/DesktopSidebar';
import { BottomNav } from '@/components/navigation/BottomNav';
import { ToastContainer } from '@/components/ui/Toast';

// Sections
import { TodaySection } from '@/components/sections/TodaySection';
import { MoveSection } from '@/components/sections/MoveSection';
import { NourishSection } from '@/components/sections/NourishSection';
import { BreatheSection } from '@/components/sections/BreatheSection';
import { CycleSection } from '@/components/sections/CycleSection';
import { ProgressSection } from '@/components/sections/ProgressSection';

// Modals
import { OnboardingModal } from '@/components/onboarding/OnboardingModal';
import { DailyHappyThoughtModal } from '@/components/little-joys/DailyHappyThoughtModal';
import { SelfAppreciationModal } from '@/components/little-joys/SelfAppreciationModal';
import { WorkoutPlayerModal } from '@/components/sections/WorkoutPlayerModal';
import { RecipeDetailModal } from '@/components/sections/RecipeDetailModal';

export default function ResetApp() {
  const { activeTab, activeWorkout, selectedRecipe } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F5EE] text-[#2C382A]">
      {/* Top Header */}
      <TopHeader />

      {/* Main Responsive Layout */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar Navigation */}
        <DesktopSidebar />

        {/* Dynamic Section Content View */}
        <main className="flex-1 px-4 sm:px-8 py-6 md:py-8 overflow-y-auto">
          {activeTab === 'today' && <TodaySection />}
          {activeTab === 'move' && <MoveSection />}
          {activeTab === 'nourish' && <NourishSection />}
          {activeTab === 'breathe' && <BreatheSection />}
          {activeTab === 'cycle' && <CycleSection />}
          {activeTab === 'progress' && <ProgressSection />}
        </main>
      </div>

      {/* Mobile Floating Bottom Navigation */}
      <BottomNav />

      {/* Floating Modals & Overlays */}
      <OnboardingModal />
      <DailyHappyThoughtModal />
      <SelfAppreciationModal />
      {activeWorkout && <WorkoutPlayerModal workout={activeWorkout} />}
      {selectedRecipe && <RecipeDetailModal />}
      <ToastContainer />
    </div>
  );
}
