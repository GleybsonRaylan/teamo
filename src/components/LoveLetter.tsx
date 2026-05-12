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
    margin: "-100px",
  });

  const [shown, setShown] = useState<string[]>([]);

  useEffect(() => {
    if (!inView) return;

    let line = 0;
    let char = 0;
    let timeout: ReturnType<typeof setTimeout>;

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

        timeout = setTimeout(next, 520);
      } else {
        timeout = setTimeout(next, 42);
      }
    };

    next();

    return () => {
      clearTimeout(timeout);
    };
  }, [inView]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-6 py-28 bg-gradient-to-b from-background via-background to-background"
    >
      <div className="pointer-events-none absolute inset-0 bg-romance opacity-70" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 36 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-md"
      >
        <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-rose-glow/30 via-white/5 to-wine/30 blur-2xl opacity-60" />

        <div className="glass relative overflow-hidden rounded-[2rem] border border-white/10 p-7 shadow-soft sm:p-8">
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-rose-glow/70 to-transparent" />

          <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-rose-glow/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-wine/30 blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="relative mb-7 flex items-center justify-between"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.45em] text-rose-glow/75">Uma carta</p>

              <h2 className="mt-2 font-display text-3xl leading-none text-blush text-glow-soft">
                Para você
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-glow">
              <Feather size={18} className="text-rose-glow" />
            </div>
          </motion.div>

          <div className="relative min-h-[430px] space-y-3.5">
            {lines.map((lineText, i) => {
              const isFirst = i === 0;
              const isLast = i === lines.length - 1;

              return (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={shown[i] ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45 }}
                  className={`font-display leading-relaxed ${
                    isFirst
                      ? "text-3xl text-[#fff1f4]"
                      : isLast
                        ? "pt-3 text-2xl italic text-rose-glow"
                        : "text-[1.55rem] text-blush/90"
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

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={
              shown[lines.length - 1] === lines[lines.length - 1] ? { opacity: 1, scaleX: 1 } : {}
            }
            transition={{ duration: 0.9 }}
            className="mx-auto mt-6 h-px w-28 origin-center bg-gradient-to-r from-transparent via-rose-glow/60 to-transparent"
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={
              shown[lines.length - 1] === lines[lines.length - 1] ? { opacity: 1, y: 0 } : {}
            }
            transition={{ delay: 0.3, duration: 0.8 }}
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
