/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Sun, Moon, Menu, X, Recycle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  activeSection: string;
}

export default function Navbar({ darkMode, setDarkMode, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Inicio", href: "#inicio" },
    { label: "Problemáticas", href: "#problematicas" },
    { label: "Estadísticas", href: "#estadisticas" },
    { label: "Actividades", href: "#actividades" },
    { label: "Reportar Problema", href: "#reportar" },
    { label: "Consejos", href: "#consejos" },
    { label: "Fuentes", href: "#fuentes" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Slogan */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="p-2 bg-primary-green text-white rounded-lg flex items-center justify-center shadow-md dark:shadow-none animate-pulse">
              <Recycle className="h-5 w-5" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-base sm:text-lg tracking-tight text-primary-green dark:text-[#4CAF50]">
                Culiacán Verde
              </span>
              <span className="hidden sm:block text-[10px] font-medium text-gray-500 dark:text-slate-400">
                Observatorio Ambiental Ciudadano
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {menuItems.map((item) => {
              const cleanedHref = item.href.slice(1);
              const isActive = activeSection === cleanedHref;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold font-heading uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? "bg-primary-green/10 text-primary-green dark:text-[#4fba54] dark:bg-emerald-500/10 font-bold"
                      : "text-gray-600 dark:text-slate-300 hover:text-primary-green hover:bg-gray-100 dark:hover:bg-slate-800 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Action Area: Theme Toggle & Mobile Menu Switch */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-slate-300 transition-all duration-300"
              aria-label="Alternar modo oscuro"
              id="theme-toggle-btn"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-slate-300 lg:hidden transition-all duration-300"
              aria-label="Abrir menú"
              id="mobile-menu-btn"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              {menuItems.map((item) => {
                const cleanedHref = item.href.slice(1);
                const isActive = activeSection === cleanedHref;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm font-semibold font-heading uppercase tracking-wide transition-all ${
                      isActive
                        ? "bg-primary-green text-white dark:bg-[#2E7D32]"
                        : "text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-primary-green"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
