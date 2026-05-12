import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

import album1 from "../assets/album-1.jpg";

interface Props {
  autoplay?: boolean;
}

export function MusicPlayer({ autoplay = false }: Props) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (autoplay && audioRef.current) {
      audioRef.current.volume = 0.4;

      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  }, [autoplay]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const updateProgress = () => {
      const percentage = (audio.currentTime / audio.duration) * 100;
      setProgress(Number.isNaN(percentage) ? 0 : percentage);
    };

    const handleEnded = () => {
      setPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        await audioRef.current.play();
        setPlaying(true);
      }
    } catch (error) {
      console.error("Erro ao tocar áudio:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.7 }}
      className="glass mx-auto w-full max-w-sm rounded-2xl p-4 shadow-soft"
    >
      <audio ref={audioRef} loop>
        <source src="/music/123.mp3" type="audio/mpeg" />
      </audio>

      <div className="flex items-center gap-4">
        <motion.div
          animate={playing ? { rotate: 360 } : { rotate: 0 }}
          transition={{
            duration: 12,
            repeat: playing ? Infinity : 0,
            ease: "linear",
          }}
          className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl shadow-glow"
        >
          <img src={album1} alt="Capa do álbum" className="h-full w-full object-cover" />
        </motion.div>

        <div className="min-w-0 flex-1 text-left">
          <p className="truncate text-sm font-medium text-blush">Perfect</p>

          <p className="truncate text-xs text-muted-foreground">Ed Sheeran</p>

          <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-wine to-rose-glow"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <button
          onClick={togglePlay}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-wine to-rose-glow shadow-glow transition active:scale-95"
          aria-label={playing ? "Pausar música" : "Tocar música"}
        >
          {playing ? (
            <Pause size={18} className="text-white" />
          ) : (
            <Play size={18} className="ml-0.5 text-white" />
          )}
        </button>
      </div>
    </motion.div>
  );
}
