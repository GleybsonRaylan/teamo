import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  const [isMobile, setIsMobile] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const timeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const audioStopTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }

      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }

      if (audioStopTimeoutRef.current !== null) {
        window.clearTimeout(audioStopTimeoutRef.current);
      }
    };
  }, []);

  const open = () => {
    if (stage !== "closed") return;

    setStage("opening");

    const cartaAudio = audioRef.current;

    if (cartaAudio) {
      cartaAudio.pause();
      cartaAudio.currentTime = 0;
      cartaAudio.volume = 0.9;

      cartaAudio.play().catch(() => {});

      audioStopTimeoutRef.current = window.setTimeout(() => {
        cartaAudio.pause();
        cartaAudio.currentTime = 0;
      }, 2300);
    }

    timeoutRef.current = window.setTimeout(() => {
      setStage("revealed");

      let index = 0;

      intervalRef.current = window.setInterval(() => {
        index += 1;
        setTyped(greeting.slice(0, index));

        if (index >= greeting.length) {
          if (intervalRef.current !== null) {
            window.clearInterval(intervalRef.current);
          }

          setShowCursor(false);

          timeoutRef.current = window.setTimeout(() => {
            onComplete();
          }, 4200);
        }
      }, 120);
    }, 2500);
  };

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-romance">
      <audio ref={audioRef} preload="auto">
        <source src="/music/carta1.mp3" type="audio/mpeg" />
      </audio>

      <Starfield density={isMobile ? 45 : 100} />
      <Particles count={isMobile ? 12 : 24} />

      <motion.div
        className="absolute inset-0 bg-black/10"
        animate={{
          opacity: stage === "opening" ? 1 : 0,
        }}
        transition={{ duration: 1.3 }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-glow/20 blur-2xl md:h-[420px] md:w-[420px] md:blur-3xl"
        animate={{
          opacity: stage === "closed" ? [0.25, 0.5, 0.25] : [0.45, 0.8, 0.45],
          scale: stage === "opening" ? [1, 1.14, 1.05] : [1, 1.06, 1],
        }}
        transition={{
          duration: stage === "opening" ? 2.2 : 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 50% 68%, rgba(251,113,133,0.22), transparent 38%), radial-gradient(circle at 50% 35%, rgba(255,255,255,0.08), transparent 28%)",
        }}
      />

      <AnimatePresence mode="wait">
        {stage !== "revealed" ? (
          <motion.div
            key="envelope"
            className="relative flex flex-col items-center px-6"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: stage === "opening" ? 1.03 : 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: -20,
            }}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.button
              onClick={open}
              disabled={stage !== "closed"}
              className="group relative cursor-pointer focus:outline-none disabled:cursor-default"
              animate={stage === "closed" ? { y: [0, -10, 0] } : { y: 0 }}
              transition={{
                duration: 4,
                repeat: stage === "closed" ? Infinity : 0,
                ease: "easeInOut",
              }}
              aria-label="Abrir carta"
            >
              <motion.div
                className="absolute -inset-8 rounded-full bg-rose-glow/10 blur-xl md:-inset-10 md:blur-2xl"
                animate={{
                  opacity: stage === "closed" ? [0.25, 0.55, 0.25] : [0.55, 1, 0.55],
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div
                className="relative"
                style={{
                  perspective: "1400px",
                  width: "min(82vw, 340px)",
                  aspectRatio: "1.58/1",
                }}
              >
                <motion.div
                  className="absolute inset-0 overflow-hidden rounded-lg shadow-soft"
                  style={{
                    background: "linear-gradient(135deg, #fff7f7 0%, #f6d7dc 45%, #e9aeb9 100%)",
                  }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.7),transparent_45%,rgba(127,18,49,0.18))]" />

                  <motion.div
                    className="absolute left-1/2 top-1/2 z-30 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-xl text-blush shadow-glow"
                    style={{
                      background: "radial-gradient(circle at 30% 30%, #fb7185, #7f1231)",
                    }}
                    animate={
                      stage === "opening"
                        ? {
                            scale: [1, 1.35, 0],
                            opacity: [1, 1, 0],
                          }
                        : {
                            scale: [1, 1.07, 1],
                          }
                    }
                    transition={{
                      duration: stage === "opening" ? 1.2 : 2.5,
                      repeat: stage === "closed" ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  >
                    ❤
                  </motion.div>
                </motion.div>

                <motion.div
                  className="absolute inset-x-0 top-0 z-20 origin-top"
                  style={{
                    height: "56%",
                    transformStyle: "preserve-3d",
                    background: "linear-gradient(180deg, #fff1f4 0%, #f2bac5 100%)",
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  }}
                  animate={
                    stage === "opening"
                      ? {
                          rotateX: -180,
                          y: -2,
                        }
                      : {
                          rotateX: 0,
                        }
                  }
                  transition={{
                    duration: 2.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />

                <motion.div
                  className="absolute left-1/2 top-4 z-10 h-[95%] w-[90%] -translate-x-1/2 overflow-hidden rounded-lg border border-rose-glow/20 bg-[#fffaf8] shadow-soft"
                  initial={{ y: 74, opacity: 0 }}
                  animate={
                    stage === "opening"
                      ? {
                          y: -42,
                          opacity: 1,
                          rotate: -1,
                        }
                      : {
                          y: 74,
                          opacity: 0,
                        }
                  }
                  transition={{
                    delay: 0.45,
                    duration: 1.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),transparent_45%,rgba(127,18,49,0.03))]" />

                  <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={stage === "opening" ? { opacity: 1, y: 0 } : undefined}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="font-display text-3xl leading-none text-[#7f1231]"
                    >
                      Para você
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, y: 12 }}
                      animate={stage === "opening" ? { opacity: 1, y: 0 } : undefined}
                      transition={{ delay: 1.2, duration: 0.8 }}
                      className="mt-3 max-w-[190px] text-[11px] uppercase leading-relaxed tracking-[0.18em] text-[#7f1231]/70"
                    >
                      com todo meu amor
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={stage === "opening" ? { opacity: 1, scale: 1 } : undefined}
                      transition={{ delay: 1.45, duration: 0.7 }}
                      className="mt-5 text-[26px] text-rose-glow drop-shadow-[0_0_10px_rgba(251,113,133,0.4)] md:drop-shadow-[0_0_12px_rgba(251,113,133,0.45)]"
                    ></motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.button>

            <motion.p
              className="mt-10 font-display text-3xl text-blush text-glow-soft"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            ></motion.p>

            <motion.p
              className="mt-3 text-xs uppercase tracking-[0.35em] text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{
                opacity: stage === "closed" ? [0.4, 1, 0.4] : 0,
              }}
              transition={{
                duration: 2.5,
                repeat: stage === "closed" ? Infinity : 0,
              }}
            >
              Toque para abrir sua carta
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="reveal"
            className="relative px-6 text-center"
            initial={{
              opacity: 0,
              scale: 0.92,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h1 className="font-display text-5xl leading-tight text-white drop-shadow-[0_0_18px_rgba(251,113,133,0.38)] md:text-7xl md:drop-shadow-[0_0_30px_rgba(251,113,133,0.45)]">
              {typed}

              {showCursor && (
                <motion.span
                  className="ml-1 inline-block h-[1em] w-[3px] align-middle bg-rose-glow"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                  }}
                />
              )}
            </h1>

            <motion.p
              className="mt-6 font-display text-3xl text-rose-glow"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: [1, 1.08, 1],
              }}
              transition={{
                opacity: {
                  delay: 1.4,
                  duration: 0.8,
                },
                scale: {
                  delay: 1.4,
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            ></motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
