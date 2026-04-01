import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "all", label: "Всё", icon: "Music" },
  { id: "relax", label: "Расслабление", icon: "Waves" },
  { id: "focus", label: "Учёба / Фокус", icon: "Brain" },
  { id: "sleep", label: "Сон", icon: "Moon" },
  { id: "energy", label: "Энергия", icon: "Zap" },
  { id: "meditation", label: "Медитация", icon: "Flower2" },
];

interface Track {
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

const TRACKS: Track[] = [
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

const PLAYLISTS = [
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

function useInView(threshold = 0.1) {
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

// ─── Mini Player ─────────────────────────────────────────────────────────────

interface PlayerProps {
  track: Track | null;
  onClose: () => void;
}

function MiniPlayer({ track, onClose }: PlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setPlaying(false);
    setProgress(0);
  }, [track]);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => (p >= 100 ? 0 : p + 0.5));
      }, 300);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing]);

  if (!track) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-2xl border-t border-white/8 px-4 py-3 md:px-8">
      <div className="max-w-5xl mx-auto flex items-center gap-4 md:gap-6">
        {/* Emoji cover */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 relative overflow-hidden"
          style={{ background: `${track.color}22`, border: `1px solid ${track.color}44` }}
        >
          {track.mood}
          {playing && (
            <span
              className="absolute inset-0 rounded-xl animate-pulse"
              style={{ background: `${track.color}15` }}
            />
          )}
        </div>

        {/* Info */}
        <div className="flex-shrink-0 min-w-0 w-32 hidden sm:block">
          <p className="text-sm font-medium text-white truncate">{track.title}</p>
          <p className="text-xs text-white/40 truncate">{track.artist}</p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button className="text-white/40 hover:text-white transition-colors hidden sm:block">
            <Icon name="SkipBack" size={18} />
          </button>
          <button
            onClick={() => setPlaying(!playing)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${track.color}, ${track.color}99)`,
            }}
          >
            <Icon name={playing ? "Pause" : "Play"} size={18} className="text-white" />
          </button>
          <button className="text-white/40 hover:text-white transition-colors hidden sm:block">
            <Icon name="SkipForward" size={18} />
          </button>
        </div>

        {/* Progress */}
        <div className="flex-1 flex flex-col gap-1 min-w-0">
          <div
            className="h-1 bg-white/10 rounded-full cursor-pointer overflow-hidden"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setProgress(((e.clientX - rect.left) / rect.width) * 100);
            }}
          >
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%`, background: track.color }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/25 hidden sm:flex">
            <span>
              {Math.floor((progress / 100) * 3)}:
              {String(Math.floor(((progress / 100) * 180) % 60)).padStart(2, "0")}
            </span>
            <span>{track.duration}</span>
          </div>
        </div>

        {/* Volume */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0 w-28">
          <Icon name="Volume2" size={16} className="text-white/40" />
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="flex-1 h-1 appearance-none bg-white/10 rounded-full cursor-pointer"
            style={
              {
                "--track-color": track.color,
                background: `linear-gradient(to right, ${track.color} ${volume}%, rgba(255,255,255,0.1) ${volume}%)`,
              } as React.CSSProperties
            }
          />
        </div>

        {/* YouTube link */}
        <a
          href={`https://www.youtube.com/watch?v=${track.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 text-xs text-white/30 hover:text-white/70 transition-colors flex-shrink-0"
        >
          <Icon name="ExternalLink" size={14} />
          YouTube
        </a>

        {/* Close */}
        <button
          onClick={onClose}
          className="text-white/30 hover:text-white transition-colors flex-shrink-0"
        >
          <Icon name="X" size={18} />
        </button>
      </div>
    </div>
  );
}

// ─── Track Card ───────────────────────────────────────────────────────────────

interface TrackCardProps {
  track: Track;
  isActive: boolean;
  onClick: () => void;
}

function TrackCard({ track, isActive, onClick }: TrackCardProps) {
  return (
    <div
      onClick={onClick}
      className="group flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/5"
      style={
        isActive
          ? {
              background: `${track.color}12`,
              border: `1px solid ${track.color}30`,
            }
          : { border: "1px solid transparent" }
      }
    >
      {/* Cover */}
      <div
        className="w-11 h-11 rounded-lg flex items-center justify-center text-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
        style={{ background: `${track.color}22`, border: `1px solid ${track.color}33` }}
      >
        {track.mood}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-medium truncate transition-colors"
          style={isActive ? { color: track.color } : { color: "rgba(255,255,255,0.85)" }}
        >
          {track.title}
        </p>
        <p className="text-xs text-white/40 truncate">{track.artist}</p>
      </div>

      {/* BPM badge */}
      <span className="hidden md:block text-xs text-white/25 flex-shrink-0">{track.bpm} bpm</span>

      {/* Duration */}
      <span className="text-xs text-white/30 flex-shrink-0">{track.duration}</span>

      {/* Play icon */}
      <div
        className="flex-shrink-0 w-8 h-8 rounded-full items-center justify-center transition-all duration-200 hidden group-hover:flex"
        style={{ background: `${track.color}33` }}
      >
        <Icon name={isActive ? "Pause" : "Play"} size={14} style={{ color: track.color }} />
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Index() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTrack, setActiveTrack] = useState<Track | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const heroSection = useInView(0.05);
  const playlistSection = useInView(0.1);
  const tracksSection = useInView(0.05);

  const filteredTracks = TRACKS.filter((t) => {
    const matchCat = activeCategory === "all" || t.category === activeCategory;
    const matchSearch =
      search === "" ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.artist.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#080810] text-white overflow-x-hidden font-golos">
      {/* ── Ambient bg ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-purple-900/10 blur-[120px]" />
        <div className="absolute top-1/2 -right-64 w-[500px] h-[500px] rounded-full bg-teal-900/10 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-indigo-900/8 blur-[100px]" />
      </div>

      {/* ── Nav ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ${
          scrolled
            ? "py-3 bg-[#080810]/90 backdrop-blur-2xl border-b border-white/5"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-5xl mx-auto px-5 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-teal-500 flex items-center justify-center">
              <Icon name="Music2" size={16} className="text-white" />
            </div>
            <span className="text-base font-semibold tracking-tight">
              Mood<span className="text-purple-400">Tunes</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {CATEGORIES.slice(1).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-white/10 text-white"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <a
            href="https://www.youtube.com/results?search_query=relaxing+music"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/6 hover:bg-white/10 text-sm text-white/60 hover:text-white transition-all duration-200 border border-white/8"
          >
            <Icon name="ExternalLink" size={14} />
            <span className="hidden sm:block">Открыть плейлист</span>
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section
        ref={heroSection.ref}
        className="relative z-10 pt-32 pb-20 px-5 text-center"
      >
        <div
          className={`transition-all duration-700 ${
            heroSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs tracking-wide mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            Музыка для любого настроения
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5">
            Правильная музыка
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
              для каждого момента
            </span>
          </h1>

          <p className="text-white/40 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Подборки треков для расслабления, учёбы, сна, медитации и заряда
            энергией — всё в одном месте.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Icon
              name="Search"
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
            />
            <input
              type="text"
              placeholder="Поиск треков и исполнителей..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/6 border border-white/10 rounded-2xl py-3.5 pl-10 pr-4 text-sm text-white placeholder-white/25 outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all duration-200"
            />
          </div>
        </div>

        {/* Floating emoji notes */}
        <div className="absolute top-24 left-8 text-3xl opacity-10 animate-float select-none pointer-events-none">
          🎵
        </div>
        <div
          className="absolute top-40 right-12 text-2xl opacity-10 select-none pointer-events-none"
          style={{ animation: "float 8s ease-in-out 2s infinite" }}
        >
          🎶
        </div>
        <div
          className="absolute bottom-8 left-1/4 text-3xl opacity-8 select-none pointer-events-none"
          style={{ animation: "float 7s ease-in-out 1s infinite" }}
        >
          🎸
        </div>
      </section>

      {/* ── Playlist Cards ── */}
      <section ref={playlistSection.ref} className="relative z-10 px-5 pb-16 max-w-5xl mx-auto">
        <div
          className={`transition-all duration-700 delay-100 ${
            playlistSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-xl font-semibold text-white/70 mb-5">Подборки</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {PLAYLISTS.map((pl) => (
              <button
                key={pl.id}
                onClick={() => {
                  setActiveCategory(pl.id);
                  document
                    .getElementById("tracks")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`group relative flex flex-col items-start gap-3 p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02] text-left bg-gradient-to-br ${pl.gradient} ${pl.border}`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${pl.accent}22`, border: `1px solid ${pl.accent}44` }}
                >
                  <Icon name={pl.icon} size={20} style={{ color: pl.accent }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white leading-tight">{pl.title}</p>
                  <p className="text-xs text-white/35 mt-0.5 leading-tight">{pl.subtitle}</p>
                </div>
                <span className="text-xs text-white/25">{pl.tracks} треков</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category Filter + Tracks ── */}
      <section
        id="tracks"
        ref={tracksSection.ref}
        className="relative z-10 px-5 pb-32 max-w-5xl mx-auto"
      >
        <div
          className={`transition-all duration-700 delay-200 ${
            tracksSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Filter chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm whitespace-nowrap flex-shrink-0 transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-white text-black font-semibold"
                    : "bg-white/6 border border-white/10 text-white/50 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon name={cat.icon} size={13} />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Track count */}
          <p className="text-xs text-white/25 mb-4">
            {filteredTracks.length}{" "}
            {filteredTracks.length === 1 ? "трек" : "треков"}
            {search && ` по запросу «${search}»`}
          </p>

          {/* Tracks grid */}
          {filteredTracks.length === 0 ? (
            <div className="text-center py-20 text-white/20">
              <Icon name="SearchX" size={48} className="mx-auto mb-3 opacity-50" />
              <p className="text-lg">Ничего не найдено</p>
              <p className="text-sm mt-1">Попробуйте другой запрос</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-2">
              {filteredTracks.map((track) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  isActive={activeTrack?.id === track.id}
                  onClick={() =>
                    setActiveTrack(activeTrack?.id === track.id ? null : track)
                  }
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Tips Section ── */}
      <section className="relative z-10 px-5 pb-20 max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold text-white/60 mb-5">Советы по прослушиванию</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: "Headphones",
              color: "#4ECDC4",
              title: "Используйте наушники",
              text: "Наушники помогают лучше погрузиться в атмосферу музыки и отсечь внешний шум.",
            },
            {
              icon: "Clock",
              color: "#667EEA",
              title: "Помидор + музыка",
              text: "25 минут фокуса + 5 минут отдыха. Под lo-fi это работает вдвое эффективнее.",
            },
            {
              icon: "Volume1",
              color: "#F7971E",
              title: "Тихая громкость",
              text: "Оптимально — 40–50% от максимума. Фоновая музыка не должна отвлекать.",
            },
          ].map((tip) => (
            <div
              key={tip.title}
              className="flex gap-4 p-4 rounded-2xl bg-white/3 border border-white/7 hover:bg-white/5 transition-all duration-300"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: `${tip.color}18`, border: `1px solid ${tip.color}30` }}
              >
                <Icon name={tip.icon} size={18} style={{ color: tip.color }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white/80 mb-1">{tip.title}</p>
                <p className="text-xs text-white/35 leading-relaxed">{tip.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/5 px-5 py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-teal-500 flex items-center justify-center">
            <Icon name="Music2" size={12} className="text-white" />
          </div>
          <span className="text-sm font-semibold">
            Mood<span className="text-purple-400">Tunes</span>
          </span>
        </div>
        <p className="text-xs text-white/20">
          Музыкальные подборки для любого настроения · {new Date().getFullYear()}
        </p>
      </footer>

      {/* ── Mini Player ── */}
      <MiniPlayer track={activeTrack} onClose={() => setActiveTrack(null)} />
    </div>
  );
}
