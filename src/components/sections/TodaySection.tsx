"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { MoodType, HabitItem } from '@/types/reset';
import { LeafEmblem, OliveSprig, GentleSun, ZenRipples, GentleSparkle } from '@/components/ui/BotanicalDecor';
import {
  Sun,
  Wind,
  Activity,
  Plus,
  Check,
  Trash2,
  Droplets,
  Heart,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Info,
} from 'lucide-react';

export const TodaySection: React.FC = () => {
  const {
    userProfile,
    todayCheckIn,
    updateMood,
    updateEnergy,
    incrementWater,
    decrementWater,
    toggleHabit,
    habits,
    addCustomHabit,
    deleteHabit,
    workouts,
    startWorkout,
    setActiveTab,
    happyThoughts,
    currentThoughtIndex,
    nextThought,
    savedThoughtIds,
    toggleSaveThought,
    setIsSelfAppreciationModalOpen,
  } = useApp();

  const [newHabitTitle, setNewHabitTitle] = useState('');
  const [showAddHabit, setShowAddHabit] = useState(false);

  const currentThought = happyThoughts[currentThoughtIndex];
  const isThoughtSaved = savedThoughtIds.includes(currentThought.id);

  const moods: { id: MoodType; label: string; icon: string }[] = [
    { id: 'peaceful', label: 'Peaceful', icon: '🕊️' },
    { id: 'gentle', label: 'Gentle', icon: '🌱' },
    { id: 'energized', label: 'Energized', icon: '✨' },
    { id: 'tender', label: 'Tender', icon: '🌸' },
    { id: 'tired', label: 'Tired', icon: '🌙' },
    { id: 'grounded', label: 'Grounded', icon: '🌿' },
    { id: 'anxious', label: 'Anxious', icon: '🍂' },
  ];

  // Recommended workout based on user profile and today's energy
  const getRecommendedWorkout = () => {
    if (todayCheckIn.energy <= 2) {
      return (
        workouts.find((w) => w.id === 'workout_legs_up_wall') ||
        workouts.find((w) => w.category === 'gentle') ||
        workouts[0]
      );
    }
    if (userProfile.hasArthritis) {
      return (
        workouts.find((w) => w.category === 'arthritis') ||
        workouts.find((w) => w.isArthritisFriendly) ||
        workouts[0]
      );
    }
    return workouts[0];
  };

  const recommendedWorkout = getRecommendedWorkout();

  const handleAddHabitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitTitle.trim()) return;
    addCustomHabit(newHabitTitle.trim(), 'selfcare');
    setNewHabitTitle('');
    setShowAddHabit(false);
  };

  const completedCount = todayCheckIn.completedHabitIds.length;
  const totalCount = habits.length;

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      {/* 1. Daily Thought / Happy Note Banner */}
      <div className="relative bg-gradient-to-br from-[#FAF6EE] via-[#F4F2F9] to-[#EDF2EB] border border-[#A9B7A0]/30 rounded-3xl p-6 sm:p-7 shadow-xs overflow-hidden">
        <OliveSprig className="absolute -bottom-4 -right-4 w-28 h-28 text-[#A9B7A0] opacity-20 pointer-events-none" />

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-[#FFFFFF] text-[#536451] shadow-xs">
              <GentleSparkle className="w-4 h-4" color="#536451" />
            </span>
            <span className="text-[11px] uppercase tracking-widest font-semibold text-[#536451]">
              Today&apos;s Friendly Note
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => toggleSaveThought(currentThought.id)}
              className={`p-1.5 rounded-xl border text-xs transition-all ${
                isThoughtSaved
                  ? 'bg-[#FAEFF1] border-[#E8C4CA] text-[#C497A0]'
                  : 'bg-white/80 border-[#536451]/15 text-[#647362] hover:bg-white'
              }`}
              title="Save to Little Joys"
            >
              <Heart className={`w-3.5 h-3.5 ${isThoughtSaved ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={nextThought}
              className="px-2.5 py-1 rounded-xl bg-white/80 border border-[#536451]/15 text-[11px] font-medium text-[#536451] hover:bg-white transition-all"
            >
              Next
            </button>
          </div>
        </div>

        <p className="font-serif text-lg sm:text-xl text-[#2C382A] leading-relaxed max-w-2xl my-2">
          &ldquo;{currentThought.text}&rdquo;
        </p>

        <p className="text-[11px] text-[#647362] mt-1 font-sans">
          No expectations, no pressure. Take only what comforts you today.
        </p>
      </div>

      {/* 2. Mood & Energy Check-in */}
      <div className="bg-[#FFFFFF] border border-[#536451]/12 rounded-3xl p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-serif text-lg font-medium text-[#2C382A]">
              Daily Wellbeing Check-In
            </h3>
            <p className="text-xs text-[#647362]">
              How is your body and spirit arriving today?
            </p>
          </div>

          {/* Energy Rating Leaves */}
          <div className="flex items-center gap-1.5 bg-[#FAF6EE] px-3 py-1.5 rounded-2xl border border-[#536451]/10">
            <span className="text-xs text-[#647362] mr-1 font-medium">Energy:</span>
            {[1, 2, 3, 4, 5].map((lvl) => (
              <button
                key={lvl}
                onClick={() => updateEnergy(lvl)}
                className={`w-6 h-6 rounded-lg text-xs flex items-center justify-center transition-all ${
                  todayCheckIn.energy >= lvl
                    ? 'bg-[#536451] text-white scale-105'
                    : 'bg-[#EDF2EB] text-[#647362] hover:bg-[#E2EBE0]'
                }`}
                title={`Energy level ${lvl}`}
              >
                🌿
              </button>
            ))}
          </div>
        </div>

        {/* Mood Selector Pills */}
        <div className="flex flex-wrap gap-2">
          {moods.map((m) => {
            const isSelected = todayCheckIn.mood === m.id;
            return (
              <button
                key={m.id}
                onClick={() => updateMood(m.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-medium border transition-all ${
                  isSelected
                    ? 'bg-[#EDF2EB] border-[#536451] text-[#2C382A] shadow-xs scale-105'
                    : 'bg-[#FAF6EE]/50 border-[#536451]/15 text-[#647362] hover:bg-[#FAF6EE]'
                }`}
              >
                <span>{m.icon}</span>
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>

        {/* Adaptive message based on energy */}
        {todayCheckIn.energy <= 2 && (
          <div className="bg-[#FAF6EE] border border-[#A9B7A0]/40 rounded-2xl p-3.5 text-xs text-[#536451] flex items-center gap-2.5">
            <Info className="w-4 h-4 text-[#A9B7A0] shrink-0" />
            <p>
              Your energy is tender today ({todayCheckIn.energy}/5). We have softened your daily plan to gentle chair stretches, hydrating sips, and deep breaths.
            </p>
          </div>
        )}
      </div>

      {/* 3. Daily Habits Routine & Zero-Guilt Checklist */}
      <div className="bg-[#FFFFFF] border border-[#536451]/12 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-lg font-medium text-[#2C382A]">
                Gentle Daily Habits
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EDF2EB] text-[#536451] font-semibold">
                {completedCount} of {totalCount} completed
              </span>
            </div>
            <p className="text-xs text-[#647362] mt-0.5">
              Small steps that add up. Whatever you do today is always enough.
            </p>
          </div>

          <button
            onClick={() => setShowAddHabit(!showAddHabit)}
            className="flex items-center gap-1 text-xs font-medium text-[#536451] px-3 py-1.5 rounded-xl bg-[#FAF6EE] hover:bg-[#F5EBD8] border border-[#536451]/15 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Custom</span>
          </button>
        </div>

        {/* Add Habit Input */}
        {showAddHabit && (
          <form onSubmit={handleAddHabitSubmit} className="flex gap-2 pt-1 pb-2">
            <input
              type="text"
              value={newHabitTitle}
              onChange={(e) => setNewHabitTitle(e.target.value)}
              placeholder="e.g. Read 5 pages of a comforting book..."
              className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-[#FAF6EE] border border-[#536451]/20 text-[#2C382A] focus:outline-none focus:border-[#536451]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#536451] text-white rounded-xl text-xs font-semibold hover:bg-[#435241]"
            >
              Save
            </button>
          </form>
        )}

        {/* Habit List */}
        <div className="space-y-2.5">
          {habits.map((habit) => {
            const isCompleted = todayCheckIn.completedHabitIds.includes(habit.id);
            return (
              <div
                key={habit.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                  isCompleted
                    ? 'bg-[#EDF2EB]/50 border-[#A9B7A0]/40'
                    : 'bg-[#FAF6EE]/30 border-[#536451]/10 hover:bg-[#FAF6EE]/60'
                }`}
              >
                <div
                  onClick={() => toggleHabit(habit.id)}
                  className="flex items-start gap-3 cursor-pointer flex-1"
                >
                  <div
                    className={`w-5 h-5 rounded-lg mt-0.5 flex items-center justify-center shrink-0 border transition-all ${
                      isCompleted
                        ? 'bg-[#536451] border-[#536451] text-white'
                        : 'border-[#536451]/30 bg-white'
                    }`}
                  >
                    {isCompleted && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                  </div>

                  <div>
                    <p
                      className={`text-sm font-medium transition-all ${
                        isCompleted ? 'text-[#647362] line-through' : 'text-[#2C382A]'
                      }`}
                    >
                      {habit.title}
                    </p>
                    <p className="text-[11px] text-[#647362] mt-0.5">
                      {habit.gentleTip}
                    </p>
                  </div>
                </div>

                {habit.isCustom && (
                  <button
                    onClick={() => deleteHabit(habit.id)}
                    className="p-1 rounded-lg text-[#647362] hover:text-[#C497A0] transition-colors"
                    title="Remove custom habit"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Quick Access Grid: Recommended Movement, Breathe, Hydration, Something Good */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recommended Movement */}
        <div className="bg-[#FAF6EE] border border-[#536451]/12 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#536451]">
                <Activity className="w-4 h-4 text-[#A9B7A0]" />
                <span>Today&apos;s Gentle Movement</span>
              </span>
              <span className="text-xs text-[#647362]">
                {recommendedWorkout.durationMinutes} mins
              </span>
            </div>

            <h4 className="font-serif text-lg font-medium text-[#2C382A] mb-1">
              {recommendedWorkout.name}
            </h4>
            <p className="text-xs text-[#647362] line-clamp-2 mb-3">
              {recommendedWorkout.description}
            </p>

            {recommendedWorkout.isArthritisFriendly && (
              <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-white text-[#536451] border border-[#A9B7A0]/30 mb-3">
                <ShieldCheck className="w-3 h-3 text-[#A9B7A0]" />
                <span>Joint Protective Pacing</span>
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#536451]/10">
            <button
              onClick={() => setActiveTab('move')}
              className="text-xs font-medium text-[#647362] hover:text-[#2C382A]"
            >
              Browse Library
            </button>
            <button
              onClick={() => startWorkout(recommendedWorkout)}
              className="px-4 py-2 rounded-xl bg-[#536451] text-[#FAF6EE] text-xs font-semibold hover:bg-[#435241] shadow-xs flex items-center gap-1.5"
            >
              <span>Begin Session</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Hydration Tracker */}
        <div className="bg-[#FFFFFF] border border-[#536451]/12 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#536451]">
                <Droplets className="w-4 h-4 text-[#A9B7A0]" />
                <span>Hydration Rhythm</span>
              </span>
              <span className="text-xs font-semibold text-[#536451]">
                {todayCheckIn.waterGlasses} of 8 glasses ({todayCheckIn.waterGlasses * 250} ml)
              </span>
            </div>

            <p className="text-xs text-[#647362] mb-4">
              A tender sip of warm water or herbal tea whenever you remember.
            </p>

            {/* 8-glass visual droplet grid */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((glass) => {
                const isDrank = todayCheckIn.waterGlasses >= glass;
                return (
                  <button
                    key={glass}
                    onClick={incrementWater}
                    className={`py-2 rounded-xl text-center border text-xs font-medium transition-all ${
                      isDrank
                        ? 'bg-[#EDF2EB] border-[#536451] text-[#536451] shadow-xs'
                        : 'bg-[#FAF6EE]/50 border-[#536451]/15 text-[#647362]'
                    }`}
                  >
                    <span>{isDrank ? '💧' : '○'}</span>
                    <span className="block text-[10px] mt-0.5">Glass {glass}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#536451]/10 text-xs">
            <button
              onClick={decrementWater}
              disabled={todayCheckIn.waterGlasses === 0}
              className="px-3 py-1.5 rounded-lg border border-[#536451]/15 text-[#647362] hover:bg-[#FAF6EE] disabled:opacity-30"
            >
              - 1 glass
            </button>
            <button
              onClick={incrementWater}
              className="px-4 py-1.5 rounded-lg bg-[#536451] text-white font-medium hover:bg-[#435241]"
            >
              + Log 1 Glass
            </button>
          </div>
        </div>

        {/* Breathwork Quick Jump */}
        <div
          onClick={() => setActiveTab('breathe')}
          className="bg-[#F4F2F9] border border-[#C9C2DD]/40 rounded-3xl p-5 shadow-xs cursor-pointer hover:border-[#C9C2DD] transition-all flex items-center justify-between group"
        >
          <div>
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#536451] mb-1">
              <Wind className="w-4 h-4 text-[#A9B7A0]" />
              <span>Calming Breathwork</span>
            </span>
            <h4 className="font-serif text-base font-medium text-[#2C382A]">
              3-Minute Relaxation & Heart Coherence
            </h4>
            <p className="text-xs text-[#647362] mt-0.5">
              Animated soothing circle to dissolve tension in minutes.
            </p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white border border-[#C9C2DD]/60 flex items-center justify-center text-[#536451] group-hover:translate-x-1 transition-transform shrink-0 ml-3">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>

        {/* Something Good About Me Quick Jump */}
        <div
          onClick={() => setIsSelfAppreciationModalOpen(true)}
          className="bg-[#FAEFF1] border border-[#E8C4CA]/50 rounded-3xl p-5 shadow-xs cursor-pointer hover:border-[#E8C4CA] transition-all flex items-center justify-between group"
        >
          <div>
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C497A0] mb-1">
              <Heart className="w-4 h-4 text-[#C497A0] fill-current" />
              <span>Self-Appreciation Journal</span>
            </span>
            <h4 className="font-serif text-base font-medium text-[#2C382A]">
              What&apos;s one thing you like about yourself today?
            </h4>
            <p className="text-xs text-[#647362] mt-0.5">
              Write a gentle private thought in your heart book.
            </p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white border border-[#E8C4CA]/60 flex items-center justify-center text-[#C497A0] group-hover:translate-x-1 transition-transform shrink-0 ml-3">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};
