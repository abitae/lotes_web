import type {
  AboutPage,
  AboutPageRow,
  AboutValue,
  AboutValueRow,
  ContactFormConfig,
  ContactFormRow,
  CorporateChannel,
  CorporateChannelRow,
  ExpertAdvisor,
  ExpertAdvisorRow,
  HomeAlertModal,
  HomeAlertModalRow,
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

export function mapAboutPage(row: AboutPageRow): AboutPage {
  return {
    heroEyebrow: row.hero_eyebrow,
    heroHeading: row.hero_heading,
    heroDescription: row.hero_description,
    heroBackgroundImageUrl: row.hero_background_image_url,
    missionHeading: row.mission_heading,
    missionDescription: row.mission_description,
    visionHeading: row.vision_heading,
    visionDescription: row.vision_description,
    valuesEyebrow: row.values_eyebrow,
    valuesHeading: row.values_heading,
    valuesDescription: row.values_description,
    advisorsEyebrow: row.advisors_eyebrow,
    advisorsHeading: row.advisors_heading,
    advisorsDescription: row.advisors_description,
  };
}

export function mapAboutValue(row: AboutValueRow): AboutValue {
  return {
    id: row.id,
    icon: row.icon,
    title: row.title,
    description: row.description,
    sortOrder: row.sort_order,
    isActive: Boolean(row.is_active),
  };
}

export function mapExpertAdvisor(row: ExpertAdvisorRow): ExpertAdvisor {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    bio: row.bio,
    imageUrl: row.image_url,
    sortOrder: row.sort_order,
    isActive: Boolean(row.is_active),
  };
}

export function mapHomeAlertModal(row: HomeAlertModalRow): HomeAlertModal {
  return {
    isEnabled: Boolean(row.is_enabled),
    title: row.title,
    description: row.description,
    imageUrl: row.image_url,
    videoUrl: row.video_url,
    buttonText: row.button_text,
    buttonLink: row.button_link,
    updatedAt: row.updated_at instanceof Date ? row.updated_at.toISOString() : String(row.updated_at),
  };
}
