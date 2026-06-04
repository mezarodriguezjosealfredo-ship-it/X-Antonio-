/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from "react";
import { Report } from "../types";
import L from "leaflet";

interface ReportMapProps {
  reports: Report[];
  filterType: "todos" | "aire" | "agua" | "suelo" | "visual" | "acústica";
  onLocationSelected: (lat: number, lng: number, addressName: string) => void;
}

export default function ReportMap({ reports, filterType, onLocationSelected }: ReportMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const clickMarkerRef = useRef<L.Marker | null>(null);

  // Helper to establish modern vector-based Leaflet markers based on contamination types to bypass Vite asset bundling bugs
  const createCustomIcon = (problemType: string, isVerified: boolean) => {
    let color = "#1565C0"; // Blue by default
    let label = "💧";
    
    switch (problemType) {
      case "aire":
        color = "#00BCD4";
        label = "💨";
        break;
      case "agua":
        color = "#1565C0";
        label = "💧";
        break;
      case "suelo":
        color = "#FF9800";
        label = "🗑️";
        break;
      case "visual":
        color = "#9C27B0";
        label = "👁️";
        break;
      case "acústica":
        color = "#E91E63";
        label = "🔊";
        break;
    }

    const verificationRing = isVerified ? "border-[#4CAF50]" : "border-red-500 animate-pulse";

    return L.divIcon({
      className: "custom-leaflet-marker",
      html: `
        <div class="relative flex items-center justify-center w-8 h-8 rounded-full border-2 ${verificationRing} shadow-lg" style="background-color: ${color}; transform: translateY(-50%);">
          <span class="text-sm select-none">${label}</span>
          <div class="absolute bottom-[-4px] left-[50%] translate-x-[-50%] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px]" style="border-t-color: ${color};"></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Leaflet map centered in Culiacan Centro
    const culiacanCenter: L.LatLngExpression = [24.805, -107.394];
    const initialZoom = 13;

    const mapInstance = L.map(mapContainerRef.current, {
      center: culiacanCenter,
      zoom: initialZoom,
      scrollWheelZoom: false,
    });

    // Add high quality CartoDB voyager style tiled map layers (which looks exceptionally clean and professional)
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 20,
    }).addTo(mapInstance);

    mapRef.current = mapInstance;

    // Handle map click to drop interactive pins
    mapInstance.on("click", (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      
      // Update form fields
      const mockLocationName = `Sector Culiacán (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
      onLocationSelected(lat, lng, mockLocationName);

      // Remove previous click marker indicators
      if (clickMarkerRef.current) {
        clickMarkerRef.current.remove();
      }

      // Add a customized glowing amber indicator representing selected spot
      const draftIcon = L.divIcon({
        className: "draft-pin-marker",
        html: `
          <div class="relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-dashed border-gray-600 bg-amber-400 text-gray-900 shadow-md animate-bounce" style="transform: translateY(-50%);">
            <span class="text-xs font-bold leading-none">📍</span>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      const newDraftMarker = L.marker([lat, lng], { icon: draftIcon }).addTo(mapInstance);
      newDraftMarker.bindPopup(`<div class="p-1 font-heading font-semibold text-xs text-gray-800">Has seleccionado estas coordenadas para tu reporte. Completa el formulario de abajo.</div>`).openPopup();
      clickMarkerRef.current = newDraftMarker;
    });

    return () => {
      mapInstance.remove();
      mapRef.current = null;
    };
  }, []);

  // Sync and update marker layers according to listings & options
  useEffect(() => {
    const mapInstance = mapRef.current;
    if (!mapInstance) return;

    // Clear old markers first
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Filter reports based on the type
    const pathReports = filterType === "todos" 
      ? reports 
      : reports.filter((rep) => rep.problemType === filterType);

    pathReports.forEach((rep) => {
      const customIcon = createCustomIcon(rep.problemType, rep.isVerified);
      
      const pinMarker = L.marker([rep.latitude, rep.longitude], { icon: customIcon })
        .addTo(mapInstance);

      // Construct a pristine HTML popup detailing the problem parameters
      const categoryLabel = rep.problemType.toUpperCase();
      const verificationChip = rep.isVerified 
        ? `<span class="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full px-2 py-0.5 text-[9px] font-bold border border-emerald-500/20">Verificado</span>`
        : `<span class="bg-amber-400/10 text-amber-600 dark:text-amber-400 rounded-full px-2 py-0.5 text-[9px] font-bold border border-amber-500/20">En Revisión</span>`;

      const popupHtml = `
        <div class="font-sans text-xs p-2.5 max-w-[220px]">
          <div class="flex items-center justify-between gap-2.5 border-b border-gray-100 pb-2 mb-2">
            <b class="text-gray-900 uppercase tracking-wider text-[10px] font-heading font-extrabold text-primary-blue">${categoryLabel}</b>
            ${verificationChip}
          </div>
          <p class="text-gray-500 font-semibold text-[9px] truncate"><i class="inline-block mr-1">📍</i>${rep.locationName}</p>
          <p class="text-gray-700 dark:text-slate-300 font-medium leading-relaxed my-2 line-clamp-3">${rep.description}</p>
          <div class="flex justify-between items-center text-[8px] text-gray-400 font-bold mt-1">
            <span>Por: ${rep.name.split(" ")[0]}</span>
            <span>${new Date(rep.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      `;

      pinMarker.bindPopup(popupHtml);
      markersRef.current.push(pinMarker);
    });

  }, [reports, filterType]);

  return (
    <div className="relative w-full h-[400px] md:h-[450px] shadow-lg rounded-3xl overflow-hidden border border-gray-200 dark:border-slate-800 bg-gray-100">
      <div ref={mapContainerRef} className="w-full h-full" />
      
      {/* Floating indicator guide */}
      <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-gray-200 dark:border-slate-800 text-[10px] font-bold text-gray-500 dark:text-slate-400 shadow-sm pointer-events-none z-15 flex items-center gap-1.5">
        <span className="flex h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
        <span>Haz clic en el mapa para marcar coordenadas</span>
      </div>
    </div>
  );
}
