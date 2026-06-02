/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Landmark, Eye } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { DEFAULT_ABOUT } from "../../config/siteDefaults";
import { GuaranteeIcon } from "../../utils/siteContent";
import { ExpertAdvisorsCarousel } from "../../components/ExpertAdvisorsCarousel";

export const Nosotros: React.FC = () => {
  const { about } = useApp();
  const data = about ?? DEFAULT_ABOUT;
  const p = data.page;
  const values = data.values.filter((v) => v.isActive);
  const advisors = data.advisors.filter((a) => a.isActive);

  return (
    <div id="nosotros-page" className="pt-24 bg-stone-50/40">
      <section className="relative min-h-[52vh] md:min-h-[58vh] flex items-center border-b border-stone-200/50 overflow-hidden">
        <div className="absolute inset-0 select-none" aria-hidden>
          <img
            src={p.heroBackgroundImageUrl}
            alt=""
            className="hero-banner-bg-image w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 about-hero-scrim" />
          <div className="absolute inset-0 hero-banner-scrim-vertical" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <div className="hero-banner-content-panel rounded-2xl p-6 sm:p-10 space-y-4">
            <span className="font-mono text-2xs text-amber-700 tracking-widest uppercase font-semibold block">
              {p.heroEyebrow}
            </span>
            <h1 className="hero-banner-title text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold tracking-tight leading-tight">
              {p.heroHeading}
            </h1>
            <p className="hero-banner-subtitle text-xs sm:text-sm lg:text-base leading-relaxed font-light max-w-2xl mx-auto">
              {p.heroDescription}
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-4 bg-white p-8 rounded-2xl border border-stone-200/60 premium-card-shadow text-left">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-850">
              <Landmark className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-sans font-extrabold text-emerald-950">{p.missionHeading}</h2>
            <p className="text-stone-500 text-xs leading-relaxed font-light font-sans">{p.missionDescription}</p>
          </div>

          <div className="space-y-4 bg-white p-8 rounded-2xl border border-stone-200/60 premium-card-shadow text-left">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-700">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-sans font-extrabold text-emerald-950">{p.visionHeading}</h2>
            <p className="text-stone-500 text-xs leading-relaxed font-light font-sans">{p.visionDescription}</p>
          </div>
        </div>
      </section>

      <section className="bg-stone-55 border-y border-stone-200/40 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="font-mono text-xs text-amber-700 tracking-widest uppercase font-semibold block">
              {p.valuesEyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-emerald-950">{p.valuesHeading}</h2>
            <p className="text-stone-500 text-xs md:text-sm font-light">{p.valuesDescription}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {values.map((item) => (
              <div key={item.id} className="space-y-3">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-850 uppercase">
                  <GuaranteeIcon name={item.icon} className="w-4 h-4 text-amber-500 shrink-0" />
                  {item.title}
                </div>
                <p className="text-stone-500 text-xs leading-relaxed font-light font-sans">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="font-mono text-xs text-amber-700 tracking-widest uppercase font-semibold block">
              {p.advisorsEyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-emerald-950">{p.advisorsHeading}</h2>
            <p className="text-stone-500 text-xs md:text-sm font-light">{p.advisorsDescription}</p>
          </div>
        </div>

        <ExpertAdvisorsCarousel advisors={advisors} />
      </section>
    </div>
  );
};
