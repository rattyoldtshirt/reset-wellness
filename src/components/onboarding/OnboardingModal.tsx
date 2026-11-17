"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { UserProfile, FitnessLevel, DailyActivityLevel } from '@/types/reset';
import { LeafEmblem, OliveSprig, GentleSun } from '@/components/ui/BotanicalDecor';
import { X, Check, ArrowRight, ArrowLeft } from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const { isOnboardingOpen, setIsOnboardingOpen, userProfile, completeOnboarding } = useApp();

  const [step, setStep] = useState<number>(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: userProfile.name || '',
    ageRange: userProfile.ageRange || '26–35',
    fitnessExperience: userProfile.fitnessExperience || 'starting_again',
    primaryGoals: userProfile.primaryGoals || ['Build gentle consistency', 'Relieve daily tension'],
    availableWorkoutMinutes: userProfile.availableWorkoutMinutes || 10,
    availableEquipment: userProfile.availableEquipment || ['No equipment (bodyweight)', 'Yoga mat or rug'],
    hasArthritis: userProfile.hasArthritis || false,
    arthritisJoints: userProfile.arthritisJoints || [],
    trackCycle: userProfile.trackCycle ?? true,
    isCycleIrregular: userProfile.isCycleIrregular || false,
    preferredActivityLevel: userProfile.preferredActivityLevel || 'gentle',
  });

  if (!isOnboardingOpen) return null;

  const ageOptions = ['18–25', '26–35', '36–45', '46–55', '56–65', '66+'];

  const goalOptions = [
    'Build gentle daily consistency',
    'Relieve physical tension & stiffness',
    'Improve sleep quality & relaxation',
    'Restore daily energy without burnout',
    'Support sensitive joints / arthritis',
    'Cultivate mindful peace & breathwork',
    'Gentle & sustainable weight management',
    'Connect with menstrual rhythm',
  ];

  const equipmentOptions = [
    'No equipment (bodyweight)',
    'Comfortable chair',
    'Yoga mat or soft rug',
    'Light resistance bands',
    'Light dumbbells / water bottles',
    'Sturdy wall space',
  ];

  const jointOptions = [
    'Knees',
    'Hands / Wrists',
    'Hips',
    'Shoulders',
    'Lower Back / Spine',
    'Ankles / Feet',
  ];

  const togglePrimaryGoal = (goal: string) => {
    setFormData((prev) => {
      const current = prev.primaryGoals || [];
      const updated = current.includes(goal)
        ? current.filter((g) => g !== goal)
        : [...current, goal];
      return { ...prev, primaryGoals: updated };
    });
  };

  const toggleEquipment = (eq: string) => {
    setFormData((prev) => {
      const current = prev.availableEquipment || [];
      const updated = current.includes(eq)
        ? current.filter((e) => e !== eq)
        : [...current, eq];
      return { ...prev, availableEquipment: updated };
    });
  };

  const toggleJoint = (joint: string) => {
    setFormData((prev) => {
      const current = prev.arthritisJoints || [];
      const updated = current.includes(joint)
        ? current.filter((j) => j !== joint)
        : [...current, joint];
      return { ...prev, arthritisJoints: updated, hasArthritis: updated.length > 0 };
    });
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      completeOnboarding(formData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C382A]/30 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#FFFFFF] border border-[#536451]/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        <OliveSprig className="absolute -top-6 -right-6 w-24 h-24 text-[#A9B7A0] opacity-25 pointer-events-none" />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-[#EDF2EB] flex items-center justify-center">
              <LeafEmblem className="w-5 h-5" color="#536451" />
            </span>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#536451]">
              Personalizing RESET • Step {step} of {totalSteps}
            </span>
          </div>
          <button
            onClick={() => setIsOnboardingOpen(false)}
            className="p-1.5 rounded-full hover:bg-[#FAF6EE] text-[#647362] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Dots */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full flex-1 transition-all ${
                s <= step ? 'bg-[#536451]' : 'bg-[#EDF2EB]'
              }`}
            />
          ))}
        </div>

        {/* STEP 1: Name & Where You Are */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif text-[#2C382A] font-medium mb-1.5">
                Welcome to your peaceful space.
              </h2>
              <p className="text-sm text-[#647362]">
                What should we lovingly call you?
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#536451] mb-2">
                Your preferred name
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Maya"
                className="w-full px-4 py-3 rounded-2xl bg-[#FAF6EE] border border-[#536451]/20 text-[#2C382A] placeholder-[#647362]/60 focus:outline-none focus:border-[#536451] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#536451] mb-2">
                Age range (optional)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {ageOptions.map((age) => (
                  <button
                    key={age}
                    type="button"
                    onClick={() => setFormData({ ...formData, ageRange: age })}
                    className={`py-2 px-3 text-xs rounded-xl border transition-all ${
                      formData.ageRange === age
                        ? 'bg-[#EDF2EB] border-[#536451] text-[#536451] font-semibold'
                        : 'bg-[#FFFFFF] border-[#536451]/15 text-[#647362] hover:bg-[#FAF6EE]'
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#536451] mb-2">
                Where are you starting from today?
              </label>
              <div className="space-y-2">
                {[
                  {
                    id: 'starting_again',
                    title: 'Starting Again',
                    desc: 'Been away from movement for a while, recovering, or seeking zero-pressure ease.',
                  },
                  {
                    id: 'building_strength',
                    title: 'Building Strength',
                    desc: 'Ready for accessible bodyweight or chair flows to build stability and stamina.',
                  },
                  {
                    id: 'finding_rhythm',
                    title: 'Finding Your Rhythm',
                    desc: 'Craving regular, enjoyable movement without rigid schedules or burnout.',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, fitnessExperience: item.id as FitnessLevel })
                    }
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                      formData.fitnessExperience === item.id
                        ? 'bg-[#EDF2EB] border-[#536451] shadow-xs'
                        : 'bg-[#FAF6EE]/50 border-[#536451]/15 hover:bg-[#FAF6EE]'
                    }`}
                  >
                    <p className="text-sm font-semibold text-[#2C382A]">{item.title}</p>
                    <p className="text-xs text-[#647362] mt-0.5">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Goals */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif text-[#2C382A] font-medium mb-1.5">
                What does wellbeing look like for you?
              </h2>
              <p className="text-sm text-[#647362]">
                Select anything that calls to your heart right now.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {goalOptions.map((goal) => {
                const isSelected = formData.primaryGoals?.includes(goal);
                return (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => togglePrimaryGoal(goal)}
                    className={`p-3 rounded-2xl border text-left text-xs transition-all flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-[#EDF2EB] border-[#536451] text-[#2C382A] font-medium'
                        : 'bg-[#FAF6EE]/60 border-[#536451]/15 text-[#647362] hover:bg-[#FAF6EE]'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-md mt-0.5 flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? 'bg-[#536451] border-[#536451] text-white'
                          : 'border-[#647362]/40 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[2.5]" />}
                    </div>
                    <span>{goal}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Time & Equipment */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif text-[#2C382A] font-medium mb-1.5">
                Your time and comfortable space
              </h2>
              <p className="text-sm text-[#647362]">
                Small pockets of movement are completely enough.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#536451] mb-2">
                Available daily movement time
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { min: 8, label: '5 – 10 mins', desc: 'Micro resets' },
                  { min: 14, label: '10 – 15 mins', desc: 'Gentle flow' },
                  { min: 20, label: '15 – 25 mins', desc: 'Spacious session' },
                ].map((t) => (
                  <button
                    key={t.min}
                    type="button"
                    onClick={() => setFormData({ ...formData, availableWorkoutMinutes: t.min })}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      formData.availableWorkoutMinutes === t.min
                        ? 'bg-[#EDF2EB] border-[#536451] font-semibold text-[#536451]'
                        : 'bg-[#FAF6EE]/60 border-[#536451]/15 text-[#647362] hover:bg-[#FAF6EE]'
                    }`}
                  >
                    <p className="text-xs font-bold">{t.label}</p>
                    <p className="text-[11px] text-[#647362] mt-0.5">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#536451] mb-2">
                What do you have nearby?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {equipmentOptions.map((eq) => {
                  const isSelected = formData.availableEquipment?.includes(eq);
                  return (
                    <button
                      key={eq}
                      type="button"
                      onClick={() => toggleEquipment(eq)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center gap-2 ${
                        isSelected
                          ? 'bg-[#EDF2EB] border-[#536451] text-[#2C382A] font-medium'
                          : 'bg-[#FAF6EE]/60 border-[#536451]/15 text-[#647362] hover:bg-[#FAF6EE]'
                      }`}
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 border ${
                          isSelected
                            ? 'bg-[#536451] border-[#536451] text-white'
                            : 'border-[#647362]/40 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[2.5]" />}
                      </div>
                      <span className="truncate">{eq}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Arthritis & Joint Care (Optional) */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <GentleSun className="w-5 h-5" color="#A9B7A0" />
                <h2 className="text-2xl font-serif text-[#2C382A] font-medium">
                  Joint Care & Physical Comfort
                </h2>
              </div>
              <p className="text-xs text-[#647362] leading-relaxed">
                Do you navigate joint stiffness, arthritis, or tender areas? We will automatically highlight clinician-reviewed joint modifications and pain check-ins.
              </p>
            </div>

            <div className="bg-[#FAF6EE] border border-[#536451]/10 rounded-2xl p-4 text-xs text-[#647362]">
              <p className="font-semibold text-[#2C382A] mb-1">Gentle Medical Transparency:</p>
              <p>
                RESET offers gentle, clinician-reviewed movement modifications. We do not diagnose, treat, or promise to cure arthritis. Always listen to your body and medical clearance.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#536451] mb-2">
                Joint areas that appreciate gentle care (optional):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {jointOptions.map((joint) => {
                  const isSelected = formData.arthritisJoints?.includes(joint);
                  return (
                    <button
                      key={joint}
                      type="button"
                      onClick={() => toggleJoint(joint)}
                      className={`p-2.5 rounded-xl border text-xs font-medium transition-all text-center ${
                        isSelected
                          ? 'bg-[#EDF2EB] border-[#536451] text-[#536451]'
                          : 'bg-[#FFFFFF] border-[#536451]/15 text-[#647362] hover:bg-[#FAF6EE]'
                      }`}
                    >
                      {joint}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Menstrual Harmony & Finish */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif text-[#2C382A] font-medium mb-1.5">
                Menstrual Rhythm & Flow
              </h2>
              <p className="text-sm text-[#647362]">
                Optional tracking for your cycle, symptoms, and intuitive energy.
              </p>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, trackCycle: true, isCycleIrregular: false })}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all ${
                  formData.trackCycle && !formData.isCycleIrregular
                    ? 'bg-[#EDF2EB] border-[#536451] font-medium'
                    : 'bg-[#FAF6EE]/50 border-[#536451]/15'
                }`}
              >
                <p className="text-sm font-semibold text-[#2C382A]">Yes, track my cycle & symptoms</p>
                <p className="text-xs text-[#647362] mt-0.5">
                  Receive cycle-aware wellness suggestions tailored to today&apos;s logged state.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, trackCycle: true, isCycleIrregular: true })}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all ${
                  formData.trackCycle && formData.isCycleIrregular
                    ? 'bg-[#EDF2EB] border-[#536451] font-medium'
                    : 'bg-[#FAF6EE]/50 border-[#536451]/15'
                }`}
              >
                <p className="text-sm font-semibold text-[#2C382A]">My cycle is irregular or contraception-assisted</p>
                <p className="text-xs text-[#647362] mt-0.5">
                  Track symptoms and flow without rigid phase assumptions.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, trackCycle: false })}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all ${
                  !formData.trackCycle
                    ? 'bg-[#EDF2EB] border-[#536451] font-medium'
                    : 'bg-[#FAF6EE]/50 border-[#536451]/15'
                }`}
              >
                <p className="text-sm font-semibold text-[#2C382A]">Skip cycle tracking for now</p>
                <p className="text-xs text-[#647362] mt-0.5">
                  You can always enable this later from settings.
                </p>
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#536451] mb-2">
                Preferred daily pace
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'gentle', label: 'Gentle', desc: 'Soft & unhurried' },
                  { id: 'balanced', label: 'Balanced', desc: 'Steady rhythm' },
                  { id: 'moderate', label: 'Invigorating', desc: 'Lift vitality' },
                ].map((pace) => (
                  <button
                    key={pace.id}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, preferredActivityLevel: pace.id as DailyActivityLevel })
                    }
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      formData.preferredActivityLevel === pace.id
                        ? 'bg-[#EDF2EB] border-[#536451] font-semibold text-[#536451]'
                        : 'bg-[#FFFFFF] border-[#536451]/15 text-[#647362]'
                    }`}
                  >
                    <p className="text-xs font-bold">{pace.label}</p>
                    <p className="text-[10px] text-[#647362]">{pace.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#536451]/10">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium text-[#647362] hover:bg-[#FAF6EE] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <button
              onClick={() => setIsOnboardingOpen(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-medium text-[#647362] hover:bg-[#FAF6EE] transition-colors"
            >
              Skip for now
            </button>
          )}

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-[#536451] text-[#FAF6EE] text-xs font-semibold tracking-wide hover:bg-[#435241] shadow-sm transition-all"
          >
            <span>{step === totalSteps ? 'Step into RESET' : 'Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
