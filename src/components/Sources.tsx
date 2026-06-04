/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExternalLink, Shield, Library, FileText, CheckCircle2 } from "lucide-react";

export default function Sources() {
  const sourcesList = [
    {
      acronym: "INEGI",
      fullName: "Instituto Nacional de Estadística y Geografía",
      resource: "Censo de Población y Vivienda / Estadísticas de Medio Ambiente Urbano",
      link: "https://www.inegi.org.mx",
      utilization: "Modelado estadístico y generación de residuos sólidos por cápita del municipio en Sinaloa.",
      status: "Verificado e Indexado"
    },
    {
      acronym: "SEMARNAT",
      fullName: "Secretaría de Medio Ambiente y Recursos Naturales",
      resource: "Base de Datos de Calidad del Aire (SINAICA) e inventario municipal de emisiones",
      link: "https://www.gob.mx/semarnat",
      utilization: "Parámetros máximos saludables de partículas PM2.5 y monitoreo ecológico federal.",
      status: "Verificado e Indexado"
    },
    {
      acronym: "CONAGUA",
      fullName: "Comisión Nacional del Agua",
      resource: "Registro de cuencas hidrológicas y estadísticas de escurrimientos agrícolas",
      link: "https://www.gob.mx/conagua",
      utilization: "Índice de descargas en afluentes de los tres ríos y sequías periódicas acumuladas.",
      status: "Verificado e Indexado"
    },
    {
      acronym: "GobSinaloa",
      fullName: "Gobierno del Estado de Sinaloa - Secretaría de Desarrollo Sustentable",
      resource: "Ley Ambiental para el Desarrollo Sustentable del Estado de Sinaloa",
      link: "https://sinaloa.gob.mx",
      utilization: "Incentivos y regulaciones legales vehiculares, de ruidos y normas de ladrilleras ornamentales.",
      status: "Verificado"
    },
    {
      acronym: "AytoCln",
      fullName: "H. Ayuntamiento de Culiacán",
      resource: "Reglamento de Ecología y Protección al Ambiente del Municipio de Culiacán",
      link: "https://www.culiacan.gob.mx",
      utilization: "Regulación técnica de espectaculares comerciales y recolección de basura urbana.",
      status: "Verificado e Indexado"
    }
  ];

  return (
    <section id="fuentes" className="py-24 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-blue dark:text-sky-400 font-heading font-bold text-xs uppercase tracking-widest bg-blue-50 dark:bg-blue-950/50 px-4 py-1.5 rounded-full inline-block mb-3 border border-blue-100 dark:border-blue-900/40">
            Transparencia y Fundamento
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-gray-900 dark:text-white tracking-tight">
            Fuentes de Información Oficiales
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-slate-400 leading-relaxed">
            Garantizamos la veracidad y el rigor científico de nuestro portal. Todos los datos, estadísticas y marcos normativos provienen de instituciones públicas autorizadas.
          </p>
        </div>

        {/* Tabular Directory Layout */}
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-6 bg-gray-50/50 dark:bg-slate-950 border-b border-gray-200/60 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-heading font-extrabold text-sm text-gray-950 dark:text-gray-100 flex items-center gap-2">
              <Library className="h-5 w-5 text-primary-blue" />
              <span>Directorio Normativo y Estadístico</span>
            </h3>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 flex items-center gap-1 border border-emerald-100 dark:border-emerald-900/40">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Actualizado: Junio 2026</span>
            </span>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-slate-800/80">
            {sourcesList.map((source) => (
              <div 
                key={source.acronym} 
                className="p-6 hover:bg-gray-50/30 dark:hover:bg-slate-800/20 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="flex-1 space-y-2 text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 text-[11px] font-heading font-bold bg-[#1565C0]/10 text-[#1565C0] dark:bg-sky-500/10 dark:text-sky-400 rounded-lg border border-sky-100 dark:border-sky-950">
                      {source.acronym}
                    </span>
                    <h4 className="font-heading font-extrabold text-sm text-gray-900 dark:text-white leading-tight">
                      {source.fullName}
                    </h4>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold leading-none">
                    <FileText className="h-4 w-4" />
                    <span>Recurso: {source.resource}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 leading-relaxed pt-1 font-medium font-sans">
                    <strong>Utilidad del dato:</strong> {source.utilization}
                  </p>
                </div>

                {/* External Action Button */}
                <div className="flex items-center gap-4 flex-shrink-0 self-stretch md:self-auto justify-between md:justify-start border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-gray-400 bg-gray-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-gray-200/50 dark:border-slate-700">
                    {source.status}
                  </span>
                  
                  <a
                    href={source.link}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700 text-gray-500 hover:text-[#1565C0] dark:text-slate-300 dark:hover:text-sky-400 rounded-xl transition-all"
                    aria-label={`Visitar portal oficial de ${source.acronym}`}
                    id={`source-visit-btn-${source.acronym}`}
                  >
                    <ExternalLink className="h-4.5 w-4.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-gray-50/50 dark:bg-slate-950 border-t border-gray-200/60 dark:border-slate-800 text-center text-[10px] sm:text-xs text-slate-400 font-medium">
            Soporte educativo gubernamental para el fomento a la investigación escolar y comunitaria.
          </div>
        </div>

      </div>
    </section>
  );
}
