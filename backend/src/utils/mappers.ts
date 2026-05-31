import type { Banner, BannerRow, Inquiry, InquiryRow, Project, ProjectRow, Testimonial, TestimonialRow } from "../types/index.js";

function parseFeatures(features: string | string[]): string[] {
  if (Array.isArray(features)) return features;
  if (typeof features === "string") return JSON.parse(features) as string[];
  return [];
}

export function mapProject(row: ProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    location: row.location,
    region: row.region,
    projectType: row.project_type,
    surface: Number(row.surface),
    priceSoles: Number(row.price_soles),
    priceDollars: Number(row.price_dollars),
    status: row.status,
    imageUrl: row.image_url,
    coordinates: { lat: Number(row.lat), lng: Number(row.lng) },
    description: row.description,
    features: parseFeatures(row.features),
    featured: Boolean(row.featured),
    totalLots: row.total_lots,
    availableLots: row.available_lots,
  };
}

export function mapBanner(row: BannerRow): Banner {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    buttonText: row.button_text,
    imageUrl: row.image_url,
    badgeText: row.badge_text ?? undefined,
    isActive: Boolean(row.is_active),
  };
}

export function mapTestimonial(row: TestimonialRow): Testimonial {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    stars: row.stars,
    quote: row.quote,
    projectPurchased: row.project_purchased,
    avatarUrl: row.avatar_url,
  };
}

export function mapInquiry(row: InquiryRow): Inquiry {
  return {
    id: row.id,
    fullName: row.full_name,
    phone: row.phone,
    email: row.email,
    projectInterest: row.project_interest,
    message: row.message,
    status: row.status,
    createdAt: new Date(row.created_at).toISOString(),
    notes: row.notes ?? undefined,
  };
}
