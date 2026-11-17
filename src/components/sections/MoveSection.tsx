"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Workout, FitnessLevel } from '@/types/reset';
import { LeafEmblem, OliveSprig, GentleSun, ZenRipples } from '@/components/ui/BotanicalDecor';
import {
  Activity,
  Play,
  Clock,
  ShieldCheck,
  Filter,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

export const MoveSection: React.FC = () => {
  const { workouts, startWorkout, workoutHistory, userProfile } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedJoint, setSelectedJoint] = useState<string>('all');
  const [showArthritisDisclaimer, setShowArthritisDisclaimer] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'All Workouts' },
    { id: 'arthritis', label: '🌿 Arthritis Care' },
    { id: 'gentle', label: 'Gentle Movement' },
    { id: 'mobility', label: 'Stretching & Mobility' },
    { id: 'beginner', label: 'Beginner Workouts' },
    { id: 'strength', label: 'Kind Strength' },
    { id: 'cardio', label: 'Low-Impact Cardio' },
    { id: 'rest', label: 'Rest & Recovery' },
  ];

  const levels = [
    { id: 'all', label: 'All Levels' },
    { id: 'starting_again', label: 'Starting Again' },
    { id: 'building_strength', label: 'Building Strength' },
    { id: 'finding_rhythm', label: 'Finding Your Rhythm' },
  ];

  const joints = [
    { id: 'all', label: 'All Joints' },
    { id: 'Knees', label: 'Knees' },
    { id: 'Hands', label: 'Hands / Wrists' },
    { id: 'Shoulders', label: 'Shoulders' },
    { id: 'Lower Back', label: 'Back / Spine' },
  ];

  // Filtering
  const filteredWorkouts = workouts.filter((w) => {
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'arthritis' && !w.isArthritisFriendly && w.category !== 'arthritis') {
        return false;
      } else if (selectedCategory !== 'arthritis' && w.category !== selectedCategory) {
        return false;
      }
    }
    if (selectedLevel !== 'all' && w.level !== selectedLevel) {
      return false;
    }
    if (selectedJoint !== 'all') {
      const matchJoint = w.jointsProtected?.some((j) =>
        j.toLowerCase().includes(selectedJoint.toLowerCase())
      );
      if (!matchJoint) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      {/* 1. Header Banner */}
      <div className="bg-[#FAF6EE] border border-[#536451]/12 rounded-3xl p-6 sm:p-7 relative overflow-hidden shadow-xs">
        <OliveSprig className="absolute -bottom-4 -right-4 w-28 h-28 text-[#A9B7A0] opacity-25 pointer-events-none" />
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-xl bg-[#EDF2EB] text-[#536451]">
            <Activity className="w-5 h-5" />
          </span>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#536451]">
            Move Library • Zero-Intimidation Fitness
          </span>
        </div>
        <h2 className="text-2xl font-serif text-[#2C382A] font-medium mb-1">
          Movement Without Pressure
        </h2>
        <p className="text-xs sm:text-sm text-[#647362] max-w-xl leading-relaxed">
          Gentle, accessible home sessions designed to awaken energy, protect joints, and build steady strength. Move only within your pain-free range.
        </p>
      </div>

      {/* 2. Clinician-Reviewed Arthritis Pathway Banner */}
      <div className="bg-[#FFFFFF] border-2 border-[#A9B7A0]/40 rounded-3xl p-5 shadow-xs space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-2xl bg-[#EDF2EB] text-[#536451]">
              <ShieldCheck className="w-5 h-5 text-[#536451]" />
            </span>
            <div>
              <h3 className="font-serif text-base font-semibold text-[#2C382A]">
                Clinician-Reviewed Joint Care & Arthritis Pathway
              </h3>
              <p className="text-xs text-[#647362]">
                Carefully adapted isometric and low-load exercises to protect cartilage and reduce stiffness.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowArthritisDisclaimer(!showArthritisDisclaimer)}
            className="text-xs text-[#536451] hover:underline flex items-center gap-1 shrink-0"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Clinical Notice</span>
          </button>
        </div>

        {showArthritisDisclaimer && (
          <div className="bg-[#FAF6EE] border border-[#A9B7A0]/30 rounded-2xl p-4 text-xs text-[#2C382A] space-y-1 animate-in fade-in duration-200">
            <p className="font-semibold text-[#536451]">Medical Guidance & Independence:</p>
            <p className="text-[#647362] leading-relaxed">
              RESET provides evidence-based, clinician-reviewed movement modifications. We do not automatically diagnose conditions or prescribe medical treatment. Movement should never be forced during acute hot joint effusion. Please consult your physician or rheumatologist.
            </p>
          </div>
        )}

        {/* Joint Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#536451]/10 text-xs">
          <span className="text-[#647362] font-medium mr-1">Focus by joint:</span>
          {joints.map((joint) => (
            <button
              key={joint.id}
              onClick={() => setSelectedJoint(joint.id)}
              className={`px-3 py-1 rounded-xl border transition-all ${
                selectedJoint === joint.id
                  ? 'bg-[#536451] text-white border-[#536451] font-medium shadow-xs'
                  : 'bg-[#FAF6EE] border-[#536451]/15 text-[#647362] hover:bg-[#F5EBD8]'
              }`}
            >
              {joint.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Category & Level Filters */}
      <div className="space-y-3">
        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-medium whitespace-nowrap transition-all border shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-[#536451] text-[#FAF6EE] border-[#536451] shadow-xs'
                  : 'bg-[#FFFFFF] border-[#536451]/15 text-[#647362] hover:bg-[#FAF6EE]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Levels */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#647362] font-medium">Progression level:</span>
          {levels.map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => setSelectedLevel(lvl.id)}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-medium transition-all ${
                selectedLevel === lvl.id
                  ? 'bg-[#EDF2EB] text-[#536451] border border-[#536451]/30 font-semibold'
                  : 'text-[#647362] hover:text-[#2C382A]'
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Workout Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredWorkouts.length === 0 ? (
          <div className="col-span-2 text-center py-12 bg-white rounded-3xl border border-[#536451]/12 p-6">
            <Activity className="w-8 h-8 text-[#A9B7A0] mx-auto mb-2 opacity-70" />
            <p className="font-serif text-base text-[#2C382A]">No sessions match this filter.</p>
            <p className="text-xs text-[#647362] mt-1">
              Try switching back to &apos;All Workouts&apos; or choosing a different joint.
            </p>
          </div>
        ) : (
          filteredWorkouts.map((workout) => (
            <div
              key={workout.id}
              className="bg-[#FFFFFF] border border-[#536451]/12 rounded-3xl p-5 shadow-xs hover:border-[#A9B7A0] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Meta Badges */}
                <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#EDF2EB] text-[#536451] text-[11px] font-semibold">
                    {workout.difficulty}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-[#647362]">
                    <Clock className="w-3 h-3 text-[#A9B7A0]" />
                    <span>{workout.durationMinutes} mins</span>
                  </span>
                  {workout.isArthritisFriendly && (
                    <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-[#FAF6EE] text-[#536451] border border-[#A9B7A0]/40">
                      <ShieldCheck className="w-3 h-3 text-[#A9B7A0]" />
                      <span>Joint Friendly</span>
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-lg font-medium text-[#2C382A] mb-1.5">
                  {workout.name}
                </h3>
                <p className="text-xs text-[#647362] leading-relaxed mb-4 line-clamp-2">
                  {workout.description}
                </p>

                {/* Equipment & Joints */}
                <div className="space-y-1.5 text-[11px] text-[#647362] bg-[#FAF6EE]/50 p-3 rounded-2xl mb-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#2C382A]">Equipment:</span>
                    <span className="truncate max-w-[180px]">{workout.equipmentRequired.join(', ')}</span>
                  </div>
                  {workout.jointsProtected && (
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#2C382A]">Protects:</span>
                      <span>{workout.jointsProtected.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-2 border-t border-[#536451]/10 flex items-center justify-between">
                <span className="text-[11px] text-[#647362]">
                  {workout.steps.length} gentle steps
                </span>
                <button
                  onClick={() => startWorkout(workout)}
                  className="px-4 py-2 rounded-xl bg-[#536451] text-[#FAF6EE] text-xs font-semibold hover:bg-[#435241] shadow-xs flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start Workout</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 5. Completed Movement Log */}
      {workoutHistory.length > 0 && (
        <div className="bg-[#FFFFFF] border border-[#536451]/12 rounded-3xl p-5 shadow-xs space-y-3">
          <h4 className="font-serif text-base font-medium text-[#2C382A] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#A9B7A0]" />
            <span>Recent Completed Movement ({workoutHistory.length})</span>
          </h4>
          <div className="space-y-2">
            {workoutHistory.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF6EE]/60 text-xs text-[#2C382A]"
              >
                <div>
                  <p className="font-semibold">{item.workoutName}</p>
                  <p className="text-[11px] text-[#647362]">
                    {item.completedAt} • {item.durationMinutes} mins • {item.category}
                  </p>
                </div>
                {item.painAfter && (
                  <span className="px-2.5 py-1 rounded-full bg-[#EDF2EB] text-[#536451] text-[11px] font-medium">
                    Joints: {item.painAfter}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
