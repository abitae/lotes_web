/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { DEFAULT_GUARANTEES, getContactFormBySlug } from "../../config/siteDefaults";
import { ProjectsCarousel } from "../../components/ProjectsCarousel";
import { HomeAlertModal } from "../../components/HomeAlertModal";
import { formatProjectInterestLabel } from "../../utils/projects";
import { GuaranteeIcon, renderInlineBold } from "../../utils/siteContent";
import {
  Compass,
  ArrowRight,
  CheckCircle,
  ArrowBigLeft,
  ArrowBigRight,
  Sparkles,
  PhoneCall,
  UserCheck
} from "lucide-react";

export const Home: React.FC = () => {
  const { banners, projects, testimonials, addInquiry, guarantees, contactForms } = useApp();
  const guaranteeData = guarantees ?? DEFAULT_GUARANTEES;
  const contactForm = getContactFormBySlug(contactForms, "contact_consulta");
  const activeGuaranteeItems = guaranteeData.items.filter((i) => i.isActive);

  const catalogCarouselProjects = projects;

  // Active Banners Slider State
  const activeBanners = banners.filter((b) => b.isActive);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Form State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [projectInterest, setProjectInterest] = useState("");
  const [message, setMessage] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  // Auto rotate banners if multiple are active
  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % activeBanners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeBanners]);

  const handleBannerNext = () => {
    setCurrentBannerIndex((prev) => (prev + 1) % activeBanners.length);
  };

  const handleBannerPrev = () => {
    setCurrentBannerIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email) return;

    try {
      await addInquiry({
        fullName,
        phone,
        email,
        projectInterest: projectInterest || contactForm.defaultProjectInterest,
        message: message || contactForm.defaultMessage,
      });

      setFormSuccess(true);
      setFullName("");
      setPhone("");
      setEmail("");
      setProjectInterest("");
      setMessage("");

      setTimeout(() => {
        setFormSuccess(false);
      }, 5000);
    } catch {
      // El error global se muestra en PublicLayout si aplica
    }
  };

  const activeBanner = activeBanners[currentBannerIndex] || {
    title: "Invierta en el Futuro del Perú con Seguridad",
    subtitle: "Lotes de campo, playa y urbanos inscritos en Registros Públicos con plusvalía garantizada.",
    buttonText: "Explorar catálogo",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600",
    badgeText: "Ventas 2026",
  };

  return (
    <div id="home-page" className="-mt-14">
      <HomeAlertModal />
      {/* 1. HERO CAROUSEL */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center bg-[var(--bg)] border-b border-[var(--border)] overflow-hidden pt-28 pb-12 lg:pt-36 lg:pb-20">
        {/* Ambient Panoramic Background Banner Image */}
        <div className="absolute inset-0 transition-all duration-1000 select-none">
          <img
            src={activeBanner.imageUrl}
            alt=""
            aria-hidden
            className="hero-banner-bg-image w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 hero-banner-scrim" />
          <div className="absolute inset-0 hero-banner-scrim-vertical" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)]/8 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Content */}
            <div className="hero-banner-content-panel lg:col-span-7 space-y-6 text-left rounded-2xl p-6 sm:p-8">
              {activeBanner.badgeText && (
                <div className="hero-banner-badge inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-white shrink-0" aria-hidden />
                  {activeBanner.badgeText}
                </div>
              )}
              
              <h1 className="hero-banner-title text-4xl sm:text-5xl lg:text-5xl font-sans font-extrabold leading-tight tracking-tight">
                {activeBanner.title}
              </h1>

              <p className="hero-banner-subtitle text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-normal">
                {activeBanner.subtitle}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  to="/catalog"
                  className="inline-flex justify-center items-center gap-2 bg-[var(--accent)] hover:bg-[#008c4a] text-white font-sans font-semibold text-sm px-7 py-3.5 rounded-lg transition-transform hover:-translate-y-0.5 shadow-lg active:scale-95"
                >
                  <Compass className="w-4 h-4 text-white animate-spin-slow" />
                  {activeBanner.buttonText === "Explorar catálogo" ? "Explorar proyectos" : activeBanner.buttonText}
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex justify-center items-center gap-2 bg-[var(--card-bg)] hover:bg-[var(--border)] text-[var(--text-p)] border-2 border-[var(--border)] font-sans font-semibold text-sm px-7 py-3.5 rounded-lg transition-all shadow-md"
                >
                  <PhoneCall className="w-4 h-4 text-[var(--accent)]" />
                  Solicitar Asesoría
                </Link>
              </div>
            </div>

            {/* Right Column: Layered Reduced-Width & Superposed Images */}
            <div className="lg:col-span-5 relative flex justify-center items-center h-[350px] sm:h-[450px] lg:h-[480px]">
              {/* Primary Background Image Container (Reduced width) */}
              <div className="w-[72%] h-[82%] rounded-2xl overflow-hidden shadow-2xl border border-[var(--border)] relative z-10 transition-all duration-300 hover:scale-101">
                <img
                  src={activeBanner.imageUrl}
                  alt={activeBanner.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
              </div>

              {/* Secondary Overlapping / Superposed Image on the Right */}
              <div className="absolute right-0 bottom-4 sm:bottom-10 w-[45%] h-[55%] rounded-xl overflow-hidden shadow-2xl border-2 border-[var(--card-bg)] z-20 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
                  alt="Vista del Lote"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              </div>

              {/* Decorative dynamic badge */}
              <div className="absolute left-[-10px] bottom-12 bg-[var(--accent)] text-white px-3 py-1.5 rounded shadow-xl z-25 font-mono text-[10px] flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-white" />
                <span className="font-extrabold tracking-wider">ENTREGA INMEDIATA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Slider Controls */}
        {activeBanners.length > 1 && (
          <div className="hero-banner-controls absolute bottom-6 right-4 sm:right-10 flex items-center gap-2 z-10 px-2 py-1.5 rounded-lg border border-[var(--border)]">
            <button
              onClick={handleBannerPrev}
              className="p-1.5 rounded-md bg-[var(--card-bg)] hover:bg-[var(--border)] text-[var(--text-p)] border border-[var(--border)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              aria-label="Banner anterior"
            >
              <ArrowBigLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs font-semibold text-[var(--text-p)] tabular-nums min-w-[2.5rem] text-center">
              {currentBannerIndex + 1} / {activeBanners.length}
            </span>
            <button
              onClick={handleBannerNext}
              className="p-1.5 rounded-md bg-[var(--card-bg)] hover:bg-[var(--border)] text-[var(--text-p)] border border-[var(--border)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              aria-label="Siguiente banner"
            >
              <ArrowBigRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* 2. STATS BAR */}
      <section className="bg-stone-100 border-y border-stone-200/60 py-8 relative -mt-6 z-10 max-w-6xl mx-auto rounded-xl premium-card-shadow px-4 sm:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-3xl font-sans font-extrabold text-emerald-950">98%</div>
            <div className="text-[10px] font-mono text-stone-500 uppercase tracking-widest font-semibold">
              Clientes Satisfechos
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-sans font-extrabold text-emerald-950">S/. 50M+</div>
            <div className="text-[10px] font-mono text-stone-500 uppercase tracking-widest font-semibold">
              Capitalizado en Lotes
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-sans font-extrabold text-emerald-950">1,200+</div>
            <div className="text-[10px] font-mono text-stone-500 uppercase tracking-widest font-semibold">
              Lotes Adjudicados
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-sans font-extrabold text-emerald-950">30 hrs</div>
            <div className="text-[10px] font-mono text-stone-500 uppercase tracking-widest font-semibold">
              Visitas Guiadas Semanales
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS */}
      <section className="relative border-y border-[var(--border)] bg-[var(--card-bg)] py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/[0.04] via-transparent to-amber-500/[0.03] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 md:mb-14">
            <div className="space-y-3 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--accent-text)] tracking-widest uppercase font-semibold">
                <Compass className="w-3.5 h-3.5" />
                Catálogo
              </span>
              <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-[var(--text-p)] leading-tight tracking-tight">
                Conoce nuestros Proyectos
              </h2>
              <p className="text-[var(--text-s)] text-sm leading-relaxed font-light">
                Terrenos con título SUNARP, ubicaciones estratégicas y opciones de financiamiento directo. Elige el proyecto que mejor se adapte a tu inversión.
              </p>
            </div>
            <Link
              to="/catalog"
              className="group shrink-0 inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[#008c4a] text-white font-sans font-semibold text-xs px-5 py-3 rounded-lg transition-all shadow-md hover:-translate-y-0.5"
            >
              Ver catálogo completo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {catalogCarouselProjects.length === 0 ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--bg)] px-6 py-14 text-center space-y-4">
              <Compass className="w-10 h-10 text-[var(--accent-text)] mx-auto opacity-80" />
              <p className="text-[var(--text-s)] text-sm font-light max-w-md mx-auto">
                Pronto publicaremos nuevos proyectos. Mientras tanto, explora el catálogo completo.
              </p>
              <Link
                to="/catalog"
                className="inline-flex items-center gap-1.5 text-[var(--accent-text)] font-semibold text-sm border-b-2 border-[var(--accent-text)]/40 hover:border-[var(--accent-text)] pb-0.5 transition-colors"
              >
                Ir al catálogo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <ProjectsCarousel projects={catalogCarouselProjects} visibleColumns={3} />
        )}
      </section>

      {/* 4. WHY INVEST SECTION WITH AN IMAGE BACKGROUND */}
      <section className="home-guarantees-section relative py-20 md:py-28 border-y border-emerald-900/40 overflow-hidden">
        <div className="absolute inset-0 z-0 select-none">
          <img
            src={guaranteeData.section.backgroundImageUrl}
            alt=""
            aria-hidden
            className="w-full h-full object-cover brightness-[0.4] saturate-[1.05]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/96 via-emerald-900/94 to-teal-900/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-emerald-800/30" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-14 md:mb-16">
            <span className="inline-flex items-center gap-2 font-mono text-xs text-emerald-200 tracking-widest uppercase font-bold px-3 py-1 rounded-full bg-emerald-400/15 border border-emerald-300/30">
              {guaranteeData.section.eyebrow}
            </span>
            <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-white leading-tight drop-shadow-sm">
              {guaranteeData.section.heading}
            </h2>
            <p className="text-emerald-50/95 text-sm md:text-base font-normal leading-relaxed max-w-xl mx-auto">
              {guaranteeData.section.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {activeGuaranteeItems.map((item) => (
              <div
                key={item.id}
                className="home-guarantees-card p-8 rounded-2xl space-y-4 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="home-guarantees-icon w-14 h-14 rounded-xl flex items-center justify-center">
                  <GuaranteeIcon name={item.icon} className="w-7 h-7" />
                </div>
                <h3 className="font-sans font-bold text-lg text-white leading-snug">
                  {item.title}
                </h3>
                <p className="text-emerald-50/90 text-sm font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS SLIDER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="font-mono text-xs text-amber-700 tracking-widest uppercase font-semibold block">
            Historias de Éxito
          </span>
          <h2 className="text-3xl font-sans font-extrabold text-emerald-950">
            Ellos ya confiaron en Lotesenremate.pe
          </h2>
          <p className="text-stone-500 text-xs md:text-sm font-light">
            Inversionistas locales, profesionales independientes y familias peruanas expresan su recomendación sincera.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="bg-white p-8 rounded-xl border border-stone-200 hover:border-emerald-650/40 transition-colors premium-card-shadow relative flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Stars and quote icon */}
                <div className="flex items-center gap-1">
                  {[...Array(test.stars)].map((_, i) => (
                    <span key={i} className="text-amber-500 text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <blockquote className="text-sm font-sans text-stone-600 font-light italic leading-relaxed">
                  "{test.quote}"
                </blockquote>
              </div>

              {/* Client Info footer */}
              <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-stone-100">
                <img
                  src={test.avatarUrl}
                  alt={test.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-stone-100 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-sans font-bold text-xs text-stone-900 leading-none">
                    {test.name}
                  </h4>
                  <span className="text-[10px] text-stone-400 font-mono tracking-tight block mt-0.5">
                    {test.role}
                  </span>
                  <div className="inline-block bg-emerald-50 text-emerald-850 px-1.5 py-0.5 rounded text-3xs font-medium font-mono mt-1">
                    Adquirió {test.projectPurchased}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CONTEXT LEAD INQUIRY FORM */}
      <section className="home-contact-section py-20 md:py-28 relative overflow-hidden">
        <div className="home-contact-section__base" aria-hidden />
        <div
          className="home-contact-section__photo"
          aria-hidden
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1920')",
          }}
        />
        <div className="home-contact-section__glow home-contact-section__glow--left" aria-hidden />
        <div className="home-contact-section__glow home-contact-section__glow--right" aria-hidden />
        <div className="home-contact-section__glow home-contact-section__glow--center" aria-hidden />
        <div className="home-contact-section__mesh" aria-hidden />
        <div className="home-contact-section__grid" aria-hidden />
        <div className="home-contact-section__shine" aria-hidden />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Informative column */}
            <div className="space-y-6 text-white">
              <span className="inline-flex items-center gap-2 font-mono text-xs text-amber-300 tracking-wider font-bold uppercase px-3 py-1 rounded-full bg-amber-400/15 border border-amber-300/25">
                {contactForm.sectionEyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-sans font-extrabold tracking-tight leading-tight text-white drop-shadow-sm">
                {contactForm.sectionHeading}
              </h2>
              <p className="text-emerald-50/95 text-sm sm:text-base font-normal leading-relaxed max-w-lg">
                {contactForm.sectionDescription}
              </p>

              <div className="space-y-4 pt-6 border-t border-emerald-400/30">
                {(contactForm.bullets ?? []).map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-white">
                    <CheckCircle className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" aria-hidden />
                    <span className="leading-relaxed">{renderInlineBold(bullet.text)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form card column */}
            <div className="home-contact-form-card p-7 sm:p-10 rounded-2xl text-stone-900 overflow-hidden">
              <div className="home-contact-form-card__header-accent" aria-hidden />
              <div className="mb-7 pb-6 border-b border-emerald-100/80 relative">
                <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-emerald-950 tracking-tight mb-2">
                  {contactForm.formTitle}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {contactForm.formSubtitle}
                </p>
              </div>

              {formSuccess ? (
                <div className="bg-emerald-50 border-2 border-emerald-200 text-emerald-900 rounded-xl p-8 text-center space-y-3">
                  <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700">
                    <UserCheck className="w-7 h-7" />
                  </div>
                  <h4 className="font-sans font-extrabold text-base uppercase tracking-wide">
                    {contactForm.successTitle}
                  </h4>
                  <p className="text-sm font-normal text-emerald-800/90 leading-relaxed">
                    {contactForm.successMessage}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="home-form-label block text-xs font-mono tracking-wide uppercase">
                      Nombres Completos
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Juan Pérez Ramos"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="home-form-input w-full rounded-xl p-3 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="home-form-label block text-xs font-mono tracking-wide uppercase">
                        Teléfono / WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="987 654 321"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="home-form-input w-full rounded-xl p-3 text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="home-form-label block text-xs font-mono tracking-wide uppercase">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="tucorreo@outlook.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="home-form-input w-full rounded-xl p-3 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="home-form-label block text-xs font-mono tracking-wide uppercase">
                      Proyecto de Interés
                    </label>
                    <select
                      value={projectInterest}
                      onChange={(e) => setProjectInterest(e.target.value)}
                      className="home-form-input w-full rounded-xl p-3 text-sm"
                    >
                      <option value="">Seleccione un proyecto...</option>
                      {projects.map((p) => {
                        const label = formatProjectInterestLabel(p);
                        return (
                          <option key={p.id} value={label}>
                            {label}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="home-form-label block text-xs font-mono tracking-wide uppercase">
                      Mensaje
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Cuéntanos qué tipo de lote buscas o cuándo prefieres la visita..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="home-form-input w-full rounded-xl p-3 text-sm resize-none min-h-[7rem]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="home-contact-submit w-full text-white font-sans font-extrabold text-sm py-4 px-6 rounded-xl transition-all uppercase tracking-wider mt-2"
                  >
                    {contactForm.submitLabel}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
