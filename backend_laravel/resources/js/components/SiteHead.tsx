/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { useApp } from "../context/AppContext";
import { DEFAULT_SITE_SETTINGS } from "../config/siteDefaults";

export const SiteHead: React.FC = () => {
  const { siteSettings } = useApp();
  const settings = siteSettings ?? DEFAULT_SITE_SETTINGS;

  useEffect(() => {
    document.title = settings.browserTitle || DEFAULT_SITE_SETTINGS.browserTitle;

    let link = document.querySelector<HTMLLinkElement>("link[data-site-favicon]");
    if (settings.faviconUrl) {
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        link.setAttribute("data-site-favicon", "true");
        document.head.appendChild(link);
      }
      link.href = settings.faviconUrl;
    } else if (link) {
      link.remove();
    }
  }, [settings.browserTitle, settings.faviconUrl]);

  return null;
};
