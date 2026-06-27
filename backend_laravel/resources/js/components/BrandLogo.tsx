/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Landmark } from "lucide-react";
import type { SiteSettings } from "../types";

type BrandVariant = "navbar" | "footer";

interface BrandLogoProps {
  settings: SiteSettings;
  variant?: BrandVariant;
  className?: string;
}

export function BrandLogo({ settings, variant = "navbar", className = "" }: BrandLogoProps) {
  const siteName = settings.siteName?.trim() ?? "";
  const tagline =
    variant === "navbar"
      ? settings.siteTagline?.trim() ?? ""
      : settings.footerTagline?.trim() ?? "";
  const hasText = Boolean(siteName || tagline);
  const hasLogo = Boolean(settings.logoUrl?.trim());
  const altText = siteName || settings.browserTitle || "Inicio";

  const logoOnlyClasses =
    variant === "navbar"
      ? "h-10 sm:h-11 w-auto max-w-[min(280px,100%)] object-contain object-left"
      : "h-11 w-auto max-w-[min(260px,100%)] object-contain object-left";

  const logoWithTextClasses =
    variant === "navbar"
      ? "h-8 w-auto max-w-[140px] object-contain shrink-0"
      : "h-8 w-auto max-w-[140px] object-contain shrink-0";

  if (hasLogo && !hasText) {
    return (
      <div className={`flex items-center min-w-0 ${className}`}>
        <img src={settings.logoUrl!} alt={altText} className={logoOnlyClasses} />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 min-w-0 ${className}`}>
      {hasLogo ? (
        <img
          src={settings.logoUrl!}
          alt={siteName ? "" : altText}
          aria-hidden={Boolean(siteName)}
          className={logoWithTextClasses}
        />
      ) : (
        <div
          className={`shrink-0 flex items-center justify-center rounded border border-[var(--border)] bg-[var(--card-bg)] ${
            variant === "navbar" ? "p-1.5" : "p-1.5 bg-[#18181b] border-[#27272a]"
          }`}
        >
          <Landmark className={`text-[var(--accent)] ${variant === "navbar" ? "w-4 h-4" : "w-4 h-4"}`} />
        </div>
      )}

      {hasText && (
        <div className="flex flex-col min-w-0 leading-tight">
          {siteName && (
            <span
              className={`font-sans font-extrabold tracking-wide uppercase truncate ${
                variant === "navbar"
                  ? "text-sm text-[var(--text-p)]"
                  : "text-sm text-[#fafafa]"
              }`}
            >
              {siteName}
            </span>
          )}
          {tagline && (
            <span
              className={`font-mono tracking-widest uppercase font-semibold truncate ${
                variant === "navbar"
                  ? "text-[9px] text-[var(--accent-text)] mt-0.5"
                  : "text-[8px] text-[var(--accent)] mt-0.5"
              }`}
            >
              {tagline}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
