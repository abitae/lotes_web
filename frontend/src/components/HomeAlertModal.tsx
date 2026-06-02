/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useApp } from "../context/AppContext";
import { DEFAULT_HOME_ALERT } from "../config/siteDefaults";

const DISMISS_PREFIX = "lotes_home_alert_dismissed_";

function hasContent(alert: typeof DEFAULT_HOME_ALERT): boolean {
  return Boolean(
    alert.title?.trim() ||
      alert.description?.trim() ||
      alert.imageUrl?.trim() ||
      alert.videoUrl?.trim()
  );
}

export const HomeAlertModal: React.FC = () => {
  const { homeAlert } = useApp();
  const alert = homeAlert ?? DEFAULT_HOME_ALERT;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!alert.isEnabled || !hasContent(alert)) {
      setOpen(false);
      return;
    }
    const dismissKey = `${DISMISS_PREFIX}${alert.updatedAt}`;
    if (sessionStorage.getItem(dismissKey)) {
      setOpen(false);
      return;
    }
    setOpen(true);
  }, [alert.isEnabled, alert.title, alert.description, alert.imageUrl, alert.videoUrl, alert.updatedAt]);

  const dismiss = () => {
    sessionStorage.setItem(`${DISMISS_PREFIX}${alert.updatedAt}`, "1");
    setOpen(false);
  };

  if (!open) return null;

  const buttonHref = alert.buttonLink?.trim();
  const isExternal = buttonHref?.startsWith("http://") || buttonHref?.startsWith("https://");

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="home-alert-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-label="Cerrar aviso"
        onClick={dismiss}
      />

      <div className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[var(--card-bg)] rounded-2xl border border-[var(--border)] shadow-2xl">
        <button
          type="button"
          onClick={dismiss}
          className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4" />
        </button>

        {alert.videoUrl ? (
          <div className="relative w-full aspect-video bg-black overflow-hidden rounded-t-2xl">
            <video
              src={alert.videoUrl}
              className="w-full h-full object-contain"
              controls
              playsInline
              autoPlay
              muted
              loop
            />
          </div>
        ) : (
          alert.imageUrl && (
            <div className="relative w-full aspect-[16/10] sm:aspect-[2/1] bg-[var(--bg)] overflow-hidden rounded-t-2xl">
              <img
                src={alert.imageUrl}
                alt=""
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )
        )}

        <div className="p-6 sm:p-8 space-y-4 text-left">
          {alert.title && (
            <h2 id="home-alert-title" className="font-sans font-extrabold text-xl text-[var(--text-p)] pr-8">
              {alert.title}
            </h2>
          )}
          {alert.description && (
            <p className="text-[var(--text-s)] text-sm leading-relaxed font-light whitespace-pre-line">
              {alert.description}
            </p>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            {alert.buttonText && buttonHref && (
              isExternal ? (
                <a
                  href={buttonHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-[var(--accent)] hover:bg-[#008c4a] text-white font-sans font-semibold text-xs px-5 py-2.5 rounded-lg transition-colors"
                >
                  {alert.buttonText}
                </a>
              ) : (
                <Link
                  to={buttonHref.startsWith("/") ? buttonHref : `/${buttonHref}`}
                  onClick={dismiss}
                  className="inline-flex items-center justify-center bg-[var(--accent)] hover:bg-[#008c4a] text-white font-sans font-semibold text-xs px-5 py-2.5 rounded-lg transition-colors"
                >
                  {alert.buttonText}
                </Link>
              )
            )}
            <button
              type="button"
              onClick={dismiss}
              className="inline-flex items-center justify-center border border-[var(--border)] text-[var(--text-p)] font-sans font-medium text-xs px-5 py-2.5 rounded-lg hover:bg-[var(--bg)] transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
