/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import {
  PieChart,
  HardDriveUpload,
  ArrowUpRight,
  Sparkles,
  Inbox
} from "lucide-react";

export const AdminSidebar: React.FC = () => {
  const { inquiries } = useApp();
  const pendingInquiries = inquiries.filter((i) => i.status === "Pendiente").length;

  return (
    <aside
      id="admin-sidebar"
      className="w-56 bg-[var(--card-bg)] text-[var(--text-p)] flex flex-col h-screen sticky top-0 border-r border-[var(--border)] shrink-0 z-30 transition-colors duration-200"
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="p-1 px-1.5 bg-[var(--accent)] rounded text-white font-extrabold font-mono text-[10px]">
            ADM
          </div>
          <div>
            <h1 className="font-sans font-extrabold text-xs tracking-wider text-[var(--text-p)] leading-none">
              REMATE PANEL
            </h1>
            <span className="font-mono text-[8px] text-[var(--text-s)] block uppercase mt-0.5">
              v1.4.0 • SYSTEM ACTIVE
            </span>
          </div>
        </Link>
      </div>

      {/* Main Nav Links */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <span className="block px-2 text-[8px] font-mono font-bold uppercase tracking-widest text-[var(--text-s)] opacity-60 mb-1">
          Monitoreo principal
        </span>

        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `flex items-center justify-between px-2.5 py-1.5 rounded transition-all text-xs font-medium ${
              isActive
                ? "bg-[var(--bg)] border-l-2 border-[var(--accent)] text-[var(--accent)]"
                : "hover:bg-[var(--bg)]/55 text-[var(--text-s)] hover:text-[var(--text-p)]"
            }`
          }
        >
          <div className="flex items-center gap-2">
            <PieChart className="w-3.5 h-3.5 shrink-0" />
            <span>Vista General</span>
          </div>
          <span className="font-mono text-[8px] opacity-60">TRENDS</span>
        </NavLink>

        <span className="block pt-3 px-2 text-[8px] font-mono font-bold uppercase tracking-widest text-[var(--text-s)] opacity-60 mb-1">
          Operaciones de campo
        </span>

        <NavLink
          to="/admin/multimedia"
          className={({ isActive }) =>
            `flex items-center justify-between px-2.5 py-1.5 rounded transition-all text-xs font-medium ${
              isActive
                ? "bg-[var(--bg)] border-l-2 border-[var(--accent)] text-[var(--accent)]"
                : "hover:bg-[var(--bg)]/55 text-[var(--text-s)] hover:text-[var(--text-p)]"
            }`
          }
        >
          <div className="flex items-center gap-2">
            <HardDriveUpload className="w-3.5 h-3.5 shrink-0" />
            <span>Gestión Multimedia</span>
          </div>
          <span className="inline-flex items-center text-[var(--accent)] font-mono text-[8px]">
            <Sparkles className="w-2.5 h-2.5" />
          </span>
        </NavLink>
      </nav>

      {/* Leads quick status widget counter */}
      <div className="p-3 mx-3 mb-3 bg-[var(--bg)] border border-[var(--border)] rounded space-y-2 select-none">
        <div className="flex items-center gap-1.5">
          <Inbox className="w-3 h-3 text-[var(--accent)]" />
          <span className="font-mono text-[8px] font-bold text-[var(--text-p)] uppercase tracking-widest">
            Leads Entrantes
          </span>
        </div>
        <div className="flex items-baseline justify-between leading-none">
          <span className="text-xl font-sans font-extrabold text-[var(--text-p)]">
            {pendingInquiries}
          </span>
          <span className="text-[8px] font-mono text-[#22c55e] font-semibold uppercase">
            {pendingInquiries > 0 ? "Por contactar" : "Sin pendientes"}
          </span>
        </div>
        <div className="w-full bg-[var(--card-bg)] rounded-full h-1 border border-[var(--border)]/40">
          <div
            className="bg-[var(--accent)] h-full rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(100, Math.max(10, (pendingInquiries / Math.max(1, inquiries.length)) * 100))}%`,
            }}
          />
        </div>
      </div>

      {/* Back to public link */}
      <div className="p-3 border-t border-[var(--border)]">
        <Link
          to="/"
          className="w-full flex items-center justify-center gap-1.5 border border-[var(--border)] hover:border-[var(--accent)] bg-[var(--card-bg)] hover:bg-[var(--bg)] py-2 rounded text-[var(--text-p)] text-[10px] font-semibold tracking-wider transition-all uppercase"
        >
          <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent)]" />
          VOLVER AL PORTAL
        </Link>
      </div>
    </aside>
  );
};
