/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Project } from "../types";

const PROJECT_TYPE_LABELS: Record<string, string> = {
  Playero: "Playero (Playa / Sol)",
  Campestre: "Campestre (Campo / Bosque)",
  Urbano: "Urbano (Ciudad)",
  Industrial: "Zonificación Industrial",
};

/** Valores únicos de región/departamento presentes en el catálogo cargado. */
export function getUniqueRegionsFromProjects(projects: Project[]): string[] {
  const values = projects
    .map((p) => p.region?.trim())
    .filter((r): r is string => Boolean(r));
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, "es"));
}

/** Tipos de zona únicos según los proyectos actuales (API / catálogo). */
export function getUniqueProjectTypesFromProjects(projects: Project[]): string[] {
  const values = projects
    .map((p) => p.projectType?.trim())
    .filter((t): t is string => Boolean(t));
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, "es"));
}

export function getProjectTypeFilterLabel(type: string): string {
  return PROJECT_TYPE_LABELS[type] ?? type;
}

/** Ubicación corta para tarjetas: "Provincia - Distrito" */
export function formatProjectLocation(
  project: Pick<Project, "province" | "district" | "location" | "region">
): string {
  const parts = [project.province, project.district].map((part) => part?.trim()).filter(Boolean);
  if (parts.length) return parts.join(" - ");
  return project.location?.trim() || project.region?.trim() || "";
}

/** Etiqueta para selects de contacto: "Nombre - Provincia - Distrito" */
export function formatProjectInterestLabel(project: Pick<Project, "title" | "province" | "district">): string {
  const parts = [project.title, project.province, project.district]
    .map((part) => part?.trim())
    .filter(Boolean);

  return parts.join(" - ");
}

type MapsProject = Pick<
  Project,
  "coordinates" | "mapsUrl" | "title" | "province" | "district" | "location" | "region"
>;

/** URL embebible de Google Maps (sin API key) */
export function getGoogleMapsEmbedUrl(project: MapsProject): string | null {
  const tryCoords = (lat: number, lng: number) =>
    `https://maps.google.com/maps?q=${lat},${lng}&z=15&hl=es&output=embed`;

  if (project.mapsUrl?.trim()) {
    const url = project.mapsUrl.trim();
    const atMatch = url.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);
    if (atMatch) return tryCoords(Number(atMatch[1]), Number(atMatch[2]));

    const qMatch = url.match(/[?&]q=([^&]+)/);
    if (qMatch) {
      return `https://maps.google.com/maps?q=${encodeURIComponent(decodeURIComponent(qMatch[1]))}&z=15&hl=es&output=embed`;
    }
  }

  const { lat, lng } = project.coordinates;
  const isDefaultLima = lat === -12 && lng === -77;
  if (Number.isFinite(lat) && Number.isFinite(lng) && !isDefaultLima) {
    return tryCoords(lat, lng);
  }

  const query = [project.title, project.district, project.province, project.region]
    .map((p) => p?.trim())
    .filter(Boolean)
    .join(", ");

  if (query) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(`${query}, Perú`)}&z=13&hl=es&output=embed`;
  }

  return null;
}

/** Enlace para abrir Google Maps en pestaña nueva */
export function getGoogleMapsExternalUrl(project: MapsProject): string | null {
  if (project.mapsUrl?.trim()) return project.mapsUrl.trim();

  const { lat, lng } = project.coordinates;
  const isDefaultLima = lat === -12 && lng === -77;
  if (Number.isFinite(lat) && Number.isFinite(lng) && !isDefaultLima) {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }

  const query = [project.title, project.district, project.province, project.region]
    .map((p) => p?.trim())
    .filter(Boolean)
    .join(", ");

  if (query) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${query}, Perú`)}`;
  }

  return null;
}
