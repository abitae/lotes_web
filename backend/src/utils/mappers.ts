import type { Banner, BannerRow, Inquiry, InquiryRow, Testimonial, TestimonialRow } from "../types/index.js";

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
