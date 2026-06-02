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

export interface AboutPage {
  heroEyebrow: string;
  heroHeading: string;
  heroDescription: string;
  heroBackgroundImageUrl: string;
  missionHeading: string;
  missionDescription: string;
  visionHeading: string;
  visionDescription: string;
  valuesEyebrow: string;
  valuesHeading: string;
  valuesDescription: string;
  advisorsEyebrow: string;
  advisorsHeading: string;
  advisorsDescription: string;
}

export interface AboutValue {
  id: string;
  icon: string;
  title: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
}

export interface ExpertAdvisor {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  sortOrder: number;
  isActive: boolean;
}

export interface AboutData {
  page: AboutPage;
  values: AboutValue[];
  advisors: ExpertAdvisor[];
}

export interface AboutPageRow {
  id: number;
  hero_eyebrow: string;
  hero_heading: string;
  hero_description: string;
  hero_background_image_url: string;
  mission_heading: string;
  mission_description: string;
  vision_heading: string;
  vision_description: string;
  values_eyebrow: string;
  values_heading: string;
  values_description: string;
  advisors_eyebrow: string;
  advisors_heading: string;
  advisors_description: string;
}

export interface AboutValueRow {
  id: string;
  icon: string;
  title: string;
  description: string;
  sort_order: number;
  is_active: number;
}

export interface ExpertAdvisorRow {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  sort_order: number;
  is_active: number;
}

export interface HomeAlertModal {
  isEnabled: boolean;
  title: string;
  description: string;
  imageUrl: string | null;
  videoUrl: string | null;
  buttonText: string | null;
  buttonLink: string | null;
  updatedAt: string;
}

export interface HomeAlertModalRow {
  id: number;
  is_enabled: number;
  title: string;
  description: string;
  image_url: string | null;
  video_url: string | null;
  button_text: string | null;
  button_link: string | null;
  updated_at: Date;
}
