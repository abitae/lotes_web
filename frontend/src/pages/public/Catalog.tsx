/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Project } from "../../types";
import { formatProjectLocation } from "../../utils/projects";
import {
  Search,
  Filter,
  Grid,
  List,
  MapPin,
  Compass,
  ArrowUpDown,
  ArrowRight,
} from "lucide-react";

export const Catalog: React.FC = () => {
  const { projects } = useApp();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [sortOption, setSortOption] = useState<string>("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const typeUrl = searchParams.get("type");
    const idUrl = searchParams.get("id");

    if (typeUrl) {
      setSelectedType(typeUrl);
    }

    if (idUrl) {
      navigate(`/catalog/${idUrl}`, { replace: true });
    }
  }, [searchParams, navigate]);

  const hasSurfaceData = useMemo(
    () => projects.some((p) => (p.surface ?? 0) > 0),
    [projects]
  );

  const uniqueRegions = useMemo(() => {
    const list = projects.map((p) => p.region);
    return Array.from(new Set(list));
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let result = [...projects];

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    if (selectedType !== "All") {
      result = result.filter((p) => p.projectType === selectedType);
    }

    if (selectedRegion !== "All") {
      result = result.filter((p) => p.region === selectedRegion);
    }

    if (sortOption === "priceAsc") {
      result.sort((a, b) => a.priceSoles - b.priceSoles);
    } else if (sortOption === "priceDesc") {
      result.sort((a, b) => b.priceSoles - a.priceSoles);
    } else if (sortOption === "areaDesc" && hasSurfaceData) {
      result.sort((a, b) => (b.surface ?? 0) - (a.surface ?? 0));
    }

    return result;
  }, [projects, searchQuery, selectedType, selectedRegion, sortOption, hasSurfaceData]);

  const openProjectDetail = (proj: Project) => {
    navigate(`/catalog/${proj.id}`);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedType("All");
    setSelectedRegion("All");
    setSortOption("default");
    setSearchParams({});
  };

  return (
    <div id="catalog-page" className="pt-24 min-h-screen bg-stone-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <section className="mb-8 space-y-2">
          <span className="font-mono text-2xs text-amber-700 tracking-wider uppercase font-semibold">
            Catálogo de proyectos
          </span>
          <h1 className="text-3xl font-sans font-extrabold text-emerald-950 tracking-tight">
            Encuentra tu Próxima Inversión
          </h1>
          <p className="text-stone-500 text-xs md:text-sm font-light">
            Filtra por zona y región, compara precios y accede al detalle de cada proyecto con título SUNARP.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-xl border border-stone-200/60 p-5 premium-card-shadow space-y-5">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <span className="font-sans font-extrabold text-xs uppercase text-emerald-950 tracking-wider flex items-center gap-1.5">
                  <Filter className="w-4 h-4 text-amber-600" />
                  Panel de Filtros
                </span>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="font-mono text-3xs text-stone-400 hover:text-stone-600 hover:underline uppercase tracking-wide"
                >
                  Limpiar Todo
                </button>
              </div>

              <div className="space-y-1.5">
                <label className="block text-3xs font-mono font-extrabold text-stone-500 uppercase tracking-widest">
                  Búsqueda Libre
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Palabras clave, ej. Chilca..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-205 focus:border-emerald-700 focus:bg-white text-xs p-2.5 pl-9 rounded-lg outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-3xs font-mono font-extrabold text-stone-500 uppercase tracking-widest">
                  Zona de Proyecto
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-700 focus:bg-white text-xs p-2.5 rounded-lg outline-none cursor-pointer"
                >
                  <option value="All">Cualquiera (Todos)</option>
                  <option value="Playero">Playero (Playa / Sol)</option>
                  <option value="Campestre">Campestre (Campo / Bosque)</option>
                  <option value="Urbano">Habilitaciones Urbanas</option>
                  <option value="Industrial">Zonificación Industrial</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-3xs font-mono font-extrabold text-stone-500 uppercase tracking-widest">
                  Departamento / Región
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-700 focus:bg-white text-xs p-2.5 rounded-lg outline-none cursor-pointer"
                >
                  <option value="All">Todo el territorio nacional</option>
                  {uniqueRegions.map((reg) => (
                    <option key={reg} value={reg}>
                      {reg}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-9 space-y-4">
            <div className="flex items-center justify-between bg-white px-4 py-3 border border-stone-200/60 rounded-xl premium-card-shadow">
              <span className="font-mono text-[11px] text-stone-500">
                Proyectos: <strong className="text-emerald-950">{filteredProjects.length}</strong>
              </span>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="bg-transparent border-none text-[11px] text-stone-600 hover:text-stone-900 font-sans font-medium focus:outline-none cursor-pointer"
                  >
                    <option value="default">Recomendados</option>
                    <option value="priceAsc">Precio: Menor a Mayor</option>
                    <option value="priceDesc">Precio: Mayor a Menor</option>
                    {hasSurfaceData && <option value="areaDesc">Área: Mayor primero</option>}
                  </select>
                </div>

                <span className="text-stone-200">|</span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded transition-colors ${
                      viewMode === "grid" ? "bg-stone-100 text-stone-850" : "text-stone-400 hover:text-stone-700"
                    }`}
                    title="Cuadrícula"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded transition-colors ${
                      viewMode === "list" ? "bg-stone-100 text-stone-850" : "text-stone-400 hover:text-stone-700"
                    }`}
                    title="Filas"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="bg-white border rounded-xl p-12 text-center space-y-3 shadow-inner">
                <Compass className="w-10 h-10 text-stone-300 mx-auto" />
                <h3 className="font-sans font-bold text-sm text-stone-850">Sin resultados hallados</h3>
                <p className="text-stone-400 text-xs font-light max-w-sm mx-auto leading-relaxed">
                  Ningún proyecto coincide con los filtros aplicados. Prueba otra región o tipo de zona.
                </p>
              </div>
            ) : (
              <div
                className={`grid gap-4 ${
                  viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                }`}
              >
                {filteredProjects.map((project) => {
                  const locationLabel = formatProjectLocation(project);
                  return (
                    <article
                      key={project.id}
                      onClick={() => openProjectDetail(project)}
                      className={`bg-white border text-left cursor-pointer transition-all flex rounded-xl premium-card-shadow overflow-hidden group border-stone-200/65 hover:border-emerald-700/40 hover:shadow-md ${
                        viewMode === "grid" ? "flex-col" : "flex-row h-44"
                      }`}
                    >
                      <div
                        className={`relative bg-stone-100 shrink-0 ${
                          viewMode === "grid" ? "h-40 w-full" : "h-full w-44"
                        }`}
                      >
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="text-[8px] font-bold px-2 py-0.5 rounded bg-stone-900 border border-stone-850 text-stone-50 uppercase">
                            {project.projectType}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-0.5 text-[10px] font-mono text-stone-400 uppercase tracking-tight line-clamp-1">
                            <MapPin className="w-3 h-3 text-emerald-800 shrink-0" />
                            <span>{locationLabel || project.location}</span>
                          </div>
                          <h3 className="font-sans font-bold text-sm text-stone-850 leading-tight group-hover:text-emerald-950 line-clamp-2">
                            {project.title}
                          </h3>
                          <p className="text-stone-500 text-[11px] font-light leading-relaxed line-clamp-2">
                            {project.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-stone-100/60 flex items-center justify-between mt-2">
                          <div className="flex flex-col">
                            <span className="text-xl font-sans font-extrabold text-emerald-950">
                              {project.priceSoles > 0 ? `S/. ${project.priceSoles.toLocaleString()}` : "Consultar"}
                            </span>
                            {project.availableLots > 0 && (
                              <span className="text-[10px] font-mono text-stone-400 uppercase">
                                {project.availableLots} lote{project.availableLots !== 1 ? "s" : ""} libre
                                {project.availableLots !== 1 ? "s" : ""}
                              </span>
                            )}
                          </div>

                          <span className="inline-flex items-center gap-1 text-[10px] font-sans font-bold text-emerald-850 group-hover:text-emerald-700">
                            Ver detalle
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
