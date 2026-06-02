import { apiRequest } from "./client";
import type {
  AboutData,
  AboutPageContent,
  AboutValue,
  Banner,
  ContactFormConfig,
  CorporateChannel,
  DashboardStats,
  ExpertAdvisor,
  FaqItem,
  GuaranteeItem,
  GuaranteeSection,
  GuaranteesData,
  HomeAlertModal,
  Inquiry,
  Project,
  SiteSettings,
  Testimonial,
} from "../types";

export const api = {
  health: () =>
    apiRequest<{ ok: boolean; timestamp: string }>("/health?format=json"),

  login: (email: string, password: string) =>
    apiRequest<{ token: string; email: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  me: () => apiRequest<{ email: string }>("/auth/me", { auth: true }),

  getProjects: () => apiRequest<Project[]>("/projects"),
  getProject: (id: string) => apiRequest<Project>(`/projects/${id}`),

  getBanners: () => apiRequest<Banner[]>("/banners"),
  createBanner: (data: Omit<Banner, "id">) =>
    apiRequest<Banner>("/banners", { method: "POST", auth: true, body: JSON.stringify(data) }),
  updateBanner: (id: string, data: Partial<Banner>) =>
    apiRequest<Banner>(`/banners/${id}`, { method: "PUT", auth: true, body: JSON.stringify(data) }),
  deleteBanner: (id: string) =>
    apiRequest<void>(`/banners/${id}`, { method: "DELETE", auth: true }),

  getTestimonials: () => apiRequest<Testimonial[]>("/testimonials"),
  createTestimonial: (data: Omit<Testimonial, "id">) =>
    apiRequest<Testimonial>("/testimonials", { method: "POST", auth: true, body: JSON.stringify(data) }),
  updateTestimonial: (id: string, data: Partial<Testimonial>) =>
    apiRequest<Testimonial>(`/testimonials/${id}`, { method: "PUT", auth: true, body: JSON.stringify(data) }),
  deleteTestimonial: (id: string) =>
    apiRequest<void>(`/testimonials/${id}`, { method: "DELETE", auth: true }),

  getInquiries: () => apiRequest<Inquiry[]>("/inquiries", { auth: true }),
  createInquiry: (data: Omit<Inquiry, "id" | "status" | "createdAt">) =>
    apiRequest<Inquiry>("/inquiries", { method: "POST", body: JSON.stringify(data) }),
  updateInquiry: (id: string, data: { status?: Inquiry["status"]; notes?: string }) =>
    apiRequest<Inquiry>(`/inquiries/${id}`, { method: "PATCH", auth: true, body: JSON.stringify(data) }),
  deleteInquiry: (id: string) =>
    apiRequest<void>(`/inquiries/${id}`, { method: "DELETE", auth: true }),

  getStats: () => apiRequest<DashboardStats>("/stats", { auth: true }),

  getSiteSettings: () => apiRequest<SiteSettings>("/site-settings"),
  updateSiteSettings: (data: Partial<SiteSettings>) =>
    apiRequest<SiteSettings>("/site-settings", { method: "PUT", auth: true, body: JSON.stringify(data) }),

  getGuarantees: () => apiRequest<GuaranteesData>("/guarantees"),
  updateGuaranteeSection: (data: Partial<GuaranteeSection>) =>
    apiRequest<GuaranteeSection>("/guarantees/section", { method: "PUT", auth: true, body: JSON.stringify(data) }),
  createGuaranteeItem: (data: Omit<GuaranteeItem, "id">) =>
    apiRequest<GuaranteeItem>("/guarantees/items", { method: "POST", auth: true, body: JSON.stringify(data) }),
  updateGuaranteeItem: (id: string, data: Partial<GuaranteeItem>) =>
    apiRequest<GuaranteeItem>(`/guarantees/items/${id}`, { method: "PUT", auth: true, body: JSON.stringify(data) }),
  deleteGuaranteeItem: (id: string) =>
    apiRequest<void>(`/guarantees/items/${id}`, { method: "DELETE", auth: true }),

  getContactForms: () => apiRequest<ContactFormConfig[]>("/contact-forms"),
  updateContactForm: (slug: string, data: Partial<ContactFormConfig>) =>
    apiRequest<ContactFormConfig>(`/contact-forms/${slug}`, { method: "PUT", auth: true, body: JSON.stringify(data) }),

  getChannels: () => apiRequest<CorporateChannel[]>("/channels"),
  createChannel: (data: Omit<CorporateChannel, "id">) =>
    apiRequest<CorporateChannel>("/channels", { method: "POST", auth: true, body: JSON.stringify(data) }),
  updateChannel: (id: string, data: Partial<CorporateChannel>) =>
    apiRequest<CorporateChannel>(`/channels/${id}`, { method: "PUT", auth: true, body: JSON.stringify(data) }),
  deleteChannel: (id: string) =>
    apiRequest<void>(`/channels/${id}`, { method: "DELETE", auth: true }),

  getFaqs: () => apiRequest<FaqItem[]>("/faqs"),
  createFaq: (data: Omit<FaqItem, "id">) =>
    apiRequest<FaqItem>("/faqs", { method: "POST", auth: true, body: JSON.stringify(data) }),
  updateFaq: (id: string, data: Partial<FaqItem>) =>
    apiRequest<FaqItem>(`/faqs/${id}`, { method: "PUT", auth: true, body: JSON.stringify(data) }),
  deleteFaq: (id: string) =>
    apiRequest<void>(`/faqs/${id}`, { method: "DELETE", auth: true }),

  getAbout: () => apiRequest<AboutData>("/about"),
  updateAboutPage: (data: Partial<AboutPageContent>) =>
    apiRequest<AboutPageContent>("/about/page", { method: "PUT", auth: true, body: JSON.stringify(data) }),
  createAboutValue: (data: Omit<AboutValue, "id">) =>
    apiRequest<AboutValue>("/about/values", { method: "POST", auth: true, body: JSON.stringify(data) }),
  updateAboutValue: (id: string, data: Partial<AboutValue>) =>
    apiRequest<AboutValue>(`/about/values/${id}`, { method: "PUT", auth: true, body: JSON.stringify(data) }),
  deleteAboutValue: (id: string) =>
    apiRequest<void>(`/about/values/${id}`, { method: "DELETE", auth: true }),
  createExpertAdvisor: (data: Omit<ExpertAdvisor, "id">) =>
    apiRequest<ExpertAdvisor>("/about/advisors", { method: "POST", auth: true, body: JSON.stringify(data) }),
  updateExpertAdvisor: (id: string, data: Partial<ExpertAdvisor>) =>
    apiRequest<ExpertAdvisor>(`/about/advisors/${id}`, { method: "PUT", auth: true, body: JSON.stringify(data) }),
  deleteExpertAdvisor: (id: string) =>
    apiRequest<void>(`/about/advisors/${id}`, { method: "DELETE", auth: true }),

  getHomeAlert: () => apiRequest<HomeAlertModal>("/home-alert"),
  updateHomeAlert: (data: Partial<HomeAlertModal>) =>
    apiRequest<HomeAlertModal>("/home-alert", { method: "PUT", auth: true, body: JSON.stringify(data) }),
};
