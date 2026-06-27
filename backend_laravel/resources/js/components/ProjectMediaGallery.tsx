/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import type { Project } from "../types";

export interface GalleryItem {
  url: string;
  title: string;
}

function buildGalleryItems(project: Project): GalleryItem[] {
  const items: GalleryItem[] = [];
  const seen = new Set<string>();

  const add = (url: string | undefined | null, title: string) => {
    const trimmed = url?.trim();
    if (!trimmed || seen.has(trimmed)) return;
    seen.add(trimmed);
    items.push({ url: trimmed, title });
  };

  add(project.imageUrl, project.title);
  for (const img of project.images ?? []) {
    add(img.url, img.title || project.title);
  }

  return items;
}

interface ProjectMediaGalleryProps {
  project: Project;
}

export const ProjectMediaGallery: React.FC<ProjectMediaGalleryProps> = ({ project }) => {
  const items = useMemo(() => buildGalleryItems(project), [project]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const activeItem = items[activeIndex] ?? items[0];
  const modalItem = items[modalIndex] ?? items[0];
  const hasMultiple = items.length > 1;

  const openModal = (index: number) => {
    setModalIndex(index);
    setActiveIndex(index);
    setModalOpen(true);
  };

  const selectThumbnail = (index: number) => {
    setActiveIndex(index);
    openModal(index);
  };

  const closeModal = useCallback(() => setModalOpen(false), []);

  const goPrev = useCallback(() => {
    setModalIndex((i) => (i - 1 + items.length) % items.length);
  }, [items.length]);

  const goNext = useCallback(() => {
    setModalIndex((i) => (i + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (!modalOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [modalOpen, closeModal, goPrev, goNext]);

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-[var(--border)]/50 bg-[var(--card-bg)] h-[280px] sm:h-[400px] flex items-center justify-center text-[var(--text-muted)] text-sm">
        Sin imágenes disponibles
      </div>
    );
  }

  return (
    <>
      <div className="rounded-xl border border-[var(--border)]/50 bg-[var(--card-bg)] overflow-hidden">
        <div className="flex flex-col sm:flex-row gap-2.5 p-2.5 sm:p-3">
          {hasMultiple && (
            <div
              className="flex sm:flex-col gap-1.5 overflow-x-auto sm:overflow-y-auto sm:overflow-x-hidden shrink-0 sm:w-[84px] sm:h-[400px] order-2 sm:order-1 scrollbar-thin"
              role="list"
              aria-label="Miniaturas"
            >
              {items.map((item, idx) => (
                <button
                  key={item.url}
                  type="button"
                  role="listitem"
                  onClick={() => selectThumbnail(idx)}
                  className={`relative shrink-0 w-[68px] h-[51px] sm:w-[84px] sm:h-[62px] rounded-md overflow-hidden border transition-all cursor-pointer ${
                    activeIndex === idx
                      ? "border-[var(--accent)]/45 ring-1 ring-[var(--accent)]/20 opacity-100"
                      : "border-[var(--border)]/45 opacity-75 hover:opacity-100 hover:border-[var(--border)]"
                  }`}
                  aria-label={`Ver ${item.title}`}
                  aria-current={activeIndex === idx ? "true" : undefined}
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => openModal(activeIndex)}
            className="relative w-full sm:flex-1 h-[280px] sm:h-[400px] rounded-lg overflow-hidden bg-[var(--bg)] border border-[var(--border)]/40 group order-1 sm:order-2 cursor-zoom-in focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]/40"
            aria-label="Ampliar imagen"
          >
            <img
              src={activeItem.url}
              alt={activeItem.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            <span className="absolute bottom-2.5 right-2.5 p-1.5 rounded-md bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Visor de imagen"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/88 backdrop-blur-[2px]"
            onClick={closeModal}
            aria-label="Cerrar"
          />

          <div className="relative z-10 w-full max-w-5xl flex flex-col max-h-[92vh]">
            <button
              type="button"
              onClick={closeModal}
              className="absolute -top-1 right-0 sm:-right-1 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full h-[min(70vh,520px)] flex items-center justify-center rounded-lg overflow-hidden border border-white/10">
              {hasMultiple && (
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-2 sm:left-3 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white/90 transition-colors border border-white/10"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              <img
                src={modalItem.url}
                alt={modalItem.title}
                className="absolute inset-0 w-full h-full object-contain p-3 sm:p-5"
                referrerPolicy="no-referrer"
              />

              {hasMultiple && (
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-2 sm:right-3 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white/90 transition-colors border border-white/10"
                  aria-label="Imagen siguiente"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {hasMultiple && (
              <div className="mt-3 flex gap-1.5 overflow-x-auto justify-center pb-1 px-2">
                {items.map((item, idx) => (
                  <button
                    key={item.url}
                    type="button"
                    onClick={() => {
                      setModalIndex(idx);
                      setActiveIndex(idx);
                    }}
                    className={`relative shrink-0 w-14 h-[42px] rounded overflow-hidden border transition-all ${
                      modalIndex === idx
                        ? "border-white/70 ring-1 ring-white/25 opacity-100"
                        : "border-white/15 opacity-50 hover:opacity-90"
                    }`}
                  >
                    <img src={item.url} alt="" className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export { buildGalleryItems };
