import { env } from "../config/env";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function getAuthToken(): string | null {
  return localStorage.getItem(env.authStorageKey);
}

export function setAuthToken(token: string | null) {
  if (token) {
    localStorage.setItem(env.authStorageKey, token);
  } else {
    localStorage.removeItem(env.authStorageKey);
  }
}

export function getAdminEmail(): string | null {
  return localStorage.getItem(env.authEmailKey);
}

export function setAdminEmail(email: string | null) {
  if (email) {
    localStorage.setItem(env.authEmailKey, email);
  } else {
    localStorage.removeItem(env.authEmailKey);
  }
}

type RequestOptions = RequestInit & {
  auth?: boolean;
};

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { auth = false, headers: initHeaders, body, ...rest } = options;
  const headers = new Headers(initHeaders);

  if (body && typeof body === "string" && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (auth) {
    const token = getAuthToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${env.apiUrl}${normalizedPath}`;

  const response = await fetch(url, { ...rest, headers, body });

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();
  let data: unknown = undefined;

  if (text) {
    try {
      data = JSON.parse(text) as unknown;
    } catch {
      if (!response.ok) {
        throw new ApiError(response.status, text || response.statusText);
      }
      throw new ApiError(response.status, "Respuesta inválida del servidor");
    }
  }

  if (!response.ok) {
    const message =
      data &&
      typeof data === "object" &&
      !Array.isArray(data) &&
      "error" in data &&
      typeof (data as { error?: unknown }).error === "string"
        ? (data as { error: string }).error
        : response.statusText;
    throw new ApiError(response.status, message);
  }

  return data as T;
}
