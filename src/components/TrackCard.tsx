import Icon from "@/components/ui/icon";
import { Track } from "@/data/musicData";

// ─── Track Card ───────────────────────────────────────────────────────────────

interface TrackCardProps {
  track: Track;
  isActive: boolean;
  onClick: () => void;
}

export default function TrackCard({ track, isActive, onClick }: TrackCardProps) {
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
