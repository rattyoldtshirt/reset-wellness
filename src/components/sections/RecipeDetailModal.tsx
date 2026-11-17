"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { LeafEmblem, OliveSprig, GentleSun } from '@/components/ui/BotanicalDecor';
import { X, Clock, Heart, Check, Sparkles, ShieldCheck } from 'lucide-react';

export const RecipeDetailModal: React.FC = () => {
  const { selectedRecipe, setSelectedRecipe, showToast } = useApp();
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);

  if (!selectedRecipe) return null;

  const toggleIngredient = (ing: string) => {
    setCheckedIngredients((prev) =>
      prev.includes(ing) ? prev.filter((i) => i !== ing) : [...prev, ing]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#2C382A]/40 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FAF6EE] border border-[#536451]/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        <OliveSprig className="absolute -top-6 -right-6 w-28 h-28 text-[#A9B7A0] opacity-25 pointer-events-none" />

        {/* Modal Top Bar */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#EDF2EB] text-[#536451] text-xs font-semibold">
                {selectedRecipe.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-[#647362] font-medium">
                <Clock className="w-3.5 h-3.5 text-[#A9B7A0]" />
                <span>{selectedRecipe.prepTime}</span>
              </span>
              {selectedRecipe.isArthritisFriendly && (
                <span className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-[#FAF6EE] text-[#536451] border border-[#A9B7A0]/40">
                  <ShieldCheck className="w-3 h-3 text-[#A9B7A0]" />
                  <span>Anti-Inflammatory Joint Ease</span>
                </span>
              )}
            </div>

            <h3 className="font-serif text-2xl font-medium text-[#2C382A]">
              {selectedRecipe.title}
            </h3>
          </div>

          <button
            onClick={() => setSelectedRecipe(null)}
            className="p-1.5 rounded-full hover:bg-white text-[#647362] transition-colors shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Why your body loves this (Nutritional Compassion) */}
        <div className="bg-[#FFFFFF] border border-[#E8C4CA]/40 rounded-2xl p-4 sm:p-5 mb-6 text-xs text-[#2C382A] shadow-xs">
          <div className="flex items-center gap-2 mb-1.5 text-[#536451] font-semibold text-xs uppercase tracking-wider">
            <Heart className="w-4 h-4 text-[#C497A0] fill-current" />
            <span>Why Your Body Loves This</span>
          </div>
          <p className="text-[#647362] leading-relaxed">
            {selectedRecipe.whyBodyLovesThis}
          </p>
        </div>

        {/* Ingredients & Instructions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[50vh] overflow-y-auto pr-1">
          {/* Ingredients */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#536451] mb-3 flex items-center justify-between">
              <span>Ingredients</span>
              <span className="text-[11px] text-[#647362] font-normal lowercase">
                tap to cross off
              </span>
            </h4>
            <div className="space-y-2">
              {selectedRecipe.ingredients.map((ing, idx) => {
                const isChecked = checkedIngredients.includes(ing);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleIngredient(ing)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs flex items-start gap-2.5 transition-all ${
                      isChecked
                        ? 'bg-[#EDF2EB]/60 border-[#536451]/20 text-[#647362] line-through'
                        : 'bg-[#FFFFFF] border-[#536451]/10 text-[#2C382A]'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-md mt-0.5 flex items-center justify-center shrink-0 border ${
                        isChecked
                          ? 'bg-[#536451] border-[#536451] text-white'
                          : 'border-[#647362]/40 bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[2.5]" />}
                    </div>
                    <span>{ing}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Simple Steps */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#536451] mb-3">
              Simple Preparation
            </h4>
            <div className="space-y-3">
              {selectedRecipe.instructions.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs">
                  <span className="w-5 h-5 rounded-full bg-[#EDF2EB] text-[#536451] font-semibold flex items-center justify-center shrink-0 text-[11px] mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-[#647362] leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 mt-6 border-t border-[#536451]/10 text-xs">
          <p className="text-[#647362] italic font-serif">
            Eat slowly, breathe between bites, and savor.
          </p>
          <button
            onClick={() => {
              showToast('Recipe saved to your favorites ❤️');
              setSelectedRecipe(null);
            }}
            className="px-5 py-2.5 rounded-xl bg-[#536451] text-[#FAF6EE] font-semibold hover:bg-[#435241] shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
