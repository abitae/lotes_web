import type { Project, ProjectStatus, ProjectType } from "../types/index.js";
import type { WebApiProject } from "../types/webApi.js";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800";

const TYPE_MAP: Record<string, ProjectType> = {
  PLAYERO: "Playero",
  PLAYA: "Playero",
  CAMPESTRE: "Campestre",
  URBANO: "Urbano",
  RESIDENCIAL: "Urbano",
  INDUSTRIAL: "Industrial",
};

function mapProjectType(project: WebApiProject): ProjectType {
  const code = project.project_type?.code?.toUpperCase() ?? "";
  const name = project.project_type?.name?.toLowerCase() ?? "";

  if (TYPE_MAP[code]) return TYPE_MAP[code];
  if (name.includes("play") || name.includes("playa")) return "Playero";
  if (name.includes("camp")) return "Campestre";
  if (name.includes("indust")) return "Industrial";
  return "Urbano";
}

function parseCoordinates(location: string | null | undefined): { lat: number; lng: number } {
  if (!location) return { lat: -12, lng: -77 };

  const coordMatch = location.match(/^(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)$/);
  if (coordMatch) {
    return { lat: Number(coordMatch[1]), lng: Number(coordMatch[2]) };
  }

  return { lat: -12, lng: -77 };
}

function resolveLocationLabel(project: WebApiProject): string {
  if (project.location_label?.trim()) return project.location_label.trim();
  if (project.district?.trim()) return project.district.trim();
  if (project.province?.trim()) return project.province.trim();
  if (project.city?.name?.trim()) return project.city.name.trim();
  if (project.location?.trim() && !project.location.includes("google.com/maps")) {
    return project.location.trim();
  }
  return "Ubicación por confirmar";
}

function resolveRegion(project: WebApiProject): string {
  if (project.city?.department?.trim()) return project.city.department.trim();
  if (project.city?.name?.trim()) return project.city.name.trim();
  if (project.province?.trim()) return project.province.trim();
  return "Perú";
}

function resolveStatus(freeLots: number): ProjectStatus {
  if (freeLots <= 0) return "Vendido";
  return "Pre-venta";
}

function resolveImageUrl(project: WebApiProject): string {
  if (project.image_portada?.trim()) return project.image_portada.trim();
  const firstImage = project.images?.find((img) => img.url?.trim());
  if (firstImage?.url) return firstImage.url;
  return PLACEHOLDER_IMAGE;
}

export function mapWebProjectToProject(project: WebApiProject): Project {
  const availableLots = project.free_lots_count ?? 0;
  const totalLots = project.total_lots ?? project.lots_count ?? availableLots;
  const imageUrl = resolveImageUrl(project);

  return {
    id: String(project.id),
    title: project.name,
    location: resolveLocationLabel(project),
    region: resolveRegion(project),
    projectType: mapProjectType(project),
    surface: 0,
    priceSoles: Number(project.precio_web) || 0,
    priceDollars: 0,
    status: resolveStatus(availableLots),
    imageUrl,
    coordinates: parseCoordinates(project.location),
    description: project.descripcion?.trim() || "",
    features: (project.blocks ?? []).filter(Boolean),
    featured: Boolean(imageUrl !== PLACEHOLDER_IMAGE && availableLots > 0),
    totalLots,
    availableLots,
  };
}
