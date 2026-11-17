export type FitnessLevel = 'starting_again' | 'building_strength' | 'finding_rhythm';
export type DailyActivityLevel = 'gentle' | 'moderate' | 'balanced';

export type MoodType = 'peaceful' | 'energized' | 'gentle' | 'tired' | 'tender' | 'anxious' | 'grounded';
export type SleepQuality = 'restful' | 'okay' | 'restless';
export type FlowLevel = 'none' | 'spotting' | 'light' | 'medium' | 'heavy';
export type PainLevel = 'none' | 'mild' | 'moderate' | 'flare_up';

export interface UserProfile {
  name: string;
  ageRange: string;
  fitnessExperience: FitnessLevel;
  primaryGoals: string[];
  availableWorkoutMinutes: number;
  availableEquipment: string[];
  activityLimitations: string[];
  hasArthritis: boolean;
  arthritisJoints: string[];
  trackCycle: boolean;
  isCycleIrregular: boolean;
  cycleLength: number;
  lastPeriodDate: string;
  preferredActivityLevel: DailyActivityLevel;
  weightManagementGoal: boolean;
  onboardingCompleted: boolean;
  createdAt: string;
}

export interface HabitItem {
  id: string;
  title: string;
  category: 'movement' | 'nourish' | 'mind' | 'rest' | 'selfcare';
  week: number;
  gentleTip: string;
  isCustom?: boolean;
}

export interface TodayCheckIn {
  date: string; // YYYY-MM-DD
  mood: MoodType;
  energy: number; // 1 to 5
  sleepHours: number;
  sleepQuality: SleepQuality;
  waterGlasses: number; // 250ml each, target 8
  completedHabitIds: string[];
  completedWorkoutIds: string[];
  breathingMinutes: number;
  notes: string;
}

export interface WorkoutStep {
  name: string;
  seconds: number;
  cue: string;
  restAfterSeconds?: number;
}

export interface Workout {
  id: string;
  name: string;
  category: 'gentle' | 'beginner' | 'strength' | 'cardio' | 'mobility' | 'rest' | 'arthritis';
  level: FitnessLevel;
  durationMinutes: number;
  difficulty: 'Very Gentle' | 'Gentle' | 'Accessible Moderate';
  equipmentRequired: string[];
  illustration: string;
  description: string;
  instructions: string[];
  modifications: string[];
  jointsProtected?: string[];
  isArthritisFriendly: boolean;
  clinicianReviewedNote?: string;
  steps: WorkoutStep[];
}

export interface WorkoutHistoryItem {
  id: string;
  workoutId: string;
  workoutName: string;
  category: string;
  durationMinutes: number;
  completedAt: string;
  painBefore?: PainLevel;
  painAfter?: PainLevel;
}

export interface MealLog {
  id: string;
  date: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Herbal Tea';
  description: string;
  feelingAfter: 'Energized' | 'Comforted' | 'Light' | 'Satisfied' | 'Heavy' | 'Nourished';
  tags: string[];
}

export interface Recipe {
  id: string;
  title: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Warm Drink';
  prepTime: string;
  tags: string[];
  ingredients: string[];
  instructions: string[];
  whyBodyLovesThis: string;
  isArthritisFriendly: boolean;
  isCycleSupportive: boolean;
}

export interface BreathingExercise {
  id: string;
  name: string;
  tagline: string;
  durationMinutes: number;
  inhaleSec: number;
  holdSec: number;
  exhaleSec: number;
  restSec: number;
  focus: string;
  description: string;
}

export interface GuidedMeditation {
  id: string;
  title: string;
  durationMinutes: number;
  category: string;
  description: string;
  guidanceQuotes: string[];
}

export interface CycleLogEntry {
  id: string;
  date: string; // YYYY-MM-DD
  isPeriodDay: boolean;
  flowLevel: FlowLevel;
  symptoms: string[];
  mood: string;
  notes: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  text: string;
  prompt: string;
  gentleReflectionNote?: string;
}

export interface HappyThought {
  id: string;
  text: string;
  theme: 'kindness' | 'friendship' | 'presence' | 'nature' | 'gentle_reminder';
  isFavorite?: boolean;
}

export interface WellbeingMilestone {
  id: string;
  title: string;
  description: string;
  category: 'movement' | 'breathe' | 'habits' | 'kindness' | 'rest';
  icon: string;
  achieved: boolean;
  achievedDate?: string;
}
