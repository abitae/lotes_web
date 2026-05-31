/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  MapPin,
  CheckCircle,
  Gem,
  ArrowBigLeft,
  ArrowBigRight,
  MessageSquare,
  Sparkles,
  PhoneCall,
  UserCheck
} from "lucide-react";

export const Home: React.FC = () => {
  const { banners, projects, testimonials, addInquiry } = useApp();
  const navigate = useNavigate();

  // Proyectos destacados: imagen + lotes libres (máx. 6)
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);
  
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
        projectInterest: projectInterest || "Consulta General de Lotes",
        message: message || "Hola, deseo recibir información sobre remates de lotes disponibles.",
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
      {/* 1. HERO CAROUSEL */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center bg-[var(--bg)] border-b border-[var(--border)] overflow-hidden pt-28 pb-12 lg:pt-36 lg:pb-20">
        {/* Ambient Panoramic Background Banner Image */}
        <div className="absolute inset-0 transition-all duration-1000 select-none">
          <img
            src={activeBanner.imageUrl}
            alt={activeBanner.title}
            className="w-full h-full object-cover opacity-15 dark:opacity-25"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg)]/70 to-[var(--bg)]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)]/5 via-transparent to-transparent opacity-60 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {activeBanner.badgeText && (
                <div className="inline-flex items-center gap-1.5 bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)] px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase font-semibold">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  {activeBanner.badgeText}
                </div>
              )}
              
              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-sans font-extrabold text-[var(--text-p)] leading-tight tracking-tight drop-shadow-sm">
                {activeBanner.title}
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-[var(--text-s)] leading-relaxed max-w-xl font-light">
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
                  className="inline-flex justify-center items-center gap-2 bg-[var(--card-bg)] hover:bg-[var(--border)] text-[var(--text-p)] border border-[var(--border)] font-sans font-medium text-sm px-7 py-3.5 rounded-lg transition-all shadow-sm"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Secondary Overlapping / Superposed Image on the Right */}
              <div className="absolute right-0 bottom-4 sm:bottom-10 w-[45%] h-[55%] rounded-xl overflow-hidden shadow-2xl border-2 border-[var(--card-bg)] z-20 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
                  alt="Vista del Lote"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
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
          <div className="absolute bottom-6 right-4 sm:right-10 flex items-center gap-2 z-10">
            <button
              onClick={handleBannerPrev}
              className="p-1.5 rounded bg-[var(--card-bg)] hover:bg-[var(--border)] text-[var(--text-p)] border border-[var(--border)] transition-all focus:outline-none"
              aria-label="Banner anterior"
            >
              <ArrowBigLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs text-[var(--text-s)]">
              {currentBannerIndex + 1} / {activeBanners.length}
            </span>
            <button
              onClick={handleBannerNext}
              className="p-1.5 rounded bg-[var(--card-bg)] hover:bg-[var(--border)] text-[var(--text-p)] border border-[var(--border)] transition-all focus:outline-none"
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

      {/* 3. FEATURED PROJECTS GIRD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="space-y-2">
            <span className="font-mono text-xs text-amber-700 tracking-widest uppercase font-semibold block">
              Inversión Recomendada
            </span>
            <h2 className="text-3xl font-sans font-extrabold text-emerald-950 leading-tight">
              Proyectos Destacados en Remate
            </h2>
            <p className="text-stone-500 text-sm max-w-xl font-light">
              Terrenos estratégicos cuidadosamente seleccionados por el equipo legal y financiero de Lotesenremate.pe con alta plusvalía predial.
            </p>
          </div>
          <Link
            to="/catalog"
            className="group inline-flex items-center gap-1.5 fs-sm text-emerald-850 font-semibold border-b-2 border-emerald-800 hover:border-emerald-600 pb-0.5 transition-colors"
          >
            Ver todos los lotes
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className="bg-white rounded-xl border border-stone-200/60 overflow-hidden premium-card-shadow premium-card-hover flex flex-col group"
            >
              {/* Image & Badge Cover */}
              <div className="relative h-56 w-full bg-stone-100 overflow-hidden shrink-0">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 flex gap-1.5">
                  <span className={`text-[10px] font-sans font-bold uppercase tracking-wider px-3 py-1 bg-stone-900 border border-stone-850 rounded-full text-stone-50`}>
                    {project.projectType}
                  </span>
                  <span className={`text-[10px] font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                    project.status === "Pre-venta"
                      ? "bg-amber-100 text-amber-800 border border-amber-200"
                      : project.status === "Inmediata"
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      : "bg-indigo-100 text-indigo-800 border border-indigo-200"
                  }`}>
                    {project.status}
                  </span>
                </div>
                {project.surface != null && project.surface > 0 && (
                  <div className="absolute bottom-4 right-4 bg-stone-950/85 backdrop-blur-sm px-2.5 py-1 rounded font-mono text-3xs text-stone-100">
                    {project.surface} m²
                  </div>
                )}
              </div>

              {/* Main Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-2xs font-mono text-stone-400 uppercase tracking-widest">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="font-sans font-bold text-lg text-stone-900 group-hover:text-emerald-950 leading-snug transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-stone-500 text-xs font-light line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-stone-400 font-mono tracking-widest uppercase">
                      Desde
                    </span>
                    <span className="text-xl font-sans font-extrabold text-emerald-950">
                      S/. {project.priceSoles.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/catalog?id=${project.id}`)}
                    className="inline-flex items-center gap-1.5 bg-stone-900 text-stone-50 hover:bg-emerald-950 text-[11px] font-sans font-bold py-2.5 px-3.5 rounded-lg transition-colors shadow-sm"
                  >
                    Detalles
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. WHY INVEST SECTION WITH AN IMAGE BACKGROUND */}
      <section className="relative py-20 md:py-28 border-y border-[var(--border)] overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 select-none">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600"
            alt="Fondo de Garantías de Compra"
            className="w-full h-full object-cover filter brightness-[0.22] saturate-[0.8]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/85 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase font-semibold block">
              Garantías de Compra
            </span>
            <h2 className="text-3xl font-sans font-extrabold text-[#fafafa] leading-tight">
              ¿Por qué somos la mejor opción de inversión?
            </h2>
            <p className="text-[#a1a1aa] text-xs md:text-sm font-light leading-relaxed">
              Respaldamos su depósito bancario a través de procesos registrales sólidos y convenios con notarías autorizadas del Perú.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/60 backdrop-blur-md p-8 rounded-xl border border-white/10 shadow-2xl space-y-4 hover:border-[var(--accent)]/45 transition-all duration-300">
              <div className="w-12 h-12 bg-[var(--accent)]/20 rounded-xl flex items-center justify-center text-[var(--accent)] border border-[var(--accent)]/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-sans font-bold text-base text-[#fafafa]">
                100% Inscritos en SUNARP
              </h3>
              <p className="text-[#a1a1aa] text-xs font-light leading-relaxed">
                Todas las propiedades constan con partidas registrales independientes, planos aprobados por municipalidades o gobiernos distritales habilitantes, y están libres de cargas.
              </p>
            </div>

            <div className="bg-black/60 backdrop-blur-md p-8 rounded-xl border border-white/10 shadow-2xl space-y-4 hover:border-[#22c55e]/45 transition-all duration-300">
              <div className="w-12 h-12 bg-[#22c55e]/20 rounded-xl flex items-center justify-center text-[#22c55e] border border-[#22c55e]/30">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-sans font-bold text-base text-[#fafafa]">
                Alta Plusvalía Garantizada
              </h3>
              <p className="text-[#a1a1aa] text-xs font-light leading-relaxed">
                Ubicados de forma estratégica en corredores de rápido crecimiento industrial, agropecuario, turístico y vial cercanos a aeropuertos, playas y puertos.
              </p>
            </div>

            <div className="bg-black/60 backdrop-blur-md p-8 rounded-xl border border-white/10 shadow-2xl space-y-4 hover:border-[var(--accent)]/45 transition-all duration-300">
              <div className="w-12 h-12 bg-[var(--accent)]/20 rounded-xl flex items-center justify-center text-[var(--accent)] border border-[var(--accent)]/30">
                <Gem className="w-6 h-6" />
              </div>
              <h3 className="font-sans font-bold text-base text-[#fafafa]">
                Crédito Directo Flex
              </h3>
              <p className="text-[#a1a1aa] text-xs font-light leading-relaxed">
                Facilidades de financiamiento directo para que escoja el plan más cómodo según sus posibilidades. Adquiera su lote con firmas notariales simples de cuota inicial.
              </p>
            </div>
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
      <section className="bg-emerald-950 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-stone-950/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Informative column */}
            <div className="space-y-6">
              <span className="font-mono text-xs text-amber-400 tracking-wider font-semibold uppercase block">
                Comunícate hoy
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans font-extrabold tracking-tight leading-tight">
                ¿Listo para asegurar tu estabilidad patrimonial?
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed max-w-lg">
                Rellena el formulario de solicitud de información inmediata. Nuestro equipo de asesores senior le enviará carpetas legales digitales con partidas registrales Sunarp de los lotes en 10 minutos por WhatsApp.
              </p>

              <div className="space-y-4 pt-4 border-t border-emerald-900">
                <div className="flex items-start gap-3 text-xs sm:text-sm">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Información Veraz</strong>: Datos registrales directos y actualizados.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Visitas organizadas los fines de semana</strong>: Movilidad ejecutiva privada gratuita desde Lima ida y vuelta.
                  </span>
                </div>
              </div>
            </div>

            {/* Form card column */}
            <div className="bg-white p-6 sm:p-10 rounded-2xl border border-stone-200 text-stone-900 premium-card-shadow">
              <h3 className="font-sans font-extrabold text-xl text-emerald-950 tracking-tight mb-2">
                Solicitar Expedientes de Lotes
              </h3>
              <p className="text-xs text-stone-500 font-light mb-6">
                Envíenos sus datos y recibirá un contacto inmediato telefónico.
              </p>

              {formSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl p-6 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-800">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-sans font-extrabold text-sm uppercase">
                    ¡Solicitud Recibida con Éxito!
                  </h4>
                  <p className="text-xs font-light">
                    Hemos registrado tu consulta correctamente. Un experto senior en lotes de remate se comunicará contigo vía WhatsApp en unos minutos.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-2xs font-mono font-bold tracking-wide uppercase text-stone-500">
                      Nombres Completos
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Juan Pérez Ramos"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-800 focus:bg-white rounded-lg p-2.5 text-xs outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-2xs font-mono font-bold tracking-wide uppercase text-stone-500">
                        Número de Teléfono
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="987654321"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-800 focus:bg-white rounded-lg p-2.5 text-xs outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-2xs font-mono font-bold tracking-wide uppercase text-stone-500">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="tucorreo@outlook.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-800 focus:bg-white rounded-lg p-2.5 text-xs outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-2xs font-mono font-bold tracking-wide uppercase text-stone-500">
                      Proyecto de Preferencia
                    </label>
                    <select
                      value={projectInterest}
                      onChange={(e) => setProjectInterest(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-800 focus:bg-white rounded-lg p-2.5 text-xs outline-none transition-colors"
                    >
                      <option value="">Seleccione un proyecto...</option>
                      {projects.map((p) => (
                        <option key={p.id} value={p.title}>
                          {p.title} - ({p.location})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-2xs font-mono font-bold tracking-wide uppercase text-stone-500">
                      Mensaje / Pregunta Breve
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Escriba aquí sus dudas respecto a visitas guiadas públicas, precio final, títulos..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-800 focus:bg-white rounded-lg p-2.5 text-xs outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-sans font-extrabold text-xs py-3.5 px-6 rounded-lg transition-transform uppercase tracking-wider shadow-sm mt-3.5"
                  >
                    Enviar Solicitud de Expediente
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
