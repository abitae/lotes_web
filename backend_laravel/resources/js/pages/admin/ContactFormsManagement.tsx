/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { getContactFormBySlug } from "../../config/siteDefaults";
import { Save } from "lucide-react";

const FORM_SLUG = "contact_consulta";

export const ContactFormsManagement: React.FC = () => {
  const { contactForms, updateContactForm } = useApp();
  const form = getContactFormBySlug(contactForms, FORM_SLUG);

  const [formTitle, setFormTitle] = useState(form.formTitle);
  const [formSubtitle, setFormSubtitle] = useState(form.formSubtitle);
  const [submitLabel, setSubmitLabel] = useState(form.submitLabel);
  const [successTitle, setSuccessTitle] = useState(form.successTitle);
  const [successMessage, setSuccessMessage] = useState(form.successMessage);
  const [defaultMessage, setDefaultMessage] = useState(form.defaultMessage);
  const [defaultProjectInterest, setDefaultProjectInterest] = useState(form.defaultProjectInterest);
  const [sectionEyebrow, setSectionEyebrow] = useState(form.sectionEyebrow ?? "");
  const [sectionHeading, setSectionHeading] = useState(form.sectionHeading ?? "");
  const [sectionDescription, setSectionDescription] = useState(form.sectionDescription ?? "");
  const [bulletsText, setBulletsText] = useState((form.bullets ?? []).map((b) => b.text).join("\n"));

  React.useEffect(() => {
    const f = getContactFormBySlug(contactForms, FORM_SLUG);
    setFormTitle(f.formTitle);
    setFormSubtitle(f.formSubtitle);
    setSubmitLabel(f.submitLabel);
    setSuccessTitle(f.successTitle);
    setSuccessMessage(f.successMessage);
    setDefaultMessage(f.defaultMessage);
    setDefaultProjectInterest(f.defaultProjectInterest);
    setSectionEyebrow(f.sectionEyebrow ?? "");
    setSectionHeading(f.sectionHeading ?? "");
    setSectionDescription(f.sectionDescription ?? "");
    setBulletsText((f.bullets ?? []).map((b) => b.text).join("\n"));
  }, [contactForms]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateContactForm(FORM_SLUG, {
        formTitle,
        formSubtitle,
        submitLabel,
        successTitle,
        successMessage,
        defaultMessage,
        defaultProjectInterest,
        sectionEyebrow: sectionEyebrow || null,
        sectionHeading: sectionHeading || null,
        sectionDescription: sectionDescription || null,
        bullets: bulletsText.split("\n").filter(Boolean).map((text) => ({ text })),
      });
    } catch {
      alert("No se pudo guardar el formulario.");
    }
  };

  return (
    <div id="admin-forms-management" className="p-6 md:p-8 space-y-6 text-left">
      <section>
        <h1 className="font-sans font-extrabold text-2xl text-[var(--text-p)]">FORMULARIO DE CONTACTO</h1>
        <p className="font-mono text-[10px] text-[var(--text-s)] mt-1 uppercase">
          Usado en la página de inicio (sección Comunícate hoy) y en la página de contacto
        </p>
      </section>

      <form onSubmit={handleSave} className="admin-card border p-6 rounded-xl space-y-4 max-w-3xl">
        <div className="space-y-3 pb-4 border-b border-[var(--border)]">
          <p className="text-[10px] font-mono uppercase text-[var(--text-s)] font-bold">Sección lateral — Inicio</p>
          <input value={sectionEyebrow} onChange={(e) => setSectionEyebrow(e.target.value)} placeholder="Etiqueta (ej. Comunícate hoy)" className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" />
          <input value={sectionHeading} onChange={(e) => setSectionHeading(e.target.value)} placeholder="Título de la sección" className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" />
          <textarea value={sectionDescription} onChange={(e) => setSectionDescription(e.target.value)} placeholder="Descripción de la sección" rows={2} className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" />
          <textarea value={bulletsText} onChange={(e) => setBulletsText(e.target.value)} placeholder="Viñetas (una por línea, use **texto** para negrita)" rows={3} className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" />
        </div>

        <div className="space-y-3 pb-4 border-b border-[var(--border)]">
          <p className="text-[10px] font-mono uppercase text-[var(--text-s)] font-bold">Formulario</p>
          <input value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="Título del formulario" className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" required />
          <textarea value={formSubtitle} onChange={(e) => setFormSubtitle(e.target.value)} placeholder="Subtítulo" rows={2} className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" required />
          <input value={submitLabel} onChange={(e) => setSubmitLabel(e.target.value)} placeholder="Texto botón enviar" className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" required />
        </div>

        <div className="space-y-3">
          <p className="text-[10px] font-mono uppercase text-[var(--text-s)] font-bold">Mensajes y valores por defecto</p>
          <input value={successTitle} onChange={(e) => setSuccessTitle(e.target.value)} placeholder="Título mensaje éxito" className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" required />
          <textarea value={successMessage} onChange={(e) => setSuccessMessage(e.target.value)} placeholder="Mensaje éxito" rows={2} className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" required />
          <input value={defaultProjectInterest} onChange={(e) => setDefaultProjectInterest(e.target.value)} placeholder="Interés por defecto si no elige proyecto" className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" />
          <textarea value={defaultMessage} onChange={(e) => setDefaultMessage(e.target.value)} placeholder="Mensaje por defecto" rows={2} className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" />
        </div>

        <button type="submit" className="inline-flex items-center gap-1 bg-[var(--accent)] text-white text-xs font-bold px-4 py-2 rounded uppercase">
          <Save className="w-3.5 h-3.5" /> Guardar formulario
        </button>
      </form>
    </div>
  );
};
