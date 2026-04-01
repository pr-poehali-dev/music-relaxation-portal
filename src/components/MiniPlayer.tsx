import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import { Track } from "@/data/musicData";

// ─── Mini Player ─────────────────────────────────────────────────────────────

interface PlayerProps {
  track: Track | null;
  onClose: () => void;
}

export default function MiniPlayer({ track, onClose }: PlayerProps) {
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
