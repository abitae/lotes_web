/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Project } from "../../types";
import {
  Search,
  Filter,
  Grid,
  List,
  MapPin,
  Maximize2,
  Minimize2,
  DollarSign,
  Compass,
  ArrowUpDown,
  Send,
  X,
  Map,
  BadgePercent,
  Check,
  Building,
  Navigation
} from "lucide-react";

export const Catalog: React.FC = () => {
  const { projects, addInquiry } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Selected item from list to show highlight / markers on map
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  
  // Selected project for details modal drawer
  const [detailedProject, setDetailedProject] = useState<Project | null>(null);

  // States for Filter inputs
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [sortOption, setSortOption] = useState<string>("default");
  
  // Grid/List view flag
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // In-drawer contact box state
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Map state
  const [mapZoom, setMapZoom] = useState(6);
  const [mapLatitude, setMapLatitude] = useState(-11.5);
  const [mapLongitude, setMapLongitude] = useState(-76.0);

  // Parse URL query parameter filters if present (e.g. from homepage category redirection or detail request)
  useEffect(() => {
    const typeUrl = searchParams.get("type");
    const idUrl = searchParams.get("id");
    
    if (typeUrl) {
      setSelectedType(typeUrl);
    }
    
    if (idUrl) {
      const match = projects.find((p) => p.id === idUrl);
      if (match) {
        setDetailedProject(match);
        setSelectedProjectId(match.id);
        // Pan the map coordinates to match
        setMapLatitude(match.coordinates.lat);
        setMapLongitude(match.coordinates.lng);
        setMapZoom(11);
      }
    }
  }, [searchParams, projects]);

  // Extract list of all unique regions for the search filter
  const hasSurfaceData = useMemo(
    () => projects.some((p) => (p.surface ?? 0) > 0),
    [projects]
  );

  const uniqueRegions = useMemo(() => {
    const list = projects.map((p) => p.region);
    return Array.from(new Set(list));
  }, [projects]);

  // Compute filtered projects
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Filter by text search query (title, location, description)
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Filter by Project Type
    if (selectedType !== "All") {
      result = result.filter((p) => p.projectType === selectedType);
    }

    // Filter by Geographic Region
    if (selectedRegion !== "All") {
      result = result.filter((p) => p.region === selectedRegion);
    }

    // Filter by Project Status
    if (selectedStatus !== "All") {
      result = result.filter((p) => p.status === selectedStatus);
    }

    // Filter by Price range groupings
    if (selectedPriceRange !== "All") {
      if (selectedPriceRange === "low") {
        result = result.filter((p) => p.priceSoles < 60000);
      } else if (selectedPriceRange === "mid") {
        result = result.filter((p) => p.priceSoles >= 60000 && p.priceSoles <= 120000);
      } else if (selectedPriceRange === "high") {
        result = result.filter((p) => p.priceSoles > 120000);
      }
    }

    // Sorting
    if (sortOption === "priceAsc") {
      result.sort((a, b) => a.priceSoles - b.priceSoles);
    } else if (sortOption === "priceDesc") {
      result.sort((a, b) => b.priceSoles - a.priceSoles);
    } else if (sortOption === "areaDesc" && hasSurfaceData) {
      result.sort((a, b) => (b.surface ?? 0) - (a.surface ?? 0));
    }

    return result;
  }, [projects, searchQuery, selectedType, selectedRegion, selectedPriceRange, selectedStatus, sortOption, hasSurfaceData]);

  // Triggered when clicking a project item on the list.
  // "clicking on a project marks its location on the map"
  const handleProjectSelect = (proj: Project) => {
    setSelectedProjectId(proj.id);
    
    // Pan coordinates smooth effect
    setMapLatitude(proj.coordinates.lat);
    setMapLongitude(proj.coordinates.lng);
    setMapZoom(12); // zoom in closely
  };

  const handleInquirySubmit = async (e: React.FormEvent, projectTitle: string) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone || !inquiryEmail) return;

    try {
      await addInquiry({
        fullName: inquiryName,
        phone: inquiryPhone,
        email: inquiryEmail,
        projectInterest: projectTitle,
        message: `Solicitó copia certificada de partida SUNARP para lote en el proyecto: ${projectTitle}.`,
      });

      setInquirySubmitted(true);
      setInquiryName("");
      setInquiryPhone("");
      setInquiryEmail("");

      setTimeout(() => {
        setInquirySubmitted(false);
      }, 5000);
    } catch {
      // error handled globally
    }
  };

  const selectedProjObject = useMemo(() => {
    return projects.find((p) => p.id === selectedProjectId);
  }, [projects, selectedProjectId]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedType("All");
    setSelectedRegion("All");
    setSelectedPriceRange("All");
    setSelectedStatus("All");
    setSortOption("default");
    setSelectedProjectId(null);
    setMapZoom(6);
    setMapLatitude(-11.5);
    setMapLongitude(-76.0);
    setSearchParams({});
  };

  return (
    <div id="catalog-page" className="pt-24 min-h-screen bg-stone-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Title Header */}
        <section className="mb-8 space-y-2">
          <span className="font-mono text-2xs text-amber-700 tracking-wider uppercase font-semibold">
            Buscador Avanzado de Tierra
          </span>
          <h1 className="text-3xl font-sans font-extrabold text-emerald-950 tracking-tight">
            Encuentra tu Próxima Inversión
          </h1>
          <p className="text-stone-500 text-xs md:text-sm font-light">
            Filtra, explora la geolocalización interactiva directa con SUNARP y descarga expedientes notariales de lotes en liquidación.
          </p>
        </section>

        {/* Core Layout: Grid 3 cols for filters, 9 cols for catalog and map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* A. LEFT COLUMN FILTERS (Span 3 on desktop) */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-xl border border-stone-200/60 p-5 p-r-0 premium-card-shadow space-y-5">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <span className="font-sans font-extrabold text-xs uppercase text-emerald-950 tracking-wider flex items-center gap-1.5">
                  <Filter className="w-4 h-4 text-amber-600" />
                  Panel de Filtros
                </span>
                <button
                  onClick={resetFilters}
                  className="font-mono text-3xs text-stone-400 hover:text-stone-600 hover:underline uppercase tracking-wide"
                >
                  Limpiar Todo
                </button>
              </div>

              {/* Text Query Filter */}
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

              {/* Project Type Filter */}
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

              {/* Region Filter */}
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

              {/* Price Filter */}
              <div className="space-y-1.5">
                <label className="block text-3xs font-mono font-extrabold text-stone-500 uppercase tracking-widest">
                  Presupuesto Soles
                </label>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-700 focus:bg-white text-xs p-2.5 rounded-lg outline-none cursor-pointer"
                >
                  <option value="All">Cualquier precio</option>
                  <option value="low">Menos de S/. 60,000</option>
                  <option value="mid">S/. 60,000 a S/. 120,000</option>
                  <option value="high">Más de S/. 120,000</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="space-y-1.5">
                <label className="block text-3xs font-mono font-extrabold text-stone-500 uppercase tracking-widest">
                  Estado Registral
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-700 focus:bg-white text-xs p-2.5 rounded-lg outline-none cursor-pointer"
                >
                  <option value="All">Cualquiera</option>
                  <option value="Pre-venta">Pre-venta (Disponible)</option>
                  <option value="Vendido">Vendido / Agotado</option>
                </select>
              </div>
            </div>
          </aside>

          {/* B. MIDDLE & RIGHT COMBINED AREA (9 cols on desktop) */}
          <main className="lg:col-span-9 space-y-6 flex flex-col">
            
            {/* Split Screen Panel: Left results list, Right Maps */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              
              {/* B1. PORTFOLIO CARDS CONTAINER (Span 7) */}
              <div className="md:col-span-7 flex flex-col space-y-4">
                
                {/* Catalog Controls Header */}
                <div className="flex items-center justify-between bg-white px-4 py-3 border border-stone-200/60 rounded-xl premium-card-shadow">
                  <span className="font-mono text-[11px] text-stone-500">
                    Proyectos: <strong className="text-emerald-950">{filteredProjects.length}</strong>
                  </span>

                  <div className="flex items-center gap-3">
                    {/* Sort option */}
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
                        {hasSurfaceData && (
                          <option value="areaDesc">Área: Mayor primero</option>
                        )}
                      </select>
                    </div>

                    <span className="text-stone-200">|</span>

                    {/* View mode buttons */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-1.5 rounded transition-colors ${
                          viewMode === "grid" ? "bg-stone-100 text-stone-850" : "text-stone-400 hover:text-stone-700"
                        }`}
                        title="Cuadrícula"
                      >
                        <Grid className="w-4 h-4" />
                      </button>
                      <button
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

                {/* List of items */}
                {filteredProjects.length === 0 ? (
                  <div className="bg-white border rounded-xl p-12 text-center space-y-3 shadow-inner">
                    <Compass className="w-10 h-10 text-stone-300 mx-auto" />
                    <h3 className="font-sans font-bold text-sm text-stone-850">Sin resultados hallados</h3>
                    <p className="text-stone-400 text-xs font-light max-w-sm mx-auto leading-relaxed">
                      Ningún remate de lote coincide con los filtros aplicados. Intenta ampliar los rangos de precio o buscar otra región.
                    </p>
                  </div>
                ) : (
                  <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
                    {filteredProjects.map((project) => (
                      <article
                        key={project.id}
                        onClick={() => handleProjectSelect(project)}
                        className={`bg-white border text-left cursor-pointer transition-all flex rounded-xl premium-card-shadow overflow-hidden group ${
                          selectedProjectId === project.id
                            ? "border-emerald-700 ring-2 ring-emerald-700/10"
                            : "border-stone-200/65 hover:border-stone-300"
                        } ${viewMode === "grid" ? "flex-col" : "flex-row h-44"}`}
                      >
                        {/* Image column */}
                        <div className={`relative bg-stone-100 shrink-0 ${viewMode === "grid" ? "h-36 w-full" : "h-full w-40"}`}>
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-2 left-2 flex flex-col gap-1">
                            <span className="text-[8px] font-bold px-2 py-0.5 rounded bg-stone-900 border border-stone-850 text-stone-50 self-start uppercase">
                              {project.projectType}
                            </span>
                          </div>
                          
                          {/* Map selected feedback indicators */}
                          {selectedProjectId === project.id && (
                            <div className="absolute inset-0 bg-emerald-950/25 flex items-center justify-center">
                              <span className="bg-emerald-900 text-white font-mono text-[9px] font-bold uppercase tracking-wider py-1 px-2.5 rounded-full flex items-center gap-1 shadow">
                                <Navigation className="w-3 h-3 text-amber-400 animate-pulse" />
                                UBICADO
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content column */}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-0.5 text-[10px] font-mono text-stone-400 uppercase tracking-tight line-clamp-1">
                              <MapPin className="w-3 h-3 text-emerald-800 shrink-0" />
                              <span>{project.location}</span>
                            </div>
                            <h3 className="font-sans font-bold text-sm text-stone-850 leading-tight group-hover:text-emerald-950 line-clamp-1">
                              {project.title}
                            </h3>
                            <p className="text-stone-500 text-[11px] font-light leading-relaxed line-clamp-2">
                              {project.description}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-stone-100/60 flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="text-xl font-sans font-extrabold text-emerald-950">
                                S/. {project.priceSoles.toLocaleString()}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation(); // prevent select
                                  setDetailedProject(project);
                                }}
                                className="bg-emerald-850 hover:bg-emerald-700 text-white px-2.5 py-1.5 text-[10px] font-sans font-extrabold rounded-lg select-none"
                              >
                                Exp Expediente
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>

              {/* B2. GEOGRAPHIC INTERACTIVE MAP PANEL (Span 5) */}
              <div className="md:col-span-5 bg-stone-900 border border-stone-800 rounded-xl relative overflow-hidden flex flex-col justify-between min-h-[350px] md:min-h-[500px]">
                
                {/* Map Header details */}
                <div className="absolute top-3 inset-x-3 bg-stone-950/80 backdrop-blur-md px-3 py-2 border border-stone-800 rounded-lg text-left z-10 space-y-1 flex justify-between items-center">
                  <div>
                    <h4 className="font-mono text-[9px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Map className="w-3.5 h-3.5" />
                      COORDENADAS DEL TERRENO
                    </h4>
                    <span className="font-mono text-3xs text-stone-400 block tracking-tight">
                      Lat: {mapLatitude.toFixed(4)} | Lng: {mapLongitude.toFixed(4)}
                    </span>
                  </div>
                  
                  {/* Zoom controller */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setMapZoom(Math.max(4, mapZoom - 1))}
                      className="w-5 h-5 bg-stone-900 hover:bg-stone-800 rounded text-stone-300 font-bold text-xs flex items-center justify-center border border-stone-800"
                    >
                      -
                    </button>
                    <span className="font-mono text-[10px] text-stone-300 w-4 text-center">{mapZoom}</span>
                    <button
                      onClick={() => setMapZoom(Math.min(18, mapZoom + 1))}
                      className="w-5 h-5 bg-stone-900 hover:bg-stone-800 rounded text-stone-300 font-bold text-xs flex items-center justify-center border border-stone-800"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Simulated Geographic SVG Map Canvas */}
                <div className="flex-1 w-full relative bg-[#131211] flex items-center justify-center outline-none">
                  {/* Retro Grid Background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1d1b19_1px,transparent_1px),linear-gradient(to_bottom,#1d1b19_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none opacity-40" />

                  {/* Topography vector representation */}
                  <div className="absolute inset-10 border-2 border-dashed border-stone-850 rounded-full opacity-10 animate-spin" style={{ animationDuration: "120s" }} />
                  <div className="absolute inset-20 border border-stone-850 rounded-full opacity-10 animate-spin" style={{ animationDuration: "60s" }} />

                  {/* National roads vector */}
                  <div className="absolute inset-x-0 h-0.5 bg-emerald-950/20 top-[40%] translate-y-2 select-none pointer-events-none transform -rotate-12" />
                  <div className="absolute !left-[25%] inset-y-0 w-0.5 bg-amber-950/15 select-none pointer-events-none transform rotate-45" />

                  {/* Simulated Coastline */}
                  <div className="absolute top-0 bottom-0 left-0 bg-blue-950/5 border-r border-blue-900/10 w-[20%] select-none pointer-events-none" />

                  {/* Render Projects Pins on Map */}
                  {filteredProjects.map((p) => {
                    // Let's project lat/lng mathematically inside container size
                    // Map LAT limits: -18 to 0 (approx Peru bounds)
                    // Map LNG limits: -81 to -68
                    const topPercent = Math.min(85, Math.max(15, ((p.coordinates.lat - 0) / (-18 - 0)) * 100));
                    const leftPercent = Math.min(85, Math.max(15, ((p.coordinates.lng - (-81)) / (-68 - (-81))) * 100));

                    const isActive = selectedProjectId === p.id;

                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedProjectId(p.id)}
                        className="absolute cursor-pointer transition-all z-25 group"
                        style={{
                          top: `${topPercent}%`,
                          left: `${leftPercent}%`,
                        }}
                      >
                        {/* Pulse Ring if active */}
                        {isActive && (
                          <span className="absolute -inset-2.5 bg-amber-500/30 rounded-full animate-ping z-0" />
                        )}

                        <div className={`w-6 h-6 rounded-full flex items-center justify-center relative shadow-md border ${
                          isActive
                            ? "bg-amber-500 text-stone-950 border-amber-400 scale-120 animate-bounce"
                            : "bg-emerald-900 hover:bg-emerald-700 text-amber-400 border-emerald-800"
                        }`}>
                          <Compass className={`w-3.5 h-3.5 ${isActive ? "rotate-45 animate-spin" : ""}`} />
                        </div>

                        {/* Tooltip text */}
                        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 bg-stone-950 text-white font-sans text-3xs py-1 px-2 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 border border-stone-800">
                          {p.title}
                        </div>
                      </button>
                    );
                  })}

                  {/* Center reticle */}
                  <div className="absolute pointer-events-none py-1 border border-stone-800 flex flex-col items-center justify-center w-28 text-center text-3xs font-mono text-stone-500">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse mb-1" />
                    PERÚ RADAR ACTIVO
                  </div>
                </div>

                {/* Map Footer card showing selected details */}
                <div className="p-3 bg-stone-950/90 border-t border-stone-850 z-10 text-left">
                  {selectedProjObject ? (
                    <div className="flex items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <span className="inline-block bg-amber-500 text-stone-950 text-[8px] font-mono font-extrabold uppercase px-1.5 rounded">
                          {selectedProjObject.status}
                        </span>
                        <h5 className="font-sans font-bold text-xs text-stone-200">
                          {selectedProjObject.title}
                        </h5>
                        <span className="font-mono text-[10px] text-stone-500 block">
                          S/. {selectedProjObject.priceSoles.toLocaleString()}
                          {(selectedProjObject.surface ?? 0) > 0 &&
                            ` | Área: ${selectedProjObject.surface} m²`}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => setDetailedProject(selectedProjObject)}
                        className="p-2 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white text-3xs font-mono font-bold tracking-wider rounded uppercase shrink-0"
                      >
                        Expediente completo
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-2 text-3xs font-mono text-stone-400 uppercase tracking-widest">
                      Selecciona un lote para visualizar en el radar
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* C. SLIDE OVER DRAWER / EXHAUSTIVE DETAILS MODAL */}
      {detailedProject && (
        <div className="fixed inset-0 bg-stone-950/75 z-50 flex justify-end backdrop-blur-xs transition-opacity duration-300">
          
          {/* Main Card Modal Drawer */}
          <section className="bg-white w-full max-w-xl h-full flex flex-col justify-between overflow-y-auto premium-card-shadow relative text-left">
            
            {/* Close trigger button */}
            <button
              onClick={() => {
                setDetailedProject(null);
                setInquirySubmitted(false);
              }}
              className="absolute top-5 right-5 p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full transition-colors z-20 focus:outline-none"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Slider Content */}
            <div className="flex-1 pb-10">
              
              {/* Cover cover item */}
              <div className="h-64 w-full bg-stone-100 relative">
                <img
                  src={detailedProject.imageUrl}
                  alt={detailedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/30 to-transparent" />
                
                <div className="absolute bottom-5 left-6 text-white space-y-1">
                  <span className="inline-block bg-amber-500 text-stone-950 font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded-full">
                    {detailedProject.projectType}
                  </span>
                  <h2 className="font-sans font-extrabold text-xl tracking-tight leading-tight">
                    {detailedProject.title}
                  </h2>
                </div>
              </div>

              {/* Specs & description */}
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Stats Bar details */}
                <div className={`grid gap-4 border border-stone-150 p-4 bg-stone-50 rounded-xl ${(detailedProject.surface ?? 0) > 0 ? "grid-cols-3" : "grid-cols-2"}`}>
                  {(detailedProject.surface ?? 0) > 0 && (
                    <div className="text-center">
                      <span className="block font-mono text-[9px] text-stone-400 uppercase tracking-widest leading-none">
                        Área total
                      </span>
                      <strong className="text-base font-sans font-extrabold text-emerald-950 block mt-1">
                        {detailedProject.surface} m²
                      </strong>
                    </div>
                  )}
                  <div className={`text-center ${(detailedProject.surface ?? 0) > 0 ? "border-x border-stone-200" : ""}`}>
                    <span className="block font-mono text-[9px] text-stone-400 uppercase tracking-widest leading-none">
                      Disponibilidad
                    </span>
                    <strong className="text-sm font-sans font-extrabold text-emerald-950 block mt-1">
                      {detailedProject.availableLots} / {detailedProject.totalLots} Lts
                    </strong>
                  </div>
                  <div className="text-center">
                    <span className="block font-mono text-[9px] text-stone-400 uppercase tracking-widest leading-none">
                      Estado
                    </span>
                    <strong className="text-xs font-sans font-bold text-amber-700 uppercase block mt-1">
                      {detailedProject.status}
                    </strong>
                  </div>
                </div>

                {/* Cost Block */}
                <div className="space-y-1 bg-emerald-50/50 border border-emerald-100 p-4 rounded-xl">
                  <span className="font-mono text-3xs text-emerald-850 uppercase tracking-widest font-semibold block">
                    PRECIO TOTAL REMATE DIRECTO
                  </span>
                  <div className="flex items-baseline gap-2.5">
                    <strong className="text-3xl font-sans font-extrabold text-emerald-950">
                      S/. {detailedProject.priceSoles.toLocaleString()}
                    </strong>
                  </div>
                  <p className="text-[10px] text-stone-400 italic">
                    * Financiamiento directo habilitable con firma notarial simple de cuota inicial.
                  </p>
                </div>

                {/* Description details text */}
                <div className="space-y-2">
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-stone-800">
                    Descripción del Inmueble
                  </h4>
                  <p className="text-stone-500 text-xs font-light leading-relaxed font-sans">
                    {detailedProject.description}
                  </p>
                </div>

                {/* Features Checklist */}
                <div className="space-y-3">
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-stone-800">
                    Habilitaciones Integradas (Expediente)
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {detailedProject.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 font-sans font-light text-stone-600">
                        <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Box Context */}
                <div className="border bg-stone-950 text-white rounded-xl p-6 space-y-4">
                  <div className="space-y-1">
                    <h4 className="font-sans font-extrabold text-sm text-stone-50">
                      ¿Deseas descargar el expediente de este lote?
                    </h4>
                    <p className="text-stone-400 text-3xs font-mono uppercase tracking-widest">
                      Inmediato vía Correo Electrónico y WhatsApp
                    </p>
                  </div>

                  {inquirySubmitted ? (
                    <div className="bg-emerald-950/60 border border-emerald-900 p-4 rounded-lg text-center text-xs">
                      <strong className="text-amber-400 block mb-1">✓ ¡Expediente Solicitado!</strong>
                      Un asesor con copia certificada te ha contactado en unos instantes.
                    </div>
                  ) : (
                    <form onSubmit={(e) => handleInquirySubmit(e, detailedProject.title)} className="space-y-3">
                      <input
                        type="text"
                        required
                        placeholder="Nombres completos"
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 focus:border-amber-400 rounded-lg p-2.5 text-xs outline-none text-stone-100"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="tel"
                          required
                          placeholder="WhatsApp, ej. 987654321"
                          value={inquiryPhone}
                          onChange={(e) => setInquiryPhone(e.target.value)}
                          className="w-full bg-stone-900 border border-stone-800 focus:border-amber-400 rounded-lg p-2.5 text-xs outline-none text-stone-100"
                        />
                        <input
                          type="email"
                          required
                          placeholder="Tu correo"
                          value={inquiryEmail}
                          onChange={(e) => setInquiryEmail(e.target.value)}
                          className="w-full bg-stone-900 border border-stone-800 focus:border-amber-400 rounded-lg p-2.5 text-xs outline-none text-stone-100"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-sans font-bold text-xs py-2.5 rounded-lg transition-transform uppercase tracking-wider"
                      >
                        Descargar copia de partida SUNARP
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
