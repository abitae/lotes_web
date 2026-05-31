/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Award, ShieldAlert, HeartHandshake, Eye, Landmark, Users } from "lucide-react";

export const Nosotros: React.FC = () => {
  return (
    <div id="nosotros-page" className="pt-24 bg-stone-50/40">
      
      {/* 1. HERO DESCRIPTION */}
      <section className="bg-gradient-to-b from-stone-100 to-white border-b border-stone-200/50 py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="font-mono text-2xs text-amber-700 tracking-widest uppercase font-semibold block">
            Nuestra Filosofía
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-emerald-950 tracking-tight leading-tight">
            Redefiniendo el Acceso a la Tierra en el Perú
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm lg:text-base leading-relaxed font-light max-w-2xl mx-auto">
            Ayudamos a las familias peruanas y pequeños empresarios a adquirir patrimonio predial legítimo e independizado ante registros públicos, eliminando la informalidad y la especulación usurera tradicional.
          </p>
        </div>
      </section>

      {/* 2. MISSION & VISION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Mission */}
          <div className="space-y-4 bg-white p-8 rounded-2xl border border-stone-200/60 premium-card-shadow text-left">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-850">
              <Landmark className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-sans font-extrabold text-emerald-950">
              Nuestra Misión
            </h2>
            <p className="text-stone-500 text-xs leading-relaxed font-light font-sans">
              Democratizar la adjudicación de terrenos y predios de remates públicos o liquidaciones con total transparencia jurídica y facilidades de financiamiento directo. Garantizamos que cada centavo depositado por nuestros clientes se traduzca en propiedad registrada, lista para heredar o edificar.
            </p>
          </div>

          {/* Vision */}
          <div className="space-y-4 bg-white p-8 rounded-2xl border border-stone-200/60 premium-card-shadow text-left">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-700">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-sans font-extrabold text-emerald-950">
              Nuestra Visión
            </h2>
            <p className="text-stone-500 text-xs leading-relaxed font-light font-sans">
              Ser reconocidos al 2030 como la marca de desarrollo urbano y corretaje de terrenos más íntegra, segura y preferida de Sudamérica. Nos esforzamos por habilitar proyectos sostenibles que aporten verdadero valor arquitectónico, acceso seguro a servicios básicos y hermosas áreas verdes recreativas.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES BENTO */}
      <section className="bg-stone-55 border-y border-stone-200/40 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="font-mono text-xs text-amber-700 tracking-widest uppercase font-semibold block">
              Pilares Organizacionales
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-emerald-950">
              Valores que Respaldan su Depósito
            </h2>
            <p className="text-stone-500 text-xs md:text-sm font-light">
              Navegar con probidad bajo las rigurosas regulaciones registrales de Sunarp en el Perú es nuestro compromiso fundacional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Value 1 */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-850 uppercase">
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
                Seguridad Jurídica
              </div>
              <p className="text-stone-500 text-xs leading-relaxed font-light font-sans">
                No comercializamos propiedades posesorias de dudosa procedencia jurídica. Cada centímetro cuadrado de nuestro catálogo cuenta con expedientes aprobados e inscritos de forma individual.
              </p>
            </div>

            {/* Value 2 */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-850 uppercase">
                <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
                Transparencia Administrativa
              </div>
              <p className="text-stone-500 text-xs leading-relaxed font-light font-sans">
                Nuestros precios son directos y están libres de costos encubiertos de liquidación. Facilitamos las copias literales y documentos de dominio de forma abierta previo a cualquier abono de separación.
              </p>
            </div>

            {/* Value 3 */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-850 uppercase">
                <HeartHandshake className="w-4 h-4 text-amber-500 shrink-0" />
                Planificación y Sostenibilidad
              </div>
              <p className="text-stone-500 text-xs leading-relaxed font-light font-sans">
                Diseñamos los condominios playeros y campestres preservando las áreas de protección forestal, gestionando la provisión racional de recursos hídricos y velando por zonas comunales óptimas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EXPERT TEAM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="font-mono text-xs text-amber-700 tracking-widest uppercase font-semibold block">
            Asesores Expertos
          </span>
          <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-emerald-950">
            Conoce a la Mesa de Adjudicación
          </h2>
          <p className="text-stone-500 text-xs md:text-sm font-light">
            Especialistas de primer nivel con amplia trayectoria en derecho registral corporativo e ingeniería civil de habilitaciones urbanas en el Perú.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Member 1 */}
          <div className="bg-white rounded-xl border border-stone-200/60 overflow-hidden premium-card-shadow text-left group">
            <div className="h-64 bg-stone-100 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600"
                alt="Abog. Hernando Prado"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-5 space-y-1">
              <h3 className="font-sans font-bold text-sm text-stone-850">
                Dr. Hernando de Soto Prado
              </h3>
              <span className="text-3xs font-mono font-bold text-amber-700 uppercase tracking-widest block">
                Director de Asuntos Legales Registrales (SUNARP)
              </span>
              <p className="text-stone-400 text-3xs font-light leading-relaxed pt-2">
                Especialista con más de 15 años de experiencia en saneamiento inmobiliario físico legal, independización de predios suburbanos e hipotecas bancarias corporativas.
              </p>
            </div>
          </div>

          {/* Member 2 */}
          <div className="bg-white rounded-xl border border-stone-200/60 overflow-hidden premium-card-shadow text-left group">
            <div className="h-64 bg-stone-100 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
                alt="Ing. Sandra Montenegro"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-5 space-y-1">
              <h3 className="font-sans font-bold text-sm text-stone-850">
                Ing. Sandra Montenegro Cisneros
              </h3>
              <span className="text-3xs font-mono font-bold text-amber-700 uppercase tracking-widest block">
                Jefe Corporativo de Habilitación Urbana y Geotecnia
              </span>
              <p className="text-stone-400 text-3xs font-light leading-relaxed pt-2">
                Encargada del replanteo topográfico computarizado, trazado vial georreferenciado e ingeniería estructural para la captación garantizada de servicios domésticos.
              </p>
            </div>
          </div>

          {/* Member 3 */}
          <div className="bg-white rounded-xl border border-stone-200/60 overflow-hidden premium-card-shadow text-left group">
            <div className="h-64 bg-stone-100 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600"
                alt="Milton Alarcón"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-5 space-y-1">
              <h3 className="font-sans font-bold text-sm text-stone-850">
                Mg. Milton Alarcón Seminario
              </h3>
              <span className="text-3xs font-mono font-bold text-amber-700 uppercase tracking-widest block">
                Gerente General de Adjudicaciones Inmobiliarias
              </span>
              <p className="text-stone-400 text-3xs font-light leading-relaxed pt-2">
                Experto en análisis de rentabilidad predial, tasaciones notariales por subasta y diseño de planes de financiamiento directo adaptados a la AFP y CTS de microinversionistas.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
