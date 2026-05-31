/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Check,
  Send,
  Loader2,
  ExternalLink,
  Layers,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { api } from "../../api";
import { getContactFormBySlug } from "../../config/siteDefaults";
import {
  formatProjectInterestLabel,
  formatProjectLocation,
  getGoogleMapsEmbedUrl,
  getGoogleMapsExternalUrl,
} from "../../utils/projects";
import { ProjectMediaGallery } from "../../components/ProjectMediaGallery";
import type { Project } from "../../types";

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, addInquiry, contactForms } = useApp();
  const contactForm = getContactFormBySlug(contactForms, "contact_consulta");

  const cached = projects.find((p) => p.id === id);
  const [project, setProject] = useState<Project | null>(cached ?? null);
  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fromCache = projects.find((p) => p.id === id);
    if (fromCache) {
      setProject(fromCache);
      setLoading(false);
    }

    let cancelled = false;
    (async () => {
      try {
        const detail = await api.getProject(id);
        if (!cancelled) {
          setProject(detail);
          setError(null);
        }
      } catch {
        if (!cancelled && !fromCache) {
          setError("No se pudo cargar el proyecto.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id, projects]);

  const locationLabel = project ? formatProjectLocation(project) : "";
  const interestLabel = project ? formatProjectInterestLabel(project) : "";
  const mapsEmbedUrl = project ? getGoogleMapsEmbedUrl(project) : null;
  const mapsExternalUrl = project ? getGoogleMapsExternalUrl(project) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project || !fullName || !phone || !email) return;

    try {
      await addInquiry({
        fullName,
        phone,
        email,
        projectInterest: interestLabel,
        message: message || contactForm.defaultMessage,
      });
      setFormSuccess(true);
      setFullName("");
      setPhone("");
      setEmail("");
      setMessage("");
      setTimeout(() => setFormSuccess(false), 5000);
    } catch {
      /* handled globally */
    }
  };

  if (loading) {
    return (
      <div className="pt-28 min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--accent)]" />
      </div>
    );
  }

  if (!project || error) {
    return (
      <div className="pt-28 max-w-lg mx-auto px-4 text-center space-y-4">
        <p className="text-[var(--text-s)] text-sm">{error ?? "Proyecto no encontrado."}</p>
        <Link
          to="/catalog"
          className="inline-flex items-center gap-1.5 text-[var(--accent-text)] font-semibold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div id="project-detail-page" className="pt-10 min-h-screen bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Columna principal */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <ProjectMediaGallery project={project} />

            {/* Título y datos clave */}
            <div className="space-y-4">
              {locationLabel && (
                <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest">
                  <MapPin className="w-3.5 h-3.5 text-[var(--accent-text)] shrink-0" />
                  <span>{locationLabel}</span>
                  {project.region && (
                    <>
                      <span className="opacity-40">·</span>
                      <span>{project.region}</span>
                    </>
                  )}
                </div>
              )}
              <h1 className="text-2xl sm:text-3xl font-sans font-extrabold text-[var(--text-p)] leading-tight tracking-tight">
                {project.title}
              </h1>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-4 py-3">
                  <span className="block text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">Precio</span>
                  <strong className="block text-base font-extrabold text-[var(--accent-text)] mt-0.5">
                    {project.priceSoles > 0 ? `S/. ${project.priceSoles.toLocaleString()}` : "Consultar"}
                  </strong>
                </div>
                <div className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-4 py-3">
                  <span className="block text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">Libres</span>
                  <strong className="block text-base font-extrabold text-[var(--text-p)] mt-0.5">{project.availableLots}</strong>
                </div>
                <div className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-4 py-3">
                  <span className="block text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">Total</span>
                  <strong className="block text-base font-extrabold text-[var(--text-p)] mt-0.5">{project.totalLots}</strong>
                </div>
                {(project.surface ?? 0) > 0 && (
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-4 py-3">
                    <span className="block text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">Área</span>
                    <strong className="block text-base font-extrabold text-[var(--text-p)] mt-0.5">{project.surface} m²</strong>
                  </div>
                )}
              </div>
            </div>

            {/* Descripción */}
            {project.description && (
              <section className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5 sm:p-6 space-y-3">
                <h2 className="font-sans font-bold text-sm uppercase tracking-wider text-[var(--text-p)]">
                  Sobre el proyecto
                </h2>
                <p className="text-[var(--text-s)] text-sm font-light leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </section>
            )}

            {/* Google Maps */}
            <section className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-[var(--border)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h2 className="font-sans font-bold text-sm uppercase tracking-wider text-[var(--text-p)] flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[var(--accent-text)]" />
                    Ubicación
                  </h2>
                  {locationLabel && (
                    <p className="text-xs text-[var(--text-s)] mt-1 font-light">{locationLabel}</p>
                  )}
                </div>
                {mapsExternalUrl && (
                  <a
                    href={mapsExternalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-text)] hover:underline shrink-0"
                  >
                    Abrir en Google Maps
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
              {mapsEmbedUrl ? (
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] bg-[var(--border)]/20">
                  <iframe
                    title={`Mapa de ${project.title}`}
                    src={mapsEmbedUrl}
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="px-5 py-10 text-center text-sm text-[var(--text-s)] font-light">
                  Ubicación no disponible en el mapa.{" "}
                  {mapsExternalUrl && (
                    <a href={mapsExternalUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--accent-text)] font-semibold hover:underline">
                      Ver en Google Maps
                    </a>
                  )}
                </div>
              )}
            </section>
          </div>

          {/* Sidebar contacto */}
          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-24">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 shadow-lg space-y-5">
                <div className="space-y-1 pb-4 border-b border-[var(--border)]">
                  <span className="font-mono text-[10px] text-[var(--accent-text)] uppercase tracking-widest font-semibold">
                    Consulta este proyecto
                  </span>
                  <h3 className="font-sans font-extrabold text-lg text-[var(--text-p)] leading-snug">
                    {contactForm.formTitle}
                  </h3>
                  <p className="text-xs text-[var(--text-s)] font-light leading-relaxed">{contactForm.formSubtitle}</p>
                </div>

                <div className="rounded-lg bg-[var(--bg)] border border-[var(--border)] px-3 py-2.5 flex items-start gap-2">
                  <Layers className="w-4 h-4 text-[var(--accent-text)] shrink-0 mt-0.5" />
                  <p className="text-[11px] text-[var(--text-s)] leading-relaxed">{interestLabel}</p>
                </div>

                {formSuccess ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center space-y-2">
                    <Check className="w-8 h-8 text-[var(--accent-text)] mx-auto" />
                    <p className="font-semibold text-sm text-[var(--text-p)]">{contactForm.successTitle}</p>
                    <p className="text-xs text-[var(--text-s)]">{contactForm.successMessage}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="text"
                      required
                      placeholder="Nombres completos"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[var(--bg)] border border-[var(--border)] focus:border-[var(--accent)] rounded-lg p-2.5 text-xs outline-none transition-colors text-[var(--text-p)]"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Teléfono / WhatsApp"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[var(--bg)] border border-[var(--border)] focus:border-[var(--accent)] rounded-lg p-2.5 text-xs outline-none transition-colors text-[var(--text-p)]"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Correo electrónico"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[var(--bg)] border border-[var(--border)] focus:border-[var(--accent)] rounded-lg p-2.5 text-xs outline-none transition-colors text-[var(--text-p)]"
                    />
                    <textarea
                      rows={3}
                      placeholder="Tu consulta sobre este proyecto..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[var(--bg)] border border-[var(--border)] focus:border-[var(--accent)] rounded-lg p-2.5 text-xs outline-none transition-colors resize-none text-[var(--text-p)]"
                    />
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[#008c4a] text-white font-bold text-xs py-3 rounded-lg uppercase tracking-wider transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      {contactForm.submitLabel}
                    </button>
                  </form>
                )}

                <Link
                  to="/contact"
                  className="block text-center text-xs text-[var(--accent-text)] font-semibold hover:underline"
                >
                  Ver todos los canales de contacto
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
