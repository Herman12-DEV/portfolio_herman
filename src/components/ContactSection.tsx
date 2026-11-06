import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Copy,
  Check,
  Send,
  MessageCircle,
} from 'lucide-react';
import { CONTACT_INFO } from '../data/portfolioData';

const SUBJECT_PRESETS = [
  'Opportunité de Stage PFE',
  'Projet Web / Mobile',
  'Collaboration technique',
  'Prise de contact',
];

export const ContactSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);
  const [senderName, setSenderName] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(SUBJECT_PRESETS[0]);
  const [messageBody, setMessageBody] = useState('');

  const handleCopy = async (value: string, field: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2200);
    } catch {
      // Fallback silent
    }
  };

  const buildMailtoHref = () => {
    const subject = encodeURIComponent(
      `${selectedSubject}${senderName.trim() ? ` — ${senderName.trim()}` : ''}`
    );
    const greeting = `Bonjour Hermann,\n\n`;
    const content =
      messageBody.trim() ||
      `J'ai découvert votre portfolio et je souhaiterais échanger avec vous au sujet de : ${selectedSubject}.`;
    const sign = senderName.trim() ? `\n\nCordialement,\n${senderName.trim()}` : '';
    const body = encodeURIComponent(`${greeting}${content}${sign}`);
    return `mailto:${CONTACT_INFO.email}?subject=${subject}&body=${body}`;
  };

  const buildWhatsAppHref = () => {
    const intro = senderName.trim()
      ? `Bonjour Hermann, je suis ${senderName.trim()}.`
      : `Bonjour Hermann,`;
    const content =
      messageBody.trim() ||
      `Je vous contacte depuis votre portfolio concernant : ${selectedSubject}.`;
    const text = encodeURIComponent(`${intro} ${content}`);
    return `https://wa.me/2250503879720?text=${text}`;
  };

  return (
    <section id="contact" className="relative pt-20 sm:pt-28 pb-16 footer-solar-aura">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 max-w-3xl">
          <h2 data-scroll-heading className="font-serif-editorial text-[clamp(2.75rem,6vw,5rem)] leading-[1.04] text-[#141310]">
            Une idée, un projet ou une <span className="italic">opportunité</span> ?
          </h2>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#524C3A]">
            Je serais ravi d&apos;échanger avec vous autour d&apos;un projet, d&apos;une
            collaboration ou d&apos;une opportunité professionnelle. N&apos;hésitez pas à me
            contacter.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left: Direct Coordinates */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            {/* Email Card */}
            <div className="group rounded-2xl border border-[#141310]/12 bg-white/90 p-5 transition-all hover:border-[#141310]/30 hover:shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FCEC4D]/60 text-[#141310]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-mono-tech text-[11px] uppercase tracking-wider text-[#827602]">
                      Email direct
                    </p>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="mt-0.5 block text-base sm:text-lg font-semibold text-[#141310] hover:underline break-all"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(CONTACT_INFO.email, 'email')}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[#141310]/12 bg-[#FAF9F4] px-2.5 py-1.5 text-xs font-medium text-[#141310] hover:bg-[#FCEC4D] transition-colors cursor-pointer"
                >
                  {copiedField === 'email' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#827602]" />
                      Copié
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copier
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Phone + WhatsApp Card */}
            <div className="group rounded-2xl border border-[#141310]/12 bg-white/90 p-5 transition-all hover:border-[#141310]/30 hover:shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FCEC4D]/60 text-[#141310]">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-mono-tech text-[11px] uppercase tracking-wider text-[#827602]">
                      Téléphone &amp; WhatsApp
                    </p>
                    <a
                      href={CONTACT_INFO.phoneHref}
                      className="mt-0.5 block text-base sm:text-lg font-semibold text-[#141310] hover:underline"
                    >
                      {CONTACT_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(CONTACT_INFO.phoneDisplay, 'phone')}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#141310]/12 bg-[#FAF9F4] px-2.5 py-1.5 text-xs font-medium text-[#141310] hover:bg-[#FCEC4D] transition-colors cursor-pointer"
                  >
                    {copiedField === 'phone' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#827602]" />
                        Copié
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copier
                      </>
                    )}
                  </button>

                  <a
                    href={CONTACT_INFO.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#141310] px-3 py-1.5 text-xs font-semibold text-[#FAF9F4] hover:bg-[#FCEC4D] hover:text-[#141310] transition-colors"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* LinkedIn + GitHub Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={CONTACT_INFO.linkedinHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-[#141310]/12 bg-white/90 p-5 transition-all hover:border-[#141310] hover:bg-[#FCEC4D]/25"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono-tech text-[11px] uppercase tracking-wider text-[#827602]">
                    LinkedIn
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[#141310] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div className="mt-3">
                  <p className="text-sm font-semibold text-[#141310]">
                    Kouadio Herman Kouadio
                  </p>
                  <p className="mt-0.5 text-xs text-[#6F674D] truncate">
                    {CONTACT_INFO.linkedinDisplay}
                  </p>
                </div>
              </a>

              <a
                href={CONTACT_INFO.githubHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-[#141310]/12 bg-white/90 p-5 transition-all hover:border-[#141310] hover:bg-[#FCEC4D]/25"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono-tech text-[11px] uppercase tracking-wider text-[#827602]">
                    GitHub
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[#141310] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div className="mt-3">
                  <p className="text-sm font-semibold text-[#141310]">Herman12-DEV</p>
                  <p className="mt-0.5 text-xs text-[#6F674D] truncate">
                    {CONTACT_INFO.githubDisplay}
                  </p>
                </div>
              </a>
            </div>

            {/* Location Bar */}
            <div className="flex items-center justify-between rounded-2xl border border-[#141310]/12 bg-white/80 px-5 py-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[#827602]" />
                <span className="text-sm font-medium text-[#141310]">
                  Localisation : <strong>{CONTACT_INFO.location}</strong>
                </span>
              </div>
              <span className="font-mono-tech text-[11px] text-[#6F674D]">GMT / UTC+0</span>
            </div>
          </div>

          {/* Right: Quick Message Launcher (mailto / WhatsApp) */}
          <div className="lg:col-span-6 rounded-2xl border border-[#141310]/14 bg-white/95 p-6 sm:p-8 shadow-[0_12px_40px_rgba(20,19,16,0.05)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono-tech text-[11px] uppercase tracking-wider text-[#827602]">
                  Message rapide
                </span>
                <span className="text-xs text-[#6F674D]">Réponse rapide garantie</span>
              </div>

              <h3 className="mt-2 font-serif-editorial text-2xl sm:text-3xl text-[#141310]">
                Démarrer la conversation
              </h3>

              {/* Subject Pills */}
              <div className="mt-5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#524C3A] mb-2">
                  Objet de votre message
                </label>
                <div className="flex flex-wrap gap-2">
                  {SUBJECT_PRESETS.map((subj) => (
                    <button
                      key={subj}
                      type="button"
                      onClick={() => setSelectedSubject(subj)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                        selectedSubject === subj
                          ? 'border-[#141310] bg-[#FCEC4D] text-[#141310] font-semibold'
                          : 'border-[#141310]/12 bg-[#FAF9F4] text-[#524C3A] hover:border-[#141310]/30'
                      }`}
                    >
                      {subj}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name input */}
              <div className="mt-4">
                <label
                  htmlFor="sender-name"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#524C3A] mb-1.5"
                >
                  Votre nom / entreprise (optionnel)
                </label>
                <input
                  id="sender-name"
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Ex. Marie Konan — Studio Digital"
                  className="w-full rounded-xl border border-[#141310]/15 bg-[#FAF9F4] px-3.5 py-2.5 text-sm text-[#141310] placeholder:text-[#857C5D]/70 focus:border-[#141310] focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              {/* Message textarea */}
              <div className="mt-4">
                <label
                  htmlFor="sender-message"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#524C3A] mb-1.5"
                >
                  Votre message
                </label>
                <textarea
                  id="sender-message"
                  rows={4}
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  placeholder="Décrivez brièvement votre projet, votre offre de stage PFE ou votre idée..."
                  className="w-full resize-none rounded-xl border border-[#141310]/15 bg-[#FAF9F4] px-3.5 py-2.5 text-sm text-[#141310] placeholder:text-[#857C5D]/70 focus:border-[#141310] focus:bg-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Dual Launch Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href={buildMailtoHref()}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#141310] px-5 py-3 text-sm font-semibold text-[#FAF9F4] hover:bg-[#FCEC4D] hover:text-[#141310] transition-all shadow-xs"
              >
                <Send className="h-4 w-4" />
                Envoyer par Email
              </a>

              <a
                href={buildWhatsAppHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#141310]/20 bg-[#FAF9F4] px-5 py-3 text-sm font-semibold text-[#141310] hover:bg-[#FCEC4D]/60 transition-all"
              >
                <MessageCircle className="h-4 w-4" />
                Via WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Closing Monumental Editorial Signature */}
        <div className="mt-20 sm:mt-24 rounded-3xl border border-[#141310]/12 bg-white/80 backdrop-blur-xs p-8 sm:p-12 md:p-14 text-center relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                'radial-gradient(ellipse 65% 75% at 50% 100%, rgba(252,236,77,0.55) 0%, rgba(251,251,137,0.22) 50%, transparent 80%)',
            }}
          />

          <div className="relative z-10">
            <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#827602]">
              Hermann Kouadio · Développeur Full-Stack &amp; Mobile
            </p>
            <p className="mt-3 font-serif-editorial text-3xl sm:text-5xl md:text-6xl leading-[1.08] text-[#141310]">
              Construisons ensemble <span className="italic">quelque chose d&apos;utile.</span>
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 border-t border-[#141310]/10 pt-6 text-xs text-[#6F674D]">
              <span>© {new Date().getFullYear()} Hermann Kouadio</span>
              <span className="hidden sm:inline">·</span>
              <span>ESATIC — Licence 3 SIGL</span>
              <span className="hidden sm:inline">·</span>
              <span>Abidjan, Côte d&apos;Ivoire</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
