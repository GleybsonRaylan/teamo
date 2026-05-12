import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Starfield } from "./Starfield";
import { Particles } from "./Particles";

interface Props {
  recipient: string;
  onComplete: () => void;
}

const greeting = "Happy Valentine's Day";

export function EnvelopeIntro({ recipient, onComplete }: Props) {
  const [mounted, setMounted] = useState(false);

  const [stage, setStage] = useState<"closed" | "opening" | "revealed">("closed");

  const [typed, setTyped] = useState("");

  const [showCursor, setShowCursor] = useState(true);

  // som da carta
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  if (!mounted) return null;

  const open = () => {
    if (stage !== "closed") return;

    setStage("opening");

    const cartaAudio = audioRef.current;

    // toca som da carta
    if (cartaAudio) {
      cartaAudio.pause();

      cartaAudio.currentTime = 0;

      cartaAudio.volume = 1;

      cartaAudio.play().catch((error) => {
        console.error("Erro ao tocar áudio:", error);
      });

      // para após 2.3 segundos
      setTimeout(() => {
        cartaAudio.pause();

        cartaAudio.currentTime = 0;

        // inicia música principal
        const bgMusic = document.querySelector(
          "audio[src='/music/123.mp3']",
        ) as HTMLAudioElement | null;

        if (bgMusic) {
          bgMusic.volume = 0.4;

          bgMusic.play().catch(() => {});
        }
      }, 2300);
    }

    timeoutRef.current = setTimeout(() => {
      setStage("revealed");

      let i = 0;

      intervalRef.current = setInterval(() => {
        i++;

        setTyped(greeting.slice(0, i));

        if (i >= greeting.length) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }

          setShowCursor(false);

          timeoutRef.current = setTimeout(() => {
            onComplete();
          }, 5000);
        }
      }, 200);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-romance overflow-hidden flex items-center justify-center">
      {/* som da carta */}
      <audio ref={audioRef} preload="auto">
        <source src="/music/carta1.mp3" type="audio/mpeg" />
      </audio>

      <Starfield density={80} />

      <Particles count={20} />

      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 50% 70%, oklch(0.4 0.16 18 / 0.35), transparent 60%)",
        }}
      />

      <AnimatePresence mode="wait">
        {stage !== "revealed" ? (
          <motion.div
            key="envelope"
            className="relative flex flex-col items-center px-6"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
            }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.button
              onClick={open}
              className="relative cursor-pointer focus:outline-none"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              aria-label="Abrir carta"
            >
              <div
                className="relative"
                style={{
                  perspective: "1200px",
                  width: "min(80vw, 320px)",
                  aspectRatio: "1.6/1",
                }}
              >
                {/* corpo */}
                <div
                  className="absolute inset-0 rounded-md shadow-soft overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, oklch(0.95 0.02 20), oklch(0.88 0.04 15))",
                  }}
                >
                  {/* selo */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center text-blush text-xl shadow-glow"
                    style={{
                      background:
                        "radial-gradient(circle at 30% 30%, oklch(0.55 0.18 18), oklch(0.3 0.14 18))",
                    }}
                    animate={{
                      scale: [1, 1.06, 1],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                    }}
                  >
                    ❤
                  </motion.div>
                </div>

                {/* aba */}
                <motion.div
                  className="absolute inset-x-0 top-0 origin-top z-20"
                  style={{
                    height: "55%",
                    transformStyle: "preserve-3d",
                    background: "linear-gradient(180deg, oklch(0.92 0.03 18), oklch(0.82 0.05 15))",
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  }}
                  animate={
                    stage === "opening"
                      ? {
                          rotateX: -180,
                        }
                      : {
                          rotateX: 0,
                        }
                  }
                  transition={{
                    duration: 3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>
            </motion.button>

            <motion.p
              className="mt-10 font-display text-2xl text-blush text-glow-soft"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.9,
              }}
            >
              Para Meu Amor <span className="text-rose-glow">❤</span>
            </motion.p>

            <motion.p
              className="mt-3 text-sm text-muted-foreground tracking-widest uppercase"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: stage === "closed" ? [0.4, 1, 0.4] : 0,
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
            >
              Toque para abrir sua carta
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="reveal"
            className="relative text-center px-6"
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 1.5,
            }}
          >
            <h1 className="font-display text-5xl md:text-7xl text-blush text-glow leading-tight">
              {typed}

              {showCursor && (
                <motion.span
                  className="inline-block w-[3px] h-[1em] align-middle ml-1 bg-rose-glow"
                  animate={{
                    opacity: [1, 0, 1],
                  }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                  }}
                />
              )}
            </h1>

            <motion.p
              className="mt-6 text-rose-glow text-2xl"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 1.5,
              }}
            >
              ❤
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
