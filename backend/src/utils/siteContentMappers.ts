import type {
  ContactFormConfig,
  ContactFormRow,
  CorporateChannel,
  CorporateChannelRow,
  FaqItem,
  FaqRow,
  GuaranteeItem,
  GuaranteeItemRow,
  GuaranteeSection,
  GuaranteeSectionRow,
  SiteSettings,
  SiteSettingsRow,
  ContactFormBullet,
} from "../types/index.js";

function parseBullets(bullets: string | ContactFormBullet[] | null): ContactFormBullet[] | null {
  if (!bullets) return null;
  if (Array.isArray(bullets)) return bullets;
  try {
    return JSON.parse(bullets) as ContactFormBullet[];
  } catch {
    return null;
  }
}

export function mapSiteSettings(row: SiteSettingsRow): SiteSettings {
  return {
    logoUrl: row.logo_url,
    faviconUrl: row.favicon_url,
    siteName: row.site_name,
    siteTagline: row.site_tagline,
    browserTitle: row.browser_title,
    footerTagline: row.footer_tagline,
    footerDescription: row.footer_description,
  };
}

export function mapGuaranteeSection(row: GuaranteeSectionRow): GuaranteeSection {
  return {
    eyebrow: row.eyebrow,
    heading: row.heading,
    description: row.description,
    backgroundImageUrl: row.background_image_url,
  };
}

export function mapGuaranteeItem(row: GuaranteeItemRow): GuaranteeItem {
  return {
    id: row.id,
    icon: row.icon,
    title: row.title,
    description: row.description,
    sortOrder: row.sort_order,
    isActive: Boolean(row.is_active),
  };
}

export function mapContactForm(row: ContactFormRow): ContactFormConfig {
  return {
    slug: row.slug,
    formTitle: row.form_title,
    formSubtitle: row.form_subtitle,
    submitLabel: row.submit_label,
    successTitle: row.success_title,
    successMessage: row.success_message,
    defaultMessage: row.default_message,
    defaultProjectInterest: row.default_project_interest,
    sectionEyebrow: row.section_eyebrow,
    sectionHeading: row.section_heading,
    sectionDescription: row.section_description,
    bullets: parseBullets(row.bullets),
  };
}

export function mapCorporateChannel(row: CorporateChannelRow): CorporateChannel {
  return {
    id: row.id,
    channelType: row.channel_type,
    label: row.label,
    value: row.value,
    extraInfo: row.extra_info,
    sortOrder: row.sort_order,
    isActive: Boolean(row.is_active),
  };
}

export function mapFaq(row: FaqRow): FaqItem {
  return {
    id: row.id,
    question: row.question,
    answer: row.answer,
    sortOrder: row.sort_order,
    isActive: Boolean(row.is_active),
  };
}
