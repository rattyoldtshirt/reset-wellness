"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  TodayCheckIn,
  HabitItem,
  Workout,
  WorkoutHistoryItem,
  MealLog,
  Recipe,
  CycleLogEntry,
  JournalEntry,
  MoodType,
  SleepQuality,
  WellbeingMilestone,
} from '@/types/reset';
import {
  DEFAULT_HABITS,
  HAPPY_THOUGHTS,
  WORKOUTS,
  RECIPES,
  WELLBEING_MILESTONES,
} from '@/data/resetData';
import { calmAudio } from '@/components/ui/AudioChime';

type TabType = 'today' | 'move' | 'nourish' | 'breathe' | 'cycle' | 'progress';

interface ToastState {
  id: string;
  message: string;
}

interface AppContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;

  // Profile & Onboarding
  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  completeOnboarding: (profile: Partial<UserProfile>) => void;
  resetOnboarding: () => void;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;

  // Today Dashboard
  todayCheckIn: TodayCheckIn;
  updateMood: (mood: MoodType) => void;
  updateEnergy: (energy: number) => void;
  updateSleep: (hours: number, quality: SleepQuality) => void;
  incrementWater: () => void;
  decrementWater: () => void;
  toggleHabit: (habitId: string) => void;
  updateTodayNotes: (notes: string) => void;

  // Habits
  habits: HabitItem[];
  addCustomHabit: (title: string, category: HabitItem['category'], tip?: string) => void;
  deleteHabit: (id: string) => void;

  // Move & Workouts
  workouts: Workout[];
  activeWorkout: Workout | null;
  startWorkout: (workout: Workout) => void;
  closeWorkoutPlayer: () => void;
  workoutHistory: WorkoutHistoryItem[];
  logWorkoutCompletion: (session: Omit<WorkoutHistoryItem, 'id'>) => void;

  // Nourish
  recipes: Recipe[];
  mealLogs: MealLog[];
  addMealLog: (meal: Omit<MealLog, 'id' | 'date'>) => void;
  deleteMealLog: (id: string) => void;
  selectedRecipe: Recipe | null;
  setSelectedRecipe: (recipe: Recipe | null) => void;

  // Cycle
  cycleLogs: CycleLogEntry[];
  logCycleEntry: (entry: Omit<CycleLogEntry, 'id'>) => void;
  deleteCycleEntry: (id: string) => void;

  // Little Joys & Emotional Wellbeing
  happyThoughts: typeof HAPPY_THOUGHTS;
  currentThoughtIndex: number;
  nextThought: () => void;
  savedThoughtIds: string[];
  toggleSaveThought: (id: string) => void;
  isHappyThoughtModalOpen: boolean;
  setIsHappyThoughtModalOpen: (open: boolean) => void;

  // Self-Appreciation Journal ("Something Good About Me")
  journalEntries: JournalEntry[];
  addJournalEntry: (text: string, prompt?: string, note?: string) => void;
  editJournalEntry: (id: string, text: string) => void;
  deleteJournalEntry: (id: string) => void;
  isSelfAppreciationModalOpen: boolean;
  setIsSelfAppreciationModalOpen: (open: boolean) => void;
  surpriseJournalEntry: JournalEntry | null;
  triggerRandomJournalEntry: () => void;
  closeSurpriseJournal: () => void;

  // Milestones & Audio
  milestones: WellbeingMilestone[];
  isMuted: boolean;
  toggleAudioMute: () => void;

  // Toast
  toasts: ToastState[];
  showToast: (message: string) => void;
  dismissToast: (id: string) => void;
}

const LOCAL_STORAGE_KEY = 'reset_wellness_state_v1';

