"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { LeafEmblem, OliveSprig, GentleSparkle } from '@/components/ui/BotanicalDecor';
import { X, Heart, RefreshCw, Copy, Check, BookmarkCheck } from 'lucide-react';

export const DailyHappyThoughtModal: React.FC = () => {
  const {
    isHappyThoughtModalOpen,
    setIsHappyThoughtModalOpen,
    happyThoughts,
    currentThoughtIndex,
    nextThought,
    savedThoughtIds,
    toggleSaveThought,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'today' | 'saved'>('today');
  const [hasCopied, setHasCopied] = useState(false);

  if (!isHappyThoughtModalOpen) return null;

  const currentThought = happyThoughts[currentThoughtIndex];
  const isSaved = savedThoughtIds.includes(currentThought.id);

  const savedThoughts = happyThoughts.filter((t) => savedThoughtIds.includes(t.id));

  const copyThought = (text: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      setHasCopied(true);
      showToast('Thought copied to clipboard ✨');
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C382A]/30 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#FAF6EE] border border-[#A9B7A0]/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        <OliveSprig className="absolute -top-4 -right-4 w-28 h-28 text-[#A9B7A0] opacity-25 pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-[#EDF2EB] text-[#536451]">
              <GentleSparkle className="w-5 h-5" color="#536451" />
            </span>
            <div>
              <h3 className="font-serif text-lg font-medium text-[#2C382A]">
                Little Joys
              </h3>
              <p className="text-[11px] text-[#647362]">
                Like a warm note folded into your pocket by a friend.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsHappyThoughtModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-[#FFFFFF] text-[#647362] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 p-1 bg-[#FFFFFF] border border-[#536451]/10 rounded-2xl mb-6">
          <button
            onClick={() => setActiveTab('today')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-xl transition-all ${
              activeTab === 'today'
                ? 'bg-[#EDF2EB] text-[#536451] font-semibold shadow-xs'
                : 'text-[#647362] hover:text-[#2C382A]'
            }`}
          >
            Daily Happy Thought
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'saved'
                ? 'bg-[#EDF2EB] text-[#536451] font-semibold shadow-xs'
                : 'text-[#647362] hover:text-[#2C382A]'
            }`}
          >
            <BookmarkCheck className="w-3.5 h-3.5" />
            <span>Saved ({savedThoughts.length})</span>
          </button>
        </div>

        {/* TAB 1: Today's Thought */}
        {activeTab === 'today' && (
          <div className="space-y-6">
            <div className="bg-[#FFFFFF] border border-[#A9B7A0]/30 rounded-3xl p-6 sm:p-8 text-center relative shadow-xs">
              <span className="text-4xl text-[#E8C4CA] font-serif block mb-2">&ldquo;</span>
              <p className="text-lg sm:text-xl font-serif text-[#2C382A] leading-relaxed px-2 font-normal">
                {currentThought.text}
              </p>
              <div className="mt-4 flex items-center justify-center gap-1 text-[11px] uppercase tracking-wider text-[#647362]">
                <LeafEmblem className="w-3.5 h-3.5" color="#A9B7A0" />
                <span>RESET • Little Joy Note</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => toggleSaveThought(currentThought.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-medium border transition-all ${
                  isSaved
                    ? 'bg-[#FAEFF1] border-[#E8C4CA] text-[#C497A0]'
                    : 'bg-[#FFFFFF] border-[#536451]/15 text-[#647362] hover:bg-[#FAF6EE]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                <span>{isSaved ? 'Saved to Joys' : 'Save Thought'}</span>
              </button>

              <button
                onClick={() => copyThought(currentThought.text)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-medium bg-[#FFFFFF] border border-[#536451]/15 text-[#647362] hover:bg-[#FAF6EE] transition-all"
              >
                {hasCopied ? <Check className="w-4 h-4 text-[#536451]" /> : <Copy className="w-4 h-4" />}
                <span>{hasCopied ? 'Copied' : 'Share'}</span>
              </button>

              <button
                onClick={nextThought}
                className="flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-medium bg-[#536451] text-[#FAF6EE] hover:bg-[#435241] transition-all shadow-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Next Note</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: Saved Collection */}
        {activeTab === 'saved' && (
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {savedThoughts.length === 0 ? (
              <div className="text-center py-10 bg-[#FFFFFF] rounded-2xl border border-[#536451]/10 p-6">
                <Heart className="w-8 h-8 text-[#E8C4CA] mx-auto mb-2 opacity-80" />
                <p className="text-sm font-serif text-[#2C382A]">No saved thoughts yet.</p>
                <p className="text-xs text-[#647362] mt-1">
                  Whenever a daily thought resonates with your heart, tap the save button to keep it here.
                </p>
              </div>
            ) : (
              savedThoughts.map((thought) => (
                <div
                  key={thought.id}
                  className="bg-[#FFFFFF] border border-[#A9B7A0]/25 rounded-2xl p-4 flex items-start justify-between gap-3 shadow-xs"
                >
                  <p className="text-sm font-serif text-[#2C382A] leading-relaxed">
                    &ldquo;{thought.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => copyThought(thought.text)}
                      className="p-1.5 rounded-lg text-[#647362] hover:bg-[#FAF6EE] transition-colors"
                      title="Copy"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toggleSaveThought(thought.id)}
                      className="p-1.5 rounded-lg text-[#C497A0] hover:bg-[#FAEFF1] transition-colors"
                      title="Remove from saved"
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
