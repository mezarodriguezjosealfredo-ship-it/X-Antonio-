/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Problems from "./components/Problems";
import Stats from "./components/Stats";
import Interactives from "./components/Interactives";
import ReportMap from "./components/ReportMap";
import ReportForm from "./components/ReportForm";
import Education from "./components/Education";
import Sources from "./components/Sources";
import Footer from "./components/Footer";
import { INITIAL_REPORTS } from "./data";
import { Report } from "./types";
import { Filter, MapPin, AlertCircle, Info, Sparkles, Moon, Sun } from "lucide-react";
import { motion } from "motion/react";

export default function App() {
  // Theme dark mode state (synced with localStorage)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("culiacan-theme-dark");
    if (saved) return saved === "true";
    return false; // defaults to light mode
  });

  // Track scroll position to update navbar glowing marker
  const [activeSection, setActiveSection] = useState("inicio");

  // Dynamic list of complaints, persisted locally in standard browser localStorage
  const [reports, setReports] = useState<Report[]>(() => {
    const saved = localStorage.getItem("culiacan-user-reports");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error("Error al revivir reportes:", err);
      }
    }
    return INITIAL_REPORTS;
  });

  // Core filter state for the interactive map
  const [mapFilter, setMapFilter] = useState<"todos" | "aire" | "agua" | "suelo" | "visual" | "acústica">("todos");

  // State to hold parameters passed between map coordinate clicks and the entry reporting form below
  const [formLat, setFormLat] = useState<number>(24.805); // Default centro
  const [formLng, setFormLng] = useState<number>(-107.394);
  const [formAddress, setFormAddress] = useState<string>("");

  // Sync darkmode body class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("culiacan-theme-dark", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("culiacan-theme-dark", "false");
    }
  }, [darkMode]);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem("culiacan-user-reports", JSON.stringify(reports));
  }, [reports]);

  // Capture navbar active highlights based on window view positions
  useEffect(() => {
    const sections = [
      "inicio",
      "problematicas",
      "estadisticas",
      "actividades",
      "reportar",
      "consejos",
      "fuentes",
      "contacto"
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Callback to append a new citizen complaint
  const handleAddReport = (newReport: Report) => {
    setReports((prev) => [newReport, ...prev]);
  };

  // Helper method called when coordinates are picked to populate the form
  const handleMapLocationSelected = (lat: number, lng: number, address: string) => {
    setFormLat(lat);
    setFormLng(lng);
    setFormAddress(address);
    // Auto-scroll gently to the report form matching area so users know what's next
    const formElement = document.getElementById("form-anchor-point");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="min-h-screen font-sans bg-gray-50 dark:bg-slate-950 text-gray-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* Dynamic Header & Menu Navigation */}
      <Navbar 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        activeSection={activeSection} 
      />

      {/* Main Container Wrapper */}
      <main>
        {/* 1. HERO HOME BANNER */}
        <Hero />

        {/* 2. PROBLEMS GRID */}
        <Problems />

        {/* 3. DYNAMIC CHARTS AND GRAPHICS PORTAL */}
        <Stats />

        {/* 4. EDUCATIONAL GAMES DASHBOARD (WORDSEARCH, PUZZLE, MEMORY) */}
        <Interactives />

        {/* 5. GEOLOCATION REPORT MAP & COMPLAINT FORM (CONNECTED WITH LOCALPERSISTENCE) */}
        <section id="reportar" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header section titles */}
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-red-500 font-heading font-bold text-xs uppercase tracking-widest bg-red-50 dark:bg-red-950/40 px-4 py-1.5 rounded-full inline-block mb-3 border border-red-100 dark:border-red-900/40">
                Participación Ciudadana Colectiva
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-gray-900 dark:text-white tracking-tight">
                Mapa y Sistema de Reportes Ciudadanos
              </h2>
              <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-slate-400">
                Visualiza las quejas ambientales reportadas de Culiacán de forma directa. Usa los filtros interactivos para clasificar problemas, y si notas una anomalía en tu calle, márcala con un clic para georreferenciarla.
              </p>
            </div>

            {/* Map Filtering Toolbar with Beautiful Layout */}
            <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4 p-5 bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800/80 rounded-2xl">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-primary-blue" />
                <span className="font-heading font-extrabold text-xs sm:text-sm text-gray-900 dark:text-white">Filtrar Mapa:</span>
              </div>

              {/* Categorical filter selectors */}
              <div className="flex flex-wrap gap-2 w-full md:w-auto items-center justify-start md:justify-end">
                {([
                  { key: "todos", label: "Ver Todos", color: "bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-slate-200 border-gray-200" },
                  { key: "aire", label: "💨 Aire", color: "bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border-sky-200" },
                  { key: "agua", label: "💧 Agua", color: "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200" },
                  { key: "suelo", label: "🗑️ Suelo", color: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200" },
                  { key: "visual", label: "👁️ Visual", color: "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200" },
                  { key: "acústica", label: "🔊 Acústica", color: "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200" }
                ] as const).map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setMapFilter(opt.key)}
                    className={`px-4.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                      mapFilter === opt.key
                        ? "bg-primary-blue text-white shadow-sm border-primary-blue scale-98"
                        : `${opt.color} hover:bg-gray-200/50 dark:hover:bg-slate-800`
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Core Interactive Map Grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Geopins interactive layer */}
              <div className="lg:col-span-7 space-y-4">
                <ReportMap 
                  reports={reports} 
                  filterType={mapFilter} 
                  onLocationSelected={handleMapLocationSelected} 
                />
                
                {/* Micro report indicators */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4.5 bg-gray-50/70 dark:bg-slate-950/60 border border-gray-100 dark:border-slate-800/80 rounded-2xl text-left">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Suelos Sucios</span>
                    <span className="text-xl font-heading font-extrabold text-amber-500 leading-none mt-1 inline-block">
                      {reports.filter(r => r.problemType === "suelo").length} Casos
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Cuencas Dañadas</span>
                    <span className="text-xl font-heading font-extrabold text-[#1565C0] leading-none mt-1 inline-block">
                      {reports.filter(r => r.problemType === "agua").length} Casos
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Aire Enrarecido</span>
                    <span className="text-xl font-heading font-extrabold text-sky-500 leading-none mt-1 inline-block">
                      {reports.filter(r => r.problemType === "aire").length} Casos
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Visuales e Hitos</span>
                    <span className="text-xl font-heading font-extrabold text-purple-500 leading-none mt-1 inline-block">
                      {reports.filter(r => r.problemType === "visual" || r.problemType === "acústica").length} Casos
                    </span>
                  </div>
                </div>
              </div>

              {/* Form container side element (with scroll anchor point) */}
              <div className="lg:col-span-5 relative" id="form-anchor-point">
                <ReportForm 
                  selectedLat={formLat} 
                  selectedLng={formLng} 
                  selectedAddress={formAddress} 
                  onReportAdded={handleAddReport} 
                />
              </div>

            </div>

          </div>
        </section>

        {/* 6. CONSEJOS AMBIENTALES Y EDUCACIÓN CARDS */}
        <Education />

        {/* 7. BIBLIOGRAPHY AND SOURCE DIRECTORY */}
        <Sources />
        
      </main>

      {/* 8. FOOTER - ACADEMIC PERFIL AND TRACE */}
      <Footer />
    </div>
  );
}
