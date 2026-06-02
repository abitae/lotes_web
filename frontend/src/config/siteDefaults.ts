/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AboutData, ContactFormConfig, GuaranteesData, HomeAlertModal, SiteSettings } from "../types";

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  logoUrl: null,
  faviconUrl: null,
  siteName: "Lotes en Remate",
  siteTagline: "Somos parte de tus sueños",
  browserTitle: "Lotes en Remate | Somos parte de tus sueños",
  footerTagline: "Somos parte de tus sueños",
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

export const DEFAULT_ABOUT: AboutData = {
  page: {
    heroEyebrow: "Nuestra Filosofía",
    heroHeading: "Redefiniendo el Acceso a la Tierra en el Perú",
    heroDescription:
      "Ayudamos a las familias peruanas y pequeños empresarios a adquirir patrimonio predial legítimo e independizado ante registros públicos, eliminando la informalidad y la especulación usurera tradicional.",
    heroBackgroundImageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600",
    missionHeading: "Nuestra Misión",
    missionDescription:
      "Democratizar la adjudicación de terrenos y predios de remates públicos o liquidaciones con total transparencia jurídica y facilidades de financiamiento directo. Garantizamos que cada centavo depositado por nuestros clientes se traduzca en propiedad registrada, lista para heredar o edificar.",
    visionHeading: "Nuestra Visión",
    visionDescription:
      "Ser reconocidos al 2030 como la marca de desarrollo urbano y corretaje de terrenos más íntegra, segura y preferida de Sudamérica. Nos esforzamos por habilitar proyectos sostenibles que aporten verdadero valor arquitectónico, acceso seguro a servicios básicos y hermosas áreas verdes recreativas.",
    valuesEyebrow: "Pilares Organizacionales",
    valuesHeading: "Valores que Respaldan su Depósito",
    valuesDescription:
      "Navegar con probidad bajo las rigurosas regulaciones registrales de Sunarp en el Perú es nuestro compromiso fundacional.",
    advisorsEyebrow: "Asesores Expertos",
    advisorsHeading: "Conoce a la Mesa de Adjudicación",
    advisorsDescription:
      "Especialistas de primer nivel con amplia trayectoria en derecho registral corporativo e ingeniería civil de habilitaciones urbanas en el Perú.",
  },
  values: [
    {
      id: "default-v1",
      icon: "Award",
      title: "Seguridad Jurídica",
      description:
        "No comercializamos propiedades posesorias de dudosa procedencia jurídica. Cada centímetro cuadrado de nuestro catálogo cuenta con expedientes aprobados e inscritos de forma individual.",
      sortOrder: 0,
      isActive: true,
    },
    {
      id: "default-v2",
      icon: "ShieldAlert",
      title: "Transparencia Administrativa",
      description:
        "Nuestros precios son directos y están libres de costos encubiertos de liquidación. Facilitamos las copias literales y documentos de dominio de forma abierta previo a cualquier abono de separación.",
      sortOrder: 1,
      isActive: true,
    },
    {
      id: "default-v3",
      icon: "HeartHandshake",
      title: "Planificación y Sostenibilidad",
      description:
        "Diseñamos los condominios playeros y campestres preservando las áreas de protección forestal, gestionando la provisión racional de recursos hídricos y velando por zonas comunales óptimas.",
      sortOrder: 2,
      isActive: true,
    },
  ],
  advisors: [
    {
      id: "default-a1",
      name: "Dr. Hernando de Soto Prado",
      role: "Director de Asuntos Legales Registrales (SUNARP)",
      bio: "Especialista con más de 15 años de experiencia en saneamiento inmobiliario físico legal, independización de predios suburbanos e hipotecas bancarias corporativas.",
      imageUrl:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
      sortOrder: 0,
      isActive: true,
    },
    {
      id: "default-a2",
      name: "Ing. Sandra Montenegro Cisneros",
      role: "Jefe Corporativo de Habilitación Urbana y Geotecnia",
      bio: "Encargada del replanteo topográfico computarizado, trazado vial georreferenciado e ingeniería estructural para la captación garantizada de servicios domésticos.",
      imageUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
      sortOrder: 1,
      isActive: true,
    },
    {
      id: "default-a3",
      name: "Mg. Milton Alarcón Seminario",
      role: "Gerente General de Adjudicaciones Inmobiliarias",
      bio: "Experto en análisis de rentabilidad predial, tasaciones notariales por subasta y diseño de planes de financiamiento directo adaptados a la AFP y CTS de microinversionistas.",
      imageUrl:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600",
      sortOrder: 2,
      isActive: true,
    },
  ],
};

export const DEFAULT_HOME_ALERT: HomeAlertModal = {
  isEnabled: false,
  title: "Aviso importante",
  description: "Consulte nuestras promociones vigentes y proyectos con entrega inmediata.",
  imageUrl: null,
  videoUrl: null,
  buttonText: "Ver catálogo",
  buttonLink: "/catalog",
  updatedAt: new Date(0).toISOString(),
};

export function getContactFormBySlug(forms: ContactFormConfig[], slug: string): ContactFormConfig {
  return forms.find((f) => f.slug === slug) ?? DEFAULT_CONTACT_FORMS.find((f) => f.slug === slug)!;
}
