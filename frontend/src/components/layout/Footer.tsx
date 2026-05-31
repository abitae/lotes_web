/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link } from "react-router-dom";
import { Landmark, Phone, Mail, MapPin, Eye, CheckCircle2 } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer id="public-footer" className="bg-[#09090b] text-[#a1a1aa] border-t border-[#27272a] select-none font-sans">
      {/* Top Banner Accent */}
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
          {/* Column 1 - Brand Summary */}
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-1 px-1.5 bg-[#18181b] rounded text-[var(--accent)] border border-[#27272a]">
                <Landmark className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-extrabold text-sm tracking-wide text-[#fafafa] uppercase leading-none">
                  Lotes en Remate
                </span>
                <span className="font-mono text-[8px] text-[var(--accent)] tracking-widest uppercase">
                  Inversión Segura
                </span>
              </div>
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              La plataforma líder en el Perú para la adquisición, inversión y adjudicación de terrenos con alta plusvalía y total seguridad jurídica. Conectando familias y emprendedores con oportunidades reales de capitalización.
            </p>
          </div>

          {/* Column 2 - Links */}
          <div className="space-y-4">
            <h3 className="font-sans font-bold text-sm text-stone-200 uppercase tracking-widest">
              Explorar
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-stone-100 transition-colors">
                  Inicio Portal
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-stone-100 transition-colors">
                  Buscar Terrenos
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-stone-100 transition-colors">
                  Quiénes Somos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-stone-100 transition-colors">
                  Trabaja con un Experto
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Categories */}
          <div className="space-y-4">
            <h3 className="font-sans font-bold text-sm text-stone-200 uppercase tracking-widest">
              Lotes por Tipo
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/catalog?type=Playero" className="hover:text-[#fafafa] transition-colors flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  Proyectos Playeros
                </Link>
              </li>
              <li>
                <Link to="/catalog?type=Campestre" className="hover:text-[#fafafa] transition-colors flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                  Proyectos Campestres
                </Link>
              </li>
              <li>
                <Link to="/catalog?type=Urbano" className="hover:text-[#fafafa] transition-colors flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  Habilitación Urbana
                </Link>
              </li>
              <li>
                <Link to="/catalog?type=Industrial" className="hover:text-[#fafafa] transition-colors flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#a1a1aa]" />
                  Zonas Industriales
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div className="space-y-4 text-xs">
            <h3 className="font-sans font-bold text-sm text-stone-200 uppercase tracking-widest">
              Oficina Principal
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Av. Javier Prado Este 488, San Isidro, Lima, Perú</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="tel:+5116805120" className="hover:text-stone-100">
                  (01) 680-5120 / +51 987 654 321
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="mailto:informes@lotesenremate.pe" className="hover:text-stone-100">
                  informes@lotesenremate.pe
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal and copy bar */}
        <div className="mt-12 pt-8 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-4 text-2xs md:text-xs">
          <div className="text-stone-500 text-center md:text-left">
            © {new Date().getFullYear()} Lotesenremate.pe. Todos los derechos reservados. Las tasaciones y remates de lotes están sujetos a condiciones de pre-venta informados por canales formales.
          </div>
          <div className="flex items-center gap-6 text-stone-500">
            <Link to="/about" className="hover:text-stone-300">
              Políticas de Privacidad
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-stone-300">
              Libro de Reclamaciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