const defaultProfile: UserProfile = {
  name: 'Maya',
  ageRange: '26–35',
  fitnessExperience: 'starting_again',
  primaryGoals: ['Build gentle consistency', 'Relieve daily tension', 'Improve sleep and energy'],
  availableWorkoutMinutes: 10,
  availableEquipment: ['No equipment (bodyweight)', 'Yoga mat or rug'],
  activityLimitations: ['Sensitive knees', 'Lower back tightness'],
  hasArthritis: true,
  arthritisJoints: ['Knees', 'Hands/Wrists'],
  trackCycle: true,
  isCycleIrregular: false,
  cycleLength: 28,
  lastPeriodDate: '2026-11-04',
  preferredActivityLevel: 'gentle',
  weightManagementGoal: false,
  onboardingCompleted: true,
  createdAt: new Date().toISOString(),
};

const getTodayDateString = () => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

const defaultTodayCheckIn: TodayCheckIn = {
  date: getTodayDateString(),
  mood: 'gentle',
  energy: 3,
  sleepHours: 7.5,
  sleepQuality: 'restful',
  waterGlasses: 5,
  completedHabitIds: ['habit_1', 'habit_3'],
  completedWorkoutIds: [],
  breathingMinutes: 3,
  notes: 'Felt calm this morning with warm ginger tea.',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>('today');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // States
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultProfile);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [todayCheckIn, setTodayCheckIn] = useState<TodayCheckIn>(defaultTodayCheckIn);
  const [habits, setHabits] = useState<HabitItem[]>(DEFAULT_HABITS);
  const [workouts] = useState<Workout[]>(WORKOUTS);
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutHistoryItem[]>([
    {
      id: 'history_1',
      workoutId: 'workout_spine_flow',
      workoutName: 'Morning Spine & Gentle Awakening',
      category: 'gentle',
      durationMinutes: 8,
      completedAt: 'Yesterday, 8:40 AM',
      painBefore: 'mild',
      painAfter: 'none',
    },
  ]);

  // Nourish
  const [recipes] = useState<Recipe[]>(RECIPES);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [mealLogs, setMealLogs] = useState<MealLog[]>([
    {
      id: 'meal_1',
      date: getTodayDateString(),
      mealType: 'Breakfast',
      description: 'Warm rolled oats with turmeric, chia seeds, and cinnamon',
      feelingAfter: 'Energized',
      tags: ['Anti-inflammatory', 'Warm & Soothing'],
    },
    {
      id: 'meal_2',
      date: getTodayDateString(),
      mealType: 'Lunch',
      description: 'Cannellini white bean salad with creamy avocado and lemon',
      feelingAfter: 'Light',
      tags: ['Plant Protein', 'High Fiber'],
    },
  ]);

  // Cycle
  const [cycleLogs, setCycleLogs] = useState<CycleLogEntry[]>([
    {
      id: 'cycle_1',
      date: '2026-11-04',
      isPeriodDay: true,
      flowLevel: 'heavy',
      symptoms: ['Mild lower back ache', 'Tender joints'],
      mood: 'Tender & Introspective',
      notes: 'Rested with heating pad and chamomile.',
    },
    {
      id: 'cycle_2',
      date: '2026-11-05',
      isPeriodDay: true,
      flowLevel: 'medium',
      symptoms: ['Gentle cramps', 'Fatigue'],
      mood: 'Quiet & Calm',
      notes: 'Enjoyed slow breathing and sweet potato stew.',
    },
    {
      id: 'cycle_3',
      date: '2026-11-06',
      isPeriodDay: true,
      flowLevel: 'light',
      symptoms: ['Mild fatigue'],
      mood: 'Grounded',
      notes: 'Morning walk in crisp sunshine.',
    },
    {
      id: 'cycle_4',
      date: '2026-11-07',
      isPeriodDay: true,
      flowLevel: 'spotting',
      symptoms: [],
      mood: 'Energized',
      notes: 'Felt my energy gently returning.',
    },
  ]);

  // Little Joys & Thoughts
  const [currentThoughtIndex, setCurrentThoughtIndex] = useState<number>(0);
  const [savedThoughtIds, setSavedThoughtIds] = useState<string[]>(['thought_1', 'thought_2']);
  const [isHappyThoughtModalOpen, setIsHappyThoughtModalOpen] = useState<boolean>(false);

  // Self-Appreciation Journal
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    {
      id: 'journal_1',
      date: 'Yesterday at 9:15 PM',
      prompt: "What's one thing you like about yourself today?",
      text: 'I made really comforting ginger chai and I gave myself permission to sit down and rest without feeling guilty.',
      gentleReflectionNote: 'Kindness recognized',
    },
    {
      id: 'journal_2',
      date: '3 days ago',
      prompt: "What's one thing you like about yourself today?",
      text: 'I was patient with a difficult message today, took three slow breaths, and answered with gentle boundaries.',
      gentleReflectionNote: 'Grace under pressure',
    },
  ]);
  const [isSelfAppreciationModalOpen, setIsSelfAppreciationModalOpen] = useState<boolean>(false);
  const [surpriseJournalEntry, setSurpriseJournalEntry] = useState<JournalEntry | null>(null);

  // Milestones & Audio
  const [milestones, setMilestones] = useState<WellbeingMilestone[]>(WELLBEING_MILESTONES);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Toast
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const showToast = (message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      dismissToast(id);
    }, 3800);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.userProfile) setUserProfile(parsed.userProfile);
        if (parsed.todayCheckIn) {
          // If saved checkin is from previous day, refresh date
          const todayStr = getTodayDateString();
          if (parsed.todayCheckIn.date === todayStr) {
            setTodayCheckIn(parsed.todayCheckIn);
          } else {
            setTodayCheckIn({
              ...defaultTodayCheckIn,
              date: todayStr,
            });
          }
        }
        if (parsed.habits) setHabits(parsed.habits);
        if (parsed.workoutHistory) setWorkoutHistory(parsed.workoutHistory);
        if (parsed.mealLogs) setMealLogs(parsed.mealLogs);
        if (parsed.cycleLogs) setCycleLogs(parsed.cycleLogs);
        if (parsed.savedThoughtIds) setSavedThoughtIds(parsed.savedThoughtIds);
        if (parsed.journalEntries) setJournalEntries(parsed.journalEntries);
        if (parsed.milestones) setMilestones(parsed.milestones);
        if (typeof parsed.isMuted === 'boolean') {
          setIsMuted(parsed.isMuted);
          calmAudio.setMuted(parsed.isMuted);
        }
      }
    } catch {
      // LocalStorage error handled gracefully
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever state updates
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const stateToSave = {
        userProfile,
        todayCheckIn,
        habits,
        workoutHistory,
        mealLogs,
        cycleLogs,
        savedThoughtIds,
        journalEntries,
        milestones,
        isMuted,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch {
      // Storage quota or privacy mode handled
    }
  }, [
    isLoaded,
    userProfile,
    todayCheckIn,
    habits,
    workoutHistory,
    mealLogs,
    cycleLogs,
    savedThoughtIds,
    journalEntries,
    milestones,
    isMuted,
  ]);

  // Check milestones whenever history / habits change
  useEffect(() => {
    setMilestones((prev) =>
      prev.map((m) => {
        if (m.id === 'mile_habit_tender' && todayCheckIn.completedHabitIds.length >= 3) {
          return { ...m, achieved: true, achievedDate: 'Today' };
        }
        if (m.id === 'mile_self_kindness' && journalEntries.length >= 2) {
          return { ...m, achieved: true, achievedDate: 'Today' };
        }
        if (m.id === 'mile_joint_care' && userProfile.hasArthritis && workoutHistory.length >= 1) {
          return { ...m, achieved: true, achievedDate: 'Today' };
        }
        return m;
      })
    );
  }, [todayCheckIn.completedHabitIds.length, journalEntries.length, userProfile.hasArthritis, workoutHistory.length]);

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }));
    showToast('Your preferences have been saved with care.');
  };

  const completeOnboarding = (profile: Partial<UserProfile>) => {
    const updated = {
      ...userProfile,
      ...profile,
      onboardingCompleted: true,
    };
    setUserProfile(updated);
    setIsOnboardingOpen(false);
    calmAudio.playGentleCelebration();
    showToast(`Welcome home to RESET, ${updated.name || 'friend'}.`);
  };

  const resetOnboarding = () => {
    setIsOnboardingOpen(true);
  };

  const updateMood = (mood: MoodType) => {
    setTodayCheckIn((prev) => ({ ...prev, mood }));
    showToast(`Mood noted: ${mood}. Thank you for honoring how you feel.`);
  };

  const updateEnergy = (energy: number) => {
    setTodayCheckIn((prev) => ({ ...prev, energy }));
    calmAudio.playBowlChime(420);
    showToast(`Energy updated to ${energy} of 5.`);
  };

  const updateSleep = (hours: number, quality: SleepQuality) => {
    setTodayCheckIn((prev) => ({ ...prev, sleepHours: hours, sleepQuality: quality }));
    showToast('Sleep check-in saved.');
  };

  const incrementWater = () => {
    setTodayCheckIn((prev) => {
      const updated = Math.min(prev.waterGlasses + 1, 16);
      return { ...prev, waterGlasses: updated };
    });
    calmAudio.playBowlChime(528);
    showToast('A glass of water logged. Staying gently hydrated 💧');
  };

  const decrementWater = () => {
    setTodayCheckIn((prev) => ({
      ...prev,
      waterGlasses: Math.max(prev.waterGlasses - 1, 0),
    }));
  };

  const toggleHabit = (habitId: string) => {
    setTodayCheckIn((prev) => {
      const exists = prev.completedHabitIds.includes(habitId);
      const updated = exists
        ? prev.completedHabitIds.filter((id) => id !== habitId)
        : [...prev.completedHabitIds, habitId];

      if (!exists) {
        calmAudio.playBowlChime(432);
        showToast('Habit gently completed! Small steps add up 🌱');
      }
      return { ...prev, completedHabitIds: updated };
    });
  };

  const updateTodayNotes = (notes: string) => {
    setTodayCheckIn((prev) => ({ ...prev, notes }));
  };

  const addCustomHabit = (title: string, category: HabitItem['category'], tip?: string) => {
    const newHabit: HabitItem = {
      id: `custom_habit_${Date.now()}`,
      title,
      category,
      week: 1,
      gentleTip: tip || 'A personalized small step for your wellbeing.',
      isCustom: true,
    };
    setHabits((prev) => [newHabit, ...prev]);
    showToast('New habit added to your routine.');
  };

  const deleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
    setTodayCheckIn((prev) => ({
      ...prev,
      completedHabitIds: prev.completedHabitIds.filter((hId) => hId !== id),
    }));
    showToast('Habit removed.');
  };

  const startWorkout = (workout: Workout) => {
    setActiveWorkout(workout);
  };

  const closeWorkoutPlayer = () => {
    setActiveWorkout(null);
  };

  const logWorkoutCompletion = (session: Omit<WorkoutHistoryItem, 'id'>) => {
    const newSession: WorkoutHistoryItem = {
      ...session,
      id: `session_${Date.now()}`,
    };
    setWorkoutHistory((prev) => [newSession, ...prev]);
    setTodayCheckIn((prev) => ({
      ...prev,
      completedWorkoutIds: [...prev.completedWorkoutIds, session.workoutId],
    }));
    calmAudio.playGentleCelebration();
    showToast(`Wonderful! ${session.workoutName} completed.`);
  };

  const addMealLog = (meal: Omit<MealLog, 'id' | 'date'>) => {
    const newMeal: MealLog = {
      ...meal,
      id: `meal_${Date.now()}`,
      date: getTodayDateString(),
    };
    setMealLogs((prev) => [newMeal, ...prev]);
    showToast('Meal reflection saved with kindness.');
  };

  const deleteMealLog = (id: string) => {
    setMealLogs((prev) => prev.filter((m) => m.id !== id));
    showToast('Meal reflection deleted.');
  };

  const logCycleEntry = (entry: Omit<CycleLogEntry, 'id'>) => {
    const existingIndex = cycleLogs.findIndex((c) => c.date === entry.date);
    if (existingIndex >= 0) {
      const updated = [...cycleLogs];
      updated[existingIndex] = { ...entry, id: updated[existingIndex].id };
      setCycleLogs(updated);
    } else {
      setCycleLogs((prev) => [{ ...entry, id: `cycle_${Date.now()}` }, ...prev]);
    }
    showToast('Menstrual wellness entry saved.');
  };

  const deleteCycleEntry = (id: string) => {
    setCycleLogs((prev) => prev.filter((c) => c.id !== id));
    showToast('Cycle entry deleted.');
  };

  const nextThought = () => {
    setCurrentThoughtIndex((prev) => (prev + 1) % HAPPY_THOUGHTS.length);
  };

  const toggleSaveThought = (id: string) => {
    setSavedThoughtIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed from saved thoughts.');
        return prev.filter((tId) => tId !== id);
      } else {
        calmAudio.playBowlChime(528);
        showToast('Saved to your Little Joys collection ❤️');
        return [...prev, id];
      }
    });
  };

  const addJournalEntry = (text: string, prompt = "What's one thing you like about yourself today?", note?: string) => {
    const now = new Date();
    const formattedDate = `Today at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const newEntry: JournalEntry = {
      id: `journal_${Date.now()}`,
      date: formattedDate,
      prompt,
      text,
      gentleReflectionNote: note || 'Self-kindness recorded',
    };
    setJournalEntries((prev) => [newEntry, ...prev]);
    calmAudio.playGentleCelebration();
    showToast('Self-appreciation journal entry saved 🌱');
  };

  const editJournalEntry = (id: string, text: string) => {
    setJournalEntries((prev) =>
      prev.map((j) => (j.id === id ? { ...j, text } : j))
    );
    showToast('Entry updated.');
  };

  const deleteJournalEntry = (id: string) => {
    setJournalEntries((prev) => prev.filter((j) => j.id !== id));
    showToast('Entry removed.');
  };

  const triggerRandomJournalEntry = () => {
    if (journalEntries.length === 0) return;
    const randomIndex = Math.floor(Math.random() * journalEntries.length);
    setSurpriseJournalEntry(journalEntries[randomIndex]);
  };

  const closeSurpriseJournal = () => {
    setSurpriseJournalEntry(null);
  };

  const toggleAudioMute = () => {
    const muted = calmAudio.toggleMute();
    setIsMuted(muted);
    showToast(muted ? 'Chimes muted' : 'Gentle chimes enabled 🎵');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,

        userProfile,
        updateUserProfile,
        completeOnboarding,
        resetOnboarding,
        isOnboardingOpen,
        setIsOnboardingOpen,

        todayCheckIn,
        updateMood,
        updateEnergy,
        updateSleep,
        incrementWater,
        decrementWater,
        toggleHabit,
        updateTodayNotes,

        habits,
        addCustomHabit,
        deleteHabit,

        workouts,
        activeWorkout,
        startWorkout,
        closeWorkoutPlayer,
        workoutHistory,
        logWorkoutCompletion,

        recipes,
        mealLogs,
        addMealLog,
        deleteMealLog,
        selectedRecipe,
        setSelectedRecipe,

        cycleLogs,
        logCycleEntry,
        deleteCycleEntry,

        happyThoughts: HAPPY_THOUGHTS,
        currentThoughtIndex,
        nextThought,
        savedThoughtIds,
        toggleSaveThought,
        isHappyThoughtModalOpen,
        setIsHappyThoughtModalOpen,

        journalEntries,
        addJournalEntry,
        editJournalEntry,
        deleteJournalEntry,
        isSelfAppreciationModalOpen,
        setIsSelfAppreciationModalOpen,
        surpriseJournalEntry,
        triggerRandomJournalEntry,
        closeSurpriseJournal,

        milestones,
        isMuted,
        toggleAudioMute,

        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
