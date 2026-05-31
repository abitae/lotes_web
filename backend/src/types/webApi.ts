export interface WebApiAsset {
  id: number;
  kind: string;
  title: string;
  file_name: string;
  mime_type: string;
  file_size: number;
  url: string;
}

export interface WebApiProjectType {
  id: number;
  name: string;
  code: string;
}

export interface WebApiCity {
  id: number;
  name: string;
  department: string;
}

export interface WebApiProject {
  id: number;
  name: string;
  location: string | null;
  maps_url?: string | null;
  location_label?: string | null;
  blocks?: string[];
  total_lots?: number | null;
  lots_count?: number;
  free_lots_count?: number;
  project_type?: WebApiProjectType | null;
  image_portada?: string | null;
  tipo_web?: string | null;
  city?: WebApiCity | null;
  province?: string | null;
  district?: string | null;
  project_zone?: string | null;
  registry_status?: string | null;
  descripcion?: string | null;
  precio_web?: number | null;
  images_count?: number;
  videos_count?: number;
  images?: WebApiAsset[];
  videos?: WebApiAsset[];
}

export interface WebApiSummary {
  projects_count: number;
  lots_total: number;
  lots_free: number;
  images_total: number;
  videos_total: number;
}

export interface WebApiMeta {
  tipo_web?: string;
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  from: number | null;
  to: number | null;
}

export interface WebApiProjectsListResponse {
  summary: WebApiSummary;
  meta: WebApiMeta;
  data: WebApiProject[];
}

export interface WebApiProjectDetailResponse {
  data: WebApiProject;
}

export interface WebApiListParams {
  page?: number;
  per_page?: number;
  search?: string;
  location?: string;
  project_type_id?: number;
  has_free_lots?: boolean;
  has_images?: boolean;
  has_videos?: boolean;
  order?: string;
}
