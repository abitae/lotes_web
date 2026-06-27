/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import type { Project } from "../types";
import { formatProjectLocation } from "../utils/projects";

export type ProjectCardLayout = "grid" | "list";
export type ProjectCardVariant = "home" | "catalog";

type ProjectCardProps = {
  project: Project;
  layout?: ProjectCardLayout;
  variant?: ProjectCardVariant;
};

function statusBadgeClass(status: Project["status"], variant: ProjectCardVariant): string {
  const base = "text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm";
  if (status === "Pre-venta") {
    return `${base} bg-amber-100/95 text-amber-900 border border-amber-200`;
  }
  if (status === "Inmediata") {
    return `${base} bg-emerald-100/95 text-emerald-900 border border-emerald-200`;
  }
  if (variant === "home") {
    return `${base} bg-white/90 text-stone-800 border border-stone-200`;
  }
  return `${base} bg-stone-100 text-stone-800 border border-stone-200`;
}

export function ProjectCard({ project, layout = "grid", variant = "catalog" }: ProjectCardProps) {
  const locationLabel = formatProjectLocation(project);
  const isGrid = layout === "grid";
  const isHome = variant === "home";
  const detailUrl = `/catalog/${project.id}`;

  const shellClass = isHome
    ? [
        "project-card project-card--home",
        "bg-[var(--bg)] rounded-2xl border border-[var(--border)]",
        "premium-card-shadow premium-card-hover",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
      ].join(" ")
    : [
        "project-card project-card--catalog",
        "bg-white border border-stone-200/65 rounded-xl premium-card-shadow",
        "hover:border-emerald-700/40 hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2",
      ].join(" ");

  const layoutClass = isGrid ? "flex-col" : "flex-row h-44 sm:h-48";

  const imageWrapClass = isGrid
    ? isHome
      ? "h-52 sm:h-56 w-full"
      : "h-44 w-full"
    : "h-full w-40 sm:w-44 shrink-0";

  const priceClass = isHome
    ? "text-xl font-sans font-extrabold text-[var(--accent-text)] truncate"
    : "text-xl font-sans font-extrabold text-emerald-950";

  const titleClass = isHome
    ? "font-sans font-bold text-lg text-[var(--text-p)] group-hover:text-[var(--accent-text)] leading-snug transition-colors line-clamp-2"
    : "font-sans font-bold text-sm text-stone-850 group-hover:text-emerald-950 leading-tight line-clamp-2 transition-colors";

  return (
    <Link
      to={detailUrl}
      className={`${shellClass} ${layoutClass} flex overflow-hidden group cursor-pointer text-left no-underline`}
      aria-label={`Ver detalle de ${project.title}`}
    >
      <div className={`relative bg-[var(--border)]/30 shrink-0 overflow-hidden ${imageWrapClass}`}>
        <img
          src={project.imageUrl}
          alt=""
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div
          className={`absolute inset-0 ${
            isHome ? "bg-gradient-to-t from-black/55 via-black/10 to-transparent" : "bg-gradient-to-t from-black/40 to-transparent"
          }`}
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className={statusBadgeClass(project.status, variant)}>{project.status}</span>
        </div>
        {project.availableLots > 0 && (
          <div
            className={`absolute bottom-3 left-3 font-mono text-[10px] font-bold uppercase tracking-wide shadow-lg px-2.5 py-1 rounded-md ${
              isHome ? "bg-[var(--accent)] text-white" : "bg-emerald-800 text-white"
            }`}
          >
            {project.availableLots} lote{project.availableLots !== 1 ? "s" : ""} libre
            {project.availableLots !== 1 ? "s" : ""}
          </div>
        )}
        {project.surface != null && project.surface > 0 && isGrid && (
          <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm px-2.5 py-1 rounded font-mono text-[10px] text-white">
            {project.surface} m²
          </div>
        )}
      </div>

      <div
        className={`flex-1 flex flex-col justify-between min-w-0 ${
          isHome ? "p-5 sm:p-6 gap-4" : "p-4 gap-2"
        }`}
      >
        <div className="space-y-2">
          {locationLabel && (
            <div
              className={`flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest line-clamp-1 ${
                isHome ? "text-[var(--text-muted)]" : "text-stone-400 tracking-tight"
              }`}
            >
              <MapPin className={`w-3.5 h-3.5 shrink-0 ${isHome ? "text-[var(--accent-text)]" : "text-emerald-800"}`} />
              <span>{locationLabel}</span>
            </div>
          )}
          <h3 className={titleClass}>{project.title}</h3>
          {project.description && isGrid && (
            <p
              className={`line-clamp-2 leading-relaxed ${
                isHome ? "text-[var(--text-s)] text-xs font-light" : "text-stone-500 text-[11px] font-light"
              }`}
            >
              {project.description}
            </p>
          )}
        </div>

        <div
          className={`flex items-end justify-between gap-3 ${
            isHome ? "pt-4 border-t border-[var(--border)]" : "pt-2 border-t border-stone-100/60 mt-auto"
          }`}
        >
          <div className="flex flex-col min-w-0">
            {isHome && (
              <span className="text-[10px] text-[var(--text-muted)] font-mono tracking-widest uppercase">Desde</span>
            )}
            <span className={priceClass}>
              {project.priceSoles > 0 ? `S/. ${project.priceSoles.toLocaleString()}` : "Consultar"}
            </span>
            {!isHome && project.availableLots > 0 && isGrid && (
              <span className="text-[10px] font-mono text-stone-400 uppercase">
                {project.availableLots} lote{project.availableLots !== 1 ? "s" : ""} libre
                {project.availableLots !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          <span
            className={`shrink-0 inline-flex items-center gap-1 font-sans font-bold transition-colors ${
              isHome
                ? "text-[11px] text-[var(--text-p)] group-hover:text-[var(--accent-text)]"
                : "text-[10px] text-emerald-850 group-hover:text-emerald-700"
            }`}
          >
            Ver detalle
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}
