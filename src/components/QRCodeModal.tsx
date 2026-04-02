import { useState } from "react";
import Icon from "@/components/ui/icon";

// ─── QR Code Modal ────────────────────────────────────────────────────────────

const SITE_URL = "https://music-relaxation-portal--preview.poehali.dev";

export default function QRCodeModal() {
  const [open, setOpen] = useState(false);

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&bgcolor=080810&color=a855f7&data=${encodeURIComponent(SITE_URL)}`;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/6 hover:bg-white/10 text-sm text-white/60 hover:text-white transition-all duration-200 border border-white/8"
      >
        <Icon name="QrCode" size={14} />
        <span className="hidden sm:block">QR-код</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative bg-[#0f0f1a] border border-white/10 rounded-3xl p-8 flex flex-col items-center gap-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
            >
              <Icon name="X" size={18} />
            </button>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-teal-500 flex items-center justify-center">
                <Icon name="Music2" size={13} className="text-white" />
              </div>
              <span className="text-base font-semibold tracking-tight">
                Mood<span className="text-purple-400">Tunes</span>
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-[#080810] border border-white/8">
              <img
                src={qrUrl}
                alt="QR-код сайта"
                width={200}
                height={200}
                className="rounded-xl"
              />
            </div>

            <div className="text-center">
              <p className="text-white/60 text-sm">Наведи камеру телефона</p>
              <p className="text-white/30 text-xs mt-1 break-all max-w-[220px]">{SITE_URL}</p>
            </div>

            <a
              href={qrUrl}
              download="moodtunes-qr.png"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-sm transition-all duration-200 border border-purple-500/20"
            >
              <Icon name="Download" size={14} />
              Скачать QR-код
            </a>
          </div>
        </div>
      )}
    </>
  );
}
