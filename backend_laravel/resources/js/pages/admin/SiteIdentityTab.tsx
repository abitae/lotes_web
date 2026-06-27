/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { uploadFile } from "../../api/upload";
import { DEFAULT_SITE_SETTINGS } from "../../config/siteDefaults";
import { BrandLogo } from "../../components/BrandLogo";
import type { SiteSettings } from "../../types";
import { Save, Upload, Eye } from "lucide-react";

export const SiteIdentityTab: React.FC = () => {
  const { siteSettings, updateSiteSettings } = useApp();
  const s = siteSettings ?? DEFAULT_SITE_SETTINGS;

  const [siteName, setSiteName] = useState(s.siteName);
  const [siteTagline, setSiteTagline] = useState(s.siteTagline);
  const [browserTitle, setBrowserTitle] = useState(s.browserTitle);
  const [footerTagline, setFooterTagline] = useState(s.footerTagline);
  const [footerDescription, setFooterDescription] = useState(s.footerDescription);
  const [logoUrl, setLogoUrl] = useState(s.logoUrl ?? "");
  const [faviconUrl, setFaviconUrl] = useState(s.faviconUrl ?? "");
  const [saving, setSaving] = useState(false);

  React.useEffect(() => {
    setSiteName(s.siteName);
    setSiteTagline(s.siteTagline);
    setBrowserTitle(s.browserTitle);
    setFooterTagline(s.footerTagline);
    setFooterDescription(s.footerDescription);
    setLogoUrl(s.logoUrl ?? "");
    setFaviconUrl(s.faviconUrl ?? "");
  }, [s]);

  const previewSettings: SiteSettings = {
    logoUrl: logoUrl.trim() || null,
    faviconUrl: faviconUrl.trim() || null,
    siteName: siteName.trim(),
    siteTagline: siteTagline.trim(),
    browserTitle: browserTitle.trim() || DEFAULT_SITE_SETTINGS.browserTitle,
    footerTagline: footerTagline.trim(),
    footerDescription: footerDescription.trim(),
  };

  const handleUpload = async (file: File, target: "logo" | "favicon") => {
    try {
      const url = await uploadFile(file);
      if (target === "logo") setLogoUrl(url);
      else setFaviconUrl(url);
    } catch {
      alert("No se pudo subir la imagen.");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSiteSettings({
        siteName: siteName.trim(),
        siteTagline: siteTagline.trim(),
        browserTitle: browserTitle.trim(),
        footerTagline: footerTagline.trim(),
        footerDescription: footerDescription.trim(),
        logoUrl: logoUrl.trim() || null,
        faviconUrl: faviconUrl.trim() || null,
      });
    } catch {
      alert("No se pudo guardar la identidad del sitio.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="admin-card border p-6 rounded-xl space-y-6">
      <div>
        <h2 className="font-sans font-extrabold text-sm uppercase tracking-wider text-[var(--text-p)]">
          Identidad del sitio
        </h2>
        <p className="text-[10px] text-[var(--text-s)] mt-1 font-mono">
          Nombre y tagline del navbar son opcionales. Si están vacíos y hay logo, el logo ocupa todo el espacio de marca.
        </p>
      </div>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-4 space-y-2">
        <span className="text-[10px] font-mono uppercase text-[var(--text-s)] flex items-center gap-1">
          <Eye className="w-3 h-3" /> Vista previa navbar
        </span>
        <div className="rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-4 py-3">
          <BrandLogo settings={previewSettings} variant="navbar" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3 p-4 rounded-lg border border-[var(--border)] bg-[var(--bg)]/50">
          <label className="text-[10px] font-mono uppercase text-[var(--text-p)] font-bold">Logo principal</label>
          <input
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-p)]"
            placeholder="URL o subir archivo..."
          />
          <label className="inline-flex items-center gap-1.5 text-[10px] cursor-pointer text-[var(--accent-text)] font-semibold">
            <Upload className="w-3.5 h-3.5" />
            Subir logo
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "logo")} />
          </label>
          {logoUrl && (
            <div className="pt-2 border-t border-[var(--border)]">
              <img src={logoUrl} alt="Vista previa logo" className="h-12 w-auto max-w-full object-contain" />
            </div>
          )}
        </div>

        <div className="space-y-3 p-4 rounded-lg border border-[var(--border)] bg-[var(--bg)]/50">
          <label className="text-[10px] font-mono uppercase text-[var(--text-p)] font-bold">Favicon</label>
          <input
            value={faviconUrl}
            onChange={(e) => setFaviconUrl(e.target.value)}
            className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-p)]"
            placeholder="URL o subir archivo..."
          />
          <label className="inline-flex items-center gap-1.5 text-[10px] cursor-pointer text-[var(--accent-text)] font-semibold">
            <Upload className="w-3.5 h-3.5" />
            Subir favicon
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "favicon")} />
          </label>
          {faviconUrl && <img src={faviconUrl} alt="Vista previa favicon" className="h-8 w-8 object-contain" />}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] font-mono uppercase text-[var(--text-s)]">Nombre del sitio (opcional)</label>
          <input
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-p)] mt-1"
            placeholder="Ej. Lotes en Remate"
          />
        </div>
        <div>
          <label className="text-[10px] font-mono uppercase text-[var(--text-s)]">Tagline navbar (opcional)</label>
          <input
            value={siteTagline}
            onChange={(e) => setSiteTagline(e.target.value)}
            className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-p)] mt-1"
            placeholder="Ej. Inversión.pe"
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-[10px] font-mono uppercase text-[var(--text-s)]">Título del navegador</label>
          <input
            value={browserTitle}
            onChange={(e) => setBrowserTitle(e.target.value)}
            className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-p)] mt-1"
            required
          />
        </div>
        <div>
          <label className="text-[10px] font-mono uppercase text-[var(--text-s)]">Tagline footer (opcional)</label>
          <input
            value={footerTagline}
            onChange={(e) => setFooterTagline(e.target.value)}
            className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-p)] mt-1"
            placeholder="Ej. Inversión Segura"
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-[10px] font-mono uppercase text-[var(--text-s)]">Descripción footer</label>
          <textarea
            value={footerDescription}
            onChange={(e) => setFooterDescription(e.target.value)}
            rows={3}
            className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-p)] mt-1"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="inline-flex items-center gap-1.5 bg-[var(--accent)] hover:bg-[#007a40] text-white text-xs font-bold px-5 py-2.5 rounded uppercase transition-colors"
      >
        <Save className="w-3.5 h-3.5" />
        {saving ? "Guardando..." : "Guardar identidad"}
      </button>
    </form>
  );
};
