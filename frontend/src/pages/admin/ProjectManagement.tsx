/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { useApp } from "../../context/AppContext";
import { Project, ProjectType, ProjectStatus } from "../../types";
import {
  Plus,
  Search,
  SlidersHorizontal,
  X,
  Edit,
  Trash2,
  CheckCircle,
  Eye,
  Sparkles,
  MapPin,
  Maximize2
} from "lucide-react";

export const ProjectManagement: React.FC = () => {
  const { projects, addProject, editProject, deleteProject } = useApp();

  // Keyword search inside projects manager
  const [projectQuery, setProjectQuery] = useState("");

  // Filter type selection inside projects manager
  const [projectTypeFilter, setProjectTypeFilter] = useState("All");

  // Selected project for editing. If null, we are in CREATE mode.
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [region, setRegion] = useState("");
  const [projectType, setProjectType] = useState<ProjectType>("Playero");
  const [surface, setSurface] = useState<number>(120);
  const [priceSoles, setPriceSoles] = useState<number>(45000);
  const [priceDollars, setPriceDollars] = useState<number>(12000);
  const [status, setStatus] = useState<ProjectStatus>("Pre-venta");
  const [imageUrl, setImageUrl] = useState("");
  const [lat, setLat] = useState<number>(-12.0);
  const [lng, setLng] = useState<number>(-77.0);
  const [description, setDescription] = useState("");
  const [rawFeatures, setRawFeatures] = useState("");
  const [totalLots, setTotalLots] = useState<number>(100);
  const [availableLots, setAvailableLots] = useState<number>(80);
  const [featured, setFeatured] = useState<boolean>(false);

  // Calculate filtered results
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    if (projectQuery.trim() !== "") {
      const q = projectQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (projectTypeFilter !== "All") {
      result = result.filter((p) => p.projectType === projectTypeFilter);
    }

    return result;
  }, [projects, projectQuery, projectTypeFilter]);

  const handleOpenCreateModal = () => {
    setActiveModalProject(null);
    setTitle("");
    setLocation("");
    setRegion("Lima");
    setProjectType("Playero");
    setSurface(120);
    setPriceSoles(49000);
    setPriceDollars(13200);
    setStatus("Pre-venta");
    setImageUrl("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800");
    setLat(-12.433);
    setLng(-76.79);
    setDescription("");
    setRawFeatures("Luz y Agua, Pórtico de seguridad, Título Sunarp, Parques");
    setTotalLots(100);
    setAvailableLots(80);
    setFeatured(false);

    setIsModalOpen(true);
  };

  const handleOpenEditModal = (project: Project) => {
    setActiveModalProject(project);
    setTitle(project.title);
    setLocation(project.location);
    setRegion(project.region);
    setProjectType(project.projectType);
    setSurface(project.surface);
    setPriceSoles(project.priceSoles);
    setPriceDollars(project.priceDollars);
    setStatus(project.status);
    setImageUrl(project.imageUrl);
    setLat(project.coordinates.lat);
    setLng(project.coordinates.lng);
    setDescription(project.description);
    setRawFeatures(project.features.join(", "));
    setTotalLots(project.totalLots);
    setAvailableLots(project.availableLots);
    setFeatured(project.featured);

    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !location || !imageUrl) return;

    const parsedFeatures = rawFeatures
      .split(",")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const projectPayload = {
      title,
      location,
      region,
      projectType,
      surface: Number(surface),
      priceSoles: Number(priceSoles),
      priceDollars: Number(priceDollars),
      status,
      imageUrl,
      coordinates: {
        lat: Number(lat),
        lng: Number(lng),
      },
      description,
      features: parsedFeatures,
      featured,
      totalLots: Number(totalLots),
      availableLots: Number(availableLots),
    };

    try {
      if (activeModalProject) {
        await editProject(activeModalProject.id, projectPayload);
      } else {
        await addProject(projectPayload);
      }
      setIsModalOpen(false);
    } catch {
      alert("No se pudo guardar el proyecto. Verifica tu sesión admin.");
    }
  };

  const handleDeleteProject = (id: string, name: string) => {
    if (window.confirm(`¿Está seguro de eliminar de forma definitiva el proyecto "${name}"? Esta acción no se puede revertir.`)) {
      deleteProject(id).catch(() => alert("No se pudo eliminar el proyecto."));
    }
  };

  return (
    <div id="admin-project-management" className="p-6 md:p-8 space-y-8 text-left">
      
      {/* Title block & Create action */}
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-sans font-extrabold text-2xl text-stone-50 leading-none">
            GESTOR DE LOTES Y TERRENOS
          </h1>
          <span className="font-mono text-[10px] text-stone-400 block mt-1 uppercase tracking-wide">
            Crear, editar, duplicar y dar de baja lotes inmobiliarios en tiempo real
          </span>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-sans font-extrabold text-xs px-5 py-3 rounded-lg transition-transform hover:-translate-y-0.5 shadow-md active:translate-y-0 cursor-pointer"
        >
          <Plus className="w-4 h-4 shrink-0" />
          REGISTRAR NUEVO PROYECTO
        </button>
      </section>

      {/* Stats bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-stone-900 border border-stone-850 p-4 rounded-xl">
          <span className="font-mono text-[9px] text-stone-500 block uppercase tracking-wider">Lotes Totales</span>
          <strong className="text-xl font-sans font-extrabold text-stone-100">{projects.length}</strong>
        </div>
        <div className="bg-stone-900 border border-stone-850 p-4 rounded-xl">
          <span className="font-mono text-[9px] text-stone-500 block uppercase tracking-wider">En Pre-venta</span>
          <strong className="text-xl font-sans font-extrabold text-amber-500">
            {projects.filter((p) => p.status === "Pre-venta").length}
          </strong>
        </div>
        <div className="bg-stone-900 border border-stone-850 p-4 rounded-xl">
          <span className="font-mono text-[9px] text-stone-500 block uppercase tracking-wider">Entrega Inmediata</span>
          <strong className="text-xl font-sans font-extrabold text-emerald-500">
            {projects.filter((p) => p.status === "Inmediata").length}
          </strong>
        </div>
        <div className="bg-stone-900 border border-stone-850 p-4 rounded-xl">
          <span className="font-mono text-[9px] text-stone-500 block uppercase tracking-wider">Sectores agotados</span>
          <strong className="text-xl font-sans font-extrabold text-stone-400">
            {projects.filter((p) => p.status === "Vendido").length}
          </strong>
        </div>
      </section>

      {/* Control filter segmentations */}
      <section className="bg-stone-900 border border-stone-850 p-5 rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <h2 className="font-sans font-extrabold text-stone-200 text-sm tracking-wide">
            FILTROS Y EXPLORACIÓN
          </h2>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Search label */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-stone-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por lote, distrito, región..."
                value={projectQuery}
                onChange={(e) => setProjectQuery(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 focus:border-amber-400 text-stone-50 text-[11px] p-2 pl-8.5 rounded-lg outline-none"
              />
            </div>

            {/* Type selector */}
            <select
              value={projectTypeFilter}
              onChange={(e) => setProjectTypeFilter(e.target.value)}
              className="bg-stone-950 border border-stone-800 text-[11px] text-stone-400 p-2 rounded-lg outline-none cursor-pointer"
            >
              <option value="All">Todas las Zonas</option>
              <option value="Playero">Playero</option>
              <option value="Campestre">Campestre</option>
              <option value="Urbano">Habilitaciones urbanas</option>
              <option value="Industrial">Zonificación Industrial</option>
            </select>
          </div>
        </div>

        {/* Dynamic Project Table */}
        <div className="overflow-x-auto">
          {filteredProjects.length === 0 ? (
            <div className="p-12 text-center space-y-2">
              <SlidersHorizontal className="w-10 h-10 text-stone-600 mx-auto" />
              <h4 className="text-sm font-bold text-stone-400 font-sans">Ningún lote disponible</h4>
              <p className="text-stone-550 text-xs">
                No hay proyectos registrados que coincidan con la taxonomía buscada.
              </p>
            </div>
          ) : (
            <table className="w-full text-left font-sans text-xs text-stone-300 border-collapse">
              <thead>
                <tr className="bg-stone-955 font-mono text-[9px] uppercase text-stone-500 border-b border-stone-850">
                  <th className="p-4 font-bold">Proyecto / Parcela</th>
                  <th className="p-4 font-bold">Tipo</th>
                  <th className="p-4 font-bold">Ubicación / Sector</th>
                  <th className="p-4 font-bold">Superficie</th>
                  <th className="p-4 font-bold">Precio base</th>
                  <th className="p-4 font-bold">Estado Registral</th>
                  <th className="p-4 font-bold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-850">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-stone-850/40 group transition-colors">
                    <td className="p-4 font-bold text-stone-100">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-8 h-8 rounded object-cover shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex flex-col">
                          <span>{project.title}</span>
                          {project.featured && (
                            <span className="inline-flex items-center gap-0.5 text-amber-500 text-[9px] font-mono font-semibold">
                              <Sparkles className="w-2.5 h-2.5 animate-pulse" />
                              DESTACADO WEBPAGE
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-[10px] text-stone-400">
                      {project.projectType}
                    </td>
                    <td className="p-4 text-stone-400">
                      <div className="flex items-center gap-0.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate max-w-[150px]">{project.location}</span>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-[11px]">
                      {project.surface} m²
                    </td>
                    <td className="p-4">
                      <div className="font-mono font-semibold text-stone-100">
                        S/. {project.priceSoles.toLocaleString()}
                        <span className="block text-stone-500 text-[10px] font-light font-sans mt-0.5">
                          Ref: US$ {project.priceDollars.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-block font-sans font-bold text-[9px] uppercase px-2 py-0.5 rounded-full ${
                        project.status === "Pre-venta"
                          ? "bg-amber-500/15 text-amber-400 border border-amber-500/25"
                          : project.status === "Inmediata"
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
                          : project.status === "En Obras"
                          ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/25"
                          : "bg-stone-850 text-stone-600 border border-stone-800"
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleOpenEditModal(project)}
                          className="p-1.5 text-stone-400 hover:text-amber-500 hover:bg-stone-950 rounded transition-colors"
                          title="Editar parámetros"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id, project.title)}
                          className="p-1.5 text-stone-400 hover:text-rose-500 hover:bg-stone-950 rounded transition-colors"
                          title="Eliminar lote"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* CRUD MODAL FORM (Create/Edit project parameters) */}
      {isModalOpen && (
        <section className="fixed inset-0 bg-stone-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#191716] border border-stone-800 rounded-xl w-full max-w-2xl p-6 relative flex flex-col max-h-[90vh]">
            
            {/* Close button modal form */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 hover:bg-stone-850 rounded-lg text-stone-400 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Heading Form */}
            <div className="border-b border-stone-850 pb-4 mb-4">
              <span className="font-mono text-3xs text-amber-500 font-bold uppercase tracking-widest block mb-0.5">
                Expedientes de Habilitaciones
              </span>
              <h2 className="font-sans font-extrabold text-stone-100 text-base">
                {activeModalProject ? `Editar Parámetros: ${activeModalProject.title}` : "Registrar Nuevo Proyecto de Lotes"}
              </h2>
            </div>

            {/* Form scroll wrapper */}
            <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto pr-2 space-y-4 text-xs">
              
              {/* Section 1: Basic project inputs details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono text-3xs text-stone-400 uppercase tracking-wider font-bold">
                    Título Comercial del Proyecto
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Condominio Campestre Lomas II"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 focus:border-amber-400 text-stone-100 p-2.5 rounded-lg outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-3xs text-stone-400 uppercase tracking-wider font-bold">
                    Ubicación Específica (Km / Distrito)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Km 72 Panamericana Sur, Chilca"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 focus:border-amber-400 text-stone-100 p-2.5 rounded-lg outline-none"
                  />
                </div>
              </div>

              {/* Section 2: Regional, Zone configurations */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono text-3xs text-stone-400 uppercase tracking-wider font-bold">
                    Región / Departamento
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Lima, Ica, Pasco..."
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 focus:border-amber-400 text-stone-100 p-2.5 rounded-lg outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-3xs text-stone-400 uppercase tracking-wider font-bold">
                    Tipo de Zona Habilitada
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value as ProjectType)}
                    className="w-full bg-stone-950 border border-stone-800 text-stone-100 p-2.5 rounded-lg outline-none cursor-pointer"
                  >
                    <option value="Playero">Playero (Playa / Sol)</option>
                    <option value="Campestre">Campestre (Campo / Bosque)</option>
                    <option value="Urbano">Habilitaciones Urbanas</option>
                    <option value="Industrial">Zonificación Industrial</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-3xs text-stone-400 uppercase tracking-wider font-bold">
                    Estado Registral
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                    className="w-full bg-stone-950 border border-stone-800 text-stone-100 p-2.5 rounded-lg outline-none cursor-pointer"
                  >
                    <option value="Pre-venta">Pre-venta (Liquidación)</option>
                    <option value="Inmediata">Entrega Inmediata</option>
                    <option value="En Obras">En Obras / Habilitación</option>
                    <option value="Vendido">Vendido / Agotado</option>
                  </select>
                </div>
              </div>

              {/* Section 3: Surface and Cost metrics inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono text-3xs text-stone-400 uppercase tracking-wider font-bold">
                    Superficie Lote promedio (m²)
                  </label>
                  <input
                    type="number"
                    required
                    value={surface}
                    onChange={(e) => setSurface(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-stone-800 focus:border-amber-400 text-stone-100 p-2.5 rounded-lg outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-3xs text-stone-400 uppercase tracking-wider font-bold">
                    Soles Base (S/.)
                  </label>
                  <input
                    type="number"
                    required
                    value={priceSoles}
                    onChange={(e) => setPriceSoles(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-stone-800 focus:border-amber-400 text-stone-100 p-2.5 rounded-lg outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-3xs text-stone-400 uppercase tracking-wider font-bold">
                    Dólares Base (US$)
                  </label>
                  <input
                    type="number"
                    required
                    value={priceDollars}
                    onChange={(e) => setPriceDollars(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-stone-800 focus:border-amber-400 text-stone-100 p-2.5 rounded-lg outline-none"
                  />
                </div>
              </div>

              {/* Section 4: Imagery and Georadar Coordinates (lat/lng) inputs details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="block font-mono text-3xs text-stone-400 uppercase tracking-wider font-bold">
                    Enlace de Imagen Principal (Unsplash)
                  </label>
                  <input
                    type="url"
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 text-stone-150 p-2.5 rounded-lg outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="block font-mono text-3xs text-stone-400 uppercase tracking-wider font-bold">
                      Latitud
                    </label>
                    <input
                      type="number"
                      step="any"
                      required
                      value={lat}
                      onChange={(e) => setLat(Number(e.target.value))}
                      className="w-full bg-stone-950 border border-stone-800 focus:border-amber-400 text-stone-100 p-2.5 rounded-lg outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block font-mono text-3xs text-stone-400 uppercase tracking-wider font-bold">
                      Longitud
                    </label>
                    <input
                      type="number"
                      step="any"
                      required
                      value={lng}
                      onChange={(e) => setLng(Number(e.target.value))}
                      className="w-full bg-stone-950 border border-stone-800 focus:border-amber-400 text-stone-100 p-2.5 rounded-lg outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 5: Dynamic available lots metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono text-3xs text-stone-400 uppercase tracking-wider font-bold">
                    Lotes Totales en plano
                  </label>
                  <input
                    type="number"
                    required
                    value={totalLots}
                    onChange={(e) => setTotalLots(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-stone-800 focus:border-amber-400 text-stone-100 p-2.5 rounded-lg outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-3xs text-stone-400 uppercase tracking-wider font-bold">
                    Lotes Disponibles (Pre-venta)
                  </label>
                  <input
                    type="number"
                    required
                    value={availableLots}
                    onChange={(e) => setAvailableLots(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-stone-800 focus:border-amber-400 text-stone-100 p-2.5 rounded-lg outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6.5">
                  <input
                    type="checkbox"
                    id="featured-field"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 bg-stone-950 border-stone-800 rounded text-amber-500 checked:bg-amber-500 focus:ring-0 focus:outline-none cursor-pointer"
                  />
                  <label htmlFor="featured-field" className="font-mono text-3xs text-stone-300 uppercase tracking-wider cursor-pointer">
                    Destacar en la Web
                  </label>
                </div>
              </div>

              {/* Section 6: Features and Description text box area */}
              <div className="space-y-1.5">
                <label className="block font-mono text-3xs text-stone-400 uppercase tracking-wider font-bold">
                  Habilitaciones / Atributos (Separado por Comas)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Luz y Agua, Pórtico de seguridad, Título Sunarp, Parques, Club house..."
                  value={rawFeatures}
                  onChange={(e) => setRawFeatures(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 focus:border-amber-400 text-stone-100 p-2.5 rounded-lg outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-mono text-3xs text-stone-400 uppercase tracking-wider font-bold">
                  Descripción Expandible Legal / Comercial
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Escriba aquí los pormenores notariales del proyecto, plusvalía vial..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 focus:border-amber-400 text-stone-100 p-2.5 rounded-lg outline-none resize-none"
                />
              </div>

              {/* Actions footer modal form */}
              <div className="pt-4 border-t border-stone-850 flex items-center justify-end gap-3 font-sans font-bold">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-stone-450 hover:text-stone-200 uppercase"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-6 py-2.5 rounded-lg uppercase tracking-wide"
                >
                  {activeModalProject ? "Salvar cambios del Lote" : "Inscribir proyecto comercial"}
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </div>
  );
};
