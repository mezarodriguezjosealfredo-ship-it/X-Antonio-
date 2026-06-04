/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, Leaf, ShieldAlert, Award } from "lucide-react";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-900 text-white">
      {/* Background Image Overlay with deep gradient blending */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105 transform transition-transform duration-10000"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=85&w=1800')`
        }}
      />
      {/* Advanced CSS radial and linear gradient masks to isolate the content and establish a government/educational grade visual aesthetic */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#1B5E20]/90 via-slate-900/90 to-[#0D47A1]/80 mix-blend-multiply" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50 dark:from-slate-950 to-transparent pointer-events-none" />

      {/* Decorative clean ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary-green-light/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary-blue-light/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 dark:bg-slate-900/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs sm:text-sm font-semibold tracking-wide text-emerald-400">
            <Leaf className="h-4 w-4 text-emerald-400" />
            <span>Proyecto Educativo y Sostenibilidad • Culiacán 2026</span>
          </div>

          {/* Majestic Main Headline */}
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight">
            Contaminación Ambiental en <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 drop-shadow-sm">
              Culiacán, Sinaloa
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-base sm:text-xl text-gray-200 font-normal leading-relaxed">
            Conoce los principales problemas de aire, agua, suelo, visuales y acústicos de nuestra ciudad y descubre cómo podemos involucrarnos activamente para sembrar el verdadero cambio ambiental.
          </p>

          {/* CTA Buttons */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#problematicas"
              className="w-full sm:w-auto px-8 py-4 bg-primary-green hover:bg-[#256c29] text-white font-heading font-semibold text-sm rounded-xl inline-flex items-center justify-center gap-2.5 transition-all shadow-lg hover:shadow-primary-green/20 hover:scale-[1.02] transform active:scale-95 duration-200"
              id="cta-explore"
            >
              <span>Explorar Información</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            
            <a
              href="#reportar"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-heading font-semibold text-sm rounded-xl inline-flex items-center justify-center gap-2.5 border border-white/20 backdrop-blur-sm transition-all duration-200"
              id="cta-report"
            >
              <ShieldAlert className="h-4.5 w-4.5 text-coral-400" />
              <span>Reportar un Problema</span>
            </a>
          </div>

          {/* Quick Metrics Overlay Dashboard */}
          <div className="pt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm text-left">
              <span className="text-3xl font-bold font-heading text-emerald-400 block mb-1">~1,000</span>
              <span className="text-xs font-semibold text-gray-300 uppercase tracking-wide block">Toneladas Diarias</span>
              <p className="text-xs text-gray-400 mt-1">De basura generadas diariamente en Culiacán.</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm text-left">
              <span className="text-3xl font-bold font-heading text-sky-400 block mb-1">5x OMS</span>
              <span className="text-xs font-semibold text-gray-300 uppercase tracking-wide block">Partículas PM2.5</span>
              <p className="text-xs text-gray-400 mt-1">La calidad de aire promedia niveles críticos.</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm text-left">
              <span className="text-3xl font-bold font-heading text-amber-400 block mb-1">&gt; 280 L</span>
              <span className="text-xs font-semibold text-gray-300 uppercase tracking-wide block">De Agua por Día</span>
              <p className="text-xs text-gray-400 mt-1">Uso diario por persona superando el límite ideal.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
