/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  Project,
  Banner,
  Testimonial,
  Inquiry,
  DashboardStats,
  SiteSettings,
  GuaranteesData,
  ContactFormConfig,
  CorporateChannel,
  FaqItem,
  GuaranteeItem,
  GuaranteeSection,
  AboutData,
  AboutPageContent,
  AboutValue,
  ExpertAdvisor,
  HomeAlertModal,
} from "../types";
import { api } from "../api";
import { getAuthToken, setAuthToken, setAdminEmail, getAdminEmail } from "../api/client";
import { env } from "../config/env";
import {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_GUARANTEES,
  DEFAULT_CONTACT_FORMS,
  DEFAULT_ABOUT,
  DEFAULT_HOME_ALERT,
} from "../config/siteDefaults";

const EMPTY_STATS: DashboardStats = {
  totalProjects: 0,
  totalLeads: 0,
  pendingLeads: 0,
  totalLotsSold: 0,
  monthlyLeadsTrend: [],
  projectTypeDistribution: [],
};

interface AppContextType {
  projects: Project[];
  banners: Banner[];
  testimonials: Testimonial[];
  inquiries: Inquiry[];
  stats: DashboardStats;
  siteSettings: SiteSettings | null;
  guarantees: GuaranteesData | null;
  contactForms: ContactFormConfig[];
  channels: CorporateChannel[];
  faqs: FaqItem[];
  about: AboutData | null;
  homeAlert: HomeAlertModal | null;
  loading: boolean;
  adminLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  adminEmail: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  addInquiry: (inquiry: Omit<Inquiry, "id" | "status" | "createdAt">) => Promise<void>;
  updateInquiryStatus: (id: string, status: Inquiry["status"], notes?: string) => Promise<void>;
  deleteInquiry: (id: string) => Promise<void>;
  updateBanner: (id: string, banner: Partial<Banner>) => Promise<void>;
  addBanner: (banner: Omit<Banner, "id">) => Promise<void>;
  deleteBanner: (id: string) => Promise<void>;
  addTestimonial: (testimonial: Omit<Testimonial, "id">) => Promise<void>;
  editTestimonial: (id: string, testimonial: Partial<Testimonial>) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
  updateSiteSettings: (data: Partial<SiteSettings>) => Promise<void>;
  updateGuaranteeSection: (data: Partial<GuaranteeSection>) => Promise<void>;
  addGuaranteeItem: (item: Omit<GuaranteeItem, "id">) => Promise<void>;
  updateGuaranteeItem: (id: string, data: Partial<GuaranteeItem>) => Promise<void>;
  deleteGuaranteeItem: (id: string) => Promise<void>;
  updateContactForm: (slug: string, data: Partial<ContactFormConfig>) => Promise<void>;
  addChannel: (channel: Omit<CorporateChannel, "id">) => Promise<void>;
  updateChannel: (id: string, data: Partial<CorporateChannel>) => Promise<void>;
  deleteChannel: (id: string) => Promise<void>;
  addFaq: (faq: Omit<FaqItem, "id">) => Promise<void>;
  updateFaq: (id: string, data: Partial<FaqItem>) => Promise<void>;
  deleteFaq: (id: string) => Promise<void>;
  updateAboutPage: (data: Partial<AboutPageContent>) => Promise<void>;
  addAboutValue: (value: Omit<AboutValue, "id">) => Promise<void>;
  updateAboutValue: (id: string, data: Partial<AboutValue>) => Promise<void>;
  deleteAboutValue: (id: string) => Promise<void>;
  addExpertAdvisor: (advisor: Omit<ExpertAdvisor, "id">) => Promise<void>;
  updateExpertAdvisor: (id: string, data: Partial<ExpertAdvisor>) => Promise<void>;
  deleteExpertAdvisor: (id: string) => Promise<void>;
  updateHomeAlert: (data: Partial<HomeAlertModal>) => Promise<void>;
  getStats: () => DashboardStats;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem(env.themeStorageKey);
    return saved === "dark" ? "dark" : "light";
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [stats, setStats] = useState<DashboardStats>(EMPTY_STATS);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [guarantees, setGuarantees] = useState<GuaranteesData | null>(null);
  const [contactForms, setContactForms] = useState<ContactFormConfig[]>(DEFAULT_CONTACT_FORMS);
  const [channels, setChannels] = useState<CorporateChannel[]>([]);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [about, setAbout] = useState<AboutData | null>(null);
  const [homeAlert, setHomeAlert] = useState<HomeAlertModal | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminLoading, setAdminLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!getAuthToken());
  const [adminEmail, setAdminEmailState] = useState<string | null>(() => getAdminEmail());

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  useEffect(() => {
    localStorage.setItem(env.themeStorageKey, theme);
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  const clearError = () => setError(null);

  const refreshStats = useCallback(async () => {
    if (!getAuthToken()) return;
    const data = await api.getStats();
    setStats(data);
  }, []);

  const loadPublicData = useCallback(async () => {
    // Proyectos primero (más lento: consulta catálogo externo)
    try {
      const projectList = await api.getProjects();
      if (Array.isArray(projectList)) {
        setProjects(projectList);
      } else {
        setProjects([]);
        setError("El catálogo de proyectos devolvió un formato inesperado");
      }
    } catch (err) {
      setProjects([]);
      const message =
        err instanceof Error ? err.message : "No se pudo cargar el catálogo de proyectos";
      setError(message);
    }

    const results = await Promise.allSettled([
      api.getBanners(),
      api.getTestimonials(),
      api.getSiteSettings(),
      api.getGuarantees(),
      api.getContactForms(),
      api.getChannels(),
      api.getFaqs(),
      api.getAbout(),
      api.getHomeAlert(),
    ]);

    if (results[0].status === "fulfilled") setBanners(results[0].value);
    if (results[1].status === "fulfilled") setTestimonials(results[1].value);
    if (results[2].status === "fulfilled") setSiteSettings(results[2].value);
    if (results[3].status === "fulfilled") setGuarantees(results[3].value);
    if (results[4].status === "fulfilled") setContactForms(results[4].value);
    if (results[5].status === "fulfilled") setChannels(results[5].value);
    if (results[6].status === "fulfilled") setFaqs(results[6].value);
    if (results[7].status === "fulfilled") setAbout(results[7].value);
    if (results[8].status === "fulfilled") setHomeAlert(results[8].value);
  }, []);

  const loadAdminData = useCallback(async () => {
    setAdminLoading(true);
    try {
      const [inquiriesData, statsData] = await Promise.all([api.getInquiries(), api.getStats()]);
      setInquiries(inquiriesData);
      setStats(statsData);
    } finally {
      setAdminLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        await loadPublicData();
        if (getAuthToken()) {
          try {
            const me = await api.me();
            if (!cancelled) {
              setIsAuthenticated(true);
              setAdminEmailState(me.email);
              setAdminEmail(me.email);
            }
            await loadAdminData();
          } catch {
            setAuthToken(null);
            setAdminEmail(null);
            if (!cancelled) {
              setIsAuthenticated(false);
              setAdminEmailState(null);
            }
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Error al cargar datos");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [loadPublicData, loadAdminData]);

  const login = async (email: string, password: string) => {
    const { token, email: loggedEmail } = await api.login(email, password);
    setAuthToken(token);
    setAdminEmail(loggedEmail);
    setIsAuthenticated(true);
    setAdminEmailState(loggedEmail);
    await loadAdminData();
  };

  const logout = () => {
    setAuthToken(null);
    setAdminEmail(null);
    setIsAuthenticated(false);
    setAdminEmailState(null);
    setInquiries([]);
    setStats(EMPTY_STATS);
  };

  const addInquiry = async (fields: Omit<Inquiry, "id" | "status" | "createdAt">) => {
    try {
      const created = await api.createInquiry(fields);
      if (isAuthenticated) {
        setInquiries((prev) => [created, ...prev]);
        await refreshStats();
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al enviar consulta";
      setError(message);
      throw err;
    }
  };

  const updateInquiryStatus = async (id: string, status: Inquiry["status"], notes?: string) => {
    const updated = await api.updateInquiry(id, { status, ...(notes !== undefined ? { notes } : {}) });
    setInquiries((prev) => prev.map((i) => (i.id === id ? updated : i)));
    await refreshStats();
  };

  const deleteInquiry = async (id: string) => {
    await api.deleteInquiry(id);
    setInquiries((prev) => prev.filter((i) => i.id !== id));
    await refreshStats();
  };

  const updateBanner = async (id: string, updatedFields: Partial<Banner>) => {
    const updated = await api.updateBanner(id, updatedFields);
    setBanners((prev) => prev.map((b) => (b.id === id ? updated : b)));
  };

  const addBanner = async (fields: Omit<Banner, "id">) => {
    const created = await api.createBanner(fields);
    setBanners((prev) => [...prev, created]);
  };

  const deleteBanner = async (id: string) => {
    await api.deleteBanner(id);
    setBanners((prev) => prev.filter((b) => b.id !== id));
  };

  const addTestimonial = async (fields: Omit<Testimonial, "id">) => {
    const created = await api.createTestimonial(fields);
    setTestimonials((prev) => [created, ...prev]);
  };

  const editTestimonial = async (id: string, updatedFields: Partial<Testimonial>) => {
    const updated = await api.updateTestimonial(id, updatedFields);
    setTestimonials((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const deleteTestimonial = async (id: string) => {
    await api.deleteTestimonial(id);
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  const updateSiteSettings = async (data: Partial<SiteSettings>) => {
    const updated = await api.updateSiteSettings(data);
    setSiteSettings(updated);
  };

  const updateGuaranteeSection = async (data: Partial<GuaranteeSection>) => {
    const updated = await api.updateGuaranteeSection(data);
    setGuarantees((prev) => ({
      section: updated,
      items: prev?.items ?? DEFAULT_GUARANTEES.items,
    }));
  };

  const addGuaranteeItem = async (item: Omit<GuaranteeItem, "id">) => {
    const created = await api.createGuaranteeItem(item);
    setGuarantees((prev) => ({
      section: prev?.section ?? DEFAULT_GUARANTEES.section,
      items: [...(prev?.items ?? []), created],
    }));
  };

  const updateGuaranteeItem = async (id: string, data: Partial<GuaranteeItem>) => {
    const updated = await api.updateGuaranteeItem(id, data);
    setGuarantees((prev) => ({
      section: prev?.section ?? DEFAULT_GUARANTEES.section,
      items: (prev?.items ?? []).map((i) => (i.id === id ? updated : i)),
    }));
  };

  const deleteGuaranteeItem = async (id: string) => {
    await api.deleteGuaranteeItem(id);
    setGuarantees((prev) => ({
      section: prev?.section ?? DEFAULT_GUARANTEES.section,
      items: (prev?.items ?? []).filter((i) => i.id !== id),
    }));
  };

  const updateContactForm = async (slug: string, data: Partial<ContactFormConfig>) => {
    const updated = await api.updateContactForm(slug, data);
    setContactForms((prev) => prev.map((f) => (f.slug === slug ? updated : f)));
  };

  const addChannel = async (channel: Omit<CorporateChannel, "id">) => {
    const created = await api.createChannel(channel);
    setChannels((prev) => [...prev, created]);
  };

  const updateChannel = async (id: string, data: Partial<CorporateChannel>) => {
    const updated = await api.updateChannel(id, data);
    setChannels((prev) => prev.map((c) => (c.id === id ? updated : c)));
  };

  const deleteChannel = async (id: string) => {
    await api.deleteChannel(id);
    setChannels((prev) => prev.filter((c) => c.id !== id));
  };

  const addFaq = async (faq: Omit<FaqItem, "id">) => {
    const created = await api.createFaq(faq);
    setFaqs((prev) => [...prev, created]);
  };

  const updateFaq = async (id: string, data: Partial<FaqItem>) => {
    const updated = await api.updateFaq(id, data);
    setFaqs((prev) => prev.map((f) => (f.id === id ? updated : f)));
  };

  const deleteFaq = async (id: string) => {
    await api.deleteFaq(id);
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  const updateAboutPage = async (data: Partial<AboutPageContent>) => {
    const updated = await api.updateAboutPage(data);
    setAbout((prev) => ({
      page: updated,
      values: prev?.values ?? DEFAULT_ABOUT.values,
      advisors: prev?.advisors ?? DEFAULT_ABOUT.advisors,
    }));
  };

  const addAboutValue = async (value: Omit<AboutValue, "id">) => {
    const created = await api.createAboutValue(value);
    setAbout((prev) => ({
      page: prev?.page ?? DEFAULT_ABOUT.page,
      values: [...(prev?.values ?? []), created],
      advisors: prev?.advisors ?? DEFAULT_ABOUT.advisors,
    }));
  };

  const updateAboutValue = async (id: string, data: Partial<AboutValue>) => {
    const updated = await api.updateAboutValue(id, data);
    setAbout((prev) => ({
      page: prev?.page ?? DEFAULT_ABOUT.page,
      values: (prev?.values ?? []).map((v) => (v.id === id ? updated : v)),
      advisors: prev?.advisors ?? DEFAULT_ABOUT.advisors,
    }));
  };

  const deleteAboutValue = async (id: string) => {
    await api.deleteAboutValue(id);
    setAbout((prev) => ({
      page: prev?.page ?? DEFAULT_ABOUT.page,
      values: (prev?.values ?? []).filter((v) => v.id !== id),
      advisors: prev?.advisors ?? DEFAULT_ABOUT.advisors,
    }));
  };

  const addExpertAdvisor = async (advisor: Omit<ExpertAdvisor, "id">) => {
    const created = await api.createExpertAdvisor(advisor);
    setAbout((prev) => ({
      page: prev?.page ?? DEFAULT_ABOUT.page,
      values: prev?.values ?? DEFAULT_ABOUT.values,
      advisors: [...(prev?.advisors ?? []), created],
    }));
  };

  const updateExpertAdvisor = async (id: string, data: Partial<ExpertAdvisor>) => {
    const updated = await api.updateExpertAdvisor(id, data);
    setAbout((prev) => ({
      page: prev?.page ?? DEFAULT_ABOUT.page,
      values: prev?.values ?? DEFAULT_ABOUT.values,
      advisors: (prev?.advisors ?? []).map((a) => (a.id === id ? updated : a)),
    }));
  };

  const deleteExpertAdvisor = async (id: string) => {
    await api.deleteExpertAdvisor(id);
    setAbout((prev) => ({
      page: prev?.page ?? DEFAULT_ABOUT.page,
      values: prev?.values ?? DEFAULT_ABOUT.values,
      advisors: (prev?.advisors ?? []).filter((a) => a.id !== id),
    }));
  };

  const updateHomeAlert = async (data: Partial<HomeAlertModal>) => {
    const updated = await api.updateHomeAlert(data);
    setHomeAlert(updated);
  };

  const getStats = () => stats;

  return (
    <AppContext.Provider
      value={{
        projects,
        banners,
        testimonials,
        inquiries,
        stats,
        siteSettings,
        guarantees,
        contactForms,
        channels,
        faqs,
        about,
        homeAlert,
        loading,
        adminLoading,
        error,
        isAuthenticated,
        adminEmail,
        login,
        logout,
        clearError,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        updateBanner,
        addBanner,
        deleteBanner,
        addTestimonial,
        editTestimonial,
        deleteTestimonial,
        updateSiteSettings,
        updateGuaranteeSection,
        addGuaranteeItem,
        updateGuaranteeItem,
        deleteGuaranteeItem,
        updateContactForm,
        addChannel,
        updateChannel,
        deleteChannel,
        addFaq,
        updateFaq,
        deleteFaq,
        updateAboutPage,
        addAboutValue,
        updateAboutValue,
        deleteAboutValue,
        addExpertAdvisor,
        updateExpertAdvisor,
        deleteExpertAdvisor,
        updateHomeAlert,
        getStats,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
