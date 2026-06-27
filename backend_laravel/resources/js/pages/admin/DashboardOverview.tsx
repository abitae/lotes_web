/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { useApp } from "../../context/AppContext";
import { Inquiry } from "../../types";
import {
  TrendingUp,
  Users2,
  BookmarkCheck,
  Building,
  CheckCircle,
  Clock,
  Archive,
  Search,
  BookOpen,
  X,
  Plus,
  Trash2,
  Calendar
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
  CartesianGrid
} from "recharts";

export const DashboardOverview: React.FC = () => {
  const { inquiries, getStats, updateInquiryStatus, deleteInquiry, theme } = useApp();
  const stats = getStats();

  // Selected Lead modal for viewing and updating notes/status
  const [selectedLead, setSelectedLead] = useState<Inquiry | null>(null);

  // States to process custom note within details edit
  const [internalNotes, setInternalNotes] = useState("");
  const [updateStatus, setUpdateStatus] = useState<Inquiry["status"]>("Pendiente");

  // Search lead query
  const [leadQuery, setLeadQuery] = useState("");

  // Filter inquiry status query
  const [filterStatus, setFilterStatus] = useState<string>("All");

  const COLORS = ["#047857", "#d97706", "#4f46e5", "#e11d48"];

  // Filter inquiries based on searches
  const filteredLeadsList = useMemo(() => {
    let result = [...inquiries];

    if (leadQuery.trim() !== "") {
      const q = leadQuery.toLowerCase();
      result = result.filter(
        (i) =>
          i.fullName.toLowerCase().includes(q) ||
          i.phone.includes(q) ||
          i.email.toLowerCase().includes(q) ||
          i.projectInterest.toLowerCase().includes(q)
      );
    }

    if (filterStatus !== "All") {
      result = result.filter((i) => i.status === filterStatus);
    }

    // Sort showing newest first
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return result;
  }, [inquiries, leadQuery, filterStatus]);

  const handleLeadSelect = (lead: Inquiry) => {
    setSelectedLead(lead);
    setInternalNotes(lead.notes || "");
    setUpdateStatus(lead.status);
  };

  const handleUpdateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;

    try {
      await updateInquiryStatus(selectedLead.id, updateStatus, internalNotes);
      setSelectedLead(null);
    } catch {
      alert("No se pudo actualizar el lead.");
    }
  };

  return (
    <div id="admin-dashboard-overview" className="p-6 md:p-8 space-y-8 text-left">
      
      {/* Title Header */}
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-sans font-extrabold text-2xl text-[var(--text-p)] leading-none">
            VISTA GENERAL DEL PORTAL
          </h1>
          <span className="font-mono text-[10px] text-[var(--text-s)] block mt-1 uppercase tracking-wide">
            Administración centralizada de remates, leads y recursos multimedia
          </span>
        </div>
        <div className="flex items-center gap-2 admin-card border rounded-lg px-3 py-1.5 text-[var(--text-p)] font-mono text-[10px]">
          <Calendar className="w-3.5 h-3.5 text-amber-500" />
          <span>Filtro de Época: VENTAS 2026</span>
        </div>
      </section>

      {/* 1. ANALYTICAL STATISTICS GRID CARDS */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        
        {/* Card 1 - Total Projects */}
        <div className="admin-card border p-6 rounded-xl flex items-center justify-between shadow">
          <div className="space-y-1.5">
            <span className="font-mono text-3xs font-semibold text-[var(--text-s)] uppercase tracking-wider block">
              Proyectos Registrados
            </span>
            <strong className="text-3xl font-sans font-extrabold text-[var(--text-p)] leading-none block">
              {stats.totalProjects}
            </strong>
            <span className="text-emerald-500 font-mono text-[10px]">6 Zonas Habilitadas</span>
          </div>
          <div className="p-3 admin-icon-well text-amber-500 rounded-xl shrink-0">
            <Building className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2 - Total Leads inquiries */}
        <div className="admin-card border p-6 rounded-xl flex items-center justify-between shadow">
          <div className="space-y-1.5">
            <span className="font-mono text-3xs font-semibold text-[var(--text-s)] uppercase tracking-wider block">
              Total Leads (Solicitudes)
            </span>
            <strong className="text-3xl font-sans font-extrabold text-[var(--text-p)] leading-none block">
              {stats.totalLeads}
            </strong>
            <span className="text-emerald-500 font-mono text-[10px]">Capturados por Web</span>
          </div>
          <div className="p-3 admin-icon-well text-emerald-500 rounded-xl shrink-0">
            <Users2 className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3 - Pending Leads */}
        <div className="admin-card border p-6 rounded-xl flex items-center justify-between shadow">
          <div className="space-y-1.5">
            <span className="font-mono text-3xs font-semibold text-[var(--text-s)] uppercase tracking-wider block">
              Llamadas Pendientes
            </span>
            <strong className="text-3xl font-sans font-extrabold text-[var(--text-p)] leading-none block">
              {stats.pendingLeads}
            </strong>
            <span className="text-amber-500 font-mono text-[10px]">Contactar vía CRM</span>
          </div>
          <div className="p-3 admin-icon-well text-amber-500 rounded-xl shrink-0">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
        </div>

        {/* Card 4 - Lots Adjudicados */}
        <div className="admin-card border p-6 rounded-xl flex items-center justify-between shadow">
          <div className="space-y-1.5">
            <span className="font-mono text-3xs font-semibold text-[var(--text-s)] uppercase tracking-wider block">
              Lotes Adjudicados
            </span>
            <strong className="text-3xl font-sans font-extrabold text-[var(--text-p)] leading-none block">
              {stats.totalLotsSold}
            </strong>
            <span className="text-amber-500 font-mono text-[10px]">Firmas Notariales finalizadas</span>
          </div>
          <div className="p-3 admin-icon-well text-emerald-500 rounded-xl shrink-0">
            <BookmarkCheck className="w-5 h-5" />
          </div>
        </div>
      </section>

      {/* 2. ANAYLTICAL CHARTS BLOCK */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Trend line: Leads count (Span 8) */}
        <div className="lg:col-span-8 admin-card border p-5 rounded-xl flex flex-col justify-between">
          <div className="mb-4">
            <span className="font-mono text-3xs font-bold text-amber-500 uppercase tracking-widest block mb-0.5">
              Fluidez de Leads
            </span>
            <h3 className="font-sans font-bold text-sm text-[var(--text-p)]">
              Inscripción de prospectos por mes (Sede Activa)
            </h3>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.monthlyLeadsTrend}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#27272a" : "#e4e4e7"} />
                <XAxis dataKey="month" stroke={theme === "dark" ? "#a1a1aa" : "#57534e"} fontSize={10} tickLine={false} />
                <YAxis stroke={theme === "dark" ? "#a1a1aa" : "#57534e"} fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={
                    theme === "dark"
                      ? { backgroundColor: "#18181b", borderColor: "#27272a", borderRadius: "8px", fontSize: "11px", color: "#fafafa" }
                      : { backgroundColor: "#ffffff", borderColor: "#e4e4e7", borderRadius: "8px", fontSize: "11px", color: "#09090b" }
                  }
                  labelStyle={{ color: theme === "dark" ? "#a1a1aa" : "#57534e", fontFamily: "monospace" }}
                />
                <Area type="monotone" dataKey="leads" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorLeads)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Proportions pie: Land categorized (Span 4) */}
        <div className="lg:col-span-4 admin-card border p-5 rounded-xl flex flex-col justify-between">
          <div className="mb-2">
            <span className="font-mono text-3xs font-bold text-amber-500 uppercase tracking-widest block mb-0.5">
              Distribución de Zonas
            </span>
            <h3 className="font-sans font-bold text-sm text-[var(--text-p)]">
              Clasificaciones de Proyectos
            </h3>
          </div>

          <div className="h-56 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.projectTypeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.projectTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={
                    theme === "dark"
                      ? { backgroundColor: "#18181b", borderColor: "#27272a", borderRadius: "8px", fontSize: "11px", color: "#fafafa" }
                      : { backgroundColor: "#ffffff", borderColor: "#e4e4e7", borderRadius: "8px", fontSize: "11px", color: "#09090b" }
                  }
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-sans font-extrabold text-[var(--text-p)] leading-none">
                {stats.totalProjects}
              </span>
              <span className="text-3xs font-mono text-[var(--text-s)] block mt-0.5">TOTAL LOTE</span>
            </div>
          </div>

          {/* Labels keys legened */}
          <div className="grid grid-cols-2 gap-2 text-3xs font-mono text-[var(--text-s)]">
            {stats.projectTypeDistribution.map((entry, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                <span>
                  {entry.name}: {entry.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. REAL-TIME INTERACTIVE LEADS WORKFLOW TABLE */}
      <section className="admin-card border rounded-xl overflow-hidden shadow">
        
        {/* Table action bars header */}
        <div className="p-5 border-b border-[var(--border)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="font-sans font-extrabold text-[var(--text-p)] text-sm tracking-wide">
              MECÁNICAS DE LEADS (MENSAJES ENTRANTE DE COMPRA)
            </h2>
            <p className="font-mono text-3xs text-[var(--text-s)]">
              Lista autoritativa de registros de consultas web, listos para seguimiento telefónico.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Search query box */}
            <div className="relative w-full sm:w-56">
              <Search className="w-3.5 h-3.5 text-[var(--text-s)] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filtrar por nombre, celular..."
                value={leadQuery}
                onChange={(e) => setLeadQuery(e.target.value)}
                className="w-full admin-surface border focus:border-amber-400 text-[var(--text-p)] text-[11px] p-2 pl-8 rounded-lg outline-none"
              />
            </div>

            {/* Status Select action box */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="admin-surface border text-[11px] text-[var(--text-s)] p-2 rounded-lg outline-none cursor-pointer"
            >
              <option value="All">Ver Todos</option>
              <option value="Pendiente">Pendientes (Nuevos)</option>
              <option value="Contactado">Contactados (Cero pendientes)</option>
              <option value="Archivado">Archivados (Descartados)</option>
            </select>
          </div>
        </div>

        {/* Lead Table body */}
        <div className="overflow-x-auto">
          {filteredLeadsList.length === 0 ? (
            <div className="p-12 text-center space-y-2">
              <Users2 className="w-10 h-10 text-[var(--text-s)] mx-auto" />
              <h4 className="text-sm font-bold text-[var(--text-s)] font-sans">Sin contactos encontrados</h4>
              <p className="text-[var(--text-s)] text-xs">
                No hay mensajes entrantes que coincidan con la búsqueda o estipulado.
              </p>
            </div>
          ) : (
            <table className="w-full text-left font-sans text-xs text-[var(--text-p)] border-collapse">
              <thead>
                <tr className="admin-surface font-mono text-[10px] uppercase text-[var(--text-s)] border-b border-[var(--border)]">
                  <th className="p-4 font-bold">Cliente / Prospecto</th>
                  <th className="p-4 font-bold">Contacto</th>
                  <th className="p-4 font-bold">Lote / Interés</th>
                  <th className="p-4 font-bold">Fecha / Registro</th>
                  <th className="p-4 font-bold">Estado CRM</th>
                  <th className="p-4 font-bold">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y admin-divide divide-y">
                {filteredLeadsList.map((lead) => (
                  <tr key={lead.id} className="admin-row-hover group transition-colors">
                    <td className="p-4 font-bold text-[var(--text-p)]">
                      <div>
                        {lead.fullName}
                        {lead.notes && (
                          <span className="block font-sans font-light text-[10px] text-amber-500 italic shrink-0 truncate max-w-xs block mt-0.5">
                            * Obs: {lead.notes}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-mono text-[11px]">
                        <span>Cel: {lead.phone}</span>
                        <span className="block text-[var(--text-s)] text-3xs font-light">{lead.email}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="admin-surface border text-[10px] px-2 py-0.5 rounded font-mono text-emerald-500">
                        {lead.projectInterest}
                      </span>
                    </td>
                    <td className="p-4 text-[var(--text-s)] font-mono text-[10px]">
                      {new Date(lead.createdAt).toLocaleDateString("es-PE", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="p-4">
                      <span className={`inline-block font-sans font-bold text-[9px] uppercase px-2 py-0.5 rounded-full ${
                        lead.status === "Pendiente"
                          ? "bg-amber-500/15 text-amber-400 border border-amber-500/25"
                          : lead.status === "Contactado"
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
                          : "admin-inactive-badge"
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleLeadSelect(lead)}
                          className="admin-action-btn border hover:border-[var(--accent)] text-[var(--text-p)] px-2.5 py-1 rounded text-2xs font-bold uppercase transition-colors"
                        >
                          Seguimiento
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm("¿Seguro de eliminar este lead del sistema?")) {
                              deleteInquiry(lead.id).catch(() => alert("No se pudo eliminar el lead."));
                            }
                          }}
                          className="p-1 px-1.5 border border-transparent hover:border-[var(--border)] rounded hover:bg-[var(--bg)] text-[var(--text-s)] hover:text-rose-500 transition-all"
                          title="Eliminar Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* 4. DIALOG / MODAL DRAWER FOR EDITING LEAD & ADDING NOTES */}
      {selectedLead && (
        <section className="fixed inset-0 admin-overlay backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl w-full max-w-md p-6 relative space-y-6 text-[var(--text-p)]">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 p-1.5 hover:bg-[var(--bg)] rounded-lg text-[var(--text-s)] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="font-mono text-3xs text-amber-500 font-semibold uppercase tracking-widest block">
                Control de Conversión CRM
              </span>
              <h3 className="font-sans font-extrabold text-base text-[var(--text-p)]">
                Seguimiento de Lead
              </h3>
              <p className="text-[10px] text-[var(--text-s)] leading-relaxed font-light">
                Agregue notas de contacto luego de agendar la llamada, visibilidad instantánea en el radar.
              </p>
            </div>

            <div className="admin-surface border p-4 rounded-lg space-y-2.5 font-sans">
              <div className="flex justify-between items-start">
                <strong className="text-xs text-[var(--text-p)] block font-sans">
                  {selectedLead.fullName}
                </strong>
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="font-mono text-emerald-500 hover:underline text-2xs font-semibold"
                >
                  ☏ Llamar gratis
                </a>
              </div>
              <div className="text-3xs font-mono text-[var(--text-s)] space-y-0.5">
                <div>WhatsApp: {selectedLead.phone}</div>
                <div>Email: {selectedLead.email}</div>
                <div>Lote de Preferencia: <strong className="text-amber-500">{selectedLead.projectInterest}</strong></div>
              </div>
              <div className="h-0.5 bg-[var(--border)]" />
              <blockquote className="text-3xs text-[var(--text-s)] italic bg-[color-mix(in_srgb,var(--card-bg)_70%,var(--bg))] p-1.5 rounded leading-relaxed border-l-2 border-emerald-500">
                "{selectedLead.message}"
              </blockquote>
            </div>

            <form onSubmit={handleUpdateLead} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-3xs font-mono font-bold uppercase tracking-wide text-[var(--text-s)]">
                  Estado de Negociación CRM
                </label>
                <select
                  value={updateStatus}
                  onChange={(e) => setUpdateStatus(e.target.value as Inquiry["status"])}
                  className="w-full admin-surface border text-[var(--text-p)] p-2.5 text-xs rounded-lg outline-none"
                >
                  <option value="Pendiente">Pendiente (Por llamar)</option>
                  <option value="Contactado">Contactado (Cita / Visita agendada)</option>
                  <option value="Archivado">Archivado (Descartado / Rechazado)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-3xs font-mono font-bold uppercase tracking-wide text-[var(--text-s)]">
                  Anotas Internas del Asesor
                </label>
                <textarea
                  rows={3}
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="Ej. Quiere visita guiada el sábado 04 de julio, prefiere lote de esquina."
                  className="w-full admin-surface border text-[var(--text-p)] p-2.5 text-xs rounded-lg outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="flex-1 py-2 bg-transparent text-[var(--text-s)] hover:text-[var(--text-p)] text-xs font-semibold uppercase text-center"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-900 font-sans font-extrabold text-xs rounded-lg uppercase tracking-wider"
                >
                  Actualizar Registro
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </div>
  );
};
