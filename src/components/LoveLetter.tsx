import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Feather } from "lucide-react";

const lines = [
  "Meu Amor,",
  "Se existisse um fim para tudo,",
  "eu ainda pediria mais uma vida só para te encontrar de novo.",
  "Porque antes de ser amor,",
  "você já parecia destino.",
  "E em um mundo tão frio,",
  "você foi o único lugar que me fez sentir em casa.",
  "Para sempre seu.",
];

export function LoveLetter() {
  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  const [shown, setShown] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (!inView) return;

    let line = 0;
    let char = 0;

    let timeout: number;

    const next = () => {
      if (line >= lines.length) return;

      const currentLine = lines[line];

      if (!currentLine) return;

      char++;

      setShown((prev) => {
        const copy = [...prev];

        copy[line] = currentLine.slice(0, char);

        return copy;
      });

      if (char >= currentLine.length) {
        line++;
        char = 0;

        timeout = window.setTimeout(next, 460);
      } else {
        timeout = window.setTimeout(next, isMobile ? 28 : 40);
      }
    };

    next();

    return () => {
      window.clearTimeout(timeout);
    };
  }, [inView, isMobile]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-background via-background to-background px-6 py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-romance opacity-70" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 28 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative mx-auto max-w-md"
      >
        {/* GLOW EXTERNO */}
        <div
          className="absolute -inset-1 rounded-[2rem] opacity-60"
          style={{
            background:
              "linear-gradient(to bottom right, rgba(251,113,133,0.18), rgba(255,255,255,0.03), rgba(127,18,49,0.18))",
            filter: isMobile ? "blur(18px)" : "blur(30px)",
          }}
        />

        {/* CARD */}
        <div className="glass relative overflow-hidden rounded-[2rem] border border-white/10 p-6 shadow-soft sm:p-8">
          {/* LINHA SUPERIOR */}
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-rose-glow/70 to-transparent" />

          {/* GLOW FUNDO */}
          <div
            className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-rose-glow/15 md:h-44 md:w-44"
            style={{
              filter: isMobile ? "blur(40px)" : "blur(60px)",
            }}
          />

          <div
            className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-wine/25 md:h-52 md:w-52"
            style={{
              filter: isMobile ? "blur(40px)" : "blur(65px)",
            }}
          />

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.2,
              duration: 0.75,
            }}
            className="relative mb-7 flex items-center justify-between"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.45em] text-rose-glow/75">Uma carta</p>

              <h2 className="mt-2 font-display text-3xl leading-none text-blush text-glow-soft">
                Para você
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-glow backdrop-blur-sm md:backdrop-blur-md">
              <Feather size={18} className="text-rose-glow" />
            </div>
          </motion.div>

          {/* TEXTO */}
          <div className="relative min-h-[390px] space-y-3 sm:min-h-[430px] sm:space-y-3.5">
            {lines.map((lineText, i) => {
              const isFirst = i === 0;
              const isLast = i === lines.length - 1;

              return (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={shown[i] ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.35 }}
                  className={`font-display leading-relaxed ${
                    isFirst
                      ? "text-[2rem] text-[#fff1f4] sm:text-3xl"
                      : isLast
                        ? "pt-3 text-[1.7rem] italic text-rose-glow sm:text-2xl"
                        : "text-[1.35rem] text-blush/90 sm:text-[1.55rem]"
                  }`}
                >
                  {shown[i] || ""}

                  {shown[i] && shown[i].length < lineText.length && (
                    <span className="ml-1 inline-block h-[1em] w-[2px] animate-pulse align-middle bg-rose-glow" />
                  )}
                </motion.p>
              );
            })}
          </div>

          {/* LINHA FINAL */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={
              shown[lines.length - 1] === lines[lines.length - 1] ? { opacity: 1, scaleX: 1 } : {}
            }
            transition={{ duration: 0.8 }}
            className="mx-auto mt-6 h-px w-28 origin-center bg-gradient-to-r from-transparent via-rose-glow/60 to-transparent"
          />

          {/* FOOTER */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={
              shown[lines.length - 1] === lines[lines.length - 1] ? { opacity: 1, y: 0 } : {}
            }
            transition={{
              delay: 0.3,
              duration: 0.8,
            }}
            className="mt-5 flex items-center justify-center gap-2 text-rose-glow/70"
          >
            <Heart size={13} className="fill-rose-glow/70" />

            <span className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
              escrito com amor
            </span>

            <Heart size={13} className="fill-rose-glow/70" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
