import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import MiniPlayer from "@/components/MiniPlayer";
import TrackCard from "@/components/TrackCard";
import { CATEGORIES, PLAYLISTS, TRACKS, Track, useInView } from "@/data/musicData";

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
