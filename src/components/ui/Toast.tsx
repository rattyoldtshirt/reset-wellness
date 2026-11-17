"use client";

import React from 'react';
import { useApp } from '@/context/AppContext';
import { LeafEmblem } from './BotanicalDecor';
import { X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#FFFFFF] border border-[#536451]/15 shadow-lg shadow-[#536451]/8 rounded-2xl p-4 flex items-center justify-between gap-3 text-sm text-[#2C382A] animate-in fade-in slide-in-from-bottom-2 duration-300"
        >
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-full bg-[#EDF2EB] text-[#536451] shrink-0">
              <LeafEmblem className="w-4 h-4" color="#536451" />
            </span>
            <p className="font-medium text-[13px] leading-snug">{toast.message}</p>
          </div>
          <button
            onClick={() => dismissToast(toast.id)}
            className="p-1 rounded-lg text-[#647362] hover:text-[#2C382A] hover:bg-[#FAF6EE] transition-colors shrink-0"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
