/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Problem {
  id: string;
  title: string;
  category: "aire" | "agua" | "suelo" | "visual" | "acústica";
  shortDescription: string;
  description: string;
  impactScore: number; // 1 to 10 scale of critical severity
  keyStatistics: string;
  causes: string[];
  consequences: string[];
  solutions: string[];
  imageUrl: string;
  culiacanHotspot: string; // Specific location in Culiacan affected
}

export interface Report {
  id: string;
  name: string;
  email: string;
  phone: string;
  problemType: "aire" | "agua" | "suelo" | "visual" | "acústica";
  locationName: string;
  latitude: number;
  longitude: number;
  description: string;
  createdAt: string;
  isVerified: boolean;
  imageUrl?: string;
}

export interface StatItem {
  year: string;
  value: number;
  unit: string;
}

export interface StatCategory {
  id: string;
  title: string;
  description: string;
  source: string;
  sourceUrl: string;
  chartType: "bar" | "line" | "doughnut" | "pie";
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor?: string;
  }[];
}

export interface WordSearchGrid {
  grid: string[][];
  wordPositions: { [word: string]: { r: number; c: number }[] };
}
