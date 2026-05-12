import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
// import { Particles } from "./Particles";

const lines = [
  "Meu Amor,",
  "Se existisse um fim para tudo,",
  "eu ainda pediria mais uma vida só para te encontrar de novo.",
  "Porque antes de ser amor,",
  "você já parecia destino.",
  "E em um mundo tão frio,",
  "você foi o único lugar que me fez sentir em casa.",
  "Para Sempre seu.",
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
      // terminou todas as linhas
      if (line >= lines.length) return;

      const currentLine = lines[line];

      // segurança extra
      if (!currentLine) return;

      char++;

      setShown((prev) => {
        const copy = [...prev];

        copy[line] = currentLine.slice(0, char);

        return copy;
      });

      // terminou linha atual
      if (char >= currentLine.length) {
        line++;
        char = 0;

        timeout = setTimeout(next, 600);
      } else {
        timeout = setTimeout(next, 50);
      }
    };

    next();

    // cleanup para evitar memory leak
    return () => {
      clearTimeout(timeout);
    };
  }, [inView]);

  return (
    <section ref={ref} className="relative overflow-hidden px-6 py-24">
      {/* Removido temporariamente para evitar hydration mismatch */}
      {/* <Particles count={12} /> */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="glass relative mx-auto max-w-md rounded-3xl p-8 shadow-soft"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.18 0.04 20 / 0.6), oklch(0.1 0.02 20 / 0.4))",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-20"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, oklch(0.55 0.18 18 / 0.5), transparent 60%)",
          }}
        />

        <p className="mb-6 text-xs uppercase tracking-[0.4em] text-rose-glow">Uma Carta</p>

        <div className="font-display min-h-[420px] space-y-3 text-2xl leading-relaxed text-blush">
          {lines.map((lineText, i) => (
            <p key={i}>
              {shown[i] || ""}

              {shown[i] && shown[i].length < lineText.length && (
                <span className="ml-0.5 inline-block h-[1em] w-[2px] animate-pulse align-middle bg-rose-glow" />
              )}
            </p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
