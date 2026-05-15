import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  onComplete: () => void;
}

export function VoiceMessageIntro({ onComplete }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [started, setStarted] = useState(false);

  const playMessage = () => {
    const audio = audioRef.current;

    if (!audio) return;

    setStarted(true);

    audio.currentTime = 0;
    audio.volume = 1;

    audio.play().catch(() => {});
  };

  return (
    <AnimatePresence>
      <motion.section
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
          scale: 1.04,
          filter: "blur(10px)",
        }}
        transition={{ duration: 1 }}
      >
        <audio ref={audioRef} src="/music/recado.mp3" preload="auto" onEnded={onComplete} />

        {/* fundo cinematográfico */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,120,160,0.16),transparent_34%,rgba(0,0,0,0.95)_78%)]" />

        <motion.div
          className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-glow/10 blur-3xl"
          animate={{
            opacity: [0.25, 0.55, 0.25],
            scale: [1, 1.14, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* linhas de cinema */}
        <div className="pointer-events-none absolute left-0 right-0 top-0 h-24 bg-gradient-to-b from-black to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />

        <div className="relative z-10 mx-auto max-w-xl">
          {!started ? (
            <motion.div
              initial={{
                opacity: 0,
                y: 24,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="space-y-7"
            >
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.8 }}
                className="text-[10px] uppercase tracking-[0.5em] text-rose-glow/70"
              >
                antes de continuar
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.9 }}
                className="font-display text-3xl leading-tight text-white drop-shadow-[0_0_24px_rgba(251,113,133,0.25)] sm:text-4xl"
              >
                Existe algo que eu preciso te dizer.
              </motion.h2>

              <motion.button
                onClick={playMessage}
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="rounded-full border border-white/15 bg-white/10 px-7 py-4 font-display text-lg text-white shadow-[0_0_35px_rgba(255,120,160,0.25)] backdrop-blur-md transition hover:border-rose-glow/40 hover:bg-white/15"
              >
                Ouvir meu recado
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="space-y-6"
            >
              <motion.p
                animate={{
                  opacity: [0.45, 1, 0.45],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="font-display text-3xl text-white sm:text-4xl"
              >
                Ouça com carinho...
              </motion.p>

              <motion.div
                className="mx-auto h-px w-32 bg-gradient-to-r from-transparent via-rose-glow to-transparent"
                animate={{
                  scaleX: [0.5, 1, 0.5],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <p className="text-xs uppercase tracking-[0.35em] text-white/35">
                minha voz, meu coração
              </p>
            </motion.div>
          )}
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
