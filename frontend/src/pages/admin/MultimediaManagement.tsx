/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { Banner, Testimonial } from "../../types";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Layers,
  Image,
  CheckCircle2,
  Trash2,
  Plus,
  Star,
  Check,
  X,
  Megaphone,
  UserCheck
} from "lucide-react";

export const MultimediaManagement: React.FC = () => {
  const { banners, testimonials, updateBanner, addBanner, deleteBanner, addTestimonial, deleteTestimonial } = useApp();

  // Selected banner for editing toggles
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerSubtitle, setBannerSubtitle] = useState("");
  const [bannerButtonText, setBannerButtonText] = useState("Ver Proyectos");
  const [bannerUrl, setBannerUrl] = useState("");
  const [bannerBadge, setBannerBadge] = useState("");
  const [bannerActive, setBannerActive] = useState(true);

  // Selected testimonial variables
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [testName, setTestName] = useState("");
  const [testRole, setTestRole] = useState("");
  const [testStars, setTestStars] = useState(5);
  const [testQuote, setTestQuote] = useState("");
  const [testProject, setTestProject] = useState("");
  const [testAvatar, setTestAvatar] = useState("");

  // Active Banners Admin Live Preview Slider State
  const activeBanners = banners.filter((b) => b.isActive);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Auto rotate admin preview if multiple are active
  useEffect(() => {
    if (activeBanners.length <= 1) {
      setCurrentBannerIndex(0);
      return;
    }
    // Maintain index bound check
    if (currentBannerIndex >= activeBanners.length) {
      setCurrentBannerIndex(0);
    }
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % activeBanners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeBanners, currentBannerIndex]);

  const handleCreateBannerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerTitle || !bannerUrl) return;

    try {
      await addBanner({
        title: bannerTitle,
        subtitle: bannerSubtitle,
        buttonText: bannerButtonText,
        imageUrl: bannerUrl,
        badgeText: bannerBadge || undefined,
        isActive: bannerActive,
      });

      setIsBannerModalOpen(false);

      setBannerTitle("");
      setBannerSubtitle("");
      setBannerButtonText("Ver Proyectos");
      setBannerUrl("");
      setBannerBadge("");
    } catch {
      alert("No se pudo crear el banner.");
    }
  };

  const handleCreateTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testName || !testQuote) return;

    try {
      await addTestimonial({
        name: testName,
        role: testRole || "Inversionista Satisfecho",
        stars: Number(testStars),
        quote: testQuote,
        projectPurchased: testProject || "Proyecto de Lotes",
        avatarUrl: testAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
      });

      setIsTestimonialModalOpen(false);

      setTestName("");
      setTestRole("");
      setTestStars(5);
      setTestQuote("");
      setTestProject("");
      setTestAvatar("");
    } catch {
      alert("No se pudo crear el testimonio.");
    }
  };

  const toggleBannerStatus = (id: string, current: boolean) => {
    updateBanner(id, { isActive: !current }).catch(() => alert("No se pudo actualizar el banner."));
  };

  return (
    <div id="admin-multimedia-management" className="p-6 md:p-8 space-y-8 text-left">
      
      {/* Page header */}
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-sans font-extrabold text-2xl text-[var(--text-p)] leading-none">
            GESTIÓN MULTIMEDIA Y TESTIMONIOS
          </h1>
          <span className="font-mono text-[10px] text-[var(--text-s)] block mt-1 uppercase tracking-wide">
            Administre las portadas publicitarias de la web y el registro de reseñas de los compradores en caliente
          </span>
        </div>
      </section>

      {/* Grid: Left Column Banners (Span 12 -> 6) and Right Column Testimonials (Span 12 -> 6) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* A. BANNERS PUBLICITARIOS MANAGER */}
        <section className="admin-card border p-6 rounded-xl flex flex-col justify-start space-y-5 shadow">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <span className="font-sans font-extrabold text-xs uppercase text-[var(--text-p)] tracking-wider flex items-center gap-1.5 font-mono">
              <Megaphone className="w-4 h-4 text-amber-500" />
              BANNERS HERO (PORTADAS PRINCIPALES)
            </span>
            <button
              onClick={() => setIsBannerModalOpen(true)}
              className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-sans font-bold text-[10px] px-2.5 py-1.5 rounded uppercase cursor-pointer"
            >
              <Plus className="w-3 h-3 shrink-0" />
              Añadir Portada
            </button>
          </div>

          {/* Active Banner Live Preview Carousel */}
          {activeBanners.length > 0 ? (
            <div className="admin-surface border rounded-xl p-4 overflow-hidden relative">
              <div className="absolute top-2.5 right-2.5 bg-[var(--accent)]/90 backdrop-blur-md text-white font-mono text-[8px] font-extrabold px-1.5 py-0.5 rounded-full z-10 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                VISTA PREVIA ACTIVA
              </div>
              
              <div className="relative h-44 rounded-lg overflow-hidden flex items-center p-6 admin-card border">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentBannerIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 select-none"
                  >
                    <img
                      src={activeBanners[currentBannerIndex]?.imageUrl}
                      alt={activeBanners[currentBannerIndex]?.title}
                      className="w-full h-full object-cover opacity-15 dark:opacity-25"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 admin-gradient-overlay" />
                  </motion.div>
                </AnimatePresence>
                
                <div className="relative z-10 space-y-2 pointer-events-none max-w-sm">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentBannerIndex}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-2"
                    >
                      {activeBanners[currentBannerIndex]?.badgeText && (
                        <span className="inline-block bg-[var(--accent)] text-white text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded">
                          {activeBanners[currentBannerIndex]?.badgeText}
                        </span>
                      )}
                      <h4 className="font-sans font-extrabold text-sm text-[var(--text-p)] leading-tight">
                        {activeBanners[currentBannerIndex]?.title}
                      </h4>
                      <p className="font-sans text-[10px] text-[var(--text-s)] font-light line-clamp-2">
                        {activeBanners[currentBannerIndex]?.subtitle}
                      </p>
                      <div>
                        <span className="inline-block bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30 font-sans font-semibold text-[9px] px-2.5 py-1 rounded">
                          {activeBanners[currentBannerIndex]?.buttonText}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                {/* Navigation arrows for admin preview */}
                {activeBanners.length > 1 && (
                  <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 z-20">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentBannerIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
                      }}
                      className="p-1 px-1.5 admin-surface hover:bg-[var(--border)] hover:text-[var(--accent)] text-[var(--text-s)] rounded-sm font-mono text-[9px] border border-[var(--border)] transition-colors cursor-pointer"
                    >
                      &larr; Prev
                    </button>
                    <span className="font-mono text-[9px] text-[var(--text-s)] px-1 select-none">
                      {currentBannerIndex + 1}/{activeBanners.length}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentBannerIndex((prev) => (prev + 1) % activeBanners.length);
                      }}
                      className="p-1 px-1.5 admin-surface hover:bg-[var(--border)] hover:text-[var(--accent)] text-[var(--text-s)] rounded-sm font-mono text-[9px] border border-[var(--border)] transition-colors cursor-pointer"
                    >
                      Next &rarr;
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="admin-surface border border-dashed rounded-xl p-6 text-center text-[var(--text-s)] text-xs">
              Sin portadas activas en funcionamiento en el portal.
            </div>
          )}

          {/* Banner items list */}
          <div className="space-y-4">
            {banners.map((b) => {
              const isCurrentlyPreviewed = b.isActive && activeBanners[currentBannerIndex]?.id === b.id;
              return (
                <article
                  key={b.id}
                  onClick={() => {
                    if (b.isActive) {
                      const idx = activeBanners.findIndex((ab) => ab.id === b.id);
                      if (idx !== -1) {
                        setCurrentBannerIndex(idx);
                      }
                    }
                  }}
                  className={`border rounded-lg p-4 space-y-3 relative group overflow-hidden transition-all duration-200 cursor-pointer ${
                    b.isActive
                      ? isCurrentlyPreviewed
                        ? "admin-surface border-[var(--accent)] shadow-[0_0_8px_-2px_var(--accent)]"
                        : "admin-surface border-[var(--border)] hover:border-[var(--accent)]"
                      : "admin-surface-muted border-[var(--border)] opacity-60 hover:opacity-100"
                  }`}
                >
                  {/* Left indicator accent border for active/previewed banner */}
                  {isCurrentlyPreviewed && (
                    <div className="absolute top-0 left-0 bottom-0 w-1 bg-[var(--accent)]" />
                  )}

                  {/* Horizontal item styling */}
                  <div className="flex items-stretch gap-3.5 h-20">
                    <div className="w-24 admin-card overflow-hidden rounded border border-[var(--border)] shrink-0">
                      <img
                        src={b.imageUrl}
                        alt={b.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-0.5 select-none leading-tight">
                      <div className="space-y-0.5">
                        {b.badgeText && (
                          <span className="inline-block bg-[var(--accent)]/10 text-[var(--accent)] text-[8px] font-mono font-bold uppercase px-1.5 rounded">
                            {b.badgeText}
                          </span>
                        )}
                        <h3 className="font-sans font-bold text-xs text-[var(--text-p)] line-clamp-1">
                          {b.title}
                        </h3>
                        <p className="font-sans text-[10px] text-[var(--text-s)] font-light line-clamp-1 leading-snug">
                          {b.subtitle}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] text-[var(--text-s)]">
                          Botón: "{b.buttonText}"
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                    {/* Status switches */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleBannerStatus(b.id, b.isActive)}
                        className={`px-2 py-1 text-[9px] font-mono font-bold rounded uppercase transition-colors flex items-center gap-1 ${
                          b.isActive
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                            : "admin-inactive-badge border"
                        }`}
                      >
                        {b.isActive ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            Activo en Portada
                          </>
                        ) : (
                          "Desactivado"
                        )}
                      </button>
                      {!b.isActive && (
                        <span className="text-3xs font-mono text-[var(--text-s)] italic">
                          * Oculto del slider
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        if (window.confirm("¿Seguro de remover este banner del slider de portada?")) {
                          deleteBanner(b.id).catch(() => alert("No se pudo eliminar el banner."));
                        }
                      }}
                      className="p-1 text-[var(--text-s)] hover:text-rose-500 hover:bg-[var(--bg)] rounded transition-colors"
                      title="Eliminar Banner"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* B. TESTIMONIOS Y REVIEWS MANAGER */}
        <section className="admin-card border p-6 rounded-xl flex flex-col justify-start space-y-5 shadow">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <span className="font-sans font-extrabold text-xs uppercase text-[var(--text-p)] tracking-wider flex items-center gap-1.5 font-mono">
              <UserCheck className="w-4 h-4 text-emerald-500" />
              MALLA DE RECOMENDADOS (VALORACIONES)
            </span>
            <button
              onClick={() => setIsTestimonialModalOpen(true)}
              className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-sans font-bold text-[10px] px-2.5 py-1.5 rounded uppercase cursor-pointer"
            >
              <Plus className="w-3 h-3 shrink-0" />
              Inscribir Reseña
            </button>
          </div>

          {/* Testimonials list */}
          <div className="space-y-4">
            {testimonials.map((t) => (
              <article
                key={t.id}
                className="admin-surface border rounded-lg p-4 space-y-3 relative flex flex-col justify-between"
              >
                <div className="space-y-2 text-left">
                  <div className="flex items-center justify-between">
                    {/* Stars render */}
                    <div className="flex items-center gap-0.5">
                      {[...Array(t.stars)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                    <span className="inline-block bg-amber-500 text-stone-950 text-3xs font-mono px-1.5 py-0.5 rounded font-extrabold uppercase">
                      Lote: {t.projectPurchased}
                    </span>
                  </div>

                  <blockquote className="font-sans text-[11px] text-[var(--text-s)] font-light italic leading-relaxed line-clamp-2">
                    "{t.quote}"
                  </blockquote>
                </div>

                <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatarUrl}
                      alt={t.name}
                      className="w-7 h-7 rounded-full object-cover border border-[var(--border)]"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-sans font-bold text-[11px] text-[var(--text-p)] leading-none">
                        {t.name}
                      </h4>
                      <span className="text-3xs font-mono text-[var(--text-s)] block mt-0.5">
                        {t.role}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (window.confirm(`¿Seguro de remover la valoración de "${t.name}" de la web?`)) {
                        deleteTestimonial(t.id).catch(() => alert("No se pudo eliminar el testimonio."));
                      }
                    }}
                    className="p-1 text-[var(--text-s)] hover:text-rose-500 hover:bg-[var(--bg)] rounded transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* MODAL 1: CREATE BANNER FORM */}
      {isBannerModalOpen && (
        <section className="fixed inset-0 admin-overlay backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl w-full max-w-md p-6 relative space-y-5 text-[var(--text-p)]">
            <button
              onClick={() => setIsBannerModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 hover:bg-[var(--bg)] rounded-lg text-[var(--text-s)] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="font-mono text-3xs text-amber-500 font-bold uppercase tracking-widest block">
                Herramientas publicitarias
              </span>
              <h3 className="font-sans font-extrabold text-base">
                Añadir Nueva Portada de Lotes
              </h3>
            </div>

            <form onSubmit={handleCreateBannerSubmit} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="block text-3xs font-mono font-bold uppercase tracking-wide text-[var(--text-s)]">
                  Título del Gran Remate (Banner)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Gran Liquidación: Lotes desde S/ 39,000 en el Sur!"
                  value={bannerTitle}
                  onChange={(e) => setBannerTitle(e.target.value)}
                  className="w-full admin-card border focus:border-amber-400 p-2.5 rounded-lg outline-none text-[var(--text-p)]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-3xs font-mono font-bold uppercase tracking-wide text-[var(--text-s)]">
                  Subtexto Descriptivo de Campaña
                </label>
                <textarea
                  rows={2}
                  value={bannerSubtitle}
                  onChange={(e) => setBannerSubtitle(e.target.value)}
                  placeholder="Lotes con Partida Electrónica listos para minutas..."
                  className="w-full admin-card border focus:border-amber-400 p-2.5 rounded-lg outline-none text-[var(--text-p)] resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-3xs font-mono font-bold uppercase tracking-wide text-[var(--text-s)]">
                    Etiqueta / Badge (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Liquidación 2026"
                    value={bannerBadge}
                    onChange={(e) => setBannerBadge(e.target.value)}
                    className="w-full admin-card border focus:border-amber-400 p-2.5 rounded-lg outline-none text-[var(--text-p)]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-3xs font-mono font-bold uppercase tracking-wide text-[var(--text-s)]">
                    Texto del Botón CTA
                  </label>
                  <input
                    type="text"
                    value={bannerButtonText}
                    onChange={(e) => setBannerButtonText(e.target.value)}
                    className="w-full admin-card border focus:border-amber-400 p-2.5 rounded-lg outline-none text-[var(--text-p)]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-3xs font-mono font-bold uppercase tracking-wide text-[var(--text-s)]">
                  Enlace Imagen de Fondo (Unsplash recomendado)
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com..."
                  value={bannerUrl}
                  onChange={(e) => setBannerUrl(e.target.value)}
                  className="w-full admin-card border text-[var(--text-p)] p-2.5 rounded-lg outline-none text-[var(--text-p)]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2.5">
                <input
                  type="checkbox"
                  id="b-active-field"
                  checked={bannerActive}
                  onChange={(e) => setBannerActive(e.target.checked)}
                  className="w-4 h-4 admin-surface border border-[var(--border)] rounded text-amber-500 checked:bg-amber-500 cursor-pointer"
                />
                <label htmlFor="b-active-field" className="font-mono text-3xs text-[var(--text-p)] uppercase tracking-wider cursor-pointer">
                  Habilitar Visualización Inmediata
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-2 text-xs font-sans font-bold border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => setIsBannerModalOpen(false)}
                  className="px-4 py-2 text-[var(--text-s)] hover:text-[var(--text-p)] uppercase"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-5 py-2 rounded-md uppercase tracking-wider"
                >
                  Inscribir Portada
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* MODAL 2: CREATE TESTIMONIAL FORM */}
      {isTestimonialModalOpen && (
        <section className="fixed inset-0 admin-overlay backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl w-full max-w-md p-6 relative space-y-5 text-[var(--text-p)]">
            <button
              onClick={() => setIsTestimonialModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 hover:bg-[var(--bg)] rounded-lg text-[var(--text-s)] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="font-mono text-3xs text-amber-500 font-bold uppercase tracking-widest block">
                historias de rentistas
              </span>
              <h3 className="font-sans font-extrabold text-base">
                Inscribir Nueva Reseña sobre Lote
              </h3>
            </div>

            <form onSubmit={handleCreateTestimonialSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-3xs font-mono font-bold uppercase tracking-wide text-[var(--text-s)]">
                    Nombre del Comprador
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Hernán Rivas"
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    className="w-full admin-card border focus:border-amber-400 p-2.5 rounded-lg text-[var(--text-p)]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-3xs font-mono font-bold uppercase tracking-wide text-[var(--text-s)]">
                    Ocupación / Distrito
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Comerciante - Callao"
                    value={testRole}
                    onChange={(e) => setTestRole(e.target.value)}
                    className="w-full admin-card border focus:border-amber-400 p-2.5 rounded-lg text-[var(--text-p)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-3xs font-mono font-bold uppercase tracking-wide text-[var(--text-s)]">
                    Proyecto Adquirido
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Eco-Lomas de Chilca"
                    value={testProject}
                    onChange={(e) => setTestProject(e.target.value)}
                    className="w-full admin-card border focus:border-amber-400 p-2.5 rounded-lg text-[var(--text-p)]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-3xs font-mono font-bold uppercase tracking-wide text-[var(--text-s)]">
                    Calificación de Estrellas
                  </label>
                  <select
                    value={testStars}
                    onChange={(e) => setTestStars(Number(e.target.value))}
                    className="w-full admin-card border text-[var(--text-p)] p-2.5 rounded-lg outline-none cursor-pointer"
                  >
                    <option value={5}>5 Estrellas ★★★★★</option>
                    <option value={4}>4 Estrellas ★★★★☆</option>
                    <option value={3}>3 Estrellas ★★★☆☆</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-3xs font-mono font-bold uppercase tracking-wide text-[var(--text-s)]">
                  Enlace Foto de Perfil (Avatar)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash..."
                  value={testAvatar}
                  onChange={(e) => setTestAvatar(e.target.value)}
                  className="w-full admin-card border text-[var(--text-p)] p-2.5 rounded-lg text-[var(--text-p)]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-3xs font-mono font-bold uppercase tracking-wide text-[var(--text-s)]">
                  Reseña / Cita Textual
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Excelente gestión notarial, lote completamente plano..."
                  value={testQuote}
                  onChange={(e) => setTestQuote(e.target.value)}
                  className="w-full admin-card border focus:border-amber-400 p-2.5 rounded-lg resize-none text-[var(--text-p)]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2 text-xs font-sans font-bold border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => setIsTestimonialModalOpen(false)}
                  className="px-4 py-2 text-[var(--text-s)] hover:text-[var(--text-p)] uppercase"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-5 py-2 rounded-md uppercase tracking-wider"
                >
                  Registrar Testimonio
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </div>
  );
};
