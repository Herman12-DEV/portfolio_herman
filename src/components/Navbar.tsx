import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'À propos', href: '#a-propos' },
  { label: 'Compétences', href: '#competences' },
  { label: 'Projets', href: '#projets' },
  { label: 'Approche', href: '#approche' },
  { label: 'Formation', href: '#formation' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      const sections = NAV_ITEMS.map((item) => item.href.slice(1));
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full px-4 pt-3 sm:px-6">
      <div
        className={`mx-auto max-w-[1200px] transition-all duration-300 rounded-2xl border ${
          scrolled
            ? 'bg-[#FAF9F4]/90 backdrop-blur-md border-[#141310]/12 shadow-[0_8px_30px_rgba(20,19,16,0.06)] py-2.5 px-4 sm:px-5'
            : 'bg-[#FAF9F4]/70 backdrop-blur-sm border-[#141310]/10 py-3 px-4 sm:px-5'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a
            href="#top"
            aria-label="Hermann Kouadio - Accueil"
            className="group flex items-center focus:outline-none"
          >
            <img
              src="/projects/logo_hermann.png"
              alt="Hermann"
              className="h-9 w-[104px] object-cover mix-blend-multiply transition-transform duration-200 group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                    isActive
                      ? 'bg-[#FCEC4D] text-[#141310] font-semibold'
                      : 'text-[#6F674D] hover:text-[#141310] hover:bg-[#141310]/[0.04]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Status + CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#141310] px-4 py-2 text-xs font-semibold text-[#FAF9F4] transition-all hover:bg-[#FCEC4D] hover:text-[#141310] shadow-xs"
            >
              Me contacter
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex lg:hidden items-center justify-center rounded-xl border border-[#141310]/15 p-2 text-[#141310] hover:bg-[#FCEC4D]/40 transition-colors"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="mt-3 border-t border-[#141310]/10 pt-3 pb-2 lg:hidden">
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-[#141310] hover:bg-[#FCEC4D]/50 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-2 flex items-center justify-between gap-2 border-t border-[#141310]/10 pt-3 px-1">
                <span className="inline-flex items-center gap-2 text-xs font-medium text-[#827602]">
                  <span className="h-2 w-2 rounded-full bg-[#827602]" />
                  En recherche de stage PFE
                </span>
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-1 rounded-full bg-[#141310] px-4 py-2 text-xs font-semibold text-[#FAF9F4]"
                >
                  Me contacter
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
