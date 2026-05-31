import "dotenv/config";
import bcrypt from "bcryptjs";
import { pool } from "../config/db.js";

const INITIAL_PROJECTS = [
  {
    id: "proj-1",
    title: "Eco-Lomas de Chilca",
    location: "Km 64 Panamericana Sur, Chilca",
    region: "Lima",
    projectType: "Playero",
    surface: 140,
    priceSoles: 54900,
    priceDollars: 14800,
    status: "Pre-venta",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
    lat: -12.5204,
    lng: -76.7371,
    description: "Excelente proyecto de lotes para casa de playa y campo, ubicado a solo 45 minutos de Lima.",
    features: ["Pórtico de seguridad 24/7", "Factibilidad de Luz y Agua", "Parques y minigolf", "Título Sunarp totalmente independizado"],
    featured: true,
    totalLots: 120,
    availableLots: 45,
  },
  {
    id: "proj-2",
    title: "Praderas y Bosques de Oxapampa",
    location: "Valle de Chinchihuani, Oxapampa",
    region: "Pasco",
    projectType: "Campestre",
    surface: 500,
    priceSoles: 89000,
    priceDollars: 24000,
    status: "Inmediata",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
    lat: -10.5755,
    lng: -75.4012,
    description: "Conecta directamente con la naturaleza más pura en la selva central del Perú.",
    features: ["Senderos de trekking privados", "Agua de manantial natural", "Pórtico de ingreso rústico", "Suelo fértil óptimo para frutales"],
    featured: true,
    totalLots: 80,
    availableLots: 18,
  },
  {
    id: "proj-3",
    title: "Oasis Residencial de Paracas",
    location: "Av. Paracas Km 10, Paracas",
    region: "Ica",
    projectType: "Playero",
    surface: 160,
    priceSoles: 119500,
    priceDollars: 32300,
    status: "Inmediata",
    imageUrl: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=800",
    lat: -13.8402,
    lng: -76.2514,
    description: "Vive aventuras inigualables junto a tu familia en el principal balneario turístico del sur chico.",
    features: ["Club House de lujo", "Piscina y canchas de tenis", "Ingreso controlado RFID", "Conexión de desagüe habilitada"],
    featured: true,
    totalLots: 150,
    availableLots: 22,
  },
  {
    id: "proj-4",
    title: "Terrazas Inteligentes de Carabayllo",
    location: "Av. San Juan - El Progreso, Carabayllo",
    region: "Lima",
    projectType: "Urbano",
    surface: 110,
    priceSoles: 68000,
    priceDollars: 18300,
    status: "En Obras",
    imageUrl: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&q=80&w=800",
    lat: -11.8333,
    lng: -77.0167,
    description: "Excelente oportunidad de inversión inmobiliaria urbana en Lima Norte.",
    features: ["Redes públicas de agua y desagüe", "Parques infantiles temáticos", "Fácil acceso a transporte público", "Planos de arquitectura aprobados gratis"],
    featured: false,
    totalLots: 200,
    availableLots: 112,
  },
  {
    id: "proj-5",
    title: "Fincas Solares de Cieneguilla",
    location: "Sector Río Seco - Tercera Etapa, Cieneguilla",
    region: "Lima",
    projectType: "Campestre",
    surface: 350,
    priceSoles: 125000,
    priceDollars: 33700,
    status: "Pre-venta",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
    lat: -12.0911,
    lng: -76.7824,
    description: "Disfruta del sol radiante durante los 365 días del año y de aire completamente puro de montaña.",
    features: ["Clima seco y soleado constante", "Mantenimiento centralizado", "Cámaras de videovigilancia", "Caminos afirmados rústicos"],
    featured: false,
    totalLots: 90,
    availableLots: 37,
  },
  {
    id: "proj-6",
    title: "Parque Industrial Sur Pucusana",
    location: "Km 58 Panamericana Sur, Pucusana",
    region: "Lima",
    projectType: "Industrial",
    surface: 1000,
    priceSoles: 380000,
    priceDollars: 102500,
    status: "Vendido",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    lat: -12.4331,
    lng: -76.7905,
    description: "Macrolotes de categoría industrial con zonificación para talleres, manufactura y almacenes logísticos.",
    features: ["Zonificación I-1, I-2", "Conexión trifásica de alta potencia", "Garita de control de cargas blindada", "Amplio diámetro de vías asfaltadas"],
    featured: false,
    totalLots: 30,
    availableLots: 0,
  },
];

const INITIAL_BANNERS = [
  {
    id: "banner-1",
    title: "Invierta en el Futuro del Perú con Seguridad",
    subtitle: "Lotes de campo, playa y urbanos inscritos en Registros Públicos (Sunarp) con las tasas de rentabilidad más altas del mercado.",
    buttonText: "Ver Catálogo de Proyectos",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600",
    badgeText: "Gran Liquidación de Pre-venta",
    isActive: true,
  },
  {
    id: "banner-2",
    title: "Lotes de Playa en el Sur Chico de Ensueño",
    subtitle: "Encuentra terrenos desde 120m² a tan solo pasos del litoral con servicios, áreas sociales completas y seguridad las 24 horas del día.",
    buttonText: "Descubrir Proyectos de Playa",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1600",
    badgeText: "¡Estilo Resort!",
    isActive: true,
  },
  {
    id: "banner-3",
    title: "Estilo Rústico Hermoso en Oxapampa",
    subtitle: "Consigue la ansiada tranquilidad soñada rodeado de imponentes montañas, plantaciones de café y bosques vírgenes impresionantes.",
    buttonText: "Explorar Terrenos Campestres",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600",
    badgeText: "Conectados a la Naturaleza",
    isActive: false,
  },
];

