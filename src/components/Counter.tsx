import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Starfield } from "./Starfield";
import { Particles } from "./Particles";

const START_DATE = new Date("2023-12-18T00:00:00");

function diff(now: Date) {
  let years = now.getFullYear() - START_DATE.getFullYear();
  let months = now.getMonth() - START_DATE.getMonth();
  let days = now.getDate() - START_DATE.getDate();
  let hours = now.getHours() - START_DATE.getHours();
  let minutes = now.getMinutes() - START_DATE.getMinutes();
  let seconds = now.getSeconds() - START_DATE.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }

  if (minutes < 0) {
    minutes += 60;
    hours--;
  }

  if (hours < 0) {
    hours += 24;
    days--;
  }

  if (days < 0) {
    const previousMonthDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate();

    days += previousMonthDays;
    months--;
  }

  if (months < 0) {
    months += 12;
    years--;
  }

  return { years, months, days, hours, minutes, seconds };
}

export function Counter() {
  const [time, setTime] = useState(() => diff(new Date()));

  useEffect(() => {
    const id = window.setInterval(() => {
      setTime(diff(new Date()));
    }, 1000);

    return () => window.clearInterval(id);
  }, []);

  const items: Array<[string, number]> = [
    ["Anos", time.years],
    ["Meses", time.months],
    ["Dias", time.days],
    ["Horas", time.hours],
    ["Minutos", time.minutes],
    ["Segundos", time.seconds],
  ];

  return (
    <section className="relative overflow-hidden px-6 py-28">
      <Starfield density={70} />
      <Particles count={22} />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,170,190,0.16), transparent 70%)",
          filter: "blur(55px)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.45, 0.75, 0.45],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mx-auto mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 shadow-soft backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-rose-glow shadow-[0_0_14px_rgba(255,160,180,0.9)]" />
          <p className="text-[10px] uppercase tracking-[0.42em] text-rose-glow">Para Sempre</p>
          <span className="h-1.5 w-1.5 rounded-full bg-rose-glow shadow-[0_0_14px_rgba(255,160,180,0.9)]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="font-display text-3xl leading-tight text-blush text-glow-soft sm:text-5xl"
        >
          Todo esse tempo depois, e eu ainda escolheria você.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.9 }}
          className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base"
        >
          Cada segundo guarda um pouco da nossa história, cada dia confirma que o meu lugar favorito
          continua sendo ao seu lado.
        </motion.p>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {items.map(([label, value], index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 28, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.65,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              whileHover={{
                y: -6,
                scale: 1.03,
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] px-3 py-6 shadow-soft backdrop-blur-xl"
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.12) 45%, transparent 70%)",
                }}
                animate={{
                  x: ["-120%", "120%"],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div
                className="absolute inset-x-5 top-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,210,220,0.6), transparent)",
                }}
              />

              <motion.div
                key={`${label}-${value}`}
                initial={{ y: -8, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="relative font-display text-4xl text-blush text-glow tabular-nums sm:text-5xl"
              >
                {String(value).padStart(2, "0")}
              </motion.div>

              <div className="relative mt-2 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                {label}
              </div>

              <div className="absolute bottom-0 left-1/2 h-12 w-24 -translate-x-1/2 rounded-full bg-rose-glow/10 blur-2xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
