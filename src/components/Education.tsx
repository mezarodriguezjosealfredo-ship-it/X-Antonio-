/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EDUCATION_TIPS } from "../data";
import { 
  FolderSync, 
  Leaf, 
  Droplets, 
  Bike, 
  Users, 
  Flame, 
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { motion } from "motion/react";

export default function Education() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "FolderSync":
        return <FolderSync className="h-6 w-6 text-emerald-500" />;
      case "Leaf":
        return <Leaf className="h-6 w-6 text-emerald-500" />;
      case "Droplets":
        return <Droplets className="h-6 w-6 text-blue-500" />;
      case "Bike":
        return <Bike className="h-6 w-6 text-sky-500" />;
      case "Users":
        return <Users className="h-6 w-6 text-purple-500" />;
      case "Flame":
        return <Flame className="h-6 w-6 text-red-500" />;
      default:
        return <Leaf className="h-6 w-6 text-emerald-500" />;
    }
  };

  return (
    <section id="consejos" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-green dark:text-emerald-400 font-heading font-bold text-xs uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/50 px-4 py-1.5 rounded-full inline-block mb-3 border border-emerald-100 dark:border-emerald-900/40">
            Formación Ciudadana Sustentable
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-gray-900 dark:text-white tracking-tight">
            Consejos y Acciones para Proteger Culiacán
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-slate-400 leading-relaxed">
            Nuestras decisiones diarias determinan los ecosistemas del futuro. Descubre hábitos simples pero poderosos que construyen el desarrollo sustentable del municipio.
          </p>
        </div>

        {/* Advice Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EDUCATION_TIPS.map((tip, i) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-gray-50 dark:bg-slate-800/40 border border-gray-100 dark:border-slate-800 rounded-3xl p-6.5 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl hover:border-gray-200 dark:hover:border-slate-700 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Icon Circle */}
                <div className="p-3 bg-white dark:bg-slate-900 shadow-sm border border-gray-100 dark:border-slate-800 w-12 h-12 rounded-2xl flex items-center justify-center mb-5 hover:scale-105 active:scale-95 transition-transform duration-200">
                  {getIcon(tip.icon)}
                </div>

                <h3 className="font-heading font-extrabold text-base text-gray-950 dark:text-white tracking-tight">
                  {tip.title}
                </h3>
                
                <p className="mt-3 text-xs sm:text-sm text-gray-600 dark:text-slate-300 leading-relaxed font-sans font-medium">
                  {tip.description}
                </p>
              </div>

              {/* Decorative detail bar */}
              <div className="mt-6 pt-4 border-t border-gray-200/50 dark:border-slate-800 flex items-center gap-1.5 text-primary-green dark:text-emerald-400 font-bold text-xs font-heading">
                <ShieldCheck className="h-4 w-4" />
                <span>Impacto Positivo Local</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner urging participation */}
        <div className="mt-16 bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-[-40px] right-[-20px] w-64 h-64 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-[-50px] left-[-30px] w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-3xl z-10 text-left space-y-4">
            <h4 className="font-heading font-extrabold text-xl sm:text-2xl leading-none">
              ¿Quieres hacer más por el medio ambiente hoy?
            </h4>
            <p className="text-xs sm:text-base text-gray-100 leading-relaxed">
              El primer paso es registrar los tiraderos clandestinos, fugas pluviales en arroyos o espectaculares irregulares de tu colonia. Usa el mapa georreferenciado e inicia una queja comunitaria fundamentada hoy mismo.
            </p>
            <div className="pt-2">
              <a
                href="#reportar"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-900 hover:bg-gray-50 font-heading font-bold text-xs uppercase tracking-wider rounded-xl hover:scale-103 active:scale-95 transition-all shadow"
                id="education-cta-report"
              >
                <span>Reportar problemática actual</span>
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
