/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Phone, Mail, MapPin, Send, HelpCircle, ChevronDown, CheckCircle2, MessageSquare } from "lucide-react";

export const Contacto: React.FC = () => {
  const { projects, addInquiry } = useApp();

  // Form State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [projectInterest, setProjectInterest] = useState("");
  const [message, setMessage] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  // FAQ Active Accordion state
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(0);

  const faqData = [
    {
      q: "¿Todos los lotes tienen título de propiedad e independización en SUNARP?",
      a: "Sí, absolutamente. Lotesenremate.pe se distingue por ofrecer única y exclusivamente lotes independizados con partida registral propia e individualizada registrada debidamente en la Superintendencia Nacional de los Registros Públicos (SUNARP) del Perú. No trabajamos con contratos de posesión simple ni asambleas ejidales.",
    },
    {
      q: "¿En qué consisten las visitas guiadas gratuitas de fin de semana?",
      a: "Todos los sábados y domingos por la mañana, disponemos de buses ejecutivos privados gratuitos que parten desde dos puntos estratégicos de Lima (San Isidro y Lima Norte / Plaza Norte) ida y vuelta. En el trayecto proporcionamos desayuno de cortesía y nuestros asesores senior le explicarán todos los pormenores y documentos del proyecto en campo.",
    },
    {
      q: "¿Ofrecen opciones de financiamiento y crédito directo sin evaluación de bancos?",
      a: "Sí, contamos con un sistema de Habilitación y Crédito Directo Flex de firmas notariales simples. Puede separar su lote con una cuota inicial mínima del 20% y pagar el saldo remanente en cómodas cuotas de hasta 12 o 24 meses libres de evaluación crediticia bancaria rigurosa o reportes de Infocorp.",
    },
    {
      q: "¿Qué sucede si decido mudarme o construir de inmediato mi casa?",
      a: "En el caso de proyectos de entrega inmediata o lotes urbanos habilitados, usted puede iniciar la construcción de su vivienda al día siguiente del abono inicial y la firma de la minuta de compraventa notarial. Adicionalmente, el equipo de ingeniería Civil le obsequia un set completo estándar de planos arquitectónicos pre-aprobados.",
    },
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email) return;

    try {
      await addInquiry({
        fullName,
        phone,
        email,
        projectInterest: projectInterest || "Contacto General",
        message: message || "Hola, deseo ponerme en contacto con un asesor para agendar una cita.",
      });

      setFormSuccess(true);
      setFullName("");
      setPhone("");
      setEmail("");
      setProjectInterest("");
      setMessage("");

      setTimeout(() => {
        setFormSuccess(false);
      }, 5000);
    } catch {
      // error handled globally
    }
  };

  const handleFaqToggle = (idx: number) => {
    setActiveFaqIdx(activeFaqIdx === idx ? null : idx);
  };

  return (
    <div id="contacto-page" className="pt-24 min-h-screen bg-stone-50/30 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Title Block */}
        <section className="mb-12 space-y-2">
          <span className="font-mono text-2xs text-amber-705 tracking-wider uppercase font-semibold">
            Canales de Atención 24/7
          </span>
          <h1 className="text-3xl font-sans font-extrabold text-emerald-950 tracking-tight">
            Contacta con Nuestros Expertos
          </h1>
          <p className="text-stone-500 text-xs md:text-sm font-light">
            Solicita la programación gratuita de tu traslado ejecutivo privado de fin de semana para presenciar tu lote ideal.
          </p>
        </section>

        {/* Contact Page Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left columns: Form (Span 7) */}
          <main className="lg:col-span-7 bg-white border border-stone-200/65 p-6 sm:p-10 rounded-2xl premium-card-shadow">
            <h2 className="font-sans font-extrabold text-xl text-emerald-950 mb-2">
              Formulario de Consulta Directa
            </h2>
            <p className="text-xs text-stone-500 font-light mb-8">
              Su mensaje será redirigido al asesor especializado en la zona geográfica de su interés de forma automatizada por CRM.
            </p>

            {formSuccess ? (
              <div className="bg-emerald-50 border border-emerald-250 text-emerald-900 rounded-xl p-8 space-y-4 text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-850">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-sans font-extrabold text-sm uppercase">
                    ¡Datos Registrados con Éxito!
                  </h3>
                  <p className="text-xs font-light max-w-sm mx-auto leading-relaxed">
                    Hemos agendado tu consulta con prioridad de visitas. Un especialista te contactará de inmediato por WhatsApp para enviarte las coordenadas y partidas de remate.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="space-y-1">
                  <label className="block text-2xs font-mono font-bold uppercase tracking-wider text-stone-500">
                    Nombres y Apellidos
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Juan Manuel Ramos"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-850 focus:bg-white p-3 rounded-lg text-xs outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-2xs font-mono font-bold uppercase tracking-wider text-stone-500">
                      Celular / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="987654321"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-850 focus:bg-white p-3 rounded-lg text-xs outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-2xs font-mono font-bold uppercase tracking-wider text-stone-500">
                      Email de contacto
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ejemplo@correo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-850 focus:bg-white p-3 rounded-lg text-xs outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-2xs font-mono font-bold uppercase tracking-wider text-stone-500">
                    Sede / Terreno de interés
                  </label>
                  <select
                    value={projectInterest}
                    onChange={(e) => setProjectInterest(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-850 focus:bg-white p-3 rounded-lg text-xs outline-none transition-all cursor-pointer"
                  >
                    <option value="">Prefiero agendar una cita libre o consulta general...</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.title}>
                        {p.title} - S/. {p.priceSoles.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-2xs font-mono font-bold uppercase tracking-wider text-stone-500">
                    ¿Cuáles son tus principales dudas legales/financieras?
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Escriba aquí sus requerimientos específicos, dudas o días de visita guiada que prefiere agendar..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-850 focus:bg-white p-3 rounded-lg text-xs outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-stone-900 hover:bg-emerald-950 text-white font-sans font-extrabold text-xs py-3.5 px-6 rounded-lg uppercase tracking-widest transition-transform shadow"
                >
                  Confirmar agendas de Visitas
                </button>
              </form>
            )}
          </main>

          {/* Right side columns: Accordions FAQ and direct triggers (Span 5) */}
          <aside className="lg:col-span-5 space-y-8 flex flex-col justify-start">
            
            {/* Direct contact channels card */}
            <div className="bg-emerald-950 text-white p-6 sm:p-8 rounded-2xl border border-stone-800 space-y-6 premium-card-shadow">
              <div className="space-y-1 text-left">
                <span className="font-mono text-3xs text-amber-400 uppercase tracking-widest font-semibold block">
                  Canales Corporativos
                </span>
                <h3 className="font-sans font-extrabold text-base tracking-tight">
                  Atención Inmediata Remates
                </h3>
              </div>

              <div className="space-y-4">
                {/* Channel 1 */}
                <div className="flex gap-4 items-start text-left text-xs sm:text-sm font-sans font-light">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-200">Sede San Isidro Principal:</strong>
                    <span className="text-stone-300">Av. Javier Prado Este 488, San Isidro, Lima, Perú (Frente al centro financiero)</span>
                  </div>
                </div>

                {/* Channel 2 */}
                <div className="flex gap-4 items-start text-left text-xs sm:text-sm font-sans font-light">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-200">Central Telefónica Directa:</strong>
                    <a href="tel:+5116805120" className="text-stone-300 hover:text-white hover:underline block">
                      (01) 680-5120 (Mon - Sun, 8am - 8pm)
                    </a>
                  </div>
                </div>

                {/* Channel 3 */}
                <div className="flex gap-4 items-start text-left text-xs sm:text-sm font-sans font-light">
                  <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-200">Canal de Ventas Legal:</strong>
                    <a href="mailto:informes@lotesenremate.pe" className="text-stone-300 hover:text-white hover:underline block">
                      informes@lotesenremate.pe
                    </a>
                  </div>
                </div>
              </div>

              {/* Whatsapp trigger action */}
              <div className="pt-4 border-t border-emerald-900">
                <a
                  href="https://wa.me/51987654321?text=Hola,%20solicito%20detalles%20de%20los%20lotes%20en%20remate"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex justify-center items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-sans font-extrabold text-xs py-3 rounded-lg uppercase tracking-wider transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-amber-400 shrink-0" />
                  Contactar Asesor Senior por WhatsApp
                </a>
              </div>
            </div>

            {/* Accordion list FAQ block */}
            <div className="space-y-4 text-left">
              <h3 className="font-sans font-extrabold text-sm uppercase tracking-wider text-emerald-950 flex items-center gap-1.5 mb-2 pl-1">
                <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                Preguntas Frecuentes
              </h3>

              <div className="space-y-2.5">
                {faqData.map((faq, idx) => {
                  const isOpen = activeFaqIdx === idx;
                  return (
                    <article
                      key={idx}
                      className="bg-white border border-stone-200/60 rounded-xl overflow-hidden premium-card-shadow transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => handleFaqToggle(idx)}
                        className="w-full flex items-center justify-between p-4 font-sans font-semibold text-xs sm:text-sm text-stone-850 hover:bg-stone-50/50 text-left cursor-pointer focus:outline-none"
                      >
                        <span className="pr-4">{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-stone-500 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      
                      {isOpen && (
                        <div className="px-4 pb-4 font-sans font-light text-xs text-stone-500 leading-relaxed border-t border-stone-100/50 pt-3 bg-stone-50/30">
                          {faq.a}
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
