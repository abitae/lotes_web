import { apiRequest } from "./client";
import type { Banner, DashboardStats, Inquiry, Project, Testimonial } from "../types";

export const api = {
  health: () => apiRequest<{ ok: boolean }>("/health"),

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
    apiRequest<Banner>("/banners", {
      method: "POST",
      auth: true,
      body: JSON.stringify(data),
    }),

  updateBanner: (id: string, data: Partial<Banner>) =>
    apiRequest<Banner>(`/banners/${id}`, {
      method: "PUT",
      auth: true,
      body: JSON.stringify(data),
    }),

  deleteBanner: (id: string) =>
    apiRequest<void>(`/banners/${id}`, { method: "DELETE", auth: true }),

  getTestimonials: () => apiRequest<Testimonial[]>("/testimonials"),

  createTestimonial: (data: Omit<Testimonial, "id">) =>
    apiRequest<Testimonial>("/testimonials", {
      method: "POST",
      auth: true,
      body: JSON.stringify(data),
    }),

  updateTestimonial: (id: string, data: Partial<Testimonial>) =>
    apiRequest<Testimonial>(`/testimonials/${id}`, {
      method: "PUT",
      auth: true,
      body: JSON.stringify(data),
    }),

  deleteTestimonial: (id: string) =>
    apiRequest<void>(`/testimonials/${id}`, { method: "DELETE", auth: true }),

  getInquiries: () => apiRequest<Inquiry[]>("/inquiries", { auth: true }),

  createInquiry: (data: Omit<Inquiry, "id" | "status" | "createdAt">) =>
    apiRequest<Inquiry>("/inquiries", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateInquiry: (id: string, data: { status?: Inquiry["status"]; notes?: string }) =>
    apiRequest<Inquiry>(`/inquiries/${id}`, {
      method: "PATCH",
      auth: true,
      body: JSON.stringify(data),
    }),

  deleteInquiry: (id: string) =>
    apiRequest<void>(`/inquiries/${id}`, { method: "DELETE", auth: true }),

  getStats: () => apiRequest<DashboardStats>("/stats", { auth: true }),
};
