import { getAuthToken } from "./client";
import { env } from "../config/env";

export async function uploadFile(file: File): Promise<string> {
  const token = getAuthToken();
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${env.apiUrl}/upload`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();
    let message = "Error al subir archivo";
    try {
      const body = JSON.parse(text) as { error?: string };
      if (body.error) message = body.error;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }

  const data = (await response.json()) as { url: string };
  return data.url;
}
