import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ProjectScreen } from '../data/portfolioData';

interface LightboxModalProps {
  isOpen: boolean;
  screens: ProjectScreen[];
  currentIndex: number;
  projectTitle: string;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  screens,
  currentIndex,
  projectTitle,
  onClose,
  onSelectIndex,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && screens.length > 1) {
        onSelectIndex((currentIndex + 1) % screens.length);
      }
      if (e.key === 'ArrowLeft' && screens.length > 1) {
        onSelectIndex((currentIndex - 1 + screens.length) % screens.length);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, currentIndex, screens.length, onClose, onSelectIndex]);

  if (!isOpen || screens.length === 0) return null;

  const current = screens[currentIndex] || screens[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#141310]/88 p-4 sm:p-8 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={projectTitle}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#1B1A16] text-[#FAF9F4] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
          <p className="text-sm font-medium text-white/90">{current.label}</p>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/15 bg-white/5 p-2 text-white hover:bg-[#FCEC4D] hover:text-[#141310] transition-colors cursor-pointer"
            aria-label="Fermer l'aperçu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Image Stage */}
        <div className="relative flex flex-1 items-center justify-center overflow-auto p-4 sm:p-6 bg-[#11100E]">
          {screens.length > 1 && (
            <button
              type="button"
              onClick={() =>
                onSelectIndex((currentIndex - 1 + screens.length) % screens.length)
              }
              className="absolute left-4 z-10 rounded-full border border-white/15 bg-[#141310]/80 p-2.5 text-white hover:bg-[#FCEC4D] hover:text-[#141310] transition-colors cursor-pointer"
              aria-label="Écran précédent"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          <img
            src={current.src}
            alt={current.alt}
            className="max-h-[72vh] w-auto rounded-xl object-contain shadow-xl"
          />

          {screens.length > 1 && (
            <button
              type="button"
              onClick={() => onSelectIndex((currentIndex + 1) % screens.length)}
              className="absolute right-4 z-10 rounded-full border border-white/15 bg-[#141310]/80 p-2.5 text-white hover:bg-[#FCEC4D] hover:text-[#141310] transition-colors cursor-pointer"
              aria-label="Écran suivant"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Thumbnails / Dots when multiple screens */}
        {screens.length > 1 && (
          <div className="flex items-center justify-center gap-2 border-t border-white/10 px-4 py-3">
            {screens.map((scr, idx) => (
              <button
                key={scr.id}
                type="button"
                onClick={() => onSelectIndex(idx)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
                  idx === currentIndex
                    ? 'bg-[#FCEC4D] text-[#141310]'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {scr.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
