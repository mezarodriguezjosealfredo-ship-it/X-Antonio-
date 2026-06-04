/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { PROBLEMS_DATA } from "../data";
import { Problem } from "../types";
import { 
  Wind, 
  Droplet, 
  Trash2, 
  Eye, 
  Volume2, 
  AlertTriangle, 
  MapPin, 
  CheckCircle,
  HelpCircle,
  ArrowRight,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Problems() {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

  const getProblemIcon = (category: string) => {
    switch (category) {
      case "aire":
        return <Wind className="h-6 w-6 text-sky-500" />;
      case "agua":
        return <Droplet className="h-6 w-6 text-primary-blue-light" />;
      case "suelo":
        return <Trash2 className="h-6 w-6 text-amber-500" />;
      case "visual":
        return <Eye className="h-6 w-6 text-purple-500" />;
      case "acústica":
        return <Volume2 className="h-6 w-6 text-rose-500" />;
      default:
        return <HelpCircle className="h-6 w-6 text-gray-500" />;
    }
  };

  const getSplatColor = (category: string) => {
    switch (category) {
      case "aire":
        return "bg-sky-50 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300 ring-sky-500/20";
      case "agua":
        return "bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 ring-blue-500/20";
      case "suelo":
        return "bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 ring-amber-500/20";
      case "visual":
        return "bg-purple-50 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300 ring-purple-500/20";
      case "acústica":
        return "bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 ring-rose-500/20";
      default:
        return "bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <section id="problematicas" className="py-24 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-green dark:text-emerald-400 font-heading font-bold text-xs uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/50 px-4 py-1.5 rounded-full inline-block mb-3 border border-emerald-100 dark:border-emerald-900/40">
            Diagnóstico Local
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-gray-900 dark:text-white tracking-tight">
            Problemáticas Críticas en Nuestra Ciudad
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-slate-400">
            Identificamos los principales factores y focos rojos que dañan la ecología y el bienestar social de los habitantes de Culiacán.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROBLEMS_DATA.map((problem) => (
            <motion.div
              layoutId={`problem-card-${problem.id}`}
              key={problem.id}
              onClick={() => setSelectedProblem(problem)}
              className="group cursor-pointer flex flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/80 shadow-md hover:shadow-xl hover:border-gray-200 dark:hover:border-slate-700/80 transition-all duration-300 relative"
              whileHover={{ y: -6 }}
            >
              {/* Cover Image with gradient overlay */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-200">
                <img
                  src={problem.imageUrl}
                  alt={problem.title}
                  loading="lazy"
                  className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <span className={`absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-heading uppercase tracking-wide backdrop-blur-md shadow-md ${getSplatColor(problem.category)}`}>
                  {getProblemIcon(problem.category)}
                  <span className="ml-1">{problem.category}</span>
                </span>
                
                {/* Severity Score Indicator */}
                <div className="absolute bottom-4 right-4 bg-red-600 text-white font-bold font-heading text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-md">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>Impacto: {problem.impactScore}/10</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-heading font-extrabold text-gray-900 dark:text-white tracking-tight group-hover:text-primary-green dark:group-hover:text-emerald-400 transition-colors duration-200">
                    {problem.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {problem.shortDescription}
                  </p>
                </div>

                {/* Hotspot & Readmore bar */}
                <div className="mt-6 pt-5 border-t border-gray-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-gray-400" />
                    <span>Foco Crítico</span>
                  </span>
                  <button className="text-primary-green dark:text-[#4CAF50] hover:text-primary-green-dark text-xs font-bold inline-flex items-center gap-1">
                    <span>Ver más</span>
                    <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Modal Overlay */}
        <AnimatePresence>
          {selectedProblem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
              
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProblem(null)}
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
              />

              {/* Modal Card */}
              <motion.div
                layoutId={`problem-card-${selectedProblem.id}`}
                className="relative bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-slate-800 z-10 max-h-[90vh] flex flex-col"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProblem(null)}
                  className="absolute top-4 right-4 z-20 bg-slate-900/60 hover:bg-slate-950 text-white p-2 rounded-full backdrop-blur-md transition-colors"
                  aria-label="Cerrar ventana"
                  id="close-problem-modal"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Cover with Title */}
                <div className="relative h-64 md:h-80 select-none overflow-hidden flex-shrink-0 bg-slate-800">
                  <img
                    src={selectedProblem.imageUrl}
                    alt={selectedProblem.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/45 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold font-heading uppercase tracking-wide backdrop-blur-md mb-3 ${getSplatColor(selectedProblem.category)}`}>
                      {getProblemIcon(selectedProblem.category)}
                      <span className="ml-1">{selectedProblem.category}</span>
                    </span>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-extrabold text-white leading-tight">
                      {selectedProblem.title}
                    </h3>
                  </div>
                </div>

                {/* Modal Main Content (Scrollable) */}
                <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-8">
                  {/* General description */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Descripción General</h4>
                    <p className="text-sm md:text-base text-gray-700 dark:text-slate-300 leading-relaxed font-sans first-letter:text-3xl first-letter:font-extrabold first-letter:mr-1 first-letter:float-left first-letter:text-primary-green dark:first-letter:text-emerald-400">
                      {selectedProblem.description}
                    </p>
                  </div>

                  {/* Top Stats and Hotspot */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-100 dark:border-slate-800">
                    <div className="bg-red-500/5 dark:bg-rose-500/5 border border-red-500/10 p-5 rounded-2xl flex items-start gap-4">
                      <div className="p-2.5 bg-red-500/10 rounded-xl text-red-500 mt-0.5">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-red-500 uppercase tracking-wider">Estadística Clave</h4>
                        <p className="text-xs md:text-sm text-gray-700 dark:text-slate-300 font-medium leading-relaxed mt-1">{selectedProblem.keyStatistics}</p>
                      </div>
                    </div>

                    <div className="bg-[#1565C0]/5 border border-[#1565C0]/10 p-5 rounded-2xl flex items-start gap-4">
                      <div className="p-2.5 bg-[#1565C0]/10 rounded-xl text-[#1565C0] mt-0.5">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#1565C0] uppercase tracking-wider">Foco Rojo en Culiacán</h4>
                        <p className="text-xs md:text-sm text-gray-700 dark:text-slate-300 font-medium leading-relaxed mt-1">{selectedProblem.culiacanHotspot}</p>
                      </div>
                    </div>
                  </div>

                  {/* Causes, Consequences, Solutions bento style */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-gray-100 dark:border-slate-800">
                        <h4 className="font-heading font-extrabold text-sm text-gray-900 dark:text-white mb-3 tracking-tight">Causas Principales</h4>
                        <ul className="space-y-2">
                          {selectedProblem.causes.map((cause, i) => (
                            <li key={i} className="flex gap-2 text-xs md:text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                              <span className="text-primary-green font-bold text-xs mt-0.5">•</span>
                              <span>{cause}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-gray-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-gray-100 dark:border-slate-800">
                        <h4 className="font-heading font-extrabold text-sm text-gray-900 dark:text-white mb-3 tracking-tight">Efectos y Consecuencias</h4>
                        <ul className="space-y-2">
                          {selectedProblem.consequences.map((consequence, i) => (
                            <li key={i} className="flex gap-2 text-xs md:text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                              <span className="text-red-500 font-bold text-xs mt-0.5">•</span>
                              <span>{consequence}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-emerald-500/5 border border-emerald-500/10 p-5 rounded-2xl">
                      <h4 className="font-heading font-extrabold text-sm text-emerald-600 dark:text-emerald-400 mb-3 tracking-tight inline-flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Propuestas y Soluciones Viables</span>
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedProblem.solutions.map((solution, i) => (
                          <li key={i} className="flex gap-2 text-xs md:text-sm text-gray-700 dark:text-slate-300 leading-normal">
                            <span className="text-emerald-500 font-extrabold text-xs">✓</span>
                            <span>{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer modal info */}
                <div className="p-4 bg-gray-50 dark:bg-slate-950 border-t border-gray-100 dark:border-slate-800 text-center flex-shrink-0 text-[10px] sm:text-xs text-gray-400 font-medium">
                  Culiacán Verde • Promoviendo la cultura urbana ecológica participativa.
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
