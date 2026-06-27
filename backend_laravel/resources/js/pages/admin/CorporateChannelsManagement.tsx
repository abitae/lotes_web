/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import type { ChannelType } from "../../types";
import { Plus, Trash2 } from "lucide-react";

export const CorporateChannelsManagement: React.FC = () => {
  const { channels, addChannel, updateChannel, deleteChannel } = useApp();

  const [channelType, setChannelType] = useState<ChannelType>("phone");
  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");
  const [extraInfo, setExtraInfo] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label || !value) return;
    try {
      await addChannel({
        channelType,
        label,
        value,
        extraInfo: extraInfo || null,
        sortOrder: channels.length,
        isActive: true,
      });
      setLabel("");
      setValue("");
      setExtraInfo("");
    } catch {
      alert("No se pudo crear el canal.");
    }
  };

  return (
    <div id="admin-channels-management" className="p-6 md:p-8 space-y-6 text-left">
      <section>
        <h1 className="font-sans font-extrabold text-2xl text-[var(--text-p)]">CANALES CORPORATIVOS</h1>
        <p className="font-mono text-[10px] text-[var(--text-s)] mt-1 uppercase">
          Se muestran en /contact y en el Footer del portal
        </p>
      </section>

      <div className="space-y-2">
        {channels.map((ch) => (
          <div key={ch.id} className="admin-card border p-4 rounded-xl flex items-start justify-between gap-3 text-xs">
            <div>
              <span className="font-mono text-[10px] uppercase text-[var(--accent)]">{ch.channelType}</span>
              <div className="font-bold">{ch.label}</div>
              <div>{ch.value}</div>
              {ch.extraInfo && <div className="text-[var(--text-s)]">{ch.extraInfo}</div>}
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                onClick={() => updateChannel(ch.id, { isActive: !ch.isActive }).catch(() => alert("Error"))}
                className={`text-[10px] px-2 py-0.5 rounded ${ch.isActive ? "bg-green-100 text-green-800" : "bg-stone-200"}`}
              >
                {ch.isActive ? "Activo" : "Inactivo"}
              </button>
              <button type="button" onClick={() => deleteChannel(ch.id).catch(() => alert("Error"))} className="text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleCreate} className="admin-card border p-6 rounded-xl space-y-3 max-w-xl">
        <h2 className="font-bold text-xs uppercase">Nuevo canal</h2>
        <select value={channelType} onChange={(e) => setChannelType(e.target.value as ChannelType)} className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]">
          <option value="address">Dirección</option>
          <option value="phone">Teléfono</option>
          <option value="email">Email</option>
          <option value="whatsapp">WhatsApp</option>
        </select>
        <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Etiqueta" className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" required />
        <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Valor" className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" required />
        <input value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)} placeholder="Info extra (horario, mensaje WA)" className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" />
        <button type="submit" className="inline-flex items-center gap-1 bg-[var(--accent)] text-white text-xs font-bold px-3 py-1.5 rounded uppercase">
          <Plus className="w-3.5 h-3.5" /> Añadir canal
        </button>
      </form>
    </div>
  );
};
