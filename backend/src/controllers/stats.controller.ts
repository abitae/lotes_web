import type { Request, Response } from "express";
import { pool } from "../config/db.js";
import { fetchAllProjects } from "../services/webProjects.service.js";
import { mapWebProjectToProject } from "../utils/mapWebProject.js";
import type { DashboardStats, InquiryRow } from "../types/index.js";

const MONTH_LABELS = ["En", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

export async function getStats(_req: Request, res: Response) {
  const [inquiryRows] = await pool.query("SELECT * FROM inquiries");
  const inquiries = inquiryRows as InquiryRow[];

  const { projects: externalProjects, summary } = await fetchAllProjects();
  const projects = externalProjects.map(mapWebProjectToProject);

  const pendingLeads = inquiries.filter((i) => i.status === "Pendiente").length;
  const totalLotsSold = summary.lots_total - summary.lots_free;

  const typesMap = new Map<string, number>();
  projects.forEach((p) => {
    typesMap.set(p.projectType, (typesMap.get(p.projectType) ?? 0) + 1);
  });

  const monthlyCounts = new Array(12).fill(0) as number[];
  inquiries.forEach((i) => {
    const month = new Date(i.created_at).getMonth();
    monthlyCounts[month]++;
  });

  const monthlyLeadsTrend = MONTH_LABELS.slice(0, 6).map((month, idx) => ({
    month,
    leads: monthlyCounts[idx] || 0,
  }));

  const stats: DashboardStats = {
    totalProjects: summary.projects_count,
    totalLeads: inquiries.length,
    pendingLeads,
    totalLotsSold,
    monthlyLeadsTrend,
    projectTypeDistribution: Array.from(typesMap.entries()).map(([name, value]) => ({
      name,
      value,
    })),
  };

  res.json(stats);
}
