/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { DEFAULT_SITE_SETTINGS } from "../../config/siteDefaults";
import { BrandLogo } from "../BrandLogo";
import type { CorporateChannel } from "../../types";

function channelIcon(type: CorporateChannel["channelType"]) {
  if (type === "phone" || type === "whatsapp") return Phone;
  if (type === "email") return Mail;
  return MapPin;
}

function channelHref(ch: CorporateChannel): string | undefined {
  if (ch.channelType === "phone") return `tel:${ch.value.replace(/\s/g, "")}`;
  if (ch.channelType === "email") return `mailto:${ch.value}`;
  return undefined;
}

export const Footer: React.FC = () => {
  const { siteSettings, channels } = useApp();
  const settings = siteSettings ?? DEFAULT_SITE_SETTINGS;
  const activeChannels = channels.filter((c) => c.isActive && c.channelType !== "whatsapp");

  return (
    <footer id="public-footer" className="bg-[#09090b] text-[#a1a1aa] border-t border-[#27272a] select-none font-sans">
      <div className="bg-[#18181b] border-b border-[#27272a] py-2 text-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs font-medium tracking-wide">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[var(--accent)]" />
            Todos nuestros lotes constan con Título de Propiedad inscrito en SUNARP.
          </span>
          <span className="text-[#a1a1aa] text-[10px] font-mono">
            R.U.C. N° 20608541291 | REMATE DIRECTO
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <Link to="/" className="inline-flex group">
              <BrandLogo settings={settings} variant="footer" />
            </Link>
            {(settings.footerDescription?.trim()) && (
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              {settings.footerDescription}
            </p>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="font-sans font-bold text-sm text-stone-200 uppercase tracking-widest">
              Explorar
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/" className="hover:text-stone-100 transition-colors">Inicio Portal</Link></li>
              <li><Link to="/catalog" className="hover:text-stone-100 transition-colors">Buscar Terrenos</Link></li>
              <li><Link to="/about" className="hover:text-stone-100 transition-colors">Quiénes Somos</Link></li>
              <li><Link to="/contact" className="hover:text-stone-100 transition-colors">Trabaja con un Experto</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-sans font-bold text-sm text-stone-200 uppercase tracking-widest">
              Lotes por Tipo
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/catalog?type=Playero" className="hover:text-[#fafafa] transition-colors flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />Proyectos Playeros</Link></li>
              <li><Link to="/catalog?type=Campestre" className="hover:text-[#fafafa] transition-colors flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />Proyectos Campestres</Link></li>
              <li><Link to="/catalog?type=Urbano" className="hover:text-[#fafafa] transition-colors flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />Habilitación Urbana</Link></li>
              <li><Link to="/catalog?type=Industrial" className="hover:text-[#fafafa] transition-colors flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#a1a1aa]" />Zonas Industriales</Link></li>
            </ul>
          </div>

          <div className="space-y-4 text-xs">
            <h3 className="font-sans font-bold text-sm text-stone-200 uppercase tracking-widest">
              Oficina Principal
            </h3>
            <ul className="space-y-3">
              {activeChannels.length > 0 ? (
                activeChannels.map((ch) => {
                  const Icon = channelIcon(ch.channelType);
                  const href = channelHref(ch);
                  return (
                    <li key={ch.id} className="flex items-start gap-2.5">
                      <Icon className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      {href ? (
                        <a href={href} className="hover:text-stone-100">
                          {ch.value}
                          {ch.extraInfo ? ` (${ch.extraInfo})` : ""}
                        </a>
                      ) : (
                        <span>{ch.value}</span>
                      )}
                    </li>
                  );
                })
              ) : (
                <>
                  <li className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>Av. Javier Prado Este 488, San Isidro, Lima, Perú</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                    <a href="tel:+5116805120" className="hover:text-stone-100">(01) 680-5120</a>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                    <a href="mailto:informes@lotesenremate.pe" className="hover:text-stone-100">informes@lotesenremate.pe</a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-4 text-2xs md:text-xs">
          <div className="text-stone-500 text-center md:text-left">
            © {new Date().getFullYear()} {settings.siteName?.trim() || settings.browserTitle || "Lotes en Remate"}. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};
