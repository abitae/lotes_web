import { randomUUID } from "crypto";
import { pool } from "../config/db.js";

export const DEFAULT_SITE_SETTINGS = {
  logoUrl: null as string | null,
  faviconUrl: null as string | null,
  siteName: "Lotes en Remate",
  siteTagline: "Inversión.pe",
  browserTitle: "Lotes en Remate | Inversión Segura en Terrenos",
  footerTagline: "Inversión Segura",
  footerDescription:
    "La plataforma líder en el Perú para la adquisición, inversión y adjudicación de terrenos con alta plusvalía y total seguridad jurídica. Conectando familias y emprendedores con oportunidades reales de capitalización.",
};

export const DEFAULT_GUARANTEE_SECTION = {
  eyebrow: "Garantías de Compra",
  heading: "¿Por qué somos la mejor opción de inversión?",
  description:
    "Respaldamos su depósito bancario a través de procesos registrales sólidos y convenios con notarías autorizadas del Perú.",
  backgroundImageUrl:
    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600",
};

export const DEFAULT_GUARANTEE_ITEMS = [
  {
    icon: "ShieldCheck",
    title: "100% Inscritos en SUNARP",
    description:
      "Todas las propiedades constan con partidas registrales independientes, planos aprobados por municipalidades o gobiernos distritales habilitantes, y están libres de cargas.",
    sortOrder: 0,
  },
  {
    icon: "TrendingUp",
    title: "Alta Plusvalía Garantizada",
    description:
      "Ubicados de forma estratégica en corredores de rápido crecimiento industrial, agropecuario, turístico y vial cercanos a aeropuertos, playas y puertos.",
    sortOrder: 1,
  },
  {
    icon: "Gem",
    title: "Crédito Directo Flex",
    description:
      "Facilidades de financiamiento directo para que escoja el plan más cómodo según sus posibilidades. Adquiera su lote con firmas notariales simples de cuota inicial.",
    sortOrder: 2,
  },
];

export const DEFAULT_CONTACT_FORMS = [
  {
    slug: "contact_consulta",
    formTitle: "Formulario de Consulta Directa",
    formSubtitle:
      "Su mensaje será redirigido al asesor especializado en la zona geográfica de su interés de forma automatizada por CRM.",
    submitLabel: "Enviar Consulta al CRM",
    successTitle: "¡Datos Registrados con Éxito!",
    successMessage:
      "Hemos agendado tu consulta con prioridad de visitas. Un especialista te contactará de inmediato por WhatsApp para enviarte las coordenadas y partidas de remate.",
    defaultMessage: "Hola, deseo ponerme en contacto con un asesor para agendar una cita.",
    defaultProjectInterest: "Contacto General",
    sectionEyebrow: "Comunícate hoy",
    sectionHeading: "¿Listo para asegurar tu estabilidad patrimonial?",
    sectionDescription:
      "Rellena el formulario de contacto. Nuestro equipo de asesores senior te atenderá de forma inmediata por WhatsApp o teléfono.",
    bullets: [
      { text: "**Información Veraz**: Datos registrales directos y actualizados." },
      {
        text: "**Visitas organizadas los fines de semana**: Movilidad ejecutiva privada gratuita desde Lima ida y vuelta.",
      },
    ],
  },
];

export const DEFAULT_CHANNELS = [
  {
    channelType: "address" as const,
    label: "Sede San Isidro Principal:",
    value: "Av. Javier Prado Este 488, San Isidro, Lima, Perú (Frente al centro financiero)",
    extraInfo: null,
    sortOrder: 0,
  },
  {
    channelType: "phone" as const,
    label: "Central Telefónica Directa:",
    value: "(01) 680-5120",
    extraInfo: "Mon - Sun, 8am - 8pm",
    sortOrder: 1,
  },
  {
    channelType: "email" as const,
    label: "Canal de Ventas Legal:",
    value: "informes@lotesenremate.pe",
    extraInfo: null,
    sortOrder: 2,
  },
  {
    channelType: "whatsapp" as const,
    label: "Contactar Asesor Senior por WhatsApp",
    value: "51987654321",
    extraInfo: "Hola, solicito detalles de los lotes en remate",
    sortOrder: 3,
  },
];

