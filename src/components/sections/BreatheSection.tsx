"use client";

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { BreathingExercise, GuidedMeditation } from '@/types/reset';
import { BREATHING_EXERCISES, GUIDED_MEDITATIONS } from '@/data/resetData';
import { LeafEmblem, OliveSprig, ZenRipples } from '@/components/ui/BotanicalDecor';
import { calmAudio } from '@/components/ui/AudioChime';
import {
  Wind,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Heart,
  Clock,
  Compass,
} from 'lucide-react';

type BreathPhase = 'Inhale' | 'Hold' | 'Exhale' | 'Rest';

export const BreatheSection: React.FC = () => {
  const { isMuted, toggleAudioMute, showToast } = useApp();

  const [selectedExercise, setSelectedExercise] = useState<BreathingExercise>(
    BREATHING_EXERCISES[0]
  );
  const [targetMinutes, setTargetMinutes] = useState<number>(3);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [currentPhase, setCurrentPhase] = useState<BreathPhase>('Inhale');
  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState<number>(
    selectedExercise.inhaleSec
  );
  const [totalSecondsElapsed, setTotalSecondsElapsed] = useState<number>(0);

  // Guided Meditation state
  const [activeMeditation, setActiveMeditation] = useState<GuidedMeditation | null>(null);
  const [meditationQuoteIdx, setMeditationQuoteIdx] = useState<number>(0);

  // Switch exercise
  const switchExercise = (exercise: BreathingExercise) => {
    setIsActive(false);
    setSelectedExercise(exercise);
    setCurrentPhase('Inhale');
    setPhaseSecondsLeft(exercise.inhaleSec);
    setTotalSecondsElapsed(0);
  };

  // Timer loop for Breathwork
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setTotalSecondsElapsed((prev) => {
          const updated = prev + 1;
          if (updated >= targetMinutes * 60) {
            setIsActive(false);
            calmAudio.playGentleCelebration();
            showToast('Breathwork completed. Carry this calm with you 🕊️');
          }
          return updated;
        });

        setPhaseSecondsLeft((prev) => {
          if (prev <= 1) {
            // Transition to next phase
            let nextPhase: BreathPhase = 'Inhale';
            let nextSeconds = selectedExercise.inhaleSec;

            if (currentPhase === 'Inhale') {
              if (selectedExercise.holdSec > 0) {
                nextPhase = 'Hold';
                nextSeconds = selectedExercise.holdSec;
              } else {
                nextPhase = 'Exhale';
                nextSeconds = selectedExercise.exhaleSec;
                calmAudio.playBreathOutCue();
              }
            } else if (currentPhase === 'Hold') {
              nextPhase = 'Exhale';
              nextSeconds = selectedExercise.exhaleSec;
              calmAudio.playBreathOutCue();
            } else if (currentPhase === 'Exhale') {
              if (selectedExercise.restSec > 0) {
                nextPhase = 'Rest';
                nextSeconds = selectedExercise.restSec;
              } else {
                nextPhase = 'Inhale';
                nextSeconds = selectedExercise.inhaleSec;
                calmAudio.playBreathInCue();
              }
            } else {
              nextPhase = 'Inhale';
              nextSeconds = selectedExercise.inhaleSec;
              calmAudio.playBreathInCue();
            }

            setCurrentPhase(nextPhase);
            return nextSeconds;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, currentPhase, selectedExercise, targetMinutes, showToast]);

  const toggleBreathe = () => {
    if (!isActive) {
      calmAudio.playBowlChime(396);
    }
    setIsActive((prev) => !prev);
  };

  const resetBreathe = () => {
    setIsActive(false);
    setCurrentPhase('Inhale');
    setPhaseSecondsLeft(selectedExercise.inhaleSec);
    setTotalSecondsElapsed(0);
  };

  // Phase scale styling for animated circle
  const getCircleScaleClass = () => {
    if (!isActive) return 'scale-100';
    if (currentPhase === 'Inhale') return 'scale-135 transition-transform duration-[4000ms] ease-out';
    if (currentPhase === 'Hold') return 'scale-135';
    if (currentPhase === 'Exhale') return 'scale-90 transition-transform duration-[6000ms] ease-in-out';
    return 'scale-90';
  };

  const getPhaseInstruction = () => {
    switch (currentPhase) {
      case 'Inhale':
        return 'Gently breathe in through your nose...';
      case 'Hold':
        return 'Soft, spacious stillness...';
      case 'Exhale':
        return 'Softly let go through parted lips...';
      case 'Rest':
        return 'Natural quiet resting...';
    }
  };

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      {/* 1. Header Banner */}
      <div className="bg-[#FAF6EE] border border-[#536451]/12 rounded-3xl p-6 sm:p-7 relative overflow-hidden shadow-xs">
        <OliveSprig className="absolute -bottom-4 -right-4 w-28 h-28 text-[#C9C2DD] opacity-25 pointer-events-none" />
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-xl bg-[#F4F2F9] text-[#536451]">
            <Wind className="w-5 h-5" />
          </span>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#536451]">
            Breathe • Mindful Nervous System Care
          </span>
        </div>
        <h2 className="text-2xl font-serif text-[#2C382A] font-medium mb-1">
          Slow Down, Space Awaits
        </h2>
        <p className="text-xs sm:text-sm text-[#647362] max-w-xl leading-relaxed">
          Follow the expanding and contracting rhythm. No forced breath holding; stop or pause whenever you wish.
        </p>
      </div>

      {/* 2. Interactive Breathwork Studio */}
      <div className="bg-[#FFFFFF] border border-[#536451]/12 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col items-center justify-center text-center relative overflow-hidden">
        {/* Background Zen Rings */}
        <ZenRipples className="absolute inset-0 m-auto w-80 h-80 opacity-20 pointer-events-none" color="#A9B7A0" />

        {/* Top Controls: Sound Mute & Duration */}
        <div className="w-full flex items-center justify-between mb-8 z-10">
          <div className="flex items-center gap-1.5 text-xs text-[#647362]">
            <span>Session time:</span>
            {[1, 2, 3, 5].map((m) => (
              <button
                key={m}
                onClick={() => setTargetMinutes(m)}
                className={`px-2.5 py-1 rounded-xl text-xs font-medium transition-all ${
                  targetMinutes === m
                    ? 'bg-[#EDF2EB] text-[#536451] font-semibold border border-[#536451]/20'
                    : 'hover:bg-[#FAF6EE]'
                }`}
              >
                {m}m
              </button>
            ))}
          </div>

          <button
            onClick={toggleAudioMute}
            className="p-2 rounded-xl bg-[#FAF6EE] border border-[#536451]/15 text-[#536451] hover:bg-[#F5EBD8] transition-colors"
            title="Toggle singing bowl chime"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Animated Expanding/Contracting Circle Container */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 my-4 flex items-center justify-center">
          {/* Outer Pulsing Glow Aura */}
          <div
            className={`absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-[#A9B7A0]/25 via-[#C9C2DD]/30 to-[#E8C4CA]/25 blur-xl transition-all duration-1000 ${
              isActive ? 'opacity-80 scale-120' : 'opacity-40 scale-100'
            }`}
          />

          {/* Main Breathing Circle */}
          <div
            className={`w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gradient-to-tr from-[#FAF6EE] via-[#EDF2EB] to-[#F4F2F9] border-2 border-[#A9B7A0]/60 shadow-lg flex flex-col items-center justify-center p-4 z-10 transition-transform ${getCircleScaleClass()}`}
          >
            <span className="font-serif text-2xl sm:text-3xl font-medium text-[#2C382A] tracking-tight">
              {isActive ? currentPhase : 'Breathe'}
            </span>
            <span className="text-sm font-semibold text-[#536451] mt-1">
              {isActive ? `${phaseSecondsLeft}s` : 'Tap to start'}
            </span>
          </div>
        </div>

        {/* Gentle Instruction Text */}
        <p className="font-serif text-base sm:text-lg text-[#2C382A] mt-4 min-h-[32px] font-normal italic">
          {isActive ? getPhaseInstruction() : `Preset: ${selectedExercise.name}`}
        </p>

        <p className="text-xs text-[#647362] mt-1 max-w-sm">
          {selectedExercise.tagline}
        </p>

        {/* Control Buttons */}
        <div className="flex items-center gap-3 mt-6 z-10">
          <button
            onClick={resetBreathe}
            className="p-3 rounded-2xl bg-[#FAF6EE] border border-[#536451]/15 text-[#647362] hover:bg-[#F5EBD8] transition-all"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={toggleBreathe}
            className="px-6 py-3 rounded-2xl bg-[#536451] hover:bg-[#435241] text-[#FAF6EE] font-semibold text-xs tracking-wider uppercase shadow-md transition-all flex items-center gap-2"
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            <span>{isActive ? 'Pause' : 'Start Flow'}</span>
          </button>
        </div>
      </div>

      {/* 3. Breathing Rhythm Presets */}
      <div className="space-y-3">
        <h3 className="font-serif text-lg font-medium text-[#2C382A]">
          Calming Breathing Presets
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BREATHING_EXERCISES.map((exercise) => {
            const isSelected = selectedExercise.id === exercise.id;
            return (
              <div
                key={exercise.id}
                onClick={() => switchExercise(exercise)}
                className={`p-4 rounded-3xl border text-left cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#EDF2EB] border-[#536451] shadow-xs'
                    : 'bg-[#FFFFFF] border-[#536451]/12 hover:bg-[#FAF6EE]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-serif text-sm font-semibold text-[#2C382A]">
                    {exercise.name}
                  </h4>
                  <span className="text-[11px] font-mono text-[#536451]">
                    {exercise.inhaleSec}s - {exercise.holdSec}s - {exercise.exhaleSec}s
                  </span>
                </div>
                <p className="text-xs text-[#647362]">{exercise.tagline}</p>
                <p className="text-[11px] text-[#536451] mt-2 font-medium">
                  Best for: {exercise.focus}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Guided Mindfulness & Meditations */}
      <div className="bg-[#FFFFFF] border border-[#536451]/12 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-[#FAEFF1] text-[#C497A0]">
              <Heart className="w-4 h-4 fill-current" />
            </span>
            <h3 className="font-serif text-lg font-medium text-[#2C382A]">
              Guided Mindfulness Moments
            </h3>
          </div>
          <span className="text-xs text-[#647362]">Restorative Somatic Reflections</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {GUIDED_MEDITATIONS.map((med) => {
            const isOpened = activeMeditation?.id === med.id;
            return (
              <div
                key={med.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isOpened ? 'bg-[#FAF6EE] border-[#536451]' : 'bg-[#FAF6EE]/40 border-[#536451]/10'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-[#536451]">{med.category}</span>
                  <span className="text-[#647362]">{med.durationMinutes} mins</span>
                </div>
                <h4 className="font-serif text-base font-medium text-[#2C382A] mb-1">
                  {med.title}
                </h4>
                <p className="text-xs text-[#647362] mb-3">{med.description}</p>

                {isOpened ? (
                  <div className="space-y-3 pt-2 border-t border-[#536451]/10">
                    <p className="text-xs font-serif italic text-[#2C382A] bg-white p-3 rounded-xl border border-[#A9B7A0]/30">
                      &ldquo;{med.guidanceQuotes[meditationQuoteIdx % med.guidanceQuotes.length]}&rdquo;
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <button
                        onClick={() => setMeditationQuoteIdx((prev) => prev + 1)}
                        className="text-[#536451] hover:underline"
                      >
                        Next reflection cue →
                      </button>
                      <button
                        onClick={() => setActiveMeditation(null)}
                        className="text-[#647362] hover:text-[#2C382A]"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setActiveMeditation(med);
                      setMeditationQuoteIdx(0);
                      calmAudio.playBowlChime(432);
                    }}
                    className="w-full py-1.5 rounded-xl bg-white border border-[#536451]/15 text-xs font-medium text-[#536451] hover:bg-[#FAF6EE]"
                  >
                    Open Reflection
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
