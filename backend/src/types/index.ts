export type ProjectType = "Playero" | "Campestre" | "Urbano" | "Industrial";
export type ProjectStatus = "Pre-venta" | "Inmediata" | "Vendido" | "En Obras";
export type InquiryStatus = "Pendiente" | "Contactado" | "Archivado";

export interface Project {
  id: string;
  title: string;
  location: string;
  region: string;
  projectType: ProjectType;
  surface: number;
  priceSoles: number;
  priceDollars: number;
  status: ProjectStatus;
  imageUrl: string;
  coordinates: { lat: number; lng: number };
  description: string;
  features: string[];
  featured: boolean;
  totalLots: number;
  availableLots: number;
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
  status: InquiryStatus;
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

export interface ProjectRow {
  id: string;
  title: string;
  location: string;
  region: string;
  project_type: ProjectType;
  surface: number;
  price_soles: number;
  price_dollars: number;
  status: ProjectStatus;
  image_url: string;
  lat: number;
  lng: number;
  description: string;
  features: string | string[];
  featured: number;
  total_lots: number;
  available_lots: number;
}

export interface BannerRow {
  id: string;
  title: string;
  subtitle: string;
  button_text: string;
  image_url: string;
  badge_text: string | null;
  is_active: number;
}

export interface TestimonialRow {
  id: string;
  name: string;
  role: string;
  stars: number;
  quote: string;
  project_purchased: string;
  avatar_url: string;
}

export interface InquiryRow {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  project_interest: string;
  message: string;
  status: InquiryStatus;
  notes: string | null;
  created_at: Date;
}