export const DEFAULT_FAQS = [
  {
    question: "¿Todos los lotes tienen título de propiedad e independización en SUNARP?",
    answer:
      "Sí, absolutamente. Lotesenremate.pe se distingue por ofrecer única y exclusivamente lotes independizados con partida registral propia e individualizada registrada debidamente en la Superintendencia Nacional de los Registros Públicos (SUNARP) del Perú. No trabajamos con contratos de posesión simple ni asambleas ejidales.",
    sortOrder: 0,
  },
  {
    question: "¿En qué consisten las visitas guiadas gratuitas de fin de semana?",
    answer:
      "Todos los sábados y domingos por la mañana, disponemos de buses ejecutivos privados gratuitos que parten desde dos puntos estratégicos de Lima (San Isidro y Lima Norte / Plaza Norte) ida y vuelta. En el trayecto proporcionamos desayuno de cortesía y nuestros asesores senior le explicarán todos los pormenores y documentos del proyecto en campo.",
    sortOrder: 1,
  },
  {
    question: "¿Ofrecen opciones de financiamiento y crédito directo sin evaluación de bancos?",
    answer:
      "Sí, contamos con un sistema de Habilitación y Crédito Directo Flex de firmas notariales simples. Puede separar su lote con una cuota inicial mínima del 20% y pagar el saldo remanente en cómodas cuotas de hasta 12 o 24 meses libres de evaluación crediticia bancaria rigurosa o reportes de Infocorp.",
    sortOrder: 2,
  },
  {
    question: "¿Qué sucede si decido mudarme o construir de inmediato mi casa?",
    answer:
      "En el caso de proyectos de entrega inmediata o lotes urbanos habilitados, usted puede iniciar la construcción de su vivienda al día siguiente del abono inicial y la firma de la minuta de compraventa notarial. Adicionalmente, el equipo de ingeniería Civil le obsequia un set completo estándar de planos arquitectónicos pre-aprobados.",
    sortOrder: 3,
  },
];

const DEFAULT_ABOUT_HERO_BG =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600";

export const DEFAULT_ABOUT_PAGE = {
  heroEyebrow: "Nuestra Filosofía",
  heroHeading: "Redefiniendo el Acceso a la Tierra en el Perú",
  heroDescription:
    "Ayudamos a las familias peruanas y pequeños empresarios a adquirir patrimonio predial legítimo e independizado ante registros públicos, eliminando la informalidad y la especulación usurera tradicional.",
  heroBackgroundImageUrl: DEFAULT_ABOUT_HERO_BG,
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
};

export const DEFAULT_ABOUT_VALUES = [
  {
    icon: "Award",
    title: "Seguridad Jurídica",
    description:
      "No comercializamos propiedades posesorias de dudosa procedencia jurídica. Cada centímetro cuadrado de nuestro catálogo cuenta con expedientes aprobados e inscritos de forma individual.",
    sortOrder: 0,
  },
  {
    icon: "ShieldAlert",
    title: "Transparencia Administrativa",
    description:
      "Nuestros precios son directos y están libres de costos encubiertos de liquidación. Facilitamos las copias literales y documentos de dominio de forma abierta previo a cualquier abono de separación.",
    sortOrder: 1,
  },
  {
    icon: "HeartHandshake",
    title: "Planificación y Sostenibilidad",
    description:
      "Diseñamos los condominios playeros y campestres preservando las áreas de protección forestal, gestionando la provisión racional de recursos hídricos y velando por zonas comunales óptimas.",
    sortOrder: 2,
  },
];

export const DEFAULT_EXPERT_ADVISORS = [
  {
    name: "Dr. Hernando de Soto Prado",
    role: "Director de Asuntos Legales Registrales (SUNARP)",
    bio: "Especialista con más de 15 años de experiencia en saneamiento inmobiliario físico legal, independización de predios suburbanos e hipotecas bancarias corporativas.",
    imageUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
    sortOrder: 0,
  },
  {
    name: "Ing. Sandra Montenegro Cisneros",
    role: "Jefe Corporativo de Habilitación Urbana y Geotecnia",
    bio: "Encargada del replanteo topográfico computarizado, trazado vial georreferenciado e ingeniería estructural para la captación garantizada de servicios domésticos.",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    sortOrder: 1,
  },
  {
    name: "Mg. Milton Alarcón Seminario",
    role: "Gerente General de Adjudicaciones Inmobiliarias",
    bio: "Experto en análisis de rentabilidad predial, tasaciones notariales por subasta y diseño de planes de financiamiento directo adaptados a la AFP y CTS de microinversionistas.",
    imageUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600",
    sortOrder: 2,
  },
];

