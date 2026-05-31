import type { Request, Response } from "express";
import { pool } from "../config/db.js";
import type { DashboardStats, InquiryRow, ProjectRow, ProjectType } from "../types/index.js";

const MONTH_LABELS = ["En", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

export async function getStats(_req: Request, res: Response) {
  const [projectRows] = await pool.query("SELECT * FROM projects");
  const [inquiryRows] = await pool.query("SELECT * FROM inquiries");

  const projects = projectRows as ProjectRow[];
  const inquiries = inquiryRows as InquiryRow[];

  const pendingLeads = inquiries.filter((i) => i.status === "Pendiente").length;
  const totalLotsSold = projects.reduce((acc, p) => acc + (p.total_lots - p.available_lots), 0);

  const typesMap: Record<ProjectType, number> = {
    Playero: 0,
    Campestre: 0,
    Urbano: 0,
    Industrial: 0,
  };

  projects.forEach((p) => {
    if (typesMap[p.project_type] !== undefined) {
      typesMap[p.project_type]++;
    }
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
    totalProjects: projects.length,
    totalLeads: inquiries.length,
    pendingLeads,
    totalLotsSold,
    monthlyLeadsTrend,
    projectTypeDistribution: Object.entries(typesMap).map(([name, value]) => ({ name, value })),
  };

  res.json(stats);
}
