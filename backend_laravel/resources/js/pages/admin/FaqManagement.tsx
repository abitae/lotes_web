/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Plus, Trash2 } from "lucide-react";

export const FaqManagement: React.FC = () => {
  const { faqs, addFaq, updateFaq, deleteFaq } = useApp();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !answer) return;
    try {
      await addFaq({ question, answer, sortOrder: faqs.length, isActive: true });
      setQuestion("");
      setAnswer("");
    } catch {
      alert("No se pudo crear la FAQ.");
    }
  };

  return (
    <div id="admin-faq-management" className="p-6 md:p-8 space-y-6 text-left">
      <section>
        <h1 className="font-sans font-extrabold text-2xl text-[var(--text-p)]">PREGUNTAS FRECUENTES</h1>
        <p className="font-mono text-[10px] text-[var(--text-s)] mt-1 uppercase">Acordeón en la página de Contacto</p>
      </section>

      <div className="space-y-2">
        {faqs.map((faq) => (
          <div key={faq.id} className="admin-card border p-4 rounded-xl text-xs space-y-1">
            <div className="font-bold">{faq.question}</div>
            <div className="text-[var(--text-s)]">{faq.answer}</div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => updateFaq(faq.id, { isActive: !faq.isActive }).catch(() => alert("Error"))}
                className={`text-[10px] px-2 py-0.5 rounded ${faq.isActive ? "bg-green-100 text-green-800" : "bg-stone-200"}`}
              >
                {faq.isActive ? "Activo" : "Inactivo"}
              </button>
              <button type="button" onClick={() => deleteFaq(faq.id).catch(() => alert("Error"))} className="text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleCreate} className="admin-card border p-6 rounded-xl space-y-3 max-w-2xl">
        <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Pregunta" className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" required />
        <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Respuesta" rows={4} className="w-full text-xs p-2 rounded border border-[var(--border)] bg-[var(--bg)]" required />
        <button type="submit" className="inline-flex items-center gap-1 bg-[var(--accent)] text-white text-xs font-bold px-3 py-1.5 rounded uppercase">
          <Plus className="w-3.5 h-3.5" /> Añadir FAQ
        </button>
      </form>
    </div>
  );
};
