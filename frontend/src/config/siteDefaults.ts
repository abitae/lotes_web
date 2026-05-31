/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ContactFormConfig, GuaranteesData, SiteSettings } from "../types";

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  logoUrl: null,
  faviconUrl: null,
  siteName: "Lotes en Remate",
  siteTagline: "Inversión.pe",
  browserTitle: "Lotes en Remate | Inversión Segura en Terrenos",
  footerTagline: "Inversión Segura",
  footerDescription:
    "La plataforma líder en el Perú para la adquisición, inversión y adjudicación de terrenos con alta plusvalía y total seguridad jurídica.",
};

export const DEFAULT_GUARANTEES: GuaranteesData = {
  section: {
    eyebrow: "Garantías de Compra",
    heading: "¿Por qué somos la mejor opción de inversión?",
    description:
      "Respaldamos su depósito bancario a través de procesos registrales sólidos y convenios con notarías autorizadas del Perú.",
    backgroundImageUrl:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600",
  },
  items: [
    {
      id: "default-1",
      icon: "ShieldCheck",
      title: "100% Inscritos en SUNARP",
      description:
        "Todas las propiedades constan con partidas registrales independientes, planos aprobados por municipalidades o gobiernos distritales habilitantes, y están libres de cargas.",
      sortOrder: 0,
      isActive: true,
    },
    {
      id: "default-2",
      icon: "TrendingUp",
      title: "Alta Plusvalía Garantizada",
      description:
        "Ubicados de forma estratégica en corredores de rápido crecimiento industrial, agropecuario, turístico y vial cercanos a aeropuertos, playas y puertos.",
      sortOrder: 1,
      isActive: true,
    },
    {
      id: "default-3",
      icon: "Gem",
      title: "Crédito Directo Flex",
      description:
        "Facilidades de financiamiento directo para que escoja el plan más cómodo según sus posibilidades.",
      sortOrder: 2,
      isActive: true,
    },
  ],
};

export const DEFAULT_CONTACT_FORMS: ContactFormConfig[] = [
  {
    slug: "contact_consulta",
    formTitle: "Formulario de Consulta Directa",
    formSubtitle:
      "Su mensaje será redirigido al asesor especializado en la zona geográfica de su interés de forma automatizada por CRM.",
    submitLabel: "Enviar Consulta al CRM",
    successTitle: "¡Datos Registrados con Éxito!",
    successMessage:
      "Hemos agendado tu consulta con prioridad de visitas. Un especialista te contactará de inmediato por WhatsApp.",
    defaultMessage: "Hola, deseo ponerme en contacto con un asesor para agendar una cita.",
    defaultProjectInterest: "Contacto General",
    sectionEyebrow: "Comunícate hoy",
    sectionHeading: "¿Listo para asegurar tu estabilidad patrimonial?",
    sectionDescription:
      "Rellena el formulario de contacto. Nuestro equipo de asesores senior te atenderá de forma inmediata por WhatsApp o teléfono.",
    bullets: [
      { text: "**Información Veraz**: Datos registrales directos y actualizados." },
      { text: "**Visitas organizadas los fines de semana**: Movilidad ejecutiva privada gratuita desde Lima ida y vuelta." },
    ],
  },
];

export function getContactFormBySlug(forms: ContactFormConfig[], slug: string): ContactFormConfig {
  return forms.find((f) => f.slug === slug) ?? DEFAULT_CONTACT_FORMS.find((f) => f.slug === slug)!;
}
