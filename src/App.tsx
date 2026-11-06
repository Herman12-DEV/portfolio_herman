import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowDownRight,
  ArrowUpRight,
  Layers,
  Smartphone,
  Terminal,
  Database,
  Boxes,
  Compass,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

const GitHubIcon: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);
import { Navbar } from './components/Navbar';
import { ProjectMockup } from './components/ProjectMockups';
import { LightboxModal } from './components/LightboxModal';
import { ContactSection } from './components/ContactSection';
import {
  HERO_MARQUEE_ITEMS,
  SKILLS_DATA,
  PROJECTS_DATA,
  APPROACH_STEPS,
  CONTACT_INFO,
  type ProjectScreen,
} from './data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const SkillIcon: React.FC<{ name: string }> = ({ name }) => {
  switch (name) {
    case 'layers':
      return <Layers className="h-5 w-5" />;
    case 'smartphone':
      return <Smartphone className="h-5 w-5" />;
    case 'terminal':
      return <Terminal className="h-5 w-5" />;
    case 'database':
      return <Database className="h-5 w-5" />;
    case 'boxes':
      return <Boxes className="h-5 w-5" />;
    default:
      return <Compass className="h-5 w-5" />;
  }
};

export function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const [projectFilter, setProjectFilter] = useState<'all' | 'mobile' | 'web'>('all');
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    screens: ProjectScreen[];
    currentIndex: number;
    projectTitle: string;
  }>({
    isOpen: false,
    screens: [],
    currentIndex: 0,
    projectTitle: '',
  });

  const openLightbox = (
    screens: ProjectScreen[],
    initialIndex: number,
    projectTitle: string
  ) => {
    setLightboxState({
      isOpen: true,
      screens,
      currentIndex: initialIndex,
      projectTitle,
    });
  };

  const filteredProjects =
    projectFilter === 'all'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === projectFilter);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-scroll-heading]').forEach((heading) => {
        gsap.fromTo(
          heading,
          { autoAlpha: 0, y: 48, filter: 'blur(6px)' },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-scroll-stagger]').forEach((group) => {
        const items = Array.from(group.children).filter(
          (item): item is HTMLElement => item instanceof HTMLElement
        );

        if (items.length === 0) return;

        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 86%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-scroll-reveal]').forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 32 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, appRef);

    return () => context.revert();
  }, []);

  return (
    <div
      id="top"
      ref={appRef}
      className="min-h-screen flex flex-col bg-[#FAF9F4] text-[#141310]"
    >
      <Navbar />

      <main className="flex-1">
        {/* =========================================================
            HERO — MARQUEE HERO WITH SOFT SOLAR GLOW & ARCH GRID
           ========================================================= */}
        <section className="relative overflow-hidden hero-solar-aura border-b border-[#141310]/10">
          {/* Architectural Grid Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-arch-grid" />

          <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 pt-12 sm:pt-16 md:pt-20 pb-14 sm:pb-20">
            {/* Top Architectural Metadata Bar */}
            

            {/* Monumental Editorial Serif Headline */}
            <div className="mt-10 sm:mt-12 max-w-[1040px]">
              <h1
                data-scroll-heading
                className="font-serif-editorial text-[clamp(3rem,7.2vw,6.25rem)] leading-[1.01] tracking-[-0.035em] text-[#141310]"
              >
                Je transforme des idées en solutions numériques{' '}
                <span className="italic underline decoration-[#FCEC4D] decoration-[6px] underline-offset-[6px]">
                  utiles, intuitives
                </span>{' '}
                et performantes.
              </h1>
            </div>

            {/* Lower Hero Split: Narrative + Architectural Profile Card */}
            <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left Narrative + CTAs */}
              <div className="lg:col-span-7 space-y-4 text-[15px] sm:text-base leading-[1.7] text-[#3D392C]">
                <p>
                  Étudiant en <strong>Licence 3 à l&apos;ESATIC</strong>, spécialisé en{' '}
                  <strong>Systèmes Informatiques et Génie Logiciel</strong>, je suis passionné
                  par le développement informatique, la conception d&apos;applications et les
                  nouvelles technologies.
                </p>
                <p>
                  J&apos;aime concevoir et développer des solutions numériques qui répondent à
                  des besoins concrets. De la réflexion autour d&apos;une idée à sa réalisation
                  technique, je m&apos;intéresse à chaque étape du processus de création.
                </p>
                <p className="font-medium text-[#141310]">
                  Mon objectif : continuer à apprendre, relever de nouveaux défis et participer
                  à des projets innovants.
                </p>

                {/* Primary & Secondary CTAs */}
                <div className="pt-4 flex flex-wrap items-center gap-3.5">
                  <a
                    href="#projets"
                    className="group inline-flex items-center gap-2.5 rounded-full bg-[#141310] px-6 py-3.5 text-sm font-semibold text-[#FAF9F4] transition-all hover:bg-[#FCEC4D] hover:text-[#141310] shadow-[0_8px_24px_rgba(20,19,16,0.14)]"
                  >
                    Découvrir mes projets
                    <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                  </a>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full border border-[#141310]/20 bg-white/85 px-6 py-3.5 text-sm font-semibold text-[#141310] backdrop-blur-xs transition-all hover:border-[#141310] hover:bg-[#FBFB89]/60"
                  >
                    Me contacter
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Right: Architectural Developer Identity Card */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl border border-[#141310]/12 bg-white/90 p-6 backdrop-blur-sm shadow-[0_14px_40px_rgba(20,19,16,0.06)]">
                  {/* Corner crosshairs */}
                  <span className="pointer-events-none absolute -top-2 -left-1.5 font-mono-tech text-xs text-[#857C5D]/60">
                    +
                  </span>
                  <span className="pointer-events-none absolute -top-2 -right-1.5 font-mono-tech text-xs text-[#857C5D]/60">
                    +
                  </span>

                  <div className="flex items-center justify-between border-b border-[#141310]/10 pb-4">
                    <div>
                      <p className="font-mono-tech text-[11px] uppercase tracking-widest text-[#827602]">
                        Profil Ingénierie Logicielle
                      </p>
                      <h2 className="mt-0.5 font-serif-editorial text-2xl text-[#141310]">
                        Hermann Kouadio
                      </h2>
                    </div>
                    <span className="rounded-xl bg-[#FCEC4D] px-3 py-1 font-mono-tech text-xs font-semibold text-[#141310]">
                      L3 · SIGL
                    </span>
                  </div>

                  <dl className="mt-4 space-y-3 text-sm">
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-[#6F674D]">Spécialité</dt>
                      <dd className="text-right font-medium text-[#141310]">
                        Full-Stack Web &amp; Mobile
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-[#6F674D]">Établissement</dt>
                      <dd className="text-right font-medium text-[#141310]">ESATIC, Abidjan</dd>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-[#6F674D]">Disponibilité</dt>
                      <dd className="text-right font-semibold text-[#827602]">
                        Stage PFE &amp; Projets
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-5 flex items-center justify-between gap-2 border-t border-[#141310]/10 pt-4">
                    <a
                      href={CONTACT_INFO.githubHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#141310]/12 bg-[#FAF9F4] px-3 py-1.5 text-xs font-semibold text-[#141310] hover:bg-[#FCEC4D] transition-colors"
                    >
                      <GitHubIcon className="h-3.5 w-3.5" />
                      Herman12-DEV
                    </a>
                    <a
                      href={CONTACT_INFO.linkedinHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg border border-[#141310]/12 bg-[#FAF9F4] px-3 py-1.5 text-xs font-semibold text-[#141310] hover:bg-[#FCEC4D] transition-colors"
                    >
                      LinkedIn
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Signature Daniel Sun Marquee Hero Strip */}
          <div className="relative z-10 border-t border-[#141310]/10 bg-[#FAF9F4]/90 py-3.5 overflow-hidden">
            <div className="animate-marquee flex items-center">
              {[...HERO_MARQUEE_ITEMS, ...HERO_MARQUEE_ITEMS].map((item, idx) => (
                <div key={`${item}-${idx}`} className="flex items-center shrink-0">
                  <span className="px-6 font-mono-tech text-xs uppercase tracking-[0.18em] text-[#141310]/85">
                    {item}
                  </span>
                  <span className="inline-block h-2 w-2 rotate-45 bg-[#FCEC4D] border border-[#827602]/40" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* À propos */}
        <section id="a-propos" className="py-20 sm:py-28 border-b border-[#141310]/10">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left Sticky Column */}
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <h2 data-scroll-heading className="font-serif-editorial text-[clamp(2.75rem,5.5vw,4.75rem)] leading-[1.04] text-[#141310]">
                  La technologie au <span className="italic">service</span> des idées.
                </h2>

                {/* Highlighted Vision Box */}
                <div className="mt-8 rounded-2xl border border-[#141310]/12 card-solar-glow p-6 shadow-2xs">
                  <p className="font-mono-tech text-[11px] uppercase tracking-widest text-[#827602]">
                    Ma vision
                  </p>
                  <p className="mt-2 font-serif-editorial text-2xl sm:text-[26px] leading-[1.25] text-[#141310]">
                    « Concevoir des expériences numériques simples, accessibles et efficaces,
                    tout en contribuant à l&apos;innovation technologique. »
                  </p>
                </div>
              </div>

              {/* Right Editorial Copy */}
              <div className="lg:col-span-7 space-y-5 text-base sm:text-[17px] leading-[1.78] text-[#3D392C]">
                <p className="text-lg sm:text-xl font-medium leading-[1.6] text-[#141310]">
                  Je suis Hermann Kouadio, étudiant en Licence 3 à l&apos;École Supérieure
                  Africaine des Technologies de l&apos;Information et de la Communication
                  (ESATIC), en filière Systèmes Informatiques et Génie Logiciel.
                </p>

                <p>
                  Passionné par le numérique et la création de solutions technologiques, je
                  m&apos;intéresse particulièrement au développement web et mobile, à la
                  programmation backend, aux bases de données et à l&apos;architecture
                  logicielle.
                </p>

                <p>
                  Au fil de mon parcours académique et de mes projets personnels, j&apos;ai
                  développé une approche orientée vers la résolution de problèmes, la recherche
                  de solutions adaptées et l&apos;amélioration continue de mes compétences.
                </p>

                <p>
                  Je considère chaque projet comme une occasion d&apos;expérimenter,
                  d&apos;apprendre et de repousser mes limites.
                </p>

                {/* Architectural Pillar Strip */}
                <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#141310]/10">
                  <div className="rounded-xl border border-[#141310]/10 bg-white p-4">
                    <span className="font-mono-tech text-xs text-[#827602]">01</span>
                    <p className="mt-1 text-sm font-semibold text-[#141310]">
                      Web &amp; Mobile
                    </p>
                    <p className="mt-0.5 text-xs text-[#6F674D]">
                      Interfaces fluides &amp; centrées utilisateur
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#141310]/10 bg-white p-4">
                    <span className="font-mono-tech text-xs text-[#827602]">02</span>
                    <p className="mt-1 text-sm font-semibold text-[#141310]">
                      Backend &amp; Données
                    </p>
                    <p className="mt-0.5 text-xs text-[#6F674D]">
                      Logique métier robuste &amp; bases relationnelles
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#141310]/10 bg-white p-4">
                    <span className="font-mono-tech text-xs text-[#827602]">03</span>
                    <p className="mt-1 text-sm font-semibold text-[#141310]">
                      Architecture &amp; Rigueur
                    </p>
                    <p className="mt-0.5 text-xs text-[#6F674D]">
                      Code structuré, maintenable et évolutif
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compétences */}
        <section
          id="competences"
          className="relative py-20 sm:py-28 border-b border-[#141310]/10 bg-arch-grid-subtle"
        >
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <div className="mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 data-scroll-heading className="font-serif-editorial text-[clamp(2.75rem,5.5vw,4.75rem)] leading-[1.04] text-[#141310]">
                  Domaines de <span className="italic">maîtrise</span> technique.
                </h2>
              </div>

              <p className="max-w-md text-sm sm:text-base text-[#524C3A]">
                De la modélisation des données à l&apos;interface mobile ou web finale, une
                vision complète du cycle de développement logiciel.
              </p>
            </div>

            {/* 6-Card Architectural Matrix */}
            <div data-scroll-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SKILLS_DATA.map((skill) => (
                <article
                  key={skill.index}
                  className="group relative flex flex-col justify-between rounded-2xl border border-[#141310]/12 bg-white/95 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#141310]/35 hover:shadow-[0_16px_38px_rgba(20,19,16,0.06)]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#141310]/10 bg-[#FAF9F4] text-[#141310] transition-colors group-hover:bg-[#FCEC4D]">
                        <SkillIcon name={skill.icon} />
                      </span>
                      <span className="font-mono-tech text-xs font-medium text-[#857C5D]">
                        {skill.index}
                      </span>
                    </div>

                    <h3 className="mt-6 font-serif-editorial text-[clamp(1.75rem,2.4vw,2.25rem)] leading-tight text-[#141310]">
                      {skill.title}
                    </h3>

                    <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-[#524C3A]">
                      {skill.description}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-1.5 border-t border-[#141310]/8 pt-4">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-[#FAF9F4] border border-[#141310]/10 px-2.5 py-1 font-mono-tech text-[11px] text-[#524C3A]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Projets */}
        <section id="projets" className="py-20 sm:py-28 border-b border-[#141310]/10">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            {/* Header + Filter */}
            <div className="mb-12 sm:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <h2 data-scroll-heading className="font-serif-editorial text-[clamp(2.75rem,5.8vw,5rem)] leading-[1.04] text-[#141310]">
                  Des idées concrétisées en{' '}
                  <span className="italic">solutions numériques.</span>
                </h2>

                <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#524C3A]">
                  Je développe des projets académiques et personnels qui me permettent de
                  mettre en pratique mes connaissances, d&apos;explorer de nouvelles
                  technologies et de développer mon expérience.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="inline-flex self-start lg:self-auto items-center gap-1 rounded-full border border-[#141310]/12 bg-white p-1.5 shadow-2xs">
                {[
                  { key: 'all', label: 'Tous (4)' },
                  { key: 'mobile', label: 'Mobile (2)' },
                  { key: 'web', label: 'Web & Produit (2)' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setProjectFilter(tab.key as 'all' | 'mobile' | 'web')}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                      projectFilter === tab.key
                        ? 'bg-[#141310] text-[#FCEC4D]'
                        : 'text-[#6F674D] hover:text-[#141310]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Project Case Studies */}
            <div className="space-y-10 sm:space-y-14">
              {filteredProjects.map((project, index) => {
                const isReversed = index % 2 === 1;
                return (
                  <article
                    key={project.id}
                    data-scroll-reveal
                    className="rounded-3xl border border-[#141310]/12 bg-white p-5 sm:p-8 lg:p-10 shadow-[0_12px_40px_rgba(20,19,16,0.04)]"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                      {/* Text Column */}
                      <div
                        className={`lg:col-span-5 flex flex-col justify-between ${
                          isReversed ? 'lg:order-2' : 'lg:order-1'
                        }`}
                      >
                        <div>
                          <div className="flex flex-wrap items-center gap-2.5">
                            <span className="inline-flex h-7 items-center rounded-full bg-[#FCEC4D] px-3 font-mono-tech text-xs font-bold text-[#141310]">
                              {project.number}
                            </span>
                            <span className="font-mono-tech text-xs font-medium text-[#827602]">
                              {project.categoryBadge}
                            </span>
                          </div>

                          <h3 className="mt-4 font-serif-editorial text-[clamp(2rem,4vw,3.5rem)] leading-[1.06] text-[#141310]">
                            {project.title}
                          </h3>

                          <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-[#6F674D]">
                            {project.subtitle}
                          </p>

                          <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-[#3D392C]">
                            {project.description}
                          </p>

                          <p className="mt-2.5 text-sm sm:text-[15px] leading-relaxed text-[#524C3A]">
                            {project.context}
                          </p>

                          {/* Axes de travail */}
                          <div className="mt-5 border-t border-[#141310]/10 pt-4">
                            <p className="font-mono-tech text-[11px] font-semibold uppercase tracking-wider text-[#141310]">
                              Axes de travail :
                            </p>
                            <ul className="mt-2.5 space-y-2">
                              {project.axes.map((axe) => (
                                <li
                                  key={axe}
                                  className="flex items-start gap-2.5 text-sm text-[#3D392C]"
                                >
                                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#827602]" />
                                  <span>{axe}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Tech Tags + Action Links */}
                        <div className="mt-6 pt-4 border-t border-[#141310]/10">
                          <div className="flex flex-wrap gap-1.5">
                            {project.tags.map((t) => (
                              <span
                                key={t}
                                className="rounded-md bg-[#FAF9F4] border border-[#141310]/10 px-2.5 py-1 font-mono-tech text-[11px] text-[#524C3A]"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          {(project.liveUrl || project.githubUrl) && (
                            <div className="mt-4 flex flex-wrap items-center gap-3">
                              {project.liveUrl && (
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 rounded-full bg-[#141310] px-4 py-2 text-xs font-semibold text-[#FAF9F4] hover:bg-[#FCEC4D] hover:text-[#141310] transition-colors"
                                >
                                  Voir le site en ligne
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                              )}
                              {project.githubUrl && (
                                <a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 rounded-full border border-[#141310]/20 bg-[#FAF9F4] px-4 py-2 text-xs font-semibold text-[#141310] hover:bg-[#FCEC4D]/60 transition-colors"
                                >
                                  <GitHubIcon className="h-3.5 w-3.5" />
                                  Code source GitHub
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Mockup Showcase Column */}
                      <div
                        className={`lg:col-span-7 ${
                          isReversed ? 'lg:order-1' : 'lg:order-2'
                        }`}
                      >
                        <ProjectMockup
                          project={project}
                          onOpenLightbox={openLightbox}
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* "Mes autres réalisations" Editorial Callout */}
            <div className="mt-12 rounded-3xl border border-[#141310]/12 card-solar-glow p-7 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <span className="font-mono-tech text-xs uppercase tracking-widest text-[#827602]">
                  Explorations continues &amp; Open Source
                </span>
                <h3 className="mt-2 font-serif-editorial text-[clamp(2rem,4vw,3.5rem)] text-[#141310]">
                  Mes autres réalisations
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#3D392C]">
                  Au-delà de ces projets, je m&apos;intéresse à la création de produits
                  numériques, aux applications innovantes et aux solutions technologiques qui
                  peuvent répondre aux besoins des entreprises et des utilisateurs. Je continue
                  d&apos;explorer de nouvelles idées et de développer mes compétences à travers
                  des expérimentations personnelles.
                </p>
              </div>

              <a
                href={CONTACT_INFO.githubHref}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#141310] px-5 py-3 text-xs sm:text-sm font-semibold text-[#FAF9F4] hover:bg-[#FCEC4D] hover:text-[#141310] transition-all"
              >
                <GitHubIcon className="h-4 w-4" />
                Explorer mon GitHub
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Mon approche */}
        <section
          id="approche"
          className="py-20 sm:py-28 border-b border-[#141310]/10 bg-[#141310] text-[#FAF9F4] relative overflow-hidden"
        >
          {/* Subtle warm radial glow on dark editorial surface */}
          <div
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-80 w-[760px] opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(ellipse, #FCEC4D 0%, transparent 70%)' }}
          />

          <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6">
            <div className="max-w-3xl">
              <h2 data-scroll-heading className="font-serif-editorial text-[clamp(2.75rem,5.8vw,5rem)] leading-[1.04] text-white">
                Apprendre. Concevoir. <span className="italic text-[#FCEC4D]">Développer.</span>{' '}
                Améliorer.
              </h2>

              <p className="mt-4 text-base sm:text-lg text-[#BCB4AE]">
                Je privilégie une démarche de développement structurée :
              </p>
            </div>

            <div data-scroll-stagger className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {APPROACH_STEPS.map((step) => (
                <div
                  key={step.number}
                  className="group relative flex flex-col justify-between rounded-2xl border border-white/12 bg-white/[0.04] p-6 sm:p-7 transition-all hover:border-[#FCEC4D]/60 hover:bg-white/[0.07]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono-tech text-xs font-semibold text-[#FCEC4D]">
                        {step.number} — ÉTAPE
                      </span>
                      <span className="h-2 w-2 rounded-full bg-[#FCEC4D]/70 group-hover:scale-125 transition-transform" />
                    </div>

                    <h3 className="mt-6 font-serif-editorial text-[clamp(1.875rem,3vw,2.5rem)] text-white">
                      {step.number} — {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-[#D2CCC4]">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-8 h-0.5 w-10 bg-[#FCEC4D]/40 transition-all duration-300 group-hover:w-full group-hover:bg-[#FCEC4D]" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Formation et recherche */}
        <section
          id="formation"
          className="py-20 sm:py-28 border-b border-[#141310]/10 bg-arch-grid-subtle"
        >
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <div data-scroll-stagger className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left: FORMATION */}
              <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-[#141310]/12 bg-white p-7 sm:p-9 shadow-2xs">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#827602]/25 bg-[#FAF9F4] px-3.5 py-1 font-mono-tech text-[11px] uppercase tracking-[0.16em] text-[#827602]">
                    <GraduationCap className="h-3.5 w-3.5" />
                    Formation académique
                  </div>

                  <h2 data-scroll-heading className="mt-5 font-serif-editorial text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.08] text-[#141310]">
                    Licence 3 — Systèmes Informatiques et Génie Logiciel
                  </h2>

                  <p className="mt-3 text-sm sm:text-base font-semibold text-[#827602]">
                    ESATIC — École Supérieure Africaine des Technologies de l&apos;Information
                    et de la Communication
                  </p>

                  <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-[#524C3A]">
                    Formation orientée vers les systèmes informatiques, le développement
                    logiciel, la programmation, les bases de données et la conception de
                    solutions informatiques.
                  </p>
                </div>

                <div className="mt-8 border-t border-[#141310]/10 pt-5 flex flex-wrap gap-2">
                  {[
                    'Génie Logiciel',
                    'Systèmes Informatiques',
                    'Programmation',
                    'Bases de données',
                    'Conception SI',
                  ].map((pill) => (
                    <span
                      key={pill}
                      className="rounded-full bg-[#FAF9F4] border border-[#141310]/12 px-3 py-1 font-mono-tech text-[11px] text-[#141310]"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: CE QUE JE RECHERCHE */}
              <div
                id="recherche"
                className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-[#141310]/15 card-solar-glow p-7 sm:p-10 shadow-[0_14px_40px_rgba(20,19,16,0.05)]"
              >
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#141310] px-3.5 py-1 font-mono-tech text-[11px] uppercase tracking-[0.16em] text-[#FCEC4D]">
                    <Sparkles className="h-3.5 w-3.5" />
                    Ce que je recherche
                  </div>

                  <h2 data-scroll-heading className="mt-5 font-serif-editorial text-[clamp(2.75rem,5vw,4.5rem)] leading-[1.04] text-[#141310]">
                    Prêt à relever de <span className="italic">nouveaux défis.</span>
                  </h2>

                  <div className="mt-5 space-y-3.5 text-sm sm:text-base leading-relaxed text-[#2F2C22]">
                    <p>
                      Actuellement étudiant en Licence 3, je suis à la recherche d&apos;une{' '}
                      <strong>opportunité de stage de projet de fin d&apos;études</strong> afin
                      de mettre en pratique mes connaissances, développer mon expérience
                      professionnelle et contribuer à des projets concrets.
                    </p>
                    <p>
                      Je suis particulièrement intéressé par les environnements qui favorisent
                      l&apos;apprentissage, la collaboration et l&apos;innovation.
                    </p>
                    <p>
                      Je reste également ouvert aux collaborations et aux projets de
                      développement numérique.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#141310]/12 pt-5">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#827602] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#827602]" />
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[#141310]">
                      Disponible pour Stage PFE &amp; Collaborations
                    </span>
                  </div>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full bg-[#141310] px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#FAF9F4] hover:bg-[#FCEC4D] hover:text-[#141310] transition-colors"
                  >
                    Échanger sur une opportunité
                    <ArrowDownRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <ContactSection />
      </main>

      {/* Lightbox Modal for Full-Resolution Project Screenshots */}
      <LightboxModal
        isOpen={lightboxState.isOpen}
        screens={lightboxState.screens}
        currentIndex={lightboxState.currentIndex}
        projectTitle={lightboxState.projectTitle}
        onClose={() => setLightboxState((prev) => ({ ...prev, isOpen: false }))}
        onSelectIndex={(index) =>
          setLightboxState((prev) => ({ ...prev, currentIndex: index }))
        }
      />
    </div>
  );
}

export default App;
