"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Recipe, MealLog } from '@/types/reset';
import { LeafEmblem, OliveSprig, GentleSun } from '@/components/ui/BotanicalDecor';
import {
  Salad,
  Clock,
  Heart,
  Droplets,
  Plus,
  Trash2,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Smile,
  BookOpen,
} from 'lucide-react';

export const NourishSection: React.FC = () => {
  const {
    recipes,
    setSelectedRecipe,
    mealLogs,
    addMealLog,
    deleteMealLog,
    todayCheckIn,
    incrementWater,
    decrementWater,
    userProfile,
    updateUserProfile,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAddMeal, setShowAddMeal] = useState<boolean>(false);

  // Form states for adding meal reflection
  const [mealType, setMealType] = useState<MealLog['mealType']>('Breakfast');
  const [mealDescription, setMealDescription] = useState('');
  const [mealFeeling, setMealFeeling] = useState<MealLog['feelingAfter']>('Energized');

  const recipeCategories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Warm Drink'];

  const filteredRecipes = selectedCategory === 'All'
    ? recipes
    : recipes.filter((r) => r.category === selectedCategory);

  const handleAddMealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mealDescription.trim()) return;
    addMealLog({
      mealType,
      description: mealDescription.trim(),
      feelingAfter: mealFeeling,
      tags: [mealFeeling],
    });
    setMealDescription('');
    setShowAddMeal(false);
  };

  const feelingOptions: MealLog['feelingAfter'][] = [
    'Energized',
    'Comforted',
    'Light',
    'Satisfied',
    'Nourished',
    'Heavy',
  ];

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      {/* 1. Nourish Philosophy Banner */}
      <div className="bg-[#FAF6EE] border border-[#536451]/12 rounded-3xl p-6 sm:p-7 relative overflow-hidden shadow-xs">
        <OliveSprig className="absolute -bottom-4 -right-4 w-28 h-28 text-[#A9B7A0] opacity-25 pointer-events-none" />
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-xl bg-[#EDF2EB] text-[#536451]">
            <Salad className="w-5 h-5" />
          </span>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#536451]">
            Nourish • Everyday Gentle Nutrition
          </span>
        </div>
        <h2 className="text-2xl font-serif text-[#2C382A] font-medium mb-1">
          Food as Care, Not Control
        </h2>
        <p className="text-xs sm:text-sm text-[#647362] max-w-xl leading-relaxed">
          No calorie obsession, no guilt, no restrictive rules. Just simple, colorful meals and warm drinks that leave your body feeling peaceful and energized.
        </p>

        {/* Optional Sustainable Weight-Management Toggle */}
        <div className="mt-4 pt-4 border-t border-[#536451]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <p className="font-semibold text-[#2C382A]">
              Sustainable Weight-Management Guidance:
            </p>
            <p className="text-[#647362]">
              Focus on colorful fiber, gentle hydration, and listening to fullness signals.
            </p>
          </div>
          <button
            onClick={() =>
              updateUserProfile({
                weightManagementGoal: !userProfile.weightManagementGoal,
              })
            }
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-medium transition-all shrink-0 ${
              userProfile.weightManagementGoal
                ? 'bg-[#EDF2EB] border-[#536451] text-[#536451] font-semibold'
                : 'bg-white border-[#536451]/15 text-[#647362]'
            }`}
          >
            {userProfile.weightManagementGoal ? 'Active & Gentle' : 'Enable Gentle Guidance'}
          </button>
        </div>
      </div>

      {/* 2. Hydration Tracker Card */}
      <div className="bg-[#FFFFFF] border border-[#536451]/12 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-[#EDF2EB] text-[#536451]">
              <Droplets className="w-5 h-5 text-[#536451]" />
            </span>
            <div>
              <h3 className="font-serif text-lg font-medium text-[#2C382A]">
                Hydration Rhythm
              </h3>
              <p className="text-xs text-[#647362]">
                {todayCheckIn.waterGlasses} of 8 glasses logged ({todayCheckIn.waterGlasses * 250} ml / 2,000 ml)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={decrementWater}
              disabled={todayCheckIn.waterGlasses === 0}
              className="px-3 py-1.5 rounded-xl border border-[#536451]/15 text-xs text-[#647362] hover:bg-[#FAF6EE] disabled:opacity-30"
            >
              -
            </button>
            <button
              onClick={incrementWater}
              className="px-4 py-1.5 rounded-xl bg-[#536451] text-white text-xs font-semibold hover:bg-[#435241] shadow-xs"
            >
              + Drink Glass
            </button>
          </div>
        </div>

        {/* 8 Glass Progress Bar */}
        <div className="grid grid-cols-8 gap-1.5">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((g) => (
            <button
              key={g}
              onClick={incrementWater}
              className={`h-8 rounded-xl flex items-center justify-center text-xs transition-all ${
                todayCheckIn.waterGlasses >= g
                  ? 'bg-[#A9B7A0] text-white font-semibold shadow-xs'
                  : 'bg-[#EDF2EB] text-[#647362] hover:bg-[#E2EBE0]'
              }`}
              title={`Glass ${g}`}
            >
              💧
            </button>
          ))}
        </div>
      </div>

      {/* 3. Mindful Meal Journal (How did it make you feel?) */}
      <div className="bg-[#FFFFFF] border border-[#536451]/12 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-medium text-[#2C382A]">
              Mindful Eating Journal
            </h3>
            <p className="text-xs text-[#647362]">
              Reflect on how your food felt in your body without calorie math.
            </p>
          </div>

          <button
            onClick={() => setShowAddMeal(!showAddMeal)}
            className="flex items-center gap-1 text-xs font-semibold text-[#536451] px-3.5 py-1.5 rounded-xl bg-[#FAF6EE] hover:bg-[#F5EBD8] border border-[#536451]/15 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Reflect On A Meal</span>
          </button>
        </div>

        {/* Form Drawer */}
        {showAddMeal && (
          <form
            onSubmit={handleAddMealSubmit}
            className="bg-[#FAF6EE] border border-[#536451]/15 rounded-2xl p-4 sm:p-5 space-y-3.5 text-xs animate-in fade-in duration-200"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Herbal Tea'] as MealLog['mealType'][]).map(
                (type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setMealType(type)}
                    className={`py-1.5 px-2 rounded-xl border text-center transition-all ${
                      mealType === type
                        ? 'bg-[#536451] text-white font-semibold'
                        : 'bg-white border-[#536451]/15 text-[#647362]'
                    }`}
                  >
                    {type}
                  </button>
                )
              )}
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#536451] mb-1">
                What did you enjoy?
              </label>
              <input
                type="text"
                value={mealDescription}
                onChange={(e) => setMealDescription(e.target.value)}
                placeholder="e.g. Warm lentil soup with sweet potato and fresh sourdough..."
                className="w-full p-2.5 rounded-xl bg-white border border-[#536451]/20 text-[#2C382A] focus:outline-none focus:border-[#536451]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#536451] mb-1">
                How did your body feel afterwards?
              </label>
              <div className="flex flex-wrap gap-1.5">
                {feelingOptions.map((feeling) => (
                  <button
                    key={feeling}
                    type="button"
                    onClick={() => setMealFeeling(feeling)}
                    className={`px-3 py-1 rounded-xl border transition-all ${
                      mealFeeling === feeling
                        ? 'bg-[#EDF2EB] border-[#536451] text-[#536451] font-semibold'
                        : 'bg-white border-[#536451]/15 text-[#647362]'
                    }`}
                  >
                    {feeling}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddMeal(false)}
                className="px-3 py-1.5 text-xs text-[#647362] hover:bg-white rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#536451] text-white font-semibold rounded-xl text-xs hover:bg-[#435241]"
              >
                Save Reflection
              </button>
            </div>
          </form>
        )}

        {/* Logged Meals List */}
        <div className="space-y-2">
          {mealLogs.length === 0 ? (
            <div className="text-center py-6 text-xs text-[#647362]">
              No meals reflected on today yet. Tap &apos;Reflect On A Meal&apos; above.
            </div>
          ) : (
            mealLogs.map((meal) => (
              <div
                key={meal.id}
                className="p-3.5 rounded-2xl bg-[#FAF6EE]/50 border border-[#536451]/10 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-[#536451]">{meal.mealType}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#EDF2EB] text-[#536451] text-[10px] font-medium">
                      Felt: {meal.feelingAfter}
                    </span>
                  </div>
                  <p className="text-[#2C382A]">{meal.description}</p>
                </div>
                <button
                  onClick={() => deleteMealLog(meal.id)}
                  className="p-1 rounded-lg text-[#647362] hover:text-[#C497A0] transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 4. Simple Recipes & Ideas Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-medium text-[#2C382A]">
              Everyday Nourishing Recipes
            </h3>
            <p className="text-xs text-[#647362]">
              Simple, anti-inflammatory and cycle-supportive ideas.
            </p>
          </div>

          {/* Categories */}
          <div className="flex items-center gap-1 overflow-x-auto">
            {recipeCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#536451] text-white shadow-xs'
                    : 'bg-white border border-[#536451]/15 text-[#647362] hover:bg-[#FAF6EE]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
              className="bg-[#FFFFFF] border border-[#536451]/12 rounded-3xl p-5 shadow-xs hover:border-[#A9B7A0] transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#647362] mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#EDF2EB] text-[#536451] font-semibold text-[11px]">
                    {recipe.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3 text-[#A9B7A0]" />
                    <span>{recipe.prepTime}</span>
                  </span>
                </div>

                <h4 className="font-serif text-base font-medium text-[#2C382A] mb-1.5 group-hover:text-[#536451] transition-colors">
                  {recipe.title}
                </h4>

                <p className="text-xs text-[#647362] line-clamp-2 mb-3">
                  {recipe.whyBodyLovesThis}
                </p>

                <div className="flex flex-wrap gap-1 mb-2">
                  {recipe.tags.slice(0, 2).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-[#FAF6EE] text-[#536451] text-[10px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#536451]/10 flex items-center justify-between text-xs text-[#536451] font-medium">
                <span>View Ingredients & Steps</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
