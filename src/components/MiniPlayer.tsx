import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import { Track } from "@/data/musicData";

// ─── YouTube IFrame API types ─────────────────────────────────────────────────

interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  stopVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  setVolume(volume: number): void;
  getCurrentTime(): number;
  getDuration(): number;
  destroy(): void;
}

interface YTNamespace {
  Player: new (elementId: string, options: YTPlayerOptions) => YTPlayer;
  PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
}

interface YTPlayerOptions {
  height: string;
  width: string;
  videoId: string;
  playerVars?: Record<string, number | string>;
  events?: {
    onReady?: (event: { target: YTPlayer }) => void;
    onStateChange?: (event: { data: number }) => void;
  };
}

declare global {
  interface Window {
    YT: YTNamespace;
    onYouTubeIframeAPIReady: () => void;
  }
}

// ─── Mini Player ─────────────────────────────────────────────────────────────

interface PlayerProps {
  track: Track | null;
  onClose: () => void;
}

export default function MiniPlayer({ track, onClose }: PlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef<YTPlayer | null>(null);
  const iframeContainerRef = useRef<HTMLDivElement>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const playerDivId = "yt-mini-player";

  // Загружаем YouTube IFrame API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }
  }, []);

  // Создаём/пересоздаём плеер при смене трека
  useEffect(() => {
    if (!track) return;

    setPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    setPlayerReady(false);

    const initPlayer = () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }

      // Пересоздаём div для плеера
      const container = iframeContainerRef.current;
      if (!container) return;
      container.innerHTML = "";
      const div = document.createElement("div");
      div.id = playerDivId;
      container.appendChild(div);

      playerRef.current = new window.YT.Player(playerDivId, {
        height: "1",
        width: "1",
        videoId: track.youtubeId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: (event: { target: YTPlayer }) => {
            event.target.setVolume(volume);
            event.target.playVideo();
            setPlayerReady(true);
            setPlaying(true);
            setDuration(event.target.getDuration());
          },
          onStateChange: (event: { data: number }) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setPlaying(true);
            } else if (
              event.data === window.YT.PlayerState.PAUSED ||
              event.data === window.YT.PlayerState.ENDED
            ) {
              setPlaying(false);
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track?.id]);

  // Обновляем громкость
  useEffect(() => {
    if (playerRef.current && playerReady) {
      playerRef.current.setVolume(volume);
    }
  }, [volume, playerReady]);

  // Прогресс-бар
  useEffect(() => {
    if (playing) {
      progressIntervalRef.current = setInterval(() => {
        if (playerRef.current && playerReady) {
          const ct = playerRef.current.getCurrentTime?.() ?? 0;
          const dur = playerRef.current.getDuration?.() ?? 0;
          setCurrentTime(ct);
          setDuration(dur);
          setProgress(dur > 0 ? (ct / dur) * 100 : 0);
        }
      }, 500);
    } else {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    }
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [playing, playerReady]);

  const handlePlayPause = () => {
    if (!playerRef.current || !playerReady) return;
    if (playing) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current || !playerReady || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const seekTo = ratio * duration;
    playerRef.current.seekTo(seekTo, true);
    setCurrentTime(seekTo);
    setProgress(ratio * 100);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  if (!track) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-2xl border-t border-white/8 px-4 py-3 md:px-8">
      {/* Скрытый YouTube iframe */}
      <div
        ref={iframeContainerRef}
        style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", opacity: 0, pointerEvents: "none" }}
      />

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
            onClick={handlePlayPause}
            disabled={!playerReady}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 disabled:opacity-50"
            style={{
              background: `linear-gradient(135deg, ${track.color}, ${track.color}99)`,
            }}
          >
            {!playerReady ? (
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <Icon name={playing ? "Pause" : "Play"} size={18} className="text-white" />
            )}
          </button>
          <button className="text-white/40 hover:text-white transition-colors hidden sm:block">
            <Icon name="SkipForward" size={18} />
          </button>
        </div>

        {/* Progress */}
        <div className="flex-1 flex flex-col gap-1 min-w-0">
          <div
            className="h-1 bg-white/10 rounded-full cursor-pointer overflow-hidden"
            onClick={handleSeek}
          >
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%`, background: track.color }}
            />
          </div>
          <div className="hidden sm:flex justify-between text-xs text-white/25">
            <span>{formatTime(currentTime)}</span>
            <span>{duration > 0 ? formatTime(duration) : track.duration}</span>
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

        {/* Close */}
        <button
          onClick={() => {
            if (playerRef.current) {
              playerRef.current.stopVideo();
              playerRef.current.destroy();
              playerRef.current = null;
            }
            onClose();
          }}
          className="text-white/30 hover:text-white transition-colors flex-shrink-0"
        >
          <Icon name="X" size={18} />
        </button>
      </div>
    </div>
  );
}