/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Recycle, Mail, ShieldCheck, Heart, GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contacto" className="bg-slate-950 text-white py-16 border-t border-slate-900 transition-colors duration-300 relative overflow-hidden">
      
      {/* Decorative vectors */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#2E7D32]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-50px] left-[-30px] w-96 h-96 bg-[#1565C0]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-900 items-start">
          
          {/* Logo Brand Descriptor */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2.5 bg-primary-green text-white rounded-xl flex items-center justify-center shadow">
                <Recycle className="h-5 w-5" />
              </div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-white">
                Culiacán Verde
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans font-medium">
              Observatorio Escolar y de Participación Ciudadana enfocado en exponer, georreferenciar y educar sobre las principales crisis ambientales que sufre la cuenca urbana de Culiacán, Sinaloa.
            </p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              <ShieldCheck className="h-4 w-4" />
              <span>Proyecto con Licencia Educativa Libre</span>
            </div>
          </div>

          {/* Academic Profile & Autor */}
          <div className="md:col-span-4 space-y-4 text-left">
            <h4 className="font-heading font-extrabold text-xs uppercase tracking-widest text-gray-400">
              Perfil Académico del Proyecto
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <GraduationCap className="h-5 w-5 text-sky-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Plantel Educativo</span>
                  <p className="text-xs sm:text-sm text-gray-200 font-semibold leading-snug">
                    CBTIS 224 - Centro de Bachillerato Tecnológico Industrial y de Servicios N°. 224
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Contacto Autor</span>
                  <a 
                    href="mailto:25_antonio.meraz@cbtis224.edu.mx" 
                    className="text-xs sm:text-sm text-[#4CAF50] hover:text-[#3d8c41] font-semibold underline transition-colors"
                  >
                    25_antonio.meraz@cbtis224.edu.mx
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Slogan */}
          <div className="md:col-span-3 space-y-4 text-left lg:text-right">
            <h4 className="font-heading font-extrabold text-xs uppercase tracking-widest text-gray-400">
              Autoría Escolar
            </h4>
            
            <div className="space-y-1">
              <span className="text-[11px] text-gray-500 font-bold block">Desarrollado y Compilado por:</span>
              <p className="font-heading font-extrabold text-[#1E88E5] text-lg">
                Antonio Meraz
              </p>
              <span className="text-[10px] text-gray-400 block font-medium">Estudiante Técnico Cbtis 224</span>
              <span className="text-[10px] text-gray-500 block font-medium">Culiacán, Sinaloa, México • 2026</span>
            </div>
          </div>

        </div>

        {/* Deep bottom footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-gray-500 font-medium">
          <p>© 2026 Culiacán Verde. Todos los derechos reservados.</p>
          <p className="inline-flex items-center gap-1">
            <span>Hecho con</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" />
            <span>para fomentar la Ecología en Sinaloa.</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
