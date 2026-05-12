import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

import album1 from "@/assets/album-1.jpg";

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

      setProgress(isNaN(percentage) ? 0 : percentage);
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
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.4,
      }}
      className="glass rounded-2xl p-4 shadow-soft w-full max-w-sm mx-auto"
    >
      <audio ref={audioRef} loop>
        <source src="/music/123.mp3" type="audio/mpeg" />
      </audio>

      <div className="flex items-center gap-4">
        <motion.div
          animate={playing ? { rotate: 360 } : {}}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-glow"
        >
          <img src={album1} alt="album" className="w-full h-full object-cover" />
        </motion.div>

        <div className="flex-1 min-w-0">
          <p className="text-blush text-sm font-medium truncate">Perfect</p>

          <p className="text-muted-foreground text-xs truncate">Ed Sheeran</p>

          <div className="mt-2 h-1 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-wine to-rose-glow"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-6 text-blush">
        <button className="opacity-60 hover:opacity-100 transition" aria-label="back">
          <SkipBack size={18} />
        </button>

        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-wine to-rose-glow flex items-center justify-center shadow-glow active:scale-95 transition"
          aria-label={playing ? "pause" : "play"}
        >
          {playing ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
        </button>

        <button className="opacity-60 hover:opacity-100 transition" aria-label="next">
          <SkipForward size={18} />
        </button>
      </div>
    </motion.div>
  );
}
