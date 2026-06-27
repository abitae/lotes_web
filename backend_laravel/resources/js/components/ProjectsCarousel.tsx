/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from "react";
import type { Project } from "../types";
import { ProjectCard } from "./ProjectCard";

const CARD_WIDTH = 380;
const GAP = 24;

function buildInfiniteTrack(items: Project[]): Project[] {
  if (items.length === 0) return [];
  return [...items, ...items];
}

type ProjectsCarouselProps = {
  projects: Project[];
  /** Columnas visibles en viewport grande (carrusel horizontal) */
  visibleColumns?: number;
};

export const ProjectsCarousel: React.FC<ProjectsCarouselProps> = ({
  projects,
  visibleColumns = 3,
}) => {
  const loopItems = useMemo(() => buildInfiniteTrack(projects), [projects]);

  const durationSec = useMemo(() => {
    const base = projects.length * 5;
    return Math.max(32, Math.min(120, base));
  }, [projects.length]);

  const sequenceWidth =
    projects.length * CARD_WIDTH + Math.max(0, projects.length - 1) * GAP;

  if (projects.length === 0) return null;

  return (
    <div
      id="home-projects-carousel"
      className="relative w-full overflow-hidden"
      aria-label="Carrusel de proyectos del catálogo"
      data-visible-columns={visibleColumns}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-20 lg:w-28 bg-gradient-to-r from-[var(--card-bg)] via-[var(--card-bg)]/90 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-20 lg:w-28 bg-gradient-to-l from-[var(--card-bg)] via-[var(--card-bg)]/90 to-transparent" />

      <div
        className="infinite-marquee-track flex w-max gap-6 py-1 px-4 sm:px-6 lg:px-8"
        style={
          {
            "--marquee-duration": `${durationSec}s`,
            "--marquee-shift": `${sequenceWidth}px`,
          } as React.CSSProperties
        }
      >
        {loopItems.map((project, index) => (
          <div
            key={`${project.id}-${index}`}
            className="shrink-0 w-[min(340px,calc(100vw-2rem))] sm:w-[min(360px,calc(50vw-1.5rem))] lg:w-[380px]"
          >
            <ProjectCard project={project} variant="home" layout="grid" />
          </div>
        ))}
      </div>
    </div>
  );
};
