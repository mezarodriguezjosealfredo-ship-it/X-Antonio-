/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { 
  Dices, 
  Clock, 
  HelpCircle, 
  Award, 
  RefreshCw, 
  Star, 
  Trophy, 
  CheckCircle2, 
  Flame, 
  Sparkles,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// ============================================
// GAME 1: SOPA DE LETRAS DATA & GENERATOR
// ============================================
const WORD_LIST = [
  "CONTAMINACION",
  "BASURA",
  "RECICLAJE",
  "AIRE",
  "AGUA",
  "SUELO",
  "RESIDUOS",
  "ECOLOGIA",
  "REUTILIZAR",
  "SEPARACION"
];

const GRID_SIZE = 12;

function generateWordSearch(): { grid: string[][]; wordPositions: { [word: string]: { r: number; c: number }[] } } {
  // Initialize grid with spaces
  const grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(""));
  const wordPositions: { [word: string]: { r: number; c: number }[] } = {};

  // Place word
  const placeWord = (word: string): boolean => {
    const directions = [
      { r: 0, c: 1 },   // Horizontal
      { r: 1, c: 0 },   // Vertical
      { r: 1, c: 1 },   // Diagonal down-right
    ];

    // Try multiple random attempts
    for (let attempts = 0; attempts < 150; attempts++) {
      const dir = directions[Math.floor(Math.random() * directions.length)];
      const startR = Math.floor(Math.random() * GRID_SIZE);
      const startC = Math.floor(Math.random() * GRID_SIZE);

      // Check boundary
      if (
        startR + dir.r * (word.length - 1) >= GRID_SIZE ||
        startC + dir.c * (word.length - 1) >= GRID_SIZE ||
        startR + dir.r * (word.length - 1) < 0 ||
        startC + dir.c * (word.length - 1) < 0
      ) {
        continue;
      }

      // Check collision
      let canPlace = true;
      for (let i = 0; i < word.length; i++) {
        const currR = startR + dir.r * i;
        const currC = startC + dir.c * i;
        if (grid[currR][currC] !== "" && grid[currR][currC] !== word[i]) {
          canPlace = false;
          break;
        }
      }

      if (canPlace) {
        const coords: { r: number; c: number }[] = [];
        for (let i = 0; i < word.length; i++) {
          const currR = startR + dir.r * i;
          const currC = startC + dir.c * i;
          grid[currR][currC] = word[i];
          coords.push({ r: currR, c: currC });
        }
        wordPositions[word] = coords;
        return true;
      }
    }
    return false;
  };

  // Place all words
  WORD_LIST.forEach((word) => placeWord(word));

  // Fill empty with random letters
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === "") {
        grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  return { grid, wordPositions };
}

// ============================================
// GAME 3: MEMORY PAIRS DATA
// ============================================
const MEMORY_CARDS = [
  { id: "1", type: "b", icon: "🗑️", matchId: "1-match", name: "Basura en calles", desc: "Tirar basura tapa las alcantarillas de Culiacán provocando inundaciones severas." },
  { id: "1-match", type: "b", icon: "🧹", matchId: "1", name: "Limpieza comunitaria", desc: "Barrer tu frente y levantar residuos previene desastres pluviales en arroyos." },
  
  { id: "2", type: "lh", icon: "🏭", matchId: "2-match", name: "Humo de ladrilleras", desc: "La combustión de gomas y maderas pesadas en hornos de ladrillo envenena el aire." },
  { id: "2-match", type: "lh", icon: "🌳", matchId: "2", name: "Aire limpio forestal", desc: "Plantar olivos negros o amapas purifica los gases dañinos PM2.5." },

  { id: "3", type: "w", icon: "🥤", matchId: "3-match", name: "Contaminación de ríos", desc: "Botellas plásticas y unicel en el río Tamazula asfixian a las aves del parque." },
  { id: "3-match", type: "w", icon: "💧", matchId: "3", name: "Agua de río cristalina", desc: "Las mallas retenedoras en drenes captan el plástico antes de ingresar al caudal." },

  { id: "4", type: "s", icon: "🚜", matchId: "4-match", name: "Residuos de construcción", desc: "Los tiraderos clandestinos de escombro esterilizan los suelos suburbanos." },
  { id: "4-match", type: "s", icon: "🌱", matchId: "4", name: "Composta orgánica", desc: "Transformar residuos de cocina nutre la tierra fértil de los jardines de Culiacán." }
];

