/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { DEFAULT_GUARANTEES } from "../../config/siteDefaults";
import { Plus, Save, Trash2 } from "lucide-react";

const ICON_OPTIONS = ["ShieldCheck", "TrendingUp", "Gem", "CheckCircle", "Award", "Star"];

export const GuaranteesTab: React.FC = () => {
  const { guarantees, updateGuaranteeSection, addGuaranteeItem, updateGuaranteeItem, deleteGuaranteeItem } = useApp();
  const data = guarantees ?? DEFAULT_GUARANTEES;

  const [eyebrow, setEyebrow] = useState(data.section.eyebrow);
  const [heading, setHeading] = useState(data.section.heading);
  const [description, setDescription] = useState(data.section.description);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(data.section.backgroundImageUrl);

  const [newIcon, setNewIcon] = useState("ShieldCheck");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  React.useEffect(() => {
    setEyebrow(data.section.eyebrow);
    setHeading(data.section.heading);
    setDescription(data.section.description);
    setBackgroundImageUrl(data.section.backgroundImageUrl);
  }, [data.section]);

  const saveSection = async () => {
    try {
      await updateGuaranteeSection({ eyebrow, heading, description, backgroundImageUrl });
    } catch {
      alert("No se pudo guardar la sección.");
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDescription) return;
    try {
      await addGuaranteeItem({
        icon: newIcon,
        title: newTitle,
        description: newDescription,
        sortOrder: data.items.length,
        isActive: true,
      });
      setNewTitle("");
      setNewDescription("");
    } catch {
      alert("No se pudo crear la tarjeta.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="admin-card border p-6 rounded-xl space-y-4">
        <h2 className="font-sans font-extrabold text-sm uppercase tracking-wider">Sección Garantías de Compra</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input value={eyebrow} onChange={(e) => setEyebrow(e.target.value)} placeholder="Etiqueta" className="text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" />
          <input value={heading} onChange={(e) => setHeading(e.target.value)} placeholder="Título" className="text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción" rows={2} className="md:col-span-2 text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" />
          <input value={backgroundImageUrl} onChange={(e) => setBackgroundImageUrl(e.target.value)} placeholder="URL imagen de fondo" className="md:col-span-2 text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" />
        </div>
        <button type="button" onClick={saveSection} className="inline-flex items-center gap-1 bg-[var(--accent)] text-white text-xs font-bold px-3 py-1.5 rounded uppercase">
          <Save className="w-3.5 h-3.5" /> Guardar sección
        </button>
      </div>

      <div className="admin-card border p-6 rounded-xl space-y-4">
        <h3 className="font-sans font-bold text-xs uppercase">Tarjetas de garantía</h3>
        <div className="space-y-2">
          {data.items.map((item) => (
            <div key={item.id} className="flex items-start gap-2 p-3 border border-[var(--border)] rounded-lg text-xs">
              <div className="flex-1 space-y-1">
                <div className="font-mono text-[10px] text-[var(--text-s)]">{item.icon}</div>
                <div className="font-bold">{item.title}</div>
                <div className="text-[var(--text-s)]">{item.description}</div>
              </div>
              <button type="button" onClick={() => deleteGuaranteeItem(item.id).catch(() => alert("Error al eliminar"))} className="p-1 text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => updateGuaranteeItem(item.id, { isActive: !item.isActive }).catch(() => alert("Error"))}
                className={`text-[10px] px-2 py-0.5 rounded ${item.isActive ? "bg-green-100 text-green-800" : "bg-stone-200 text-stone-600"}`}
              >
                {item.isActive ? "Activo" : "Inactivo"}
              </button>
            </div>
          ))}
        </div>

        <form onSubmit={handleAddItem} className="border-t border-[var(--border)] pt-4 space-y-2">
          <select value={newIcon} onChange={(e) => setNewIcon(e.target.value)} className="text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]">
            {ICON_OPTIONS.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
          <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Título tarjeta" className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" required />
          <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Descripción" rows={2} className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" required />
          <button type="submit" className="inline-flex items-center gap-1 bg-amber-500 text-stone-950 text-[10px] font-bold px-3 py-1.5 rounded uppercase">
            <Plus className="w-3.5 h-3.5" /> Añadir tarjeta
          </button>
        </form>
      </div>
    </div>
  );
};
