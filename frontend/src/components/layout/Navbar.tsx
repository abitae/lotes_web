/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Landmark, Compass, CircleHelp, Users, ShieldAlert, Sun, Moon } from "lucide-react";
import { useApp } from "../../context/AppContext";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useApp();
  const location = useLocation();

  // Handle transparent to white background on scorll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on change route
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      id="public-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-[var(--card-bg)]/90 border-[var(--border)] shadow-md py-1.5"
          : "bg-[var(--bg)]/75 border-[var(--border)]/35 py-2.5"
      } backdrop-blur-md`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-1.5 bg-[var(--card-bg)] border border-[var(--border)] rounded text-[var(--accent)] group-hover:bg-[var(--border)] transition-all">
              <Landmark className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-extrabold text-sm tracking-wide text-[var(--text-p)] uppercase leading-none">
                Lotes en Remate
              </span>
              <span className="font-mono text-[9px] text-[var(--accent)] tracking-widest uppercase font-semibold mt-0.5">
                Inversión.pe
              </span>
            </div>
          </Link>

          {/* Desktop NavLinks */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-xs font-semibold tracking-wide transition-colors ${
                  isActive ? "text-[var(--accent)] font-extrabold" : "text-[var(--text-s)] hover:text-[var(--text-p)]"
                }`
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/catalog"
              className={({ isActive }) =>
                `text-xs font-semibold tracking-wide transition-colors ${
                  isActive ? "text-[var(--accent)] font-extrabold" : "text-[var(--text-s)] hover:text-[var(--text-p)]"
                }`
              }
            >
              Proyectos
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-xs font-semibold tracking-wide transition-colors ${
                  isActive ? "text-[var(--accent)] font-extrabold" : "text-[var(--text-s)] hover:text-[var(--text-p)]"
                }`
              }
            >
              Nosotros
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-xs font-semibold tracking-wide transition-colors ${
                  isActive ? "text-[var(--accent)] font-extrabold" : "text-[var(--text-s)] hover:text-[var(--text-p)]"
                }`
              }
            >
              Contacto
            </NavLink>
          </div>

          {/* Right Controls: Theme Toggle & CRM Access Link */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded bg-[var(--card-bg)] border border-[var(--border)] text-[var(--text-p)] hover:bg-[var(--border)] transition-all cursor-pointer shadow-sm relative active:scale-95"
              title={theme === "light" ? "Modo Oscuro" : "Modo Claro"}
              aria-label="Cambiar tema"
            >
              {theme === "light" ? (
                <Moon className="w-3.5 h-3.5 text-stone-600" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              )}
            </button>

            <Link
              to="/admin"
              className="inline-flex items-center gap-1 bg-[var(--card-bg)] border border-[var(--border)] hover:bg-[var(--border)] text-[var(--text-p)] px-3.5 py-1.5 rounded text-[10px] font-mono tracking-wider transition-all uppercase premium-card-shadow"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-[var(--accent)]" />
              Panel de Control
            </Link>
          </div>

          {/* Mobile Menu Action Trigger */}
          <div className="flex md:hidden items-center gap-1.5">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded bg-[var(--card-bg)] border border-[var(--border)] text-[var(--text-p)] hover:bg-[var(--border)] transition-all cursor-pointer active:scale-95"
              aria-label="Cambiar tema"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4 text-stone-600" />
              ) : (
                <Sun className="w-4 h-4 text-amber-500" />
              )}
            </button>

            <Link
              to="/admin"
              className="p-2 text-[var(--text-p)] hover:bg-[var(--border)] rounded border border-transparent hover:border-[var(--border)] transition-colors"
              title="Panel Admin"
            >
              <ShieldAlert className="w-4 h-4 text-[var(--accent)]" />
            </Link>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 text-[var(--text-s)] hover:text-[var(--text-p)] focus:outline-none rounded hover:bg-[var(--card-bg)]"
              aria-label="Abrir menú"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-[var(--card-bg)] border-b border-[var(--border)] py-3 px-4 shadow-inner space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-3 py-2 rounded text-xs font-semibold transition-colors ${
                isActive ? "bg-[var(--border)] text-[var(--accent)]" : "text-[var(--text-s)] hover:bg-[var(--border)]/50"
              }`
            }
          >
            <span className="flex items-center gap-2">
              <Landmark className="w-4 h-4 text-[var(--accent)]" />
              Inicio
            </span>
          </NavLink>
          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              `block px-3 py-2 rounded text-xs font-semibold transition-colors ${
                isActive ? "bg-[var(--border)] text-[var(--accent)]" : "text-[var(--text-s)] hover:bg-[var(--border)]/50"
              }`
            }
          >
            <span className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[var(--accent)]" />
              Proyectos
            </span>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `block px-3 py-2 rounded text-xs font-semibold transition-colors ${
                isActive ? "bg-[var(--border)] text-[var(--accent)]" : "text-[var(--text-s)] hover:bg-[var(--border)]/50"
              }`
            }
          >
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[var(--accent)]" />
              Nosotros
            </span>
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `block px-3 py-2 rounded text-xs font-semibold transition-colors ${
                isActive ? "bg-[var(--border)] text-[var(--accent)]" : "text-[var(--text-s)] hover:bg-[var(--border)]/50"
              }`
            }
          >
            <span className="flex items-center gap-2">
              <CircleHelp className="w-4 h-4 text-[var(--accent)]" />
              Contacto
            </span>
          </NavLink>

          <div className="pt-3 border-t border-[var(--border)] flex flex-col gap-2">
            <Link
              to="/admin"
              className="flex justify-center items-center gap-1.5 bg-[var(--accent)] hover:bg-[#008c4a] text-white font-semibold py-2 rounded text-xs tracking-wide transition-all"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-white" />
              ENTRAR AL PANEL DE CONTROL
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
