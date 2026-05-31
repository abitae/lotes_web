export type ProjectType = "Playero" | "Campestre" | "Urbano" | "Industrial";
export type ProjectStatus = "Pre-venta" | "Inmediata" | "Vendido" | "En Obras";
export type InquiryStatus = "Pendiente" | "Contactado" | "Archivado";

export interface Project {
  id: string;
  title: string;
  location: string;
  region: string;
  province?: string;
  district?: string;
  projectType: ProjectType;
  surface: number;
  priceSoles: number;
  priceDollars: number;
  status: ProjectStatus;
  imageUrl: string;
  coordinates: { lat: number; lng: number };
  mapsUrl?: string;
  description: string;
  features: string[];
  featured: boolean;
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

export type ChannelType = "address" | "phone" | "email" | "whatsapp";

export interface SiteSettings {
  logoUrl: string | null;
  faviconUrl: string | null;
  siteName: string;
  siteTagline: string;
  browserTitle: string;
  footerTagline: string;
  footerDescription: string;
}

export interface GuaranteeSection {
  eyebrow: string;
  heading: string;
  description: string;
  backgroundImageUrl: string;
}

export interface GuaranteeItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
}

export interface ContactFormBullet {
  text: string;
}

export interface ContactFormConfig {
  slug: string;
  formTitle: string;
  formSubtitle: string;
  submitLabel: string;
  successTitle: string;
  successMessage: string;
  defaultMessage: string;
  defaultProjectInterest: string;
  sectionEyebrow?: string | null;
  sectionHeading?: string | null;
  sectionDescription?: string | null;
  bullets?: ContactFormBullet[] | null;
}

export interface CorporateChannel {
  id: string;
  channelType: ChannelType;
  label: string;
  value: string;
  extraInfo?: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
  isActive: boolean;
}

export interface SiteSettingsRow {
  id: number;
  logo_url: string | null;
  favicon_url: string | null;
  site_name: string;
  site_tagline: string;
  browser_title: string;
  footer_tagline: string;
  footer_description: string;
}

export interface GuaranteeSectionRow {
  id: number;
  eyebrow: string;
  heading: string;
  description: string;
  background_image_url: string;
}

export interface GuaranteeItemRow {
  id: string;
  icon: string;
  title: string;
  description: string;
  sort_order: number;
  is_active: number;
}

export interface ContactFormRow {
  slug: string;
  form_title: string;
  form_subtitle: string;
  submit_label: string;
  success_title: string;
  success_message: string;
  default_message: string;
  default_project_interest: string;
  section_eyebrow: string | null;
  section_heading: string | null;
  section_description: string | null;
  bullets: string | ContactFormBullet[] | null;
}

export interface CorporateChannelRow {
  id: string;
  channel_type: ChannelType;
  label: string;
  value: string;
  extra_info: string | null;
  sort_order: number;
  is_active: number;
}

export interface FaqRow {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  is_active: number;
}
