/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { uploadFile } from "../../api/upload";
import { DEFAULT_ABOUT } from "../../config/siteDefaults";
import { GuaranteeIcon } from "../../utils/siteContent";
import { Plus, Save, Trash2, Upload, Users, ExternalLink } from "lucide-react";

const VALUE_ICON_OPTIONS = ["Award", "ShieldAlert", "HeartHandshake", "ShieldCheck", "Landmark", "Eye"];

export const AboutManagement: React.FC = () => {
  const {
    about,
    updateAboutPage,
    addAboutValue,
    updateAboutValue,
    deleteAboutValue,
    addExpertAdvisor,
    updateExpertAdvisor,
    deleteExpertAdvisor,
  } = useApp();

  const data = about ?? DEFAULT_ABOUT;
  const p = data.page;

  const [heroEyebrow, setHeroEyebrow] = useState(p.heroEyebrow);
  const [heroHeading, setHeroHeading] = useState(p.heroHeading);
  const [heroDescription, setHeroDescription] = useState(p.heroDescription);
  const [heroBackgroundImageUrl, setHeroBackgroundImageUrl] = useState(p.heroBackgroundImageUrl);
  const [missionHeading, setMissionHeading] = useState(p.missionHeading);
  const [missionDescription, setMissionDescription] = useState(p.missionDescription);
  const [visionHeading, setVisionHeading] = useState(p.visionHeading);
  const [visionDescription, setVisionDescription] = useState(p.visionDescription);
  const [valuesEyebrow, setValuesEyebrow] = useState(p.valuesEyebrow);
  const [valuesHeading, setValuesHeading] = useState(p.valuesHeading);
  const [valuesDescription, setValuesDescription] = useState(p.valuesDescription);
  const [advisorsEyebrow, setAdvisorsEyebrow] = useState(p.advisorsEyebrow);
  const [advisorsHeading, setAdvisorsHeading] = useState(p.advisorsHeading);
  const [advisorsDescription, setAdvisorsDescription] = useState(p.advisorsDescription);

  const [newValueIcon, setNewValueIcon] = useState("Award");
  const [newValueTitle, setNewValueTitle] = useState("");
  const [newValueDescription, setNewValueDescription] = useState("");

  const [advisorName, setAdvisorName] = useState("");
  const [advisorRole, setAdvisorRole] = useState("");
  const [advisorBio, setAdvisorBio] = useState("");
  const [advisorImageUrl, setAdvisorImageUrl] = useState("");

  const [editingAdvisorId, setEditingAdvisorId] = useState<string | null>(null);
  const [editAdvisorName, setEditAdvisorName] = useState("");
  const [editAdvisorRole, setEditAdvisorRole] = useState("");
  const [editAdvisorBio, setEditAdvisorBio] = useState("");
  const [editAdvisorImageUrl, setEditAdvisorImageUrl] = useState("");

  React.useEffect(() => {
    setHeroEyebrow(p.heroEyebrow);
    setHeroHeading(p.heroHeading);
    setHeroDescription(p.heroDescription);
    setHeroBackgroundImageUrl(p.heroBackgroundImageUrl);
    setMissionHeading(p.missionHeading);
    setMissionDescription(p.missionDescription);
    setVisionHeading(p.visionHeading);
    setVisionDescription(p.visionDescription);
    setValuesEyebrow(p.valuesEyebrow);
    setValuesHeading(p.valuesHeading);
    setValuesDescription(p.valuesDescription);
    setAdvisorsEyebrow(p.advisorsEyebrow);
    setAdvisorsHeading(p.advisorsHeading);
    setAdvisorsDescription(p.advisorsDescription);
  }, [p]);

  const savePage = async () => {
    try {
      await updateAboutPage({
        heroEyebrow,
        heroHeading,
        heroDescription,
        heroBackgroundImageUrl,
        missionHeading,
        missionDescription,
        visionHeading,
        visionDescription,
        valuesEyebrow,
        valuesHeading,
        valuesDescription,
        advisorsEyebrow,
        advisorsHeading,
        advisorsDescription,
      });
    } catch {
      alert("No se pudo guardar el contenido de la página.");
    }
  };

  const handleAddValue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newValueTitle || !newValueDescription) return;
    try {
      await addAboutValue({
        icon: newValueIcon,
        title: newValueTitle,
        description: newValueDescription,
        sortOrder: data.values.length,
        isActive: true,
      });
      setNewValueTitle("");
      setNewValueDescription("");
    } catch {
      alert("No se pudo crear el valor.");
    }
  };

  const handleHeroBgUpload = async (file: File) => {
    try {
      const url = await uploadFile(file);
      setHeroBackgroundImageUrl(url);
    } catch {
      alert("No se pudo subir la imagen de fondo.");
    }
  };

  const handleAdvisorUpload = async (file: File, target: "new" | "edit") => {
    try {
      const url = await uploadFile(file);
      if (target === "new") setAdvisorImageUrl(url);
      else setEditAdvisorImageUrl(url);
    } catch {
      alert("No se pudo subir la imagen al servidor.");
    }
  };

  const handleCreateAdvisor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!advisorName || !advisorRole || !advisorBio || !advisorImageUrl) return;
    try {
      await addExpertAdvisor({
        name: advisorName,
        role: advisorRole,
        bio: advisorBio,
        imageUrl: advisorImageUrl,
        sortOrder: data.advisors.length,
        isActive: true,
      });
      setAdvisorName("");
      setAdvisorRole("");
      setAdvisorBio("");
      setAdvisorImageUrl("");
    } catch {
      alert("No se pudo crear el asesor.");
    }
  };

  const startEditAdvisor = (id: string) => {
    const advisor = data.advisors.find((a) => a.id === id);
    if (!advisor) return;
    setEditingAdvisorId(id);
    setEditAdvisorName(advisor.name);
    setEditAdvisorRole(advisor.role);
    setEditAdvisorBio(advisor.bio);
    setEditAdvisorImageUrl(advisor.imageUrl);
  };

  const saveEditAdvisor = async () => {
    if (!editingAdvisorId) return;
    try {
      await updateExpertAdvisor(editingAdvisorId, {
        name: editAdvisorName,
        role: editAdvisorRole,
        bio: editAdvisorBio,
        imageUrl: editAdvisorImageUrl,
      });
      setEditingAdvisorId(null);
    } catch {
      alert("No se pudo actualizar el asesor.");
    }
  };

  const handleDeleteAdvisor = async (id: string, name: string) => {
    if (!window.confirm(`¿Eliminar al asesor "${name}"? Esta acción no se puede deshacer.`)) return;
    try {
      if (editingAdvisorId === id) setEditingAdvisorId(null);
      await deleteExpertAdvisor(id);
    } catch {
      alert("No se pudo eliminar el asesor.");
    }
  };

  const activeValues = data.values.filter((v) => v.isActive);
  const activeAdvisors = data.advisors.filter((a) => a.isActive);

  return (
    <div id="admin-about-management" className="p-6 md:p-8 space-y-8 text-left">
      <section className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-sans font-extrabold text-2xl text-[var(--text-p)]">PÁGINA NOSOTROS</h1>
          <p className="font-mono text-[10px] text-[var(--text-s)] mt-1 uppercase">
            Contenido público en /#/about
          </p>
        </div>
        <Link
          to="/about"
          target="_blank"
          className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase text-[var(--accent)] border border-[var(--border)] px-3 py-1.5 rounded hover:bg-[var(--bg)]"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Ver página
        </Link>
      </section>

      <div className="admin-card border p-6 rounded-xl space-y-4">
        <h2 className="font-sans font-extrabold text-sm uppercase tracking-wider">Hero — Nuestra Filosofía</h2>
        <p className="text-[10px] text-[var(--text-s)] font-mono">
          Imagen de fondo a pantalla completa en la cabecera de /#/about
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input value={heroEyebrow} onChange={(e) => setHeroEyebrow(e.target.value)} placeholder="Etiqueta superior" className="text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" />
          <input value={heroHeading} onChange={(e) => setHeroHeading(e.target.value)} placeholder="Título principal" className="text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" />
          <textarea value={heroDescription} onChange={(e) => setHeroDescription(e.target.value)} placeholder="Descripción" rows={3} className="md:col-span-2 text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" />
        </div>
        <div className="space-y-2 p-4 rounded-lg border border-[var(--border)] bg-[var(--bg)]/50">
          <label className="text-[10px] font-mono uppercase text-[var(--text-p)] font-bold">Imagen de fondo del hero</label>
          <input
            value={heroBackgroundImageUrl}
            onChange={(e) => setHeroBackgroundImageUrl(e.target.value)}
            placeholder="URL o subir archivo al servidor"
            className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--card-bg)]"
          />
          <label className="inline-flex items-center gap-1.5 text-[10px] cursor-pointer text-[var(--accent)] font-semibold">
            <Upload className="w-3.5 h-3.5" />
            Subir imagen de fondo
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleHeroBgUpload(e.target.files[0])} />
          </label>
          {heroBackgroundImageUrl && (
            <div className="relative h-32 rounded-lg overflow-hidden border border-[var(--border)]">
              <img src={heroBackgroundImageUrl} alt="Vista previa fondo" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>

      <div className="admin-card border p-6 rounded-xl space-y-4">
        <h2 className="font-sans font-extrabold text-sm uppercase tracking-wider">Misión y visión</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase text-[var(--text-s)]">Misión</label>
            <input value={missionHeading} onChange={(e) => setMissionHeading(e.target.value)} className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" />
            <textarea value={missionDescription} onChange={(e) => setMissionDescription(e.target.value)} rows={4} className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase text-[var(--text-s)]">Visión</label>
            <input value={visionHeading} onChange={(e) => setVisionHeading(e.target.value)} className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" />
            <textarea value={visionDescription} onChange={(e) => setVisionDescription(e.target.value)} rows={4} className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" />
          </div>
        </div>
      </div>

      <div className="admin-card border p-6 rounded-xl space-y-4">
        <h2 className="font-sans font-extrabold text-sm uppercase tracking-wider">Sección valores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input value={valuesEyebrow} onChange={(e) => setValuesEyebrow(e.target.value)} placeholder="Etiqueta" className="text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" />
          <input value={valuesHeading} onChange={(e) => setValuesHeading(e.target.value)} placeholder="Título" className="text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" />
          <textarea value={valuesDescription} onChange={(e) => setValuesDescription(e.target.value)} placeholder="Descripción" rows={2} className="md:col-span-2 text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" />
        </div>

        <div className="border-t border-[var(--border)] pt-4 space-y-2">
          {data.values.map((item) => (
            <div key={item.id} className="flex items-start gap-3 p-3 border border-[var(--border)] rounded-lg text-xs">
              <GuaranteeIcon name={item.icon} className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-bold">{item.title}</div>
                <div className="text-[var(--text-s)]">{item.description}</div>
              </div>
              <button
                type="button"
                onClick={() => updateAboutValue(item.id, { isActive: !item.isActive }).catch(() => alert("Error"))}
                className={`text-[10px] px-2 py-0.5 rounded ${item.isActive ? "bg-green-100 text-green-800" : "bg-stone-200"}`}
              >
                {item.isActive ? "Activo" : "Inactivo"}
              </button>
              <button type="button" onClick={() => deleteAboutValue(item.id).catch(() => alert("Error"))} className="text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <form onSubmit={handleAddValue} className="border-t border-[var(--border)] pt-4 space-y-2">
          <select value={newValueIcon} onChange={(e) => setNewValueIcon(e.target.value)} className="text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]">
            {VALUE_ICON_OPTIONS.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
          <input value={newValueTitle} onChange={(e) => setNewValueTitle(e.target.value)} placeholder="Título del valor" className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" required />
          <textarea value={newValueDescription} onChange={(e) => setNewValueDescription(e.target.value)} placeholder="Descripción" rows={2} className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" required />
          <button type="submit" className="inline-flex items-center gap-1 bg-amber-500 text-stone-950 text-[10px] font-bold px-3 py-1.5 rounded uppercase">
            <Plus className="w-3.5 h-3.5" /> Añadir valor
          </button>
        </form>
      </div>

      <div className="admin-card border p-6 rounded-xl space-y-4">
        <div>
          <h2 className="font-sans font-extrabold text-sm uppercase tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4 text-[var(--accent)]" />
            Asesores expertos
          </h2>
          <p className="text-[10px] text-[var(--text-s)] font-mono mt-1">
            Cantidad ilimitada · Carrusel automático infinito en /#/about · {data.advisors.length} registrado(s), {activeAdvisors.length} visible(s)
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input value={advisorsEyebrow} onChange={(e) => setAdvisorsEyebrow(e.target.value)} placeholder="Etiqueta" className="text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" />
          <input value={advisorsHeading} onChange={(e) => setAdvisorsHeading(e.target.value)} placeholder="Título" className="text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" />
          <textarea value={advisorsDescription} onChange={(e) => setAdvisorsDescription(e.target.value)} placeholder="Descripción de la sección" rows={2} className="md:col-span-2 text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" />
        </div>

        <div className="border border-[var(--border)] rounded-lg max-h-[420px] overflow-y-auto divide-y divide-[var(--border)]">
          {data.advisors.length === 0 ? (
            <p className="p-4 text-xs text-[var(--text-s)]">Aún no hay asesores. Agrega el primero con el formulario inferior.</p>
          ) : (
            data.advisors.map((advisor, index) => (
              <div key={advisor.id} className="flex gap-3 p-3 text-xs">
                <img
                  src={advisor.imageUrl}
                  alt=""
                  className="w-14 h-14 rounded object-cover shrink-0 bg-stone-100"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-bold truncate">{advisor.name}</div>
                  <div className="text-[10px] text-amber-700 font-mono uppercase truncate">{advisor.role}</div>
                  <p className="text-[var(--text-s)] line-clamp-2 mt-0.5">{advisor.bio}</p>
                  <span className="text-[9px] font-mono text-[var(--text-s)] opacity-70">Orden #{index + 1}</span>
                </div>
                <div className="flex flex-col gap-1 shrink-0">
                  <button type="button" onClick={() => startEditAdvisor(advisor.id)} className="text-[10px] px-2 py-0.5 rounded bg-[var(--bg)] border border-[var(--border)]">
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => updateExpertAdvisor(advisor.id, { isActive: !advisor.isActive }).catch(() => alert("Error"))}
                    className={`text-[10px] px-2 py-0.5 rounded ${advisor.isActive ? "bg-green-100 text-green-800" : "bg-stone-200"}`}
                  >
                    {advisor.isActive ? "Visible" : "Oculto"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteAdvisor(advisor.id, advisor.name)}
                    className="text-red-500 p-1 self-end"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {editingAdvisorId && (
          <div className="border border-[var(--accent)] rounded-lg p-4 space-y-2 bg-[var(--bg)]/50">
            <h3 className="font-bold text-xs uppercase">Editar asesor</h3>
            <input value={editAdvisorName} onChange={(e) => setEditAdvisorName(e.target.value)} placeholder="Nombre" className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--card-bg)]" />
            <input value={editAdvisorRole} onChange={(e) => setEditAdvisorRole(e.target.value)} placeholder="Cargo" className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--card-bg)]" />
            <textarea value={editAdvisorBio} onChange={(e) => setEditAdvisorBio(e.target.value)} placeholder="Biografía" rows={3} className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--card-bg)]" />
            <input value={editAdvisorImageUrl} onChange={(e) => setEditAdvisorImageUrl(e.target.value)} placeholder="URL de imagen" className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--card-bg)]" />
            <label className="inline-flex items-center gap-1.5 text-[10px] cursor-pointer text-[var(--accent)] font-semibold">
              <Upload className="w-3.5 h-3.5" />
              Subir foto al servidor
              <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleAdvisorUpload(e.target.files[0], "edit")} />
            </label>
            {editAdvisorImageUrl && <img src={editAdvisorImageUrl} alt="" className="h-20 w-auto object-cover rounded" />}
            <div className="flex gap-2">
              <button type="button" onClick={saveEditAdvisor} className="text-[10px] font-bold px-3 py-1.5 rounded bg-[var(--accent)] text-white uppercase">
                Guardar cambios
              </button>
              <button type="button" onClick={() => setEditingAdvisorId(null)} className="text-[10px] px-3 py-1.5 rounded border border-[var(--border)]">
                Cancelar
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleCreateAdvisor} className="border-t border-[var(--border)] pt-4 space-y-2">
          <h3 className="font-bold text-xs uppercase">Agregar otro asesor (sin límite)</h3>
          <input value={advisorName} onChange={(e) => setAdvisorName(e.target.value)} placeholder="Nombre completo" className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" required />
          <input value={advisorRole} onChange={(e) => setAdvisorRole(e.target.value)} placeholder="Cargo / rol" className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" required />
          <textarea value={advisorBio} onChange={(e) => setAdvisorBio(e.target.value)} placeholder="Biografía" rows={3} className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" required />
          <input value={advisorImageUrl} onChange={(e) => setAdvisorImageUrl(e.target.value)} placeholder="URL de imagen (o subir archivo)" className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" required />
          <label className="inline-flex items-center gap-1.5 text-[10px] cursor-pointer text-[var(--accent)] font-semibold">
            <Upload className="w-3.5 h-3.5" />
            Subir foto al servidor
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleAdvisorUpload(e.target.files[0], "new")} />
          </label>
          {advisorImageUrl && <img src={advisorImageUrl} alt="" className="h-24 w-auto object-cover rounded" />}
          <button type="submit" className="inline-flex items-center gap-1 bg-amber-500 text-stone-950 text-[10px] font-bold px-3 py-1.5 rounded uppercase">
            <Plus className="w-3.5 h-3.5" /> Añadir asesor al carrusel
          </button>
        </form>
      </div>

      <button
        type="button"
        onClick={savePage}
        className="inline-flex items-center gap-1.5 bg-[var(--accent)] text-white text-xs font-bold px-5 py-2.5 rounded uppercase"
      >
        <Save className="w-3.5 h-3.5" />
        Guardar textos de la página
      </button>
    </div>
  );
};
