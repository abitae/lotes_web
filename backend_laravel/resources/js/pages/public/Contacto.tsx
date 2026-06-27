/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { getContactFormBySlug } from "../../config/siteDefaults";
import { formatProjectInterestLabel } from "../../utils/projects";
import type { CorporateChannel } from "../../types";
import { Phone, Mail, MapPin, Send, HelpCircle, ChevronDown, CheckCircle2, MessageSquare } from "lucide-react";

function channelIcon(type: CorporateChannel["channelType"]) {
  if (type === "phone" || type === "whatsapp") return Phone;
  if (type === "email") return Mail;
  return MapPin;
}

export const Contacto: React.FC = () => {
  const { projects, addInquiry, contactForms, channels, faqs } = useApp();
  const contactForm = getContactFormBySlug(contactForms, "contact_consulta");
  const activeChannels = channels.filter((c) => c.isActive);
  const activeFaqs = faqs.filter((f) => f.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
  const whatsappChannel = activeChannels.find((c) => c.channelType === "whatsapp");
  const listChannels = activeChannels.filter((c) => c.channelType !== "whatsapp");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [projectInterest, setProjectInterest] = useState("");
  const [message, setMessage] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(0);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email) return;

    try {
      await addInquiry({
        fullName,
        phone,
        email,
        projectInterest: projectInterest || contactForm.defaultProjectInterest,
        message: message || contactForm.defaultMessage,
      });

      setFormSuccess(true);
      setFullName("");
      setPhone("");
      setEmail("");
      setProjectInterest("");
      setMessage("");

      setTimeout(() => setFormSuccess(false), 5000);
    } catch {
      /* error handled globally */
    }
  };

  const handleFaqToggle = (idx: number) => {
    setActiveFaqIdx(activeFaqIdx === idx ? null : idx);
  };

  return (
    <div id="contacto-page" className="pt-24 min-h-screen bg-stone-50/30 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="mb-12 space-y-2">
          <span className="font-mono text-2xs text-amber-700 tracking-wider uppercase font-semibold">
            Canales de Atención 24/7
          </span>
          <h1 className="text-3xl font-sans font-extrabold text-emerald-950 tracking-tight">
            Contacta con Nuestros Expertos
          </h1>
          <p className="text-stone-500 text-xs md:text-sm font-light">
            Solicita la programación gratuita de tu traslado ejecutivo privado de fin de semana para presenciar tu lote ideal.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <main className="lg:col-span-7 bg-white border border-stone-200/65 p-6 sm:p-10 rounded-2xl premium-card-shadow">
            <h2 className="font-sans font-extrabold text-xl text-emerald-950 mb-2">
              {contactForm.formTitle}
            </h2>
            <p className="text-xs text-stone-500 font-light mb-8">
              {contactForm.formSubtitle}
            </p>

            {formSuccess ? (
              <div className="bg-emerald-50 border border-emerald-250 text-emerald-900 rounded-xl p-8 space-y-4 text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-850">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-sans font-extrabold text-sm uppercase">{contactForm.successTitle}</h3>
                  <p className="text-xs font-light max-w-sm mx-auto leading-relaxed">{contactForm.successMessage}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="space-y-1">
                  <label className="block text-2xs font-mono font-bold tracking-wide uppercase text-stone-500">Nombres Completos</label>
                  <input type="text" required placeholder="Ej. Juan Pérez Ramos" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-800 focus:bg-white rounded-lg p-2.5 text-xs outline-none transition-colors" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-2xs font-mono font-bold tracking-wide uppercase text-stone-500">Teléfono / WhatsApp</label>
                    <input type="tel" required placeholder="987654321" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-800 focus:bg-white rounded-lg p-2.5 text-xs outline-none transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-2xs font-mono font-bold tracking-wide uppercase text-stone-500">Correo Electrónico</label>
                    <input type="email" required placeholder="tucorreo@outlook.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-800 focus:bg-white rounded-lg p-2.5 text-xs outline-none transition-colors" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-2xs font-mono font-bold tracking-wide uppercase text-stone-500">Proyecto de Interés</label>
                  <select value={projectInterest} onChange={(e) => setProjectInterest(e.target.value)} className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-800 focus:bg-white rounded-lg p-2.5 text-xs outline-none transition-colors">
                    <option value="">Seleccione un proyecto...</option>
                    {projects.map((p) => {
                      const label = formatProjectInterestLabel(p);
                      return (
                        <option key={p.id} value={label}>
                          {label}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-2xs font-mono font-bold tracking-wide uppercase text-stone-500">Mensaje</label>
                  <textarea rows={4} placeholder="Escriba su consulta..." value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-800 focus:bg-white rounded-lg p-2.5 text-xs outline-none transition-colors resize-none" />
                </div>
                <button type="submit" className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-sans font-extrabold text-xs py-3.5 px-6 rounded-lg transition-transform uppercase tracking-wider shadow-sm flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  {contactForm.submitLabel}
                </button>
              </form>
            )}
          </main>

          <aside className="lg:col-span-5 space-y-8 flex flex-col justify-start">
            <div className="surface-dark-emerald p-6 sm:p-8 rounded-2xl border border-on-dark space-y-6 premium-card-shadow">
              <div className="space-y-1 text-left">
                <span className="font-mono text-3xs text-amber-400 uppercase tracking-widest font-semibold block">Canales Corporativos</span>
                <h3 className="font-sans font-extrabold text-base tracking-tight text-white">Atención Inmediata Remates</h3>
              </div>
              <div className="space-y-4">
                {listChannels.map((ch) => {
                  const Icon = channelIcon(ch.channelType);
                  const href = ch.channelType === "phone" ? `tel:${ch.value.replace(/\s/g, "")}` : ch.channelType === "email" ? `mailto:${ch.value}` : undefined;
                  return (
                    <div key={ch.id} className="flex gap-4 items-start text-left text-xs sm:text-sm font-sans font-light text-white">
                      <Icon className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-on-dark-subtle">{ch.label}</strong>
                        {href ? (
                          <a href={href} className="text-on-dark-muted hover:text-white hover:underline block">{ch.value}{ch.extraInfo ? ` (${ch.extraInfo})` : ""}</a>
                        ) : (
                          <span className="text-on-dark-muted">{ch.value}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              {whatsappChannel && (
                <div className="pt-4 border-t border-on-dark">
                  <a
                    href={`https://wa.me/${whatsappChannel.value}?text=${encodeURIComponent(whatsappChannel.extraInfo ?? "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex justify-center items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-sans font-extrabold text-xs py-3 rounded-lg uppercase tracking-wider transition-all"
                  >
                    <MessageSquare className="w-4 h-4 text-amber-400 shrink-0" />
                    {whatsappChannel.label}
                  </a>
                </div>
              )}
            </div>

            <div className="space-y-4 text-left">
              <h3 className="font-sans font-extrabold text-sm uppercase tracking-wider text-emerald-950 flex items-center gap-1.5 mb-2 pl-1">
                <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                Preguntas Frecuentes
              </h3>
              <div className="space-y-2.5">
                {activeFaqs.map((faq, idx) => {
                  const isOpen = activeFaqIdx === idx;
                  return (
                    <article key={faq.id} className="bg-white border border-stone-200/60 rounded-xl overflow-hidden premium-card-shadow transition-colors">
                      <button type="button" onClick={() => handleFaqToggle(idx)} className="w-full flex items-center justify-between p-4 font-sans font-semibold text-xs sm:text-sm text-stone-850 hover:bg-stone-50/50 text-left cursor-pointer focus:outline-none">
                        <span className="pr-4">{faq.question}</span>
                        <ChevronDown className={`w-4 h-4 text-stone-500 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 font-sans font-light text-xs text-stone-500 leading-relaxed border-t border-stone-100/50 pt-3 bg-stone-50/30">
                          {faq.answer}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
