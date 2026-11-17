"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { CycleLogEntry, FlowLevel } from '@/types/reset';
import { LeafEmblem, OliveSprig, GentleSun } from '@/components/ui/BotanicalDecor';
import {
  CalendarHeart,
  Droplets,
  Heart,
  Plus,
  Trash2,
  AlertCircle,
  Sparkles,
  Info,
  Calendar,
} from 'lucide-react';

export const CycleSection: React.FC = () => {
  const { cycleLogs, logCycleEntry, deleteCycleEntry, userProfile, updateUserProfile } = useApp();

  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [showLogDrawer, setShowLogDrawer] = useState<boolean>(false);

  // Form states
  const [isPeriodDay, setIsPeriodDay] = useState<boolean>(true);
  const [flowLevel, setFlowLevel] = useState<FlowLevel>('medium');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedMood, setSelectedMood] = useState<string>('Calm & Reflective');
  const [personalNotes, setPersonalNotes] = useState<string>('');

  const symptomsList = [
    'Gentle cramps',
    'Abdominal bloating',
    'Mild fatigue',
    'Tension headache',
    'Skin sensitivity / acne',
    'Breast tenderness',
    'Lower back ache',
    'Brain fog',
    'Digestive sensitivity',
  ];

  const moodsList = [
    'Calm & Reflective',
    'Tender & Sensitive',
    'Energized & Creative',
    'Rest-Seeking / Tired',
    'Emotional / Vulnerable',
    'Grounded',
  ];

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    logCycleEntry({
      date: selectedDate,
      isPeriodDay,
      flowLevel: isPeriodDay ? flowLevel : 'none',
      symptoms: selectedSymptoms,
      mood: selectedMood,
      notes: personalNotes,
    });
    setShowLogDrawer(false);
  };

  // Find entry for selected date if exists
  const activeLog = cycleLogs.find((c) => c.date === selectedDate);

  // Cycle Aware Suggestions based on ACTUAL check-ins
  const getCycleAwareSuggestion = () => {
    if (activeLog?.isPeriodDay) {
      if (activeLog.symptoms.includes('Gentle cramps') || activeLog.symptoms.includes('Lower back ache')) {
        return {
          title: 'Comfort For Cramps & Lower Back',
          text: 'Rest with our "Legs-Up-The-Wall" restorative movement. Sip warm ginger or chamomile tea, and consider a warm heating pad to ease pelvic circulation.',
          movementSuggestion: 'Legs Up The Wall & Restorative Unwind',
        };
      }
      return {
        title: 'Bleeding Flow & Rest Rituals',
        text: 'Your body is shedding and cleansing. Honor lower energy without guilt. Prioritize warm iron-rich soups like our Red Lentil & Sweet Potato Stew.',
        movementSuggestion: 'Morning Spine & Gentle Awakening',
      };
    }
    if (activeLog?.symptoms.includes('Mild fatigue')) {
      return {
        title: 'Gentle Energy Restoration',
        text: 'Nourish yourself with steady hydration and magnesium-rich pumpkin seeds. A 6-minute desk stretch will ease muscular holding.',
        movementSuggestion: 'Desk & Screen Tension Relief',
      };
    }
    return {
      title: 'Gentle Rhythm Harmony',
      text: 'Listen softly to your intuitive signals today. Hydrate generously, move in ways that feel like a stretch or yawn, and rest when tired.',
      movementSuggestion: 'Kind Strength: Wall & Chair Foundations',
    };
  };

  const suggestion = getCycleAwareSuggestion();

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      {/* 1. Header Banner */}
      <div className="bg-[#FAF6EE] border border-[#536451]/12 rounded-3xl p-6 sm:p-7 relative overflow-hidden shadow-xs">
        <OliveSprig className="absolute -bottom-4 -right-4 w-28 h-28 text-[#C9C2DD] opacity-25 pointer-events-none" />
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-xl bg-[#F4F2F9] text-[#536451]">
            <CalendarHeart className="w-5 h-5" />
          </span>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#536451]">
            My Cycle • Menstrual Wellness & Flow
          </span>
        </div>
        <h2 className="text-2xl font-serif text-[#2C382A] font-medium mb-1">
          Honoring Your Natural Rhythm
        </h2>
        <p className="text-xs sm:text-sm text-[#647362] max-w-xl leading-relaxed">
          Log flow, tender symptoms, and intuitive moods. Guidance adapts to your actual logged state rather than rigid textbook phases.
        </p>

        {/* Estimation Transparency Pill */}
        <div className="mt-4 pt-3 border-t border-[#536451]/10 flex items-center gap-2 text-xs text-[#536451]">
          <Info className="w-4 h-4 text-[#A9B7A0] shrink-0" />
          <span>
            Predictions are gentle rhythm estimates, not medical diagnostic fact. Cycles naturally shift with sleep, stress, and life seasons.
          </span>
        </div>
      </div>

      {/* 2. Cycle-Aware Wellness Suggestion Card */}
      <div className="bg-[#FFFFFF] border-2 border-[#C9C2DD]/40 rounded-3xl p-5 sm:p-6 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#536451]">
          <Sparkles className="w-4 h-4 text-[#C9C2DD]" />
          <span>Cycle-Aware Care Suggestion</span>
        </div>
        <h3 className="font-serif text-lg font-medium text-[#2C382A]">
          {suggestion.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#647362] leading-relaxed">
          {suggestion.text}
        </p>
      </div>

      {/* 3. Cycle Calendar & Date Logger */}
      <div className="bg-[#FFFFFF] border border-[#536451]/12 rounded-3xl p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-serif text-lg font-medium text-[#2C382A]">
              Log Rhythm & Symptoms
            </h3>
            <p className="text-xs text-[#647362]">
              Select a date to record period flow, cramps, or gentle notes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-[#536451]/20 bg-[#FAF6EE] text-xs text-[#2C382A] focus:outline-none"
            />
            <button
              onClick={() => setShowLogDrawer(!showLogDrawer)}
              className="px-4 py-1.5 rounded-xl bg-[#536451] text-white text-xs font-semibold hover:bg-[#435241] shadow-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{activeLog ? 'Edit Entry' : 'Log This Day'}</span>
            </button>
          </div>
        </div>

        {/* Log Entry Drawer */}
        {showLogDrawer && (
          <form
            onSubmit={handleSaveLog}
            className="bg-[#FAF6EE] border border-[#536451]/15 rounded-2xl p-5 space-y-4 text-xs animate-in fade-in duration-200"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-[#2C382A]">
                Logging for: {selectedDate}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPeriodDay(!isPeriodDay)}
                  className={`px-3 py-1 rounded-xl border text-xs font-medium transition-all ${
                    isPeriodDay
                      ? 'bg-[#FAEFF1] border-[#E8C4CA] text-[#C497A0] font-semibold'
                      : 'bg-white border-[#536451]/15 text-[#647362]'
                  }`}
                >
                  {isPeriodDay ? '🩸 Period Bleeding Day' : 'Non-Bleeding Day'}
                </button>
              </div>
            </div>

            {/* Flow Level */}
            {isPeriodDay && (
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#536451] mb-1.5">
                  Flow intensity:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['spotting', 'light', 'medium', 'heavy'] as FlowLevel[]).map((fl) => (
                    <button
                      key={fl}
                      type="button"
                      onClick={() => setFlowLevel(fl)}
                      className={`py-1.5 rounded-xl border text-center capitalize transition-all ${
                        flowLevel === fl
                          ? 'bg-[#536451] text-white font-semibold'
                          : 'bg-white border-[#536451]/15 text-[#647362]'
                      }`}
                    >
                      {fl}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Symptoms */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#536451] mb-1.5">
                Symptoms & physical signals:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {symptomsList.map((symptom) => {
                  const isSelected = selectedSymptoms.includes(symptom);
                  return (
                    <button
                      key={symptom}
                      type="button"
                      onClick={() => toggleSymptom(symptom)}
                      className={`px-3 py-1 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-[#EDF2EB] border-[#536451] text-[#2C382A] font-medium'
                          : 'bg-white border-[#536451]/15 text-[#647362]'
                      }`}
                    >
                      {symptom}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mood */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#536451] mb-1.5">
                Emotional landscape:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {moodsList.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setSelectedMood(m)}
                    className={`px-3 py-1 rounded-xl border transition-all ${
                      selectedMood === m
                        ? 'bg-[#EDF2EB] border-[#536451] text-[#536451] font-semibold'
                        : 'bg-white border-[#536451]/15 text-[#647362]'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Personal Notes */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#536451] mb-1.5">
                Personal reflection & notes:
              </label>
              <input
                type="text"
                value={personalNotes}
                onChange={(e) => setPersonalNotes(e.target.value)}
                placeholder="e.g. Took a warm bath, rested early..."
                className="w-full p-2.5 rounded-xl bg-white border border-[#536451]/20 text-[#2C382A] focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowLogDrawer(false)}
                className="px-3.5 py-1.5 text-xs text-[#647362] hover:bg-white rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-1.5 bg-[#536451] text-white font-semibold rounded-xl text-xs hover:bg-[#435241]"
              >
                Save Day Log
              </button>
            </div>
          </form>
        )}

        {/* Selected Date Preview if already logged */}
        {activeLog && (
          <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-[#536451]/15 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-[#2C382A]">
                Recorded for {activeLog.date}:
              </span>
              <button
                onClick={() => deleteCycleEntry(activeLog.id)}
                className="text-[#C497A0] hover:underline"
              >
                Delete Log
              </button>
            </div>
            <div className="flex flex-wrap gap-2 text-[#647362]">
              {activeLog.isPeriodDay && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#FAEFF1] text-[#C497A0] font-medium">
                  Flow: {activeLog.flowLevel}
                </span>
              )}
              <span className="px-2.5 py-0.5 rounded-full bg-[#EDF2EB] text-[#536451] font-medium">
                Mood: {activeLog.mood}
              </span>
            </div>
            {activeLog.symptoms.length > 0 && (
              <p className="text-[#647362]">
                Symptoms: {activeLog.symptoms.join(', ')}
              </p>
            )}
            {activeLog.notes && (
              <p className="italic text-[#2C382A]">&ldquo;{activeLog.notes}&rdquo;</p>
            )}
          </div>
        )}
      </div>

      {/* 4. Cycle History List */}
      <div className="bg-[#FFFFFF] border border-[#536451]/12 rounded-3xl p-6 shadow-xs space-y-3">
        <h3 className="font-serif text-lg font-medium text-[#2C382A]">
          Recent Cycle History ({cycleLogs.length})
        </h3>
        <div className="space-y-2">
          {cycleLogs.map((entry) => (
            <div
              key={entry.id}
              className="p-3.5 rounded-2xl bg-[#FAF6EE]/50 border border-[#536451]/10 flex items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-[#2C382A]">{entry.date}</span>
                  {entry.isPeriodDay && (
                    <span className="px-2 py-0.5 rounded-full bg-[#FAEFF1] text-[#C497A0] font-medium text-[11px]">
                      {entry.flowLevel} flow
                    </span>
                  )}
                  <span className="text-[#647362]">• {entry.mood}</span>
                </div>
                {entry.symptoms.length > 0 && (
                  <p className="text-[11px] text-[#647362]">
                    {entry.symptoms.join(' • ')}
                  </p>
                )}
              </div>
              <button
                onClick={() => deleteCycleEntry(entry.id)}
                className="p-1 rounded-lg text-[#647362] hover:text-[#C497A0]"
                title="Remove log"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
