/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { uploadFile } from "../../api/upload";
import { DEFAULT_HOME_ALERT } from "../../config/siteDefaults";
import { Save, Upload, ExternalLink, Megaphone } from "lucide-react";

export const HomeAlertManagement: React.FC = () => {
  const { homeAlert, updateHomeAlert } = useApp();
  const data = homeAlert ?? DEFAULT_HOME_ALERT;

  const [isEnabled, setIsEnabled] = useState(data.isEnabled);
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [imageUrl, setImageUrl] = useState(data.imageUrl ?? "");
  const [videoUrl, setVideoUrl] = useState(data.videoUrl ?? "");
  const [buttonText, setButtonText] = useState(data.buttonText ?? "");
  const [buttonLink, setButtonLink] = useState(data.buttonLink ?? "");
  const [saving, setSaving] = useState(false);

  React.useEffect(() => {
    setIsEnabled(data.isEnabled);
    setTitle(data.title);
    setDescription(data.description);
    setImageUrl(data.imageUrl ?? "");
    setVideoUrl(data.videoUrl ?? "");
    setButtonText(data.buttonText ?? "");
    setButtonLink(data.buttonLink ?? "");
  }, [data]);

  const handleUpload = async (file: File, target: "image" | "video") => {
    try {
      const url = await uploadFile(file);
      if (target === "video") setVideoUrl(url);
      else setImageUrl(url);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error al subir archivo";
      alert(msg);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateHomeAlert({
        isEnabled,
        title: title.trim(),
        description: description.trim(),
        imageUrl: imageUrl.trim() || null,
        videoUrl: videoUrl.trim() || null,
        buttonText: buttonText.trim() || null,
        buttonLink: buttonLink.trim() || null,
      });
    } catch {
      alert("No se pudo guardar el modal de aviso.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div id="admin-home-alert" className="p-6 md:p-8 space-y-6 text-left max-w-3xl">
      <section className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-sans font-extrabold text-2xl text-[var(--text-p)] flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-[var(--accent)]" />
            AVISO MODAL — INICIO
          </h1>
          <p className="font-mono text-[10px] text-[var(--text-s)] mt-1 uppercase">
            Popup en la página de inicio · activar / desactivar
          </p>
        </div>
        <Link
          to="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase text-[var(--accent)] border border-[var(--border)] px-3 py-1.5 rounded hover:bg-[var(--bg)]"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Ver inicio
        </Link>
      </section>

      <form onSubmit={handleSave} className="admin-card border p-6 rounded-xl space-y-5">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={(e) => setIsEnabled(e.target.checked)}
            className="w-4 h-4 accent-[var(--accent)]"
          />
          <span className="text-sm font-semibold text-[var(--text-p)]">
            Modal habilitado en inicio
          </span>
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase ${
              isEnabled ? "bg-green-100 text-green-800" : "bg-stone-200 text-stone-600"
            }`}
          >
            {isEnabled ? "Activo" : "Desactivado"}
          </span>
        </label>

        <div className="space-y-3">
          <label className="text-[10px] font-mono uppercase text-[var(--text-s)]">Título</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--bg)]"
            placeholder="Ej. Gran liquidación de marzo"
          />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-mono uppercase text-[var(--text-s)]">Mensaje</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--bg)]"
            placeholder="Texto del aviso..."
          />
        </div>

        <div className="space-y-3 p-4 rounded-lg border border-[var(--border)] bg-[var(--bg)]/50">
          <label className="text-[10px] font-mono uppercase text-[var(--text-p)] font-bold">Imagen del aviso</label>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--card-bg)]"
            placeholder="URL o subir al servidor"
          />
          <label className="inline-flex items-center gap-1.5 text-[10px] cursor-pointer text-[var(--accent)] font-semibold">
            <Upload className="w-3.5 h-3.5" />
            Subir imagen
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "image")}
            />
          </label>
          {imageUrl && (
            <img src={imageUrl} alt="Vista previa imagen" className="max-h-40 w-full object-cover rounded-lg border border-[var(--border)]" />
          )}
        </div>

        <div className="space-y-3 p-4 rounded-lg border border-[var(--border)] bg-[var(--bg)]/50">
          <label className="text-[10px] font-mono uppercase text-[var(--text-p)] font-bold">Video del aviso</label>
          <p className="text-[10px] text-[var(--text-s)] font-mono">
            MP4, WebM u otros formatos de video (máx. 50 MB). Si hay video, tiene prioridad sobre la imagen en el modal.
          </p>
          <input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--card-bg)]"
            placeholder="URL o subir al servidor"
          />
          <label className="inline-flex items-center gap-1.5 text-[10px] cursor-pointer text-[var(--accent)] font-semibold">
            <Upload className="w-3.5 h-3.5" />
            Subir video
            <input
              type="file"
              accept="video/mp4,video/webm,video/quicktime,video/x-msvideo,.mp4,.webm,.mov"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "video")}
            />
          </label>
          {videoUrl && (
            <video
              src={videoUrl}
              controls
              playsInline
              className="max-h-48 w-full rounded-lg border border-[var(--border)] bg-black"
            />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase text-[var(--text-s)]">Texto del botón (opcional)</label>
            <input
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--bg)]"
              placeholder="Ver catálogo"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase text-[var(--text-s)]">Enlace del botón</label>
            <input
              value={buttonLink}
              onChange={(e) => setButtonLink(e.target.value)}
              className="w-full text-xs p-2.5 rounded border border-[var(--border)] bg-[var(--bg)]"
              placeholder="/catalog o https://..."
            />
          </div>
        </div>

        <p className="text-[10px] text-[var(--text-s)] font-mono leading-relaxed">
          El visitante verá el modal una vez por sesión al entrar a inicio. Si guardas cambios, quien ya lo cerró lo volverá a ver en una nueva sesión o tras actualizar el contenido.
        </p>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-1.5 bg-[var(--accent)] text-white text-xs font-bold px-5 py-2.5 rounded uppercase disabled:opacity-60"
        >
          <Save className="w-3.5 h-3.5" />
          {saving ? "Guardando..." : "Guardar configuración"}
        </button>
      </form>
    </div>
  );
};
