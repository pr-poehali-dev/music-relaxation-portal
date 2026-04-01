import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  category: string;
  mood: string;
  color: string;
  bpm: number;
  youtubeId: string;
}

// ─── Categories ───────────────────────────────────────────────────────────────

export const CATEGORIES = [
  { id: "all", label: "Всё", icon: "Music" },
  { id: "relax", label: "Расслабление", icon: "Waves" },
  { id: "focus", label: "Учёба / Фокус", icon: "Brain" },
  { id: "sleep", label: "Сон", icon: "Moon" },
  { id: "energy", label: "Энергия", icon: "Zap" },
  { id: "meditation", label: "Медитация", icon: "Flower2" },
];

// ─── Tracks ───────────────────────────────────────────────────────────────────

export const TRACKS: Track[] = [
  // Расслабление
  {
    id: 1,
    title: "Ocean Waves",
    artist: "Nature Sounds",
    duration: "3:45",
    category: "relax",
    mood: "🌊",
    color: "#4ECDC4",
    bpm: 60,
    youtubeId: "bn9F19Hi1Lk",
  },
  {
    id: 2,
    title: "Forest Rain",
    artist: "Ambient World",
    duration: "4:20",
    category: "relax",
    mood: "🌿",
    color: "#56AB2F",
    bpm: 55,
    youtubeId: "q76bMs-NwRk",
  },
  {
    id: 3,
    title: "Calm Piano",
    artist: "Piano Relax",
    duration: "5:10",
    category: "relax",
    mood: "🎹",
    color: "#A8EDEA",
    bpm: 65,
    youtubeId: "lTRiuFIWV54",
  },
  // Фокус / Учёба
  {
    id: 4,
    title: "Lo-Fi Study Beat",
    artist: "ChilledCow",
    duration: "2:58",
    category: "focus",
    mood: "📚",
    color: "#F7971E",
    bpm: 80,
    youtubeId: "jfKfPfyJRdk",
  },
  {
    id: 5,
    title: "Deep Focus Flow",
    artist: "Ambient Study",
    duration: "6:00",
    category: "focus",
    mood: "🧠",
    color: "#667EEA",
    bpm: 75,
    youtubeId: "5qap5aO4i9A",
  },
  {
    id: 6,
    title: "Coffee Shop Vibes",
    artist: "Urban Chill",
    duration: "3:30",
    category: "focus",
    mood: "☕",
    color: "#C6A15B",
    bpm: 85,
    youtubeId: "DWcJFNfaw9c",
  },
  // Сон
  {
    id: 7,
    title: "Sleep Meditation",
    artist: "Dream Sounds",
    duration: "8:00",
    category: "sleep",
    mood: "🌙",
    color: "#2C3E50",
    bpm: 45,
    youtubeId: "1ZYbU82GVz4",
  },
  {
    id: 8,
    title: "White Noise",
    artist: "Sleep Aid",
    duration: "10:00",
    category: "sleep",
    mood: "💤",
    color: "#4A6FA5",
    bpm: 40,
    youtubeId: "nMfPqeZjc2c",
  },
  {
    id: 9,
    title: "Lullaby Piano",
    artist: "Soft Notes",
    duration: "4:50",
    category: "sleep",
    mood: "🌛",
    color: "#764BA2",
    bpm: 50,
    youtubeId: "hUGS_8FS5W0",
  },
  // Энергия
  {
    id: 10,
    title: "Morning Boost",
    artist: "Energy Flow",
    duration: "3:15",
    category: "energy",
    mood: "⚡",
    color: "#F7971E",
    bpm: 128,
    youtubeId: "y6Sxv-sUYtM",
  },
  {
    id: 11,
    title: "Workout Beats",
    artist: "BeatMaster",
    duration: "4:05",
    category: "energy",
    mood: "🏋️",
    color: "#FF416C",
    bpm: 140,
    youtubeId: "09R8_2nJtjg",
  },
  {
    id: 12,
    title: "Run The Day",
    artist: "Pulse Music",
    duration: "3:50",
    category: "energy",
    mood: "🏃",
    color: "#FF6B35",
    bpm: 135,
    youtubeId: "ZbZSe6N_BXs",
  },
  // Медитация
  {
    id: 13,
    title: "Tibetan Bowls",
    artist: "Zen Master",
    duration: "7:30",
    category: "meditation",
    mood: "🔔",
    color: "#B8860B",
    bpm: 35,
    youtubeId: "XqZsoesa55w",
  },
  {
    id: 14,
    title: "Breathe In",
    artist: "Mindful Music",
    duration: "5:00",
    category: "meditation",
    mood: "🧘",
    color: "#11998E",
    bpm: 40,
    youtubeId: "lACf4O_eSt0",
  },
  {
    id: 15,
    title: "Chakra Flow",
    artist: "Inner Peace",
    duration: "9:00",
    category: "meditation",
    mood: "🌸",
    color: "#E96C96",
    bpm: 38,
    youtubeId: "77ZozI0rw7w",
  },
];

// ─── Playlists ─────────────────────────────────────────────────────────────────

export const PLAYLISTS = [
  {
    id: "relax",
    title: "Расслабление",
    subtitle: "Снимите напряжение",
    icon: "Waves",
    gradient: "from-teal-500/20 to-cyan-500/10",
    border: "border-teal-500/30",
    accent: "#4ECDC4",
    tracks: TRACKS.filter((t) => t.category === "relax").length,
  },
  {
    id: "focus",
    title: "Учёба и фокус",
    subtitle: "Концентрация без отвлечений",
    icon: "Brain",
    gradient: "from-purple-500/20 to-indigo-500/10",
    border: "border-purple-500/30",
    accent: "#667EEA",
    tracks: TRACKS.filter((t) => t.category === "focus").length,
  },
  {
    id: "sleep",
    title: "Сон",
    subtitle: "Мягкое погружение в отдых",
    icon: "Moon",
    gradient: "from-blue-900/30 to-slate-800/20",
    border: "border-blue-800/30",
    accent: "#4A6FA5",
    tracks: TRACKS.filter((t) => t.category === "sleep").length,
  },
  {
    id: "energy",
    title: "Энергия",
    subtitle: "Заряд на весь день",
    icon: "Zap",
    gradient: "from-orange-500/20 to-red-500/10",
    border: "border-orange-500/30",
    accent: "#F7971E",
    tracks: TRACKS.filter((t) => t.category === "energy").length,
  },
  {
    id: "meditation",
    title: "Медитация",
    subtitle: "Внутренний покой",
    icon: "Flower2",
    gradient: "from-rose-500/20 to-purple-500/10",
    border: "border-rose-500/30",
    accent: "#E96C96",
    tracks: TRACKS.filter((t) => t.category === "meditation").length,
  },
];

// ─── useInView hook ───────────────────────────────────────────────────────────

export function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}
