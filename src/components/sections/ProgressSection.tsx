"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { LeafEmblem, OliveSprig, GentleSun, ZenRipples } from '@/components/ui/BotanicalDecor';
import {
  LineChart,
  Activity,
  Heart,
  Droplets,
  Moon,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Award,
} from 'lucide-react';

export const ProgressSection: React.FC = () => {
  const {
    todayCheckIn,
    workoutHistory,
    habits,
    journalEntries,
    milestones,
    userProfile,
  } = useApp();

  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'all'>('week');

  const completedHabitsCount = todayCheckIn.completedHabitIds.length;
  const habitPercentage = Math.round((completedHabitsCount / Math.max(habits.length, 1)) * 100);

  const totalMovementMinutes = workoutHistory.reduce(
    (acc, curr) => acc + (curr.durationMinutes || 0),
    0
  );

  // Mock weekly trends data for peaceful SVG charts
  const weeklyEnergyData = [
    { day: 'Mon', energy: 3, sleep: 7.0 },
    { day: 'Tue', energy: 4, sleep: 7.5 },
    { day: 'Wed', energy: 3, sleep: 6.5 },
    { day: 'Thu', energy: 4, sleep: 8.0 },
    { day: 'Fri', energy: 5, sleep: 7.5 },
    { day: 'Sat', energy: 4, sleep: 8.5 },
    { day: 'Sun', energy: todayCheckIn.energy, sleep: todayCheckIn.sleepHours },
  ];

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      {/* 1. Header Banner */}
      <div className="bg-[#FAF6EE] border border-[#536451]/12 rounded-3xl p-6 sm:p-7 relative overflow-hidden shadow-xs">
        <OliveSprig className="absolute -bottom-4 -right-4 w-28 h-28 text-[#A9B7A0] opacity-25 pointer-events-none" />
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-xl bg-[#EDF2EB] text-[#536451]">
            <LineChart className="w-5 h-5" />
          </span>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#536451]">
            My Progress • Wellbeing Beyond Numbers
          </span>
        </div>
        <h2 className="text-2xl font-serif text-[#2C382A] font-medium mb-1">
          Honoring Every Small Step
        </h2>
        <p className="text-xs sm:text-sm text-[#647362] max-w-xl leading-relaxed">
          True health is not a number on a scale. It is waking up with softer shoulders, listening when your body asks for rest, and celebrating steady kindness.
        </p>

        {/* Timeframe Filter */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#536451]/10 text-xs">
          <span className="text-[#647362] font-medium">Viewing period:</span>
          {(['week', 'month', 'all'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1 rounded-xl capitalize transition-all ${
                timeframe === t
                  ? 'bg-[#536451] text-white font-medium shadow-xs'
                  : 'bg-white border border-[#536451]/15 text-[#647362] hover:bg-[#FAF6EE]'
              }`}
            >
              {t === 'week' ? 'This Week' : t === 'month' ? 'Past 30 Days' : 'All Time'}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Top Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {/* Habit Consistency */}
        <div className="bg-[#FFFFFF] border border-[#536451]/12 rounded-3xl p-4 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#536451] block mb-1">
            Habit Rhythm
          </span>
          <p className="font-serif text-2xl font-medium text-[#2C382A]">
            {habitPercentage}%
          </p>
          <p className="text-[11px] text-[#647362] mt-0.5">
            {completedHabitsCount} of {habits.length} rituals today
          </p>
        </div>

        {/* Mindful Movement */}
        <div className="bg-[#FFFFFF] border border-[#536451]/12 rounded-3xl p-4 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#536451] block mb-1">
            Movement
          </span>
          <p className="font-serif text-2xl font-medium text-[#2C382A]">
            {totalMovementMinutes} min
          </p>
          <p className="text-[11px] text-[#647362] mt-0.5">
            {workoutHistory.length} gentle sessions
          </p>
        </div>

        {/* Hydration */}
        <div className="bg-[#FFFFFF] border border-[#536451]/12 rounded-3xl p-4 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#536451] block mb-1">
            Hydration
          </span>
          <p className="font-serif text-2xl font-medium text-[#2C382A]">
            {todayCheckIn.waterGlasses * 250} ml
          </p>
          <p className="text-[11px] text-[#647362] mt-0.5">
            {todayCheckIn.waterGlasses} / 8 cups today
          </p>
        </div>

        {/* Self-Kindness Journal */}
        <div className="bg-[#FFFFFF] border border-[#536451]/12 rounded-3xl p-4 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C497A0] block mb-1">
            Self-Appreciation
          </span>
          <p className="font-serif text-2xl font-medium text-[#2C382A]">
            {journalEntries.length}
          </p>
          <p className="text-[11px] text-[#647362] mt-0.5">
            kind moments saved
          </p>
        </div>
      </div>

      {/* 3. Visual Charts Grid: Energy Fluctuations & Sleep Consistency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Weekly Energy Curve Chart */}
        <div className="bg-[#FFFFFF] border border-[#536451]/12 rounded-3xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-base font-medium text-[#2C382A]">
                Weekly Energy Flow
              </h3>
              <p className="text-xs text-[#647362]">
                Natural peaks and tender dips honored equally.
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#EDF2EB] text-[#536451] font-semibold">
              Avg: 3.8 / 5
            </span>
          </div>

          {/* SVG Energy Line & Area Visual */}
          <div className="h-44 w-full pt-4">
            <svg viewBox="0 0 320 120" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A9B7A0" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#A9B7A0" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="30" x2="320" y2="30" stroke="#536451" strokeOpacity="0.08" />
              <line x1="0" y1="70" x2="320" y2="70" stroke="#536451" strokeOpacity="0.08" />
              <line x1="0" y1="110" x2="320" y2="110" stroke="#536451" strokeOpacity="0.08" />

              {/* Area */}
              <polygon
                points="20,70 65,45 110,70 155,45 200,20 245,45 290,55 290,110 20,110"
                fill="url(#energyGrad)"
              />

              {/* Smooth Curve */}
              <polyline
                points="20,70 65,45 110,70 155,45 200,20 245,45 290,55"
                fill="none"
                stroke="#536451"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Points & Day Labels */}
              {weeklyEnergyData.map((d, i) => {
                const x = 20 + i * 45;
                const y = 110 - d.energy * 18;
                return (
                  <g key={d.day}>
                    <circle cx={x} cy={y} r="4.5" fill="#536451" stroke="#FAF6EE" strokeWidth="2" />
                    <text
                      x={x}
                      y="125"
                      textAnchor="middle"
                      className="text-[10px] fill-[#647362] font-sans"
                    >
                      {d.day}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Weekly Sleep Restfulness Bar Visual */}
        <div className="bg-[#FFFFFF] border border-[#536451]/12 rounded-3xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-base font-medium text-[#2C382A]">
                Rest & Sleep Rhythm
              </h3>
              <p className="text-xs text-[#647362]">
                Consistent restoration for muscle & brain ease.
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#FAF6EE] text-[#536451] font-semibold">
              Avg: 7.5 hrs
            </span>
          </div>

          <div className="h-44 w-full flex items-end justify-between gap-2 pt-6 pb-4 px-2">
            {weeklyEnergyData.map((d) => {
              const heightPercent = Math.min((d.sleep / 10) * 100, 100);
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <span className="text-[10px] text-[#647362] font-mono">
                    {d.sleep}h
                  </span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full max-w-[28px] bg-gradient-to-t from-[#A9B7A0] to-[#C9C2DD] rounded-xl transition-all"
                  />
                  <span className="text-[10px] text-[#647362]">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Personal Wellbeing Milestones & Badges */}
      <div className="bg-[#FFFFFF] border border-[#536451]/12 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-[#FAF6EE] text-[#536451]">
            <Award className="w-5 h-5" />
          </span>
          <div>
            <h3 className="font-serif text-lg font-medium text-[#2C382A]">
              Personal Wellbeing Milestones
            </h3>
            <p className="text-xs text-[#647362]">
              Quiet badges earned by tuning in and showing up with gentleness.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {milestones.map((m) => (
            <div
              key={m.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                m.achieved
                  ? 'bg-[#EDF2EB]/50 border-[#A9B7A0]/50 shadow-xs'
                  : 'bg-[#FAF6EE]/30 border-[#536451]/10 opacity-70'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                  m.achieved ? 'bg-[#536451] text-white shadow-xs' : 'bg-[#EDF2EB] text-[#647362]'
                }`}
              >
                {m.achieved ? <Sparkles className="w-5 h-5" /> : <Award className="w-5 h-5" />}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-serif text-sm font-semibold text-[#2C382A]">
                    {m.title}
                  </h4>
                  {m.achieved && (
                    <span className="text-[10px] text-[#536451] bg-white px-2 py-0.5 rounded-full border border-[#A9B7A0]/40 font-medium">
                      Unlocked
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#647362] mt-0.5">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
