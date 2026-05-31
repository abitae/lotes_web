/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Project, Banner, Testimonial, Inquiry, DashboardStats } from "../types";
import { api } from "../api";
import { getAuthToken, setAuthToken, setAdminEmail, getAdminEmail } from "../api/client";
import { env } from "../config/env";

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
  loading: boolean;
  adminLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  adminEmail: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  addProject: (project: Omit<Project, "id">) => Promise<void>;
  editProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addInquiry: (inquiry: Omit<Inquiry, "id" | "status" | "createdAt">) => Promise<void>;
  updateInquiryStatus: (id: string, status: Inquiry["status"], notes?: string) => Promise<void>;
  deleteInquiry: (id: string) => Promise<void>;
  updateBanner: (id: string, banner: Partial<Banner>) => Promise<void>;
  addBanner: (banner: Omit<Banner, "id">) => Promise<void>;
  deleteBanner: (id: string) => Promise<void>;
  addTestimonial: (testimonial: Omit<Testimonial, "id">) => Promise<void>;
  editTestimonial: (id: string, testimonial: Partial<Testimonial>) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
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
  const [loading, setLoading] = useState(true);
  const [adminLoading, setAdminLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!getAuthToken());
  const [adminEmail, setAdminEmailState] = useState<string | null>(() => getAdminEmail());

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    localStorage.setItem(env.themeStorageKey, theme);
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const clearError = () => setError(null);

  const refreshStats = useCallback(async () => {
    if (!getAuthToken()) return;
    const data = await api.getStats();
    setStats(data);
  }, []);

  const loadPublicData = useCallback(async () => {
    const [projectsData, bannersData, testimonialsData] = await Promise.all([
      api.getProjects(),
      api.getBanners(),
      api.getTestimonials(),
    ]);
    setProjects(projectsData);
    setBanners(bannersData);
    setTestimonials(testimonialsData);
  }, []);

  const loadAdminData = useCallback(async () => {
    setAdminLoading(true);
    try {
      const [inquiriesData, statsData] = await Promise.all([
        api.getInquiries(),
        api.getStats(),
      ]);
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

  const addProject = async (fields: Omit<Project, "id">) => {
    const created = await api.createProject(fields);
    setProjects((prev) => [created, ...prev]);
    await refreshStats();
  };

  const editProject = async (id: string, updatedFields: Partial<Project>) => {
    const updated = await api.updateProject(id, updatedFields);
    setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
    await refreshStats();
  };

  const deleteProject = async (id: string) => {
    await api.deleteProject(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    await refreshStats();
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

  const getStats = () => stats;

  return (
    <AppContext.Provider
      value={{
        projects,
        banners,
        testimonials,
        inquiries,
        stats,
        loading,
        adminLoading,
        error,
        isAuthenticated,
        adminEmail,
        login,
        logout,
        clearError,
        addProject,
        editProject,
        deleteProject,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        updateBanner,
        addBanner,
        deleteBanner,
        addTestimonial,
        editTestimonial,
        deleteTestimonial,
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
