/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";

// Public Pages
import { Home } from "./pages/public/Home";
import { Catalog } from "./pages/public/Catalog";
import { ProjectDetail } from "./pages/public/ProjectDetail";
import { Nosotros } from "./pages/public/Nosotros";
import { Contacto } from "./pages/public/Contacto";

// Admin Pages
import { DashboardOverview } from "./pages/admin/DashboardOverview";
import { MultimediaManagement } from "./pages/admin/MultimediaManagement";
import { ContactFormsManagement } from "./pages/admin/ContactFormsManagement";
import { CorporateChannelsManagement } from "./pages/admin/CorporateChannelsManagement";
import { FaqManagement } from "./pages/admin/FaqManagement";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { SiteHead } from "./components/SiteHead";

// Layout components
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { AdminSidebar } from "./components/layout/AdminSidebar";
import { AdminRoute } from "./components/auth/AdminRoute";
import { Loader2, LogOut, Sun, Moon } from "lucide-react";

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading, error } = useApp();

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg)] text-[var(--text-p)] font-sans transition-colors duration-200">
      <Navbar />
      {error && (
        <div className="bg-red-500/10 border-b border-red-500/20 text-red-600 text-center text-sm py-2 px-4">
          {error}
        </div>
      )}
      <main className="flex-grow pt-14">
        {loading ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--accent)]" />
          </div>
        ) : (
          children
        )}
      </main>
      <Footer />
    </div>
  );
};

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { adminEmail, logout, theme, toggleTheme } = useApp();

  return (
    <div className="flex bg-[var(--bg)] text-[var(--text-p)] min-h-screen font-sans transition-colors duration-200">
      <AdminSidebar />
      <div className="flex-grow flex flex-col min-h-screen overflow-x-hidden">
        <header className="bg-[var(--card-bg)] border-b border-[var(--border)] py-2.5 px-6 md:px-8 flex justify-between items-center z-10 sticky top-0 transition-colors duration-200">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="font-mono text-[10px] text-[var(--text-s)] uppercase tracking-widest font-semibold">
              Sistema de Adjudicaciones Conectado
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block font-mono text-[9px] text-[var(--text-s)] bg-[var(--bg)] px-2 py-0.5 rounded border border-[var(--border)]">
              SECURE CONSOLE • API
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--text-p)] hover:bg-[var(--border)] transition-all cursor-pointer active:scale-95"
              title={theme === "light" ? "Modo oscuro" : "Modo claro"}
              aria-label={theme === "light" ? "Activar modo oscuro" : "Activar modo claro"}
            >
              {theme === "light" ? (
                <Moon className="w-3.5 h-3.5 text-[var(--text-s)]" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-500" />
              )}
            </button>
            <div className="flex items-center gap-3">
              <span className="text-xs font-sans font-medium text-[var(--text-p)] hidden sm:inline">
                {adminEmail || "Admin"}
              </span>
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-s)] hover:text-[var(--accent)] border border-[var(--border)] hover:border-[var(--accent)] px-2 py-1 rounded transition-colors"
              >
                <LogOut className="w-3 h-3" />
                Salir
              </button>
            </div>
          </div>
        </header>

        <main className="flex-grow bg-[var(--bg)] overflow-y-auto transition-colors duration-200">{children}</main>
      </div>
    </div>
  );
};

const ProtectedAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AdminRoute>
    <AdminLayout>{children}</AdminLayout>
  </AdminRoute>
);

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <SiteHead />
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <PublicLayout>
                <Home />
              </PublicLayout>
            }
          />
          <Route
            path="/catalog"
            element={
              <PublicLayout>
                <Catalog />
              </PublicLayout>
            }
          />
          <Route
            path="/catalog/:id"
            element={
              <PublicLayout>
                <ProjectDetail />
              </PublicLayout>
            }
          />
          <Route
            path="/about"
            element={
              <PublicLayout>
                <Nosotros />
              </PublicLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <PublicLayout>
                <Contacto />
              </PublicLayout>
            }
          />

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <ProtectedAdmin>
                <DashboardOverview />
              </ProtectedAdmin>
            }
          />
          <Route
            path="/admin/multimedia"
            element={
              <ProtectedAdmin>
                <MultimediaManagement />
              </ProtectedAdmin>
            }
          />
          <Route
            path="/admin/forms"
            element={
              <ProtectedAdmin>
                <ContactFormsManagement />
              </ProtectedAdmin>
            }
          />
          <Route
            path="/admin/channels"
            element={
              <ProtectedAdmin>
                <CorporateChannelsManagement />
              </ProtectedAdmin>
            }
          />
          <Route
            path="/admin/faq"
            element={
              <ProtectedAdmin>
                <FaqManagement />
              </ProtectedAdmin>
            }
          />

          <Route
            path="*"
            element={
              <PublicLayout>
                <Home />
              </PublicLayout>
            }
          />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}
