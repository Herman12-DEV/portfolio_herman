import React, { useState } from 'react';
import { Maximize2, ExternalLink, Lock } from 'lucide-react';
import type { ProjectItem, ProjectScreen } from '../data/portfolioData';

interface ProjectMockupProps {
  project: ProjectItem;
  onOpenLightbox: (screens: ProjectScreen[], initialIndex: number, projectTitle: string) => void;
}

export const ProjectMockup: React.FC<ProjectMockupProps> = ({ project, onOpenLightbox }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  if (project.mockupType === 'triple-mobile') {
    return (
      <div className="relative flex flex-col justify-between rounded-2xl border border-[#141310]/10 bg-gradient-to-br from-[#FAF8EE] via-[#FFFFFF] to-[#FBFB89]/35 p-5 sm:p-7 overflow-hidden">
        {/* Subtle grid background */}
        <div className="pointer-events-none absolute inset-0 bg-arch-grid-subtle opacity-70" />

        {/* Screen switcher pills */}
        <div className="relative z-10 mb-6 flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex flex-wrap items-center gap-1.5 rounded-full border border-[#141310]/10 bg-white/90 p-1 shadow-2xs">
            {project.screens.map((scr, idx) => (
              <button
                key={scr.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all cursor-pointer ${
                  activeIdx === idx
                    ? 'bg-[#141310] text-[#FCEC4D] shadow-xs'
                    : 'text-[#6F674D] hover:text-[#141310]'
                }`}
              >
                {scr.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onOpenLightbox(project.screens, activeIdx, project.title)}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#141310]/12 bg-white/90 px-3 py-1.5 text-xs font-medium text-[#141310] hover:bg-[#FCEC4D] transition-colors cursor-pointer"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            Agrandir
          </button>
        </div>

        {/* Desktop 3-phone showcase / Mobile single focused phone */}
        <div className="relative z-10 flex items-end justify-center gap-3 sm:gap-5 py-2">
          {project.screens.map((scr, idx) => {
            const isFocused = idx === activeIdx;
            return (
              <div
                key={scr.id}
                onClick={() => setActiveIdx(idx)}
                onDoubleClick={() => onOpenLightbox(project.screens, idx, project.title)}
                className={`group relative cursor-pointer transition-all duration-300 ${
                  isFocused
                    ? 'z-20 w-[205px] sm:w-[195px] md:w-[205px] scale-100 opacity-100'
                    : 'hidden sm:block z-10 w-[160px] md:w-[172px] scale-95 opacity-80 hover:opacity-100'
                }`}
              >
                <div
                  className={`rounded-[28px] border-[5px] bg-white p-1 shadow-[0_20px_50px_rgba(20,19,16,0.14)] transition-all ${
                    isFocused
                      ? 'border-[#141310] ring-4 ring-[#FCEC4D]/60'
                      : 'border-[#141310]/80'
                  }`}
                >
                  {/* Dynamic Island notch */}
                  <div className="mx-auto mb-1 mt-0.5 h-1.5 w-12 rounded-full bg-[#141310]/15" />
                  <div className="overflow-hidden rounded-[20px] bg-white">
                    <img
                      src={scr.src}
                      alt={scr.alt}
                      loading="lazy"
                      className="w-full h-auto object-cover select-none"
                    />
                  </div>
                </div>
                <p
                  className={`mt-2.5 text-center font-mono-tech text-[11px] transition-colors ${
                    isFocused ? 'font-semibold text-[#141310]' : 'text-[#6F674D]'
                  }`}
                >
                  0{idx + 1} · {scr.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (project.mockupType === 'single-mobile') {
    const mainScreen = project.screens[0];
    return (
      <div className="relative flex flex-col justify-between rounded-2xl border border-[#141310]/10 bg-gradient-to-br from-[#141310] via-[#1B1D24] to-[#111822] p-5 sm:p-7 text-[#FAF9F4] overflow-hidden">
        {/* Soft ambient emerald/gold glow */}
        <div
          className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(circle, #FCEC4D 0%, transparent 70%)' }}
        />

        <div className="relative z-10 mb-4 flex items-center justify-between">
          <span className="font-mono-tech text-[11px] uppercase tracking-wider text-[#BCB4AE]">
            Interface Administrateur · Mobile
          </span>
          <button
            type="button"
            onClick={() => onOpenLightbox(project.screens, 0, project.title)}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-[#FCEC4D] hover:text-[#141310] transition-colors cursor-pointer"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            Agrandir
          </button>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-center gap-6 py-1">
          <div className="md:col-span-7 flex justify-center">
            <div
              onClick={() => onOpenLightbox(project.screens, 0, project.title)}
              className="group relative w-[225px] sm:w-[240px] cursor-pointer rounded-[30px] border-[6px] border-[#2C303B] bg-[#0F1722] p-1 shadow-[0_24px_60px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="mx-auto mb-1.5 mt-0.5 h-1.5 w-14 rounded-full bg-white/15" />
              <div className="overflow-hidden rounded-[22px]">
                <img
                  src={mainScreen.src}
                  alt={mainScreen.alt}
                  loading="lazy"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {project.highlights && (
            <div className="md:col-span-5 flex flex-col gap-3">
              {project.highlights.map((hl, i) => (
                <div
                  key={hl.label}
                  className="rounded-xl border border-white/10 bg-white/[0.05] p-3.5 backdrop-blur-xs"
                >
                  <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[#FCEC4D]">
                    Module 0{i + 1}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white">{hl.value}</div>
                  <div className="text-xs text-[#BCB4AE]">{hl.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Browser mockups ('browser-light' | 'browser-dark')
  const isDark = project.mockupType === 'browser-dark';
  const mainScreen = project.screens[0];

  return (
    <div
      className={`relative flex flex-col justify-between rounded-2xl border border-[#141310]/10 p-4 sm:p-6 overflow-hidden ${
        isDark
          ? 'bg-gradient-to-br from-[#181714] via-[#121210] to-[#232118]'
          : 'bg-gradient-to-br from-[#F7F4EA] via-[#FFFFFF] to-[#FBFB89]/30'
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-arch-grid-subtle opacity-50" />

      {/* Studio Browser Window */}
      <div
        className={`relative z-10 overflow-hidden rounded-xl border shadow-[0_20px_50px_rgba(20,19,16,0.14)] transition-transform duration-300 hover:-translate-y-0.5 ${
          isDark
            ? 'border-white/15 bg-[#0A0B0A]'
            : 'border-[#141310]/12 bg-white'
        }`}
      >
        {/* Browser Chrome Top Bar */}
        <div
          className={`flex items-center justify-between gap-3 border-b px-3.5 py-2.5 ${
            isDark
              ? 'border-white/10 bg-[#141514] text-[#BCB4AE]'
              : 'border-[#141310]/10 bg-[#FAF9F4] text-[#6F674D]'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]/85" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]/85" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]/85" />
          </div>

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1 font-mono-tech text-[11px] transition-colors ${
                isDark
                  ? 'bg-white/5 text-white/85 hover:bg-white/10'
                  : 'bg-[#141310]/[0.04] text-[#141310] hover:bg-[#FCEC4D]/60'
              }`}
            >
              <Lock className="h-2.5 w-2.5 opacity-70" />
              {project.domainLabel}
              <ExternalLink className="h-2.5 w-2.5 opacity-70" />
            </a>
          ) : (
            <span className="font-mono-tech text-[11px]">{mainScreen.label}</span>
          )}

          <button
            type="button"
            onClick={() => onOpenLightbox(project.screens, 0, project.title)}
            className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-colors cursor-pointer ${
              isDark
                ? 'text-white/80 hover:bg-white/10 hover:text-[#FCEC4D]'
                : 'text-[#141310] hover:bg-[#FCEC4D]'
            }`}
            title="Agrandir la capture"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Zoom</span>
          </button>
        </div>

        {/* Viewport Image */}
        <div
          onClick={() => onOpenLightbox(project.screens, 0, project.title)}
          className="cursor-pointer overflow-hidden"
        >
          <img
            src={mainScreen.src}
            alt={mainScreen.alt}
            loading="lazy"
            className="w-full h-auto object-cover transition-transform duration-500 hover:scale-[1.015]"
          />
        </div>
      </div>
    </div>
  );
};
