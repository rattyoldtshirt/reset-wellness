"use client";

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Workout, PainLevel } from '@/types/reset';
import { LeafEmblem, OliveSprig, ZenRipples } from '@/components/ui/BotanicalDecor';
import { calmAudio } from '@/components/ui/AudioChime';
import {
  X,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  CheckCircle,
  Volume2,
  VolumeX,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';

export const WorkoutPlayerModal: React.FC<{ workout: Workout }> = ({ workout }) => {
  const { closeWorkoutPlayer, logWorkoutCompletion, isMuted, toggleAudioMute } = useApp();

  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(
    workout.steps[0]?.seconds || 60
  );
  const [isActive, setIsActive] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Pain check-in states (clinician reviewed)
  const [painBefore, setPainBefore] = useState<PainLevel>('none');
  const [painAfter, setPainAfter] = useState<PainLevel>('none');
  const [showPainCheckIn, setShowPainCheckIn] = useState<boolean>(true);

  const currentStep = workout.steps[currentStepIdx];
  const totalSteps = workout.steps.length;

  // Countdown timer tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (isActive && secondsRemaining === 0) {
      // Step finished!
      calmAudio.playBowlChime(440);
      if (currentStepIdx < totalSteps - 1) {
        const nextIdx = currentStepIdx + 1;
        setCurrentStepIdx(nextIdx);
        setSecondsRemaining(workout.steps[nextIdx].seconds);
      } else {
        setIsActive(false);
        setIsCompleted(true);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsRemaining, currentStepIdx, totalSteps, workout.steps]);

  const togglePlayPause = () => {
    if (!hasStarted) {
      setHasStarted(true);
      calmAudio.playBowlChime(396);
    }
    setIsActive((prev) => !prev);
  };

  const handleNextStep = () => {
    if (currentStepIdx < totalSteps - 1) {
      const nextIdx = currentStepIdx + 1;
      setCurrentStepIdx(nextIdx);
      setSecondsRemaining(workout.steps[nextIdx].seconds);
      calmAudio.playBowlChime(440);
    } else {
      setIsActive(false);
      setIsCompleted(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIdx > 0) {
      const prevIdx = currentStepIdx - 1;
      setCurrentStepIdx(prevIdx);
      setSecondsRemaining(workout.steps[prevIdx].seconds);
    }
  };

  const handleRestartStep = () => {
    setSecondsRemaining(currentStep.seconds);
  };

  const handleCompleteWorkout = () => {
    logWorkoutCompletion({
      workoutId: workout.id,
      workoutName: workout.name,
      category: workout.category,
      durationMinutes: workout.durationMinutes,
      completedAt: 'Just now',
      painBefore,
      painAfter,
    });
    closeWorkoutPlayer();
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Pre-workout pain check-in modal step
  if (showPainCheckIn) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C382A]/40 backdrop-blur-sm overflow-y-auto">
        <div className="relative w-full max-w-lg bg-[#FAF6EE] border border-[#536451]/20 rounded-3xl p-6 sm:p-8 shadow-2xl animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#536451]">
              <ShieldCheck className="w-4 h-4 text-[#A9B7A0]" />
              <span>Pre-Movement Comfort Check</span>
            </span>
            <button
              onClick={closeWorkoutPlayer}
              className="p-1.5 rounded-full hover:bg-white text-[#647362]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h3 className="font-serif text-xl font-medium text-[#2C382A] mb-2">
            How are your joints and body feeling right now?
          </h3>
          <p className="text-xs text-[#647362] leading-relaxed mb-6">
            We adapt every movement to your comfort. There is zero pressure to push through discomfort.
          </p>

          <div className="space-y-2.5 mb-6">
            {[
              { id: 'none', label: 'Comfortable & Pain-Free', desc: 'Feeling ready for gentle flow.' },
              { id: 'mild', label: 'Mild Stiffness / Tightness', desc: 'Appreciates soft warming movements.' },
              { id: 'moderate', label: 'Moderate Joint Ache', desc: 'Will stick strictly to low-load modifications.' },
              { id: 'flare_up', label: 'Active Flare-Up / Acute Ache', desc: 'We recommend restorative rest or breathing today.' },
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => setPainBefore(option.id as PainLevel)}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all ${
                  painBefore === option.id
                    ? 'bg-[#EDF2EB] border-[#536451] shadow-xs'
                    : 'bg-[#FFFFFF] border-[#536451]/15 hover:bg-[#FAF6EE]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[#2C382A]">{option.label}</p>
                  {painBefore === option.id && <LeafEmblem className="w-4 h-4" color="#536451" />}
                </div>
                <p className="text-xs text-[#647362] mt-0.5">{option.desc}</p>
              </button>
            ))}
          </div>

          {painBefore === 'flare_up' ? (
            <div className="p-4 rounded-2xl bg-[#FAEFF1] border border-[#E8C4CA] text-xs text-[#2C382A] mb-6 space-y-1">
              <p className="font-semibold text-[#C497A0]">Careful Rest Recommendation:</p>
              <p>
                During an acute flare-up, joint rest and gentle breathing are clinically best. Would you prefer our gentle Guided Breathwork session instead?
              </p>
            </div>
          ) : null}

          <div className="flex justify-end gap-3">
            <button
              onClick={closeWorkoutPlayer}
              className="px-4 py-2.5 rounded-xl text-xs font-medium text-[#647362] hover:bg-white"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setShowPainCheckIn(false);
                setIsActive(true);
                setHasStarted(true);
                calmAudio.playBowlChime(396);
              }}
              className="px-6 py-2.5 rounded-2xl bg-[#536451] text-[#FAF6EE] text-xs font-semibold hover:bg-[#435241] shadow-xs"
            >
              Begin Mindful Flow
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Completion screen
  if (isCompleted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C382A]/40 backdrop-blur-sm overflow-y-auto">
        <div className="relative w-full max-w-lg bg-[#FAF6EE] border border-[#A9B7A0]/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-center animate-in zoom-in-95 duration-200">
          <OliveSprig className="w-20 h-20 text-[#A9B7A0] mx-auto mb-3" />
          <h3 className="font-serif text-2xl font-medium text-[#2C382A] mb-2">
            Movement Completed With Care
          </h3>
          <p className="text-sm text-[#647362] leading-relaxed mb-6">
            Thank you for honoring your body today, {workout.name}. Every gentle movement creates quiet ripples of health.
          </p>

          {/* Post-movement joint check */}
          <div className="bg-[#FFFFFF] border border-[#536451]/15 rounded-2xl p-4 text-left mb-6">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#536451] mb-2">
              Post-movement joint check:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'none', label: 'Joints feel looser' },
                { id: 'mild', label: 'Comfortable ache' },
                { id: 'moderate', label: 'Needs gentle rest' },
                { id: 'flare_up', label: 'Tender / Ice needed' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPainAfter(p.id as PainLevel)}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    painAfter === p.id
                      ? 'bg-[#EDF2EB] border-[#536451] font-semibold text-[#536451]'
                      : 'bg-[#FAF6EE] border-[#536451]/15 text-[#647362]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleCompleteWorkout}
            className="w-full py-3 rounded-2xl bg-[#536451] text-[#FAF6EE] text-sm font-semibold hover:bg-[#435241] shadow-xs"
          >
            Save to My Wellness Journey
          </button>
        </div>
      </div>
    );
  }

  // Active workout runner
  const progressPercent = ((currentStep.seconds - secondsRemaining) / currentStep.seconds) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#2C382A]/40 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#FAF6EE] border border-[#536451]/20 rounded-3xl p-5 sm:p-8 shadow-2xl overflow-hidden my-4">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#536451]/10">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#536451]">
              Step {currentStepIdx + 1} of {totalSteps} • {workout.category}
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-medium text-[#2C382A] truncate max-w-xs sm:max-w-md">
              {workout.name}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleAudioMute}
              className="p-2 rounded-xl bg-white border border-[#536451]/15 text-[#536451]"
              title="Toggle chimes"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={closeWorkoutPlayer}
              className="p-2 rounded-xl bg-white border border-[#536451]/15 text-[#647362] hover:text-[#2C382A]"
              title="Exit workout"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div className="flex gap-1.5 mb-6">
          {workout.steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full flex-1 transition-all ${
                i < currentStepIdx
                  ? 'bg-[#536451]'
                  : i === currentStepIdx
                  ? 'bg-[#A9B7A0]'
                  : 'bg-[#EDF2EB]'
              }`}
            />
          ))}
        </div>

        {/* Current Step Display & Circular Countdown Timer */}
        <div className="text-center space-y-4 my-2">
          {/* Circular Countdown Ring */}
          <div className="relative w-44 h-44 sm:w-48 sm:h-48 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="#EDF2EB"
                strokeWidth="5"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="#536451"
                strokeWidth="5"
                strokeDasharray="264"
                strokeDashoffset={264 - (264 * progressPercent) / 100}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-500 ease-linear"
              />
            </svg>

            {/* Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-serif text-3xl sm:text-4xl font-semibold text-[#2C382A] tracking-tight">
                {formatTime(secondsRemaining)}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#647362] mt-0.5">
                {isActive ? 'In Motion' : 'Paused'}
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-xl sm:text-2xl font-medium text-[#2C382A] mb-1">
              {currentStep.name}
            </h4>
            <p className="text-xs sm:text-sm text-[#536451] max-w-md mx-auto italic font-serif">
              &ldquo;{currentStep.cue}&rdquo;
            </p>
          </div>
        </div>

        {/* Clinician Modification & Joint Safety Note */}
        {workout.modifications && workout.modifications.length > 0 && (
          <div className="bg-[#FFFFFF] border border-[#536451]/12 rounded-2xl p-3.5 my-5 text-xs text-[#647362] flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#A9B7A0] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#2C382A] block mb-0.5">
                Gentle Modification:
              </span>
              <span>{workout.modifications[0]}</span>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={handlePrevStep}
            disabled={currentStepIdx === 0}
            className="p-3 rounded-2xl bg-white border border-[#536451]/15 text-[#647362] disabled:opacity-30 hover:bg-[#FAF6EE] transition-all"
            title="Previous step"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={handleRestartStep}
            className="p-3 rounded-2xl bg-white border border-[#536451]/15 text-[#647362] hover:bg-[#FAF6EE] transition-all"
            title="Restart step timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={togglePlayPause}
            className="p-4 rounded-3xl bg-[#536451] hover:bg-[#435241] text-[#FAF6EE] shadow-md transition-all scale-105 active:scale-95"
            title={isActive ? 'Pause' : 'Start'}
          >
            {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
          </button>

          <button
            onClick={handleNextStep}
            className="p-3 rounded-2xl bg-white border border-[#536451]/15 text-[#647362] hover:bg-[#FAF6EE] transition-all"
            title="Next step"
          >
            <SkipForward className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsCompleted(true)}
            className="p-3 rounded-2xl bg-[#EDF2EB] border border-[#A9B7A0]/40 text-[#536451] hover:bg-[#E2EBE0] transition-all"
            title="Finish workout"
          >
            <CheckCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
