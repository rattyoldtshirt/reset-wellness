"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { LeafEmblem, OliveSprig, GentleSparkle } from '@/components/ui/BotanicalDecor';
import { X, Heart, Sparkles, Trash2, Edit2, Check, RefreshCw, AlertCircle } from 'lucide-react';

export const SelfAppreciationModal: React.FC = () => {
  const {
    isSelfAppreciationModalOpen,
    setIsSelfAppreciationModalOpen,
    journalEntries,
    addJournalEntry,
    editJournalEntry,
    deleteJournalEntry,
    surpriseJournalEntry,
    triggerRandomJournalEntry,
    closeSurpriseJournal,
  } = useApp();

  const [entryText, setEntryText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  if (!isSelfAppreciationModalOpen) return null;

  // Gentle sentiment awareness
  const negativeKeywords = [
    'hate', 'ugly', 'fat', 'failure', 'lazy', 'stupid', 'useless', 'worthless',
    'nothing', 'awful', 'terrible', 'disgusting', 'idiot', 'never good enough'
  ];

  const containsSelfCriticism = negativeKeywords.some((word) =>
    entryText.toLowerCase().includes(word)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entryText.trim()) return;
    addJournalEntry(entryText.trim());
    setEntryText('');
  };

  const startEdit = (id: string, currentText: string) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const saveEdit = (id: string) => {
    if (!editText.trim()) return;
    editJournalEntry(id, editText.trim());
    setEditingId(null);
  };

  const suggestionPrompts = [
    'I make really comforting chai or tea.',
    'I like my curiosity and how I care about people.',
    'I listened to my body when it felt tired.',
    'I like my sense of humour.',
    'I am resilient and proud of how far I have come.',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C382A]/30 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#FAF6EE] border border-[#E8C4CA]/50 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        <OliveSprig className="absolute -top-4 -right-4 w-24 h-24 text-[#E8C4CA] opacity-30 pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-[#FAEFF1] text-[#C497A0]">
              <Heart className="w-5 h-5 fill-current" />
            </span>
            <div>
              <h3 className="font-serif text-lg font-medium text-[#2C382A]">
                Something Good About Me
              </h3>
              <p className="text-[11px] text-[#647362]">
                A private, gentle space to notice your own quiet light.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsSelfAppreciationModalOpen(false);
              closeSurpriseJournal();
            }}
            className="p-1.5 rounded-full hover:bg-[#FFFFFF] text-[#647362] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Surprise Past Entry Modal Overlay (if triggered) */}
        {surpriseJournalEntry && (
          <div className="bg-[#FFFFFF] border-2 border-[#C9C2DD] rounded-2xl p-5 mb-5 shadow-md relative animate-in fade-in duration-300">
            <button
              onClick={closeSurpriseJournal}
              className="absolute top-3 right-3 text-[#647362] hover:text-[#2C382A]"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#536451] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C9C2DD]" />
              <span>A Whisper From Past You ({surpriseJournalEntry.date})</span>
            </div>
            <p className="text-base font-serif text-[#2C382A] italic bg-[#F4F2F9] p-4 rounded-xl border border-[#C9C2DD]/30">
              &ldquo;{surpriseJournalEntry.text}&rdquo;
            </p>
            <p className="text-[11px] text-[#647362] mt-2">
              How lovely that this warmth has been in you all along.
            </p>
          </div>
        )}

        {/* Main Prompt */}
        <div className="bg-[#FFFFFF] border border-[#E8C4CA]/40 rounded-2xl p-5 mb-6 shadow-xs">
          <p className="font-serif text-base text-[#2C382A] mb-2 font-medium">
            &ldquo;What&apos;s one thing you like about yourself today?&rdquo;
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <textarea
              rows={3}
              value={entryText}
              onChange={(e) => setEntryText(e.target.value)}
              placeholder="e.g. I was patient with myself when I felt tired... or I really like my creative eye."
              className="w-full p-3.5 rounded-xl bg-[#FAF6EE]/80 border border-[#536451]/15 text-sm text-[#2C382A] placeholder-[#647362]/60 focus:outline-none focus:border-[#536451] transition-all resize-none"
            />

            {/* Gentle Kindness Guardrail Banner */}
            {containsSelfCriticism && (
              <div className="bg-[#FAEFF1] border border-[#E8C4CA] rounded-xl p-3 flex items-start gap-2.5 text-xs text-[#2C382A]">
                <AlertCircle className="w-4 h-4 text-[#C497A0] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#C497A0] mb-0.5">A tender pause:</p>
                  <p className="text-[#647362] leading-relaxed">
                    It feels like a heavy or self-critical day, and that is okay. You don&apos;t have to force grand perfection. Even noticing that you got through today or made tea is something worthy of appreciation. Would you like to soften your words?
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              {/* Quick inspiration pills */}
              <div className="flex flex-wrap gap-1 text-[11px]">
                <span className="text-[#647362] self-center mr-1">Inspirations:</span>
                {suggestionPrompts.slice(0, 2).map((sug, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setEntryText(sug)}
                    className="px-2 py-0.5 rounded-full bg-[#FAF6EE] hover:bg-[#F5EBD8] text-[#536451] border border-[#A9B7A0]/30 transition-colors"
                  >
                    {sug.length > 28 ? sug.substring(0, 28) + '...' : sug}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={!entryText.trim()}
                className="px-5 py-2 rounded-xl bg-[#536451] hover:bg-[#435241] disabled:opacity-40 text-[#FAF6EE] text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Note to Self</span>
              </button>
            </div>
          </form>
        </div>

        {/* Previous Entries & Random Spark Button */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#536451]">
              Past Moments of Self-Kindness ({journalEntries.length})
            </h4>
            {journalEntries.length > 0 && (
              <button
                onClick={triggerRandomJournalEntry}
                className="flex items-center gap-1 text-xs font-medium text-[#536451] hover:text-[#2C382A] px-2 py-1 rounded-lg hover:bg-[#FFFFFF] transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#A9B7A0]" />
                <span>Surprise Me With a Past Spark</span>
              </button>
            )}
          </div>

          <div className="max-h-56 overflow-y-auto space-y-2.5 pr-1">
            {journalEntries.length === 0 ? (
              <div className="text-center py-8 bg-[#FFFFFF] rounded-2xl border border-[#536451]/10 p-4">
                <GentleSparkle className="w-6 h-6 text-[#A9B7A0] mx-auto mb-1.5 opacity-80" />
                <p className="text-xs text-[#647362]">
                  Your journal is fresh and waiting. Write one kind observation above.
                </p>
              </div>
            ) : (
              journalEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-[#FFFFFF] border border-[#536451]/10 rounded-2xl p-3.5 text-xs transition-all shadow-xs"
                >
                  {editingId === entry.id ? (
                    <div className="space-y-2">
                      <textarea
                        rows={2}
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full p-2 rounded-lg bg-[#FAF6EE] border border-[#536451]/20 text-xs text-[#2C382A] focus:outline-none"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-2.5 py-1 rounded-md text-[11px] text-[#647362] hover:bg-[#FAF6EE]"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => saveEdit(entry.id)}
                          className="px-3 py-1 rounded-md bg-[#536451] text-white text-[11px] font-medium"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <span className="text-[10px] text-[#647362] font-medium block">
                          {entry.date}
                        </span>
                        <p className="text-sm font-serif text-[#2C382A] leading-relaxed">
                          &ldquo;{entry.text}&rdquo;
                        </p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => startEdit(entry.id, entry.text)}
                          className="p-1 rounded-md text-[#647362] hover:bg-[#FAF6EE] transition-colors"
                          title="Edit entry"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteJournalEntry(entry.id)}
                          className="p-1 rounded-md text-[#C497A0] hover:bg-[#FAEFF1] transition-colors"
                          title="Delete entry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
