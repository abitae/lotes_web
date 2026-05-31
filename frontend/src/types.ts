/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ProjectType = "Playero" | "Campestre" | "Urbano" | "Industrial" | string;

export type ProjectStatus = "Pre-venta" | "Inmediata" | "Vendido" | "En Obras";

export interface Project {
  id: string;
  title: string;
  location: string;
  region: string;
  projectType: ProjectType;
  surface?: number;
  priceSoles: number;
  priceDollars?: number;
  status: ProjectStatus;
  imageUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  features: string[];
  featured?: boolean;
  totalLots: number;
  availableLots: number;
  images?: { url: string; title: string }[];
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  imageUrl: string;
  badgeText?: string;
  isActive: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  stars: number;
  quote: string;
  projectPurchased: string;
  avatarUrl: string;
}

export interface Inquiry {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  projectInterest: string;
  message: string;
  status: "Pendiente" | "Contactado" | "Archivado";
  createdAt: string;
  notes?: string;
}

export interface DashboardStats {
  totalProjects: number;
  totalLeads: number;
  pendingLeads: number;
  totalLotsSold: number;
  monthlyLeadsTrend: { month: string; leads: number }[];
  projectTypeDistribution: { name: string; value: number }[];
}