export async function seedAboutContentIfEmpty(): Promise<boolean> {
  const [rows] = await pool.query("SELECT COUNT(*) AS count FROM about_page");
  const count = (rows as { count: number }[])[0].count;
  if (count > 0) return false;

  const p = DEFAULT_ABOUT_PAGE;
  await pool.query(
    `INSERT INTO about_page (
      id, hero_eyebrow, hero_heading, hero_description, hero_background_image_url,
      mission_heading, mission_description, vision_heading, vision_description,
      values_eyebrow, values_heading, values_description,
      advisors_eyebrow, advisors_heading, advisors_description
    ) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      p.heroEyebrow,
      p.heroHeading,
      p.heroDescription,
      p.heroBackgroundImageUrl,
      p.missionHeading,
      p.missionDescription,
      p.visionHeading,
      p.visionDescription,
      p.valuesEyebrow,
      p.valuesHeading,
      p.valuesDescription,
      p.advisorsEyebrow,
      p.advisorsHeading,
      p.advisorsDescription,
    ]
  );

  for (const item of DEFAULT_ABOUT_VALUES) {
    await pool.query(
      `INSERT INTO about_values (id, icon, title, description, sort_order, is_active)
       VALUES (?, ?, ?, ?, ?, 1)`,
      [randomUUID(), item.icon, item.title, item.description, item.sortOrder]
    );
  }

  for (const advisor of DEFAULT_EXPERT_ADVISORS) {
    await pool.query(
      `INSERT INTO expert_advisors (id, name, role, bio, image_url, sort_order, is_active)
       VALUES (?, ?, ?, ?, ?, ?, 1)`,
      [randomUUID(), advisor.name, advisor.role, advisor.bio, advisor.imageUrl, advisor.sortOrder]
    );
  }

  return true;
}

/** Añade imagen de fondo del hero si la BD existía antes de la columna. */
export const DEFAULT_HOME_ALERT = {
  isEnabled: false,
  title: "Aviso importante",
  description: "Consulte nuestras promociones vigentes y proyectos con entrega inmediata.",
  imageUrl: null as string | null,
  videoUrl: null as string | null,
  buttonText: "Ver catálogo",
  buttonLink: "/catalog",
};

export async function seedHomeAlertIfEmpty(): Promise<boolean> {
  const [rows] = await pool.query("SELECT COUNT(*) AS count FROM home_alert_modal");
  const count = (rows as { count: number }[])[0].count;
  if (count > 0) return false;

  const a = DEFAULT_HOME_ALERT;
  await pool.query(
    `INSERT INTO home_alert_modal (id, is_enabled, title, description, image_url, video_url, button_text, button_link)
     VALUES (1, ?, ?, ?, ?, ?, ?, ?)`,
    [a.isEnabled, a.title, a.description, a.imageUrl, a.videoUrl, a.buttonText, a.buttonLink]
  );
  return true;
}

export async function ensureHomeAlertTable(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS home_alert_modal (
      id          SMALLINT PRIMARY KEY,
      is_enabled  TINYINT(1) NOT NULL DEFAULT 0,
      title       VARCHAR(255) NOT NULL DEFAULT '',
      description TEXT NOT NULL,
      image_url   TEXT NULL,
      video_url   TEXT NULL,
      button_text VARCHAR(255) NULL,
      button_link VARCHAR(512) NULL,
      updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  const [rows] = await pool.query("SELECT COUNT(*) AS count FROM home_alert_modal");
  if ((rows as { count: number }[])[0].count === 0) {
    await seedHomeAlertIfEmpty();
  }
}

export async function ensureHomeAlertVideoColumn(): Promise<void> {
  const [cols] = await pool.query(
    `SELECT column_name
     FROM information_schema.columns
       WHERE table_schema = DATABASE()
       AND table_name = 'home_alert_modal'
       AND column_name = 'video_url'`
  );
  if ((cols as { column_name: string }[]).length === 0) {
    await pool.query("ALTER TABLE home_alert_modal ADD COLUMN video_url TEXT NULL");
  }
}

export async function ensureAboutHeroBackgroundColumn(): Promise<void> {
  const [cols] = await pool.query(
    `SELECT column_name
     FROM information_schema.columns
       WHERE table_schema = DATABASE()
       AND table_name = 'about_page'
       AND column_name = 'hero_background_image_url'`
  );
  if ((cols as { column_name: string }[]).length === 0) {
    await pool.query(
      "ALTER TABLE about_page ADD COLUMN hero_background_image_url TEXT NULL"
    );
  }
  await pool.query(
    `UPDATE about_page SET hero_background_image_url = ?
     WHERE id = 1 AND (hero_background_image_url IS NULL OR hero_background_image_url = '')`,
    [DEFAULT_ABOUT_HERO_BG]
  );
}

export async function seedSiteContentIfEmpty(): Promise<boolean> {
  const [rows] = await pool.query("SELECT COUNT(*) AS count FROM site_settings");
  const count = (rows as { count: number }[])[0].count;
  if (count > 0) return false;

  const s = DEFAULT_SITE_SETTINGS;
  await pool.query(
    `INSERT INTO site_settings (id, logo_url, favicon_url, site_name, site_tagline, browser_title, footer_tagline, footer_description)
     VALUES (1, ?, ?, ?, ?, ?, ?, ?)`,
    [s.logoUrl, s.faviconUrl, s.siteName, s.siteTagline, s.browserTitle, s.footerTagline, s.footerDescription]
  );

  const g = DEFAULT_GUARANTEE_SECTION;
  await pool.query(
    `INSERT INTO guarantee_section (id, eyebrow, heading, description, background_image_url)
     VALUES (1, ?, ?, ?, ?)`,
    [g.eyebrow, g.heading, g.description, g.backgroundImageUrl]
  );

  for (const item of DEFAULT_GUARANTEE_ITEMS) {
    await pool.query(
      `INSERT INTO guarantee_items (id, icon, title, description, sort_order, is_active)
       VALUES (?, ?, ?, ?, ?, 1)`,
      [randomUUID(), item.icon, item.title, item.description, item.sortOrder]
    );
  }

  for (const form of DEFAULT_CONTACT_FORMS) {
    await pool.query(
      `INSERT INTO contact_forms (slug, form_title, form_subtitle, submit_label, success_title, success_message, default_message, default_project_interest, section_eyebrow, section_heading, section_description, bullets)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        form.slug,
        form.formTitle,
        form.formSubtitle,
        form.submitLabel,
        form.successTitle,
        form.successMessage,
        form.defaultMessage,
        form.defaultProjectInterest,
        form.sectionEyebrow,
        form.sectionHeading,
        form.sectionDescription,
        form.bullets ? JSON.stringify(form.bullets) : null,
      ]
    );
  }

  for (const ch of DEFAULT_CHANNELS) {
    await pool.query(
      `INSERT INTO corporate_channels (id, channel_type, label, value, extra_info, sort_order, is_active)
       VALUES (?, ?, ?, ?, ?, ?, 1)`,
      [randomUUID(), ch.channelType, ch.label, ch.value, ch.extraInfo, ch.sortOrder]
    );
  }

  for (const faq of DEFAULT_FAQS) {
    await pool.query(
      `INSERT INTO faqs (id, question, answer, sort_order, is_active)
       VALUES (?, ?, ?, ?, 1)`,
      [randomUUID(), faq.question, faq.answer, faq.sortOrder]
    );
  }

  return true;
}

/** Migra home_expedientes → contact_consulta y elimina el formulario duplicado. */
export async function consolidateContactForms(): Promise<void> {
  type FormRow = {
    slug: string;
    section_eyebrow: string | null;
    section_heading: string | null;
    section_description: string | null;
    bullets: string | null;
  };

  const [homeRows] = await pool.query("SELECT * FROM contact_forms WHERE slug = 'home_expedientes'");
  const home = (homeRows as FormRow[])[0];
  if (!home) return;

  const [contactRows] = await pool.query("SELECT * FROM contact_forms WHERE slug = 'contact_consulta'");
  const contact = (contactRows as FormRow[])[0];

  if (contact && !contact.section_eyebrow && home.section_eyebrow) {
    await pool.query(
      `UPDATE contact_forms
       SET section_eyebrow = ?, section_heading = ?, section_description = ?, bullets = ?
       WHERE slug = 'contact_consulta'`,
      [home.section_eyebrow, home.section_heading, home.section_description, home.bullets]
    );
  }

  await pool.query("DELETE FROM contact_forms WHERE slug = 'home_expedientes'");
}