const INITIAL_TESTIMONIALS = [
  {
    id: "test-1",
    name: "Ricardo Seminario",
    role: "Emprendedor Comercial - Callao",
    stars: 5,
    quote: "Buscaba rentabilizar mis excedentes de AFP y encontré en Eco-Lomas de Chilca la oportunidad idónea.",
    projectPurchased: "Eco-Lomas de Chilca",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
  },
  {
    id: "test-2",
    name: "Dra. Eliana Mendoza",
    role: "Médico Pediatra - San Borja",
    stars: 5,
    quote: "Hemos adquirido un macrolote campestre hermoso en Oxapampa para nuestra futura casa de retiro.",
    projectPurchased: "Praderas y Bosques de Oxapampa",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120",
  },
  {
    id: "test-3",
    name: "Ing. Carlos Villarán",
    role: "Inversionista Tecnológico - Arequipa",
    stars: 5,
    quote: "La compra en Oasis de Paracas superó cualquier expectativa de inversión que tuviera para terrenos en remate.",
    projectPurchased: "Oasis Residencial de Paracas",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
  },
];

const INITIAL_INQUIRIES = [
  {
    id: "inq-1",
    fullName: "Juan de Dios Alarcón",
    phone: "987654321",
    email: "j.alarcon@gmail.com",
    projectInterest: "Eco-Lomas de Chilca",
    message: "Hola buenas tardes, me encuentro sumamente interesado en adquirir 2 lotes continuos en el proyecto de Chilca.",
    status: "Pendiente",
    createdAt: "2026-05-29T10:30:00.000Z",
    notes: "Desea lotes con vista al mar y cotización grupal.",
  },
  {
    id: "inq-2",
    fullName: "Sofía Montenegro Paredes",
    phone: "951753852",
    email: "sofia.m@outlook.com",
    projectInterest: "Praderas y Bosques de Oxapampa",
    message: "Quisiera información sobre las facilidades de financiamiento directo para el lote campestre en Oxapampa.",
    status: "Contactado",
    createdAt: "2026-05-28T14:15:00.000Z",
    notes: "Llamada realizada el 29/05. Interesada en financiamiento de 12 cuotas sin intereses.",
  },
  {
    id: "inq-3",
    fullName: "Víctor Raúl Haya",
    phone: "931222444",
    email: "vraya@hotmail.com",
    projectInterest: "Oasis Residencial de Paracas",
    message: "Hola, me gustaría saber si el precio anunciado de US$ 32,300 incluye los gastos notariales y registrales.",
    status: "Pendiente",
    createdAt: "2026-05-27T18:45:00.000Z",
    notes: null,
  },
  {
    id: "inq-4",
    fullName: "Mariana del Pilar Cisneros",
    phone: "942666777",
    email: "mariana.cisneros@continental.edu.pe",
    projectInterest: "Terrazas Inteligentes de Carabayllo",
    message: "Solicito envío de la memoria descriptiva y copia de partida registral independizada del proyecto.",
    status: "Archivado",
    createdAt: "2026-05-25T09:12:00.000Z",
    notes: "Se enviaron los documentos solicitados por correo.",
  },
];

function toMySQLDatetime(iso: string): string {
  return iso.replace("T", " ").replace(/\.\d{3}Z$/, "");
}

async function seed() {
  const [projectRows] = await pool.query("SELECT COUNT(*) AS count FROM projects");
  const count = (projectRows as { count: number }[])[0].count;

  if (count > 0) {
    console.log("⊙ La base de datos ya tiene datos. Seed omitido.");
    await pool.end();
    return;
  }

  for (const p of INITIAL_PROJECTS) {
    await pool.query(
      `INSERT INTO projects (id, title, location, region, project_type, surface, price_soles, price_dollars, status, image_url, lat, lng, description, features, featured, total_lots, available_lots)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [p.id, p.title, p.location, p.region, p.projectType, p.surface, p.priceSoles, p.priceDollars, p.status, p.imageUrl, p.lat, p.lng, p.description, JSON.stringify(p.features), p.featured ? 1 : 0, p.totalLots, p.availableLots]
    );
  }

  for (const b of INITIAL_BANNERS) {
    await pool.query(
      `INSERT INTO banners (id, title, subtitle, button_text, image_url, badge_text, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [b.id, b.title, b.subtitle, b.buttonText, b.imageUrl, b.badgeText ?? null, b.isActive ? 1 : 0]
    );
  }

  for (const t of INITIAL_TESTIMONIALS) {
    await pool.query(
      `INSERT INTO testimonials (id, name, role, stars, quote, project_purchased, avatar_url)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [t.id, t.name, t.role, t.stars, t.quote, t.projectPurchased, t.avatarUrl]
    );
  }

  for (const i of INITIAL_INQUIRIES) {
    await pool.query(
      `INSERT INTO inquiries (id, full_name, phone, email, project_interest, message, status, notes, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [i.id, i.fullName, i.phone, i.email, i.projectInterest, i.message, i.status, i.notes, toMySQLDatetime(i.createdAt)]
    );
  }

  const adminEmail = process.env.ADMIN_EMAIL || "admin@lotes.pe";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await pool.query(
    "INSERT INTO admins (email, password_hash) VALUES (?, ?)",
    [adminEmail, passwordHash]
  );

  console.log("✓ Datos iniciales insertados");
  console.log(`  Admin: ${adminEmail} / ${adminPassword}`);
  await pool.end();
}

seed().catch((err) => {
  console.error("Error en seed:", err.message);
  process.exit(1);
});