// ============================================
// COMPONENT DEFINITION
// ============================================
export default function Interactives() {
  const [activeGame, setActiveGame] = useState<"wordsearch" | "puzzle" | "memory">("wordsearch");

  // Global game utility sounds or triggers
  const playWinSpark = () => {
    // optional feedback triggers
  };

  // --------------------------------------------
  // GAME 1: SOPA DE LETRAS STATE
  // --------------------------------------------
  const [wsData, setWsData] = useState(() => generateWordSearch());
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedCells, setSelectedCells] = useState<{ r: number; c: number }[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [wsCelebration, setWsCelebration] = useState(false);

  // Initialize Wordsearch
  const handleResetWordSearch = () => {
    setWsData(generateWordSearch());
    setFoundWords([]);
    setSelectedCells([]);
    setIsSelecting(false);
    setWsCelebration(false);
  };

  const checkWordFound = (currentSelection: { r: number; c: number }[]) => {
    // Translate selection coords into a word string
    const chars = currentSelection.map((cell) => wsData.grid[cell.r][cell.c]).join("");
    const charsReversed = chars.split("").reverse().join("");

    let matchedWord = "";
    if (WORD_LIST.includes(chars) && !foundWords.includes(chars)) {
      matchedWord = chars;
    } else if (WORD_LIST.includes(charsReversed) && !foundWords.includes(charsReversed)) {
      matchedWord = charsReversed;
    }

    if (matchedWord) {
      setFoundWords((prev) => {
        const next = [...prev, matchedWord];
        if (next.length === WORD_LIST.length) {
          setWsCelebration(true);
        }
        return next;
      });
    }
    setSelectedCells([]);
  };

  const handleCellClick = (r: number, c: number) => {
    if (!isSelecting) {
      setIsSelecting(true);
      setSelectedCells([{ r, c }]);
    } else {
      // Complete selection path
      const start = selectedCells[0];
      const end = { r, c };
      
      // Calculate inline path
      const rDiff = end.r - start.r;
      const cDiff = end.c - start.c;
      const steps = Math.max(Math.abs(rDiff), Math.abs(cDiff));
      
      const isLine = rDiff === 0 || cDiff === 0 || Math.abs(rDiff) === Math.abs(cDiff);
      
      if (isLine && steps > 0) {
        const path: { r: number; c: number }[] = [];
        const rStep = rDiff === 0 ? 0 : rDiff / steps;
        const cStep = cDiff === 0 ? 0 : cDiff / steps;
        
        for (let i = 0; i <= steps; i++) {
          path.push({
            r: Math.round(start.r + rStep * i),
            c: Math.round(start.c + cStep * i)
          });
        }
        checkWordFound(path);
      } else {
        setSelectedCells([]);
      }
      setIsSelecting(false);
    }
  };

  const isCellHighlighted = (r: number, c: number) => {
    // Check if in active current selection
    if (selectedCells.some((cell) => cell.r === r && cell.c === c)) return true;
    
    // Check if part of already found words positions
    for (const word of foundWords) {
      const positions = wsData.wordPositions[word];
      if (positions && positions.some((pos) => pos.r === r && pos.c === c)) {
        return true;
      }
    }
    return false;
  };

  const isCellAlreadyFound = (r: number, c: number) => {
    for (const word of foundWords) {
      const positions = wsData.wordPositions[word];
      if (positions && positions.some((pos) => pos.r === r && pos.c === c)) {
        return true;
      }
    }
    return false;
  };


  // --------------------------------------------
  // GAME 2: SLIDER PUZZLE STATE
  // --------------------------------------------
  const [gridSize, setGridSize] = useState<3 | 4 | 5>(3); // 3=3x3, 4=4x4, 5=5x5
  const [puzzleTiles, setPuzzleTiles] = useState<number[]>([]);
  const [puzzleMoves, setPuzzleMoves] = useState(0);
  const [puzzleSeconds, setPuzzleSeconds] = useState(0);
  const [puzzleActive, setPuzzleActive] = useState(false);
  const [puzzleWin, setPuzzleWin] = useState(false);
  const [puzzleImgIndex, setPuzzleImgIndex] = useState(0);
  const puzzleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const puzzleImages = [
    { url: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=600", title: "Río con Basura" },
    { url: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=600", title: "Tiradero Urbano" },
    { url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=600", title: "Limpieza Sostenible" },
    { url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600", title: "Reciclaje Activo" }
  ];

  // Initialize Puzzle
  const startPuzzleGame = () => {
    const tileCount = gridSize * gridSize;
    let initialArr = Array.from({ length: tileCount }, (_, i) => i); // 0 is the empty tile
    
    // Shuffle tiles. Ensure solvability
    let solvable = false;
    let attempts = 0;
    while (!solvable && attempts < 100) {
      attempts++;
      // Shuffle arr
      for (let i = initialArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [initialArr[i], initialArr[j]] = [initialArr[j], initialArr[i]];
      }

      // Check inversion parity tool logic for slider puzzles to confirm solve capability
      let inversions = 0;
      for (let i = 0; i < tileCount; i++) {
        for (let j = i + 1; j < tileCount; j++) {
          if (initialArr[i] > 0 && initialArr[j] > 0 && initialArr[i] > initialArr[j]) {
            inversions++;
          }
        }
      }
      
      if (gridSize % 2 !== 0) {
        solvable = inversions % 2 === 0;
      } else {
        const emptyIndex = initialArr.indexOf(0);
        const emptyRowFromBottom = gridSize - Math.floor(emptyIndex / gridSize);
        if (emptyRowFromBottom % 2 === 0) {
          solvable = inversions % 2 !== 0;
        } else {
          solvable = inversions % 2 === 0;
        }
      }
    }

    setPuzzleTiles(initialArr);
    setPuzzleMoves(0);
    setPuzzleSeconds(0);
    setPuzzleWin(false);
    setPuzzleActive(true);

    if (puzzleTimerRef.current) clearInterval(puzzleTimerRef.current);
    puzzleTimerRef.current = setInterval(() => {
      setPuzzleSeconds((p) => p + 1);
    }, 1000);
  };

  const handleTileClick = (index: number) => {
    if (!puzzleActive || puzzleWin) return;

    const emptyIndex = puzzleTiles.indexOf(0);
    const tileRow = Math.floor(index / gridSize);
    const tileCol = index % gridSize;
    const emptyRow = Math.floor(emptyIndex / gridSize);
    const emptyCol = emptyIndex % gridSize;

    // Check adjacency
    const adjacent = (Math.abs(tileRow - emptyRow) === 1 && tileCol === emptyCol) ||
                     (Math.abs(tileCol - emptyCol) === 1 && tileRow === emptyRow);

    if (adjacent) {
      const nextTiles = [...puzzleTiles];
      nextTiles[emptyIndex] = puzzleTiles[index];
      nextTiles[index] = 0;

      setPuzzleTiles(nextTiles);
      setPuzzleMoves((m) => m + 1);

      // Check win state
      // The solved state should place 0 at the end (size*size - 1) and tiles 1..N-1 ordered
      let solved = true;
      for (let i = 0; i < nextTiles.length - 1; i++) {
        if (nextTiles[i] !== i + 1) {
          solved = false;
          break;
        }
      }
      if (solved && nextTiles[nextTiles.length - 1] === 0) {
        setPuzzleWin(true);
        setPuzzleActive(false);
        if (puzzleTimerRef.current) clearInterval(puzzleTimerRef.current);
      }
    }
  };

  useEffect(() => {
    if (activeGame === "puzzle" && !puzzleActive) {
      startPuzzleGame();
    }
    return () => {
      if (puzzleTimerRef.current) clearInterval(puzzleTimerRef.current);
    };
  }, [gridSize, puzzleImgIndex, activeGame]);


  // --------------------------------------------
  // GAME 3: MEMORY PAIRS STATE
  // --------------------------------------------
  const [memCards, setMemCards] = useState<{ id: string; type: string; icon: string; matchId: string; name: string; desc: string; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [memSelected, setMemSelected] = useState<number[]>([]);
  const [memMoves, setMemMoves] = useState(0);
  const [memSeconds, setMemSeconds] = useState(0);
  const [memActive, setMemActive] = useState(false);
  const [memWin, setMemWin] = useState(false);
  const [recentMatchInfo, setRecentMatchInfo] = useState<{ name: string; desc: string } | null>(null);
  const memTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Memory
  const startMemoryGame = () => {
    // Clone cards twice, mix order, map base structures
    const dualStack = JSON.parse(JSON.stringify(MEMORY_CARDS));
    
    // Shuffle stack
    for (let i = dualStack.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [dualStack[i], dualStack[j]] = [dualStack[j], dualStack[i]];
    }

    const initialCards = dualStack.map((card: any) => ({
      ...card,
      isFlipped: false,
      isMatched: false
    }));

    setMemCards(initialCards);
    setMemSelected([]);
    setMemMoves(0);
    setMemSeconds(0);
    setMemWin(false);
    setMemActive(true);
    setRecentMatchInfo(null);

    if (memTimerRef.current) clearInterval(memTimerRef.current);
    memTimerRef.current = setInterval(() => {
      setMemSeconds((s) => s + 1);
    }, 1000);
  };

  const handleMemCardClick = (idx: number) => {
    if (!memActive || memWin || memCards[idx].isMatched || memCards[idx].isFlipped || memSelected.length >= 2) return;

    // Flip card local state
    const nextCards = [...memCards];
    nextCards[idx].isFlipped = true;
    setMemCards(nextCards);

    const nextSelected = [...memSelected, idx];
    setMemSelected(nextSelected);

    if (nextSelected.length === 2) {
      setMemMoves((m) => m + 1);
      const [firstIdx, secondIdx] = nextSelected;
      const firstCard = memCards[firstIdx];
      const secondCard = memCards[secondIdx];

      // Match check
      if (firstCard.matchId === secondCard.id || secondCard.matchId === firstCard.id) {
        // MATCH DETECTED!
        setTimeout(() => {
          const matchedStack = [...memCards];
          matchedStack[firstIdx].isMatched = true;
          matchedStack[secondIdx].isMatched = true;
          setMemCards(matchedStack);
          setMemSelected([]);
          
          // Provide informative eco-tip on the screen
          setRecentMatchInfo({
            name: `${firstCard.name} ⬌ ${secondCard.name}`,
            desc: firstCard.desc
          });

          // Check memory win
          const allMatched = matchedStack.every((card) => card.isMatched);
          if (allMatched) {
            setMemWin(true);
            setMemActive(false);
            if (memTimerRef.current) clearInterval(memTimerRef.current);
          }
        }, 500);
      } else {
        // MISMATCH. Unflip after 1 second
        setTimeout(() => {
          const unFlipStack = [...memCards];
          unFlipStack[firstIdx].isFlipped = false;
          unFlipStack[secondIdx].isFlipped = false;
          setMemCards(unFlipStack);
          setMemSelected([]);
        }, 1200);
      }
    }
  };

  useEffect(() => {
    if (activeGame === "memory" && !memActive) {
      startMemoryGame();
    }
    return () => {
      if (memTimerRef.current) clearInterval(memTimerRef.current);
    };
  }, [activeGame]);


  return (
    <section id="actividades" className="py-24 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-primary-green dark:text-emerald-400 font-heading font-bold text-xs uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/50 px-4 py-1.5 rounded-full inline-block mb-3 border border-emerald-100 dark:border-emerald-900/40">
            Educación Ambiental Interactiva
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-gray-900 dark:text-white tracking-tight">
            Aprende Jugando en Culiacán
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-slate-400">
            Pon a prueba tu agilidad mental y aprende sobre temas de reciclaje, conservación del agua y aire limpio con nuestros minijuegos educativos interactivos creados para estudiantes y ciudadanos preocupados por el entorno.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-2xl mx-auto mb-10">
          <button
            onClick={() => setActiveGame("wordsearch")}
            className={`px-5 py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all duration-300 inline-flex items-center gap-2.5 ${
              activeGame === "wordsearch"
                ? "bg-primary-green text-white shadow-md shadow-primary-green/20"
                : "bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-300 border border-gray-100 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-800"
            }`}
          >
            <Dices className="h-4.5 w-4.5" />
            <span>Sopa de Letras</span>
          </button>

          <button
            onClick={() => setActiveGame("puzzle")}
            className={`px-5 py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all duration-300 inline-flex items-center gap-2.5 ${
              activeGame === "puzzle"
                ? "bg-primary-green text-white shadow-md shadow-primary-green/20"
                : "bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-300 border border-gray-100 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-800"
            }`}
          >
            <Sparkles className="h-4.5 w-4.5" />
            <span>Rompecabezas slider</span>
          </button>

          <button
            onClick={() => setActiveGame("memory")}
            className={`px-5 py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all duration-300 inline-flex items-center gap-2.5 ${
              activeGame === "memory"
                ? "bg-primary-green text-white shadow-md shadow-primary-green/20"
                : "bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-300 border border-gray-100 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-800"
            }`}
          >
            <Trophy className="h-4.5 w-4.5" />
            <span>Memorama Ecológico</span>
          </button>
        </div>

        {/* Dynamic Game Render Area */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            
            {/* GAME 1: WORD SEARCH */}
            {activeGame === "wordsearch" && (
              <motion.div
                key="wordsearch-g"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
              >
                {/* Score & Words Column */}
                <div className="md:col-span-4 flex flex-col justify-between self-stretch">
                  <div>
                    <h3 className="font-heading font-extrabold text-lg text-gray-900 dark:text-white flex items-center gap-2 mb-2">
                      <Star className="h-5 w-5 text-amber-500 fill-amber-500 animate-spin" />
                      <span>Sopa Ecológica</span>
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed mb-6">
                      Encuentra las 10 palabras indispensables relacionadas con la protección ambiental. Haz clic en la letra de partida y luego en la letra final de la palabra para completarla.
                    </p>

                    <div className="space-y-1.5 max-h-56 overflow-y-auto pr-2">
                      {WORD_LIST.map((word) => {
                        const isFound = foundWords.includes(word);
                        return (
                          <div
                            key={word}
                            className={`px-3 py-1.5 rounded-lg border text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${
                              isFound
                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 line-through"
                                : "bg-gray-50 dark:bg-slate-800/50 border-gray-100 dark:border-slate-800 text-gray-700 dark:text-slate-300"
                            }`}
                          >
                            <span>{word}</span>
                            {isFound && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-8 pt-5 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      <span>Logradas: {foundWords.length} / 10</span>
                    </div>
                    <button
                      onClick={handleResetWordSearch}
                      className="p-2.5 rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 transition-colors"
                      id="reset-wordsearch-btn"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Sopa de letras Grid Column */}
                <div className="md:col-span-8 flex flex-col items-center justify-center relative">
                  {/* Grid Container */}
                  <div className="grid grid-cols-12 gap-1.5 max-w-[380px] w-full bg-gray-50 dark:bg-slate-950 p-4 border border-gray-100 dark:border-slate-800/80 rounded-2xl select-none shadow-inner">
                    {wsData.grid.map((row, rIdx) =>
                      row.map((char, cIdx) => {
                        const cellSel = selectedCells.some((cell) => cell.r === rIdx && cell.c === cIdx);
                        const cellFound = isCellAlreadyFound(rIdx, cIdx);
                        return (
                          <button
                            key={`${rIdx}-${cIdx}`}
                            onClick={() => handleCellClick(rIdx, cIdx)}
                            className={`aspect-square w-full rounded flex items-center justify-center text-xs md:text-sm font-heading font-extrabold pb-0.5 transition-all outline-none ${
                              cellSel
                                ? "bg-primary-green text-white ring-2 ring-emerald-500/30 scale-95"
                                : cellFound
                                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold"
                                : "bg-white dark:bg-slate-900 border border-transparent dark:border-slate-850 hover:bg-emerald-500/5 dark:hover:bg-emerald-500/5 text-gray-800 dark:text-slate-200"
                            }`}
                          >
                            {char}
                          </button>
                        );
                      })
                    )}
                  </div>

                  {/* Complete Celebration Overlay */}
                  <AnimatePresence>
                    {wsCelebration && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute inset-0 bg-primary-green-dark/95 backdrop-blur-md rounded-2xl p-6 text-center text-white flex flex-col justify-center items-center z-25 max-w-[380px]"
                      >
                        <Award className="h-14 w-14 text-yellow-300 animate-bounce mb-4" />
                        <h4 className="font-heading font-extrabold text-2xl tracking-tight">¡Excelente Desempeño!</h4>
                        <p className="text-xs sm:text-sm text-gray-100 leading-relaxed mt-2 px-4">
                          Lograste descifrar todos los vocablos de la sopa de letras. Convertirse en embajador del planeta parte de comprender conceptos clave. ¡Sigue así!
                        </p>
                        <button
                          onClick={handleResetWordSearch}
                          className="mt-6 px-6 py-2.5 bg-yellow-400 text-gray-950 hover:bg-yellow-300 font-heading font-extrabold text-xs tracking-wide uppercase rounded-xl transition-all hover:scale-105 active:scale-95"
                          id="ws-celebrate-btn"
                        >
                          Nuevo Juego
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* GAME 2: SLIDER PUZZLE */}
            {activeGame === "puzzle" && (
              <motion.div
                key="puzzle-g"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col lg:flex-row gap-8"
              >
                {/* Control Panel Column */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-extrabold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary-blue animate-pulse" />
                      <span>Rompecabezas Verde</span>
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed mt-1.5 mb-6">
                      Desliza los fragmentos adyacentes al bloque vacío hasta armar la imagen ambiental seleccionada. Logra ordenarlos en secuencia (1 en la esquina sup-izq, dejando el espacio vacío al final).
                    </p>

                    {/* Image Category Selector */}
                    <div className="mb-6">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Selección de Imagen</label>
                      <div className="grid grid-cols-2 gap-2">
                        {puzzleImages.map((img, idx) => (
                          <button
                            key={img.title}
                            onClick={() => { setPuzzleImgIndex(idx); }}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold border text-left flex items-center gap-2 transition-all ${
                              puzzleImgIndex === idx
                                ? "bg-primary-blue/10 border-primary-blue/40 text-primary-blue dark:text-sky-400"
                                : "bg-gray-50 dark:bg-slate-800/40 border-gray-100 dark:border-slate-800 text-gray-600 dark:text-slate-300"
                            }`}
                          >
                            <span className="truncate">{img.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Difficulty selection */}
                    <div className="mb-6">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Dificultad</span>
                      <div className="flex gap-2">
                        {([3, 4, 5] as const).map((size) => (
                          <button
                            key={size}
                            onClick={() => { setGridSize(size); }}
                            className={`flex-1 py-1.5 border hover:bg-gray-100 dark:hover:bg-slate-800 transition-all font-heading font-bold text-xs rounded-lg ${
                              gridSize === size
                                ? "bg-primary-green border-primary-green text-white"
                                : "bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 text-gray-600 dark:text-slate-300"
                            }`}
                          >
                            {size === 3 ? "3x3 Fácil" : size === 4 ? "4x4 Medio" : "5x5 Difícil"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Scoreboard Metrics */}
                  <div className="pt-5 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between gap-4">
                    <span className="text-xs font-bold text-gray-500 dark:text-slate-400 inline-flex items-center gap-1">
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span>Movimientos: {puzzleMoves}</span>
                    </span>

                    <span className="text-xs font-bold text-gray-500 dark:text-slate-400 inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Tiempo: {Math.floor(puzzleSeconds / 60)}m {puzzleSeconds % 60}s</span>
                    </span>

                    <button
                      onClick={startPuzzleGame}
                      className="p-2 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-800 rounded-xl hover:text-primary-green transition-colors"
                      aria-label="Reiniciar juego"
                      id="reset-puzzle-btn"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Slider Grid Column */}
                <div className="flex-1 flex items-center justify-center relative select-none">
                  <div 
                    className="grid gap-1 bg-gray-100 dark:bg-slate-950 p-3 rounded-2xl max-w-[340px] w-full aspect-square border border-gray-100 dark:border-slate-800 shadow-lg"
                    style={{
                      gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                      gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`
                    }}
                  >
                    {puzzleTiles.map((tile, idx) => {
                      const isEmpty = tile === 0;
                      // Calculate source crop positions for background slice effect
                      const tileValIdx = tile - 1;
                      const cropRow = Math.floor(tileValIdx / gridSize);
                      const cropCol = tileValIdx % gridSize;
                      const sizePerc = 100 / (gridSize - 1);
                      const pxX = cropCol * sizePerc;
                      const pxY = cropRow * sizePerc;

                      return (
                        <div
                          key={`tile-${idx}`}
                          onClick={() => handleTileClick(idx)}
                          className={`relative rounded-lg overflow-hidden flex items-center justify-center font-heading font-extrabold text-sm border shadow-sm transition-all text-white ${
                            isEmpty
                              ? "bg-slate-200/25 dark:bg-slate-950/20 shadow-inner cursor-default opacity-0"
                              : "cursor-pointer hover:border-emerald-400 active:scale-95"
                          }`}
                          style={!isEmpty ? {
                            backgroundImage: `url('${puzzleImages[puzzleImgIndex].url}')`,
                            backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                            backgroundPosition: `${pxX}% ${pxY}%`
                          } : {}}
                        >
                          <span className="absolute top-1 left-2 h-5 w-5 bg-black/50 backdrop-blur-sm shadow flex items-center justify-center rounded-full text-[10px]">
                            {tile}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Puzzle Winner Screen */}
                  <AnimatePresence>
                    {puzzleWin && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute inset-0 bg-primary-blue-dark/95 backdrop-blur-md rounded-2xl p-6 text-center text-white flex flex-col justify-center items-center z-25 max-w-[340px] mx-auto"
                      >
                        <Trophy className="h-14 w-14 text-yellow-300 animate-bounce mb-4" />
                        <h4 className="font-heading font-extrabold text-2xl tracking-tight">¡Ganador!</h4>
                        <p className="text-xs sm:text-sm text-gray-100 leading-relaxed mt-2 px-4">
                          Completaste el rompecabezas en <span className="font-bold underline text-amber-300">{puzzleMoves} movimientos</span> y <span className="font-bold underline text-amber-300">{Math.floor(puzzleSeconds / 60)}m {puzzleSeconds % 60}s</span>. ¡Eres un maestro de la agilidad!
                        </p>
                        <button
                          onClick={startPuzzleGame}
                          className="mt-6 px-6 py-2.5 bg-yellow-400 text-gray-950 hover:bg-yellow-300 font-heading font-extrabold text-xs tracking-wide uppercase rounded-xl transition-all hover:scale-105 active:scale-95"
                          id="puzzle-celebrate-btn"
                        >
                          Jugar de Nuevo
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* GAME 3: MEMORY PAIRS */}
            {activeGame === "memory" && (
              <motion.div
                key="memory-g"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Stats and Side Eco Panel */}
                <div className="lg:col-span-4 flex flex-col justify-between self-stretch">
                  <div>
                    <h3 className="font-heading font-extrabold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-500 animate-bounce" />
                      <span>Memorama Local</span>
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed mt-1.5 mb-5">
                      Haz clic en las tarjetas para voltearlas y encuentra los pares lógicos: las causas/problemáticas con sus correspondientes soluciones ecológicas viables en nuestra región.
                    </p>

                    {/* Educational Match Display card box */}
                    <div className="bg-emerald-50 dark:bg-slate-950 p-4 border border-emerald-100 dark:border-slate-800 rounded-2xl min-h-[140px] flex flex-col justify-center">
                      {recentMatchInfo ? (
                        <div>
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest inline-flex items-center gap-1.5 mb-1.5">
                            <Info className="h-3.5 w-3.5" />
                            <span>Par Encontrado</span>
                          </span>
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">{recentMatchInfo.name}</h4>
                          <p className="text-[11px] sm:text-xs text-gray-600 dark:text-slate-400 mt-1 leading-relaxed font-sans">{recentMatchInfo.desc}</p>
                        </div>
                      ) : (
                        <div className="text-center text-xs text-gray-400 font-medium">
                          Encuentra una pareja para revelar un consejo ambiental clave aquí.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom counters */}
                  <div className="mt-8 pt-5 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between gap-2.5">
                    <span className="text-xs font-bold text-gray-500 dark:text-slate-400 inline-flex items-center gap-1">
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span>Lanzamientos: {memMoves}</span>
                    </span>
                    <span className="text-xs font-bold text-gray-500 dark:text-slate-400 inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Crono: {Math.floor(memSeconds / 60)}m {memSeconds % 60}s</span>
                    </span>
                    <button
                      onClick={startMemoryGame}
                      className="p-2 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-800 hover:text-primary-green"
                      id="reset-memory-btn"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Memory Grid Column */}
                <div className="lg:col-span-8 flex items-center justify-center relative select-none">
                  <div className="grid grid-cols-4 gap-3 max-w-[340px] w-full aspect-square bg-gray-50 dark:bg-slate-950 p-4 rounded-3xl border border-gray-100 dark:border-slate-800">
                    {memCards.map((card, idx) => {
                      const showFront = card.isFlipped || card.isMatched;
                      return (
                        <div
                          key={card.id}
                          onClick={() => handleMemCardClick(idx)}
                          className="relative aspect-square cursor-pointer rounded-xl overflow-hidden transition-all duration-300"
                        >
                          <div className={`absolute inset-0 flex items-center justify-center font-heading font-extrabold text-2xl border rounded-xl transition-all duration-300 ${
                            showFront
                              ? "bg-white dark:bg-slate-900 border-emerald-400/50 shadow-md rotate-y-0"
                              : "bg-gradient-to-tr from-primary-green to-emerald-700 border-emerald-800 text-white shadow-sm hover:scale-102 hover:shadow-md"
                          }`}
                          style={{
                            backfaceVisibility: "hidden",
                            transform: showFront ? "none" : "rotateY(180deg)"
                          }}
                        >
                          {showFront ? card.icon : ""}
                        </div>

                        {/* Back overlay layer */}
                        <div
                          className={`absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-tr from-primary-green to-primary-green-dark text-white border border-emerald-800 text-xl font-heading font-bold transition-all duration-300 ${
                            showFront ? "opacity-0 pointer-events-none scale-90" : "opacity-100"
                          }`}
                          style={{
                            backfaceVisibility: "hidden"
                          }}
                        >
                          <span>🌱</span>
                        </div>
                      </div>
                    )})}
                  </div>

                  {/* Memory winner Screen */}
                  <AnimatePresence>
                    {memWin && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute inset-0 bg-primary-green-dark/95 backdrop-blur-md rounded-2xl p-6 text-center text-white flex flex-col justify-center items-center z-25 max-w-[340px] mx-auto"
                      >
                        <Trophy className="h-14 w-14 text-yellow-300 animate-bounce mb-4" />
                        <h4 className="font-heading font-extrabold text-2xl tracking-tight">¡Memoria Perfecta!</h4>
                        <p className="text-xs sm:text-sm text-gray-100 leading-relaxed mt-2 px-4">
                          Completaste con éxito de apareamiento lúdico ecológico de Culiacán en <span className="font-bold underline text-amber-300">{memSeconds} segundos</span> con solo <span className="font-bold underline text-amber-300">{memMoves} intentos</span>.
                        </p>
                        <button
                          onClick={startMemoryGame}
                          className="mt-6 px-6 py-2.5 bg-yellow-400 text-gray-950 hover:bg-yellow-300 font-heading font-extrabold text-xs tracking-wide uppercase rounded-xl transition-all hover:scale-105 active:scale-95"
                          id="memory-celebrate-btn"
                        >
                          Jugar de Nuevo
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
