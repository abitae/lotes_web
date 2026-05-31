import { webApiConfig, getWebProjectsUrl } from "../config/webApi.js";
import { AppError } from "../middleware/errorHandler.js";
import type {
  WebApiListParams,
  WebApiProject,
  WebApiProjectDetailResponse,
  WebApiProjectsListResponse,
  WebApiSummary,
} from "../types/webApi.js";

async function webApiFetch<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), webApiConfig.timeoutMs);

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    if (response.status === 404) {
      throw new AppError(404, "Proyecto no encontrado en el catálogo externo");
    }

    if (response.status === 429) {
      throw new AppError(429, "Demasiadas solicitudes al catálogo externo. Intenta más tarde.");
    }

    if (response.status === 422) {
      let message = "Parámetros inválidos en catálogo externo";
      try {
        const body = (await response.json()) as { message?: string };
        if (body.message) message = body.message;
      } catch {
        /* ignore */
      }
      throw new AppError(422, message);
    }

    if (!response.ok) {
      throw new AppError(502, `Error del catálogo externo (${response.status})`);
    }

    return (await response.json()) as T;
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err instanceof Error && err.name === "AbortError") {
      throw new AppError(504, "Tiempo de espera agotado al consultar el catálogo externo");
    }
    throw new AppError(502, "No se pudo conectar con el catálogo externo");
  } finally {
    clearTimeout(timeout);
  }
}

function buildListUrl(params: WebApiListParams = {}): string {
  const searchParams = new URLSearchParams({
    tipo_web: webApiConfig.tipoWeb,
    page: String(params.page ?? 1),
    per_page: String(params.per_page ?? 50),
  });

  if (params.search) searchParams.set("search", params.search);
  if (params.location) searchParams.set("location", params.location);
  if (params.project_type_id !== undefined) {
    searchParams.set("project_type_id", String(params.project_type_id));
  }
  if (params.has_free_lots) searchParams.set("has_free_lots", "1");
  if (params.has_images) searchParams.set("has_images", "1");
  if (params.has_videos) searchParams.set("has_videos", "1");
  if (params.order) searchParams.set("order", params.order);

  return `${getWebProjectsUrl("/projects")}?${searchParams.toString()}`;
}

export async function fetchProjectsList(
  params: WebApiListParams = {}
): Promise<WebApiProjectsListResponse> {
  return webApiFetch<WebApiProjectsListResponse>(buildListUrl(params));
}

export async function fetchProjectById(id: string | number): Promise<WebApiProject> {
  const response = await webApiFetch<WebApiProjectDetailResponse>(
    getWebProjectsUrl(`/projects/${id}`)
  );
  return response.data;
}

export async function fetchAllProjects(): Promise<{
  projects: WebApiProject[];
  summary: WebApiSummary;
}> {
  const firstPage = await fetchProjectsList({ page: 1, per_page: 50 });
  const allProjects = [...firstPage.data];

  for (let page = 2; page <= firstPage.meta.last_page; page++) {
    const nextPage = await fetchProjectsList({ page, per_page: 50 });
    allProjects.push(...nextPage.data);
  }

  return { projects: allProjects, summary: firstPage.summary };
}
